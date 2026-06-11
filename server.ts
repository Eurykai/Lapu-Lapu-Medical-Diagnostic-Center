import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Return a mock/placeholder capability or throw? 
      // Let's log a warning but handle gracefully rather than crashing on module loads.
      console.warn("GEMINI_API_KEY is not defined. Using mock fallback mode for chat.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// In-memory simulation database
interface Appointment {
  id: string;
  name: string;
  contact: string;
  email: string;
  testSelection: string;
  preferredDate: string;
  preferredTime: string;
  status: "Pending" | "Confirmed";
  referenceCode: string;
  createdAt: string;
}

const appointments: Appointment[] = [
  {
    id: "apt-001",
    name: "Maria Santos",
    contact: "09171234567",
    email: "maria.santos@gmail.com",
    testSelection: "HbA1c & Fasting Blood Sugar (FBS)",
    preferredDate: "2026-06-12",
    preferredTime: "08:00 AM",
    status: "Confirmed",
    referenceCode: "APT-2026-781",
    createdAt: new Date().toISOString()
  }
];

// Pre-seeded Lab Results forlookup
interface LabResult {
  referenceNumber: string; // e.g. LL-2026-101
  lastName: string;
  patientName: string;
  age: number;
  gender: string;
  testDate: string;
  requestingPhysician: string;
  tests: {
    name: string;
    items: {
      parameter: string;
      result: string;
      referenceRange: string;
      unit: string;
      flag?: "Normal" | "High" | "Low";
    }[];
  }[];
  isReleased: boolean;
  notes?: string;
}

const mockLabResults: LabResult[] = [
  {
    referenceNumber: "LL-2026-001",
    lastName: "Dela Cruz",
    patientName: "Juan Dela Cruz",
    age: 45,
    gender: "Male",
    testDate: "2026-06-08",
    requestingPhysician: "Dr. Ana Reyes, MD",
    isReleased: true,
    tests: [
      {
        name: "Blood Chemistry",
        items: [
          { parameter: "Fasting Blood Sugar (FBS)", result: "95.00", referenceRange: "70.00 - 100.00", unit: "mg/dL", flag: "Normal" },
          { parameter: "HbA1c", result: "5.8", referenceRange: "4.0 - 5.6 (Normal), 5.7 - 6.4 (Prediabetes)", unit: "%", flag: "High" },
          { parameter: "Total Cholesterol", result: "185.00", referenceRange: "less than 200.00", unit: "mg/dL", flag: "Normal" }
        ]
      },
      {
        name: "Complete Blood Count (CBC)",
        items: [
          { parameter: "Hemoglobin", result: "142.0", referenceRange: "135.0 - 175.0", unit: "g/L", flag: "Normal" },
          { parameter: "White Blood Cells (WBC)", result: "7.20", referenceRange: "4.50 - 11.00", unit: "x10^9/L", flag: "Normal" },
          { parameter: "Plateletes", result: "280", referenceRange: "150 - 450", unit: "x10^9/L", flag: "Normal" }
        ]
      }
    ],
    notes: "HbA1c indicates prediabetic status. Recommend dietary review with your primary physician."
  },
  {
    referenceNumber: "LL-2026-002",
    lastName: "Santos",
    patientName: "Maria Santos",
    age: 32,
    gender: "Female",
    testDate: "2026-06-05",
    requestingPhysician: "Dr. Manuel Co, MD",
    isReleased: true,
    tests: [
      {
        name: "Routine Urinalysis",
        items: [
          { parameter: "Color", result: "Straw/Light Yellow", referenceRange: "Yellow / Straw", unit: "" },
          { parameter: "Clarity", result: "Clear", referenceRange: "Clear", unit: "" },
          { parameter: "pH", result: "6.0", referenceRange: "5.0 - 7.5", unit: "" },
          { parameter: "Sugar / Glucose", result: "Negative", referenceRange: "Negative", unit: "" },
          { parameter: "Protein / Albumin", result: "Negative", referenceRange: "Negative", unit: "" },
          { parameter: "Pus Cells (WBC)", result: "1-2", referenceRange: "0-5", unit: "/hpf", flag: "Normal" },
          { parameter: "Red Blood Cells (RBC)", result: "0-1", referenceRange: "0-3", unit: "/hpf", flag: "Normal" }
        ]
      }
    ],
    notes: "Urinalysis is clear of signs of infection."
  }
];

// API: Check server health
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API: Book Appointment
app.post("/api/appointments/book", (req, res) => {
  try {
    const { name, contact, email, testSelection, preferredDate, preferredTime } = req.body;
    if (!name || !contact || !testSelection || !preferredDate || !preferredTime) {
      return res.status(400).json({ error: "Please fill out all required fields." });
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const referenceCode = `APT-2026-${randomSuffix}`;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      name,
      contact,
      email: email || "N/A",
      testSelection,
      preferredDate,
      preferredTime,
      status: "Confirmed", // Auto-confirm on client simulation
      referenceCode,
      createdAt: new Date().toISOString()
    };

    appointments.push(newApt);
    res.status(201).json({
      success: true,
      message: "Appointment scheduled successfully!",
      appointment: newApt
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to book appointment" });
  }
});

// API: Get Appointmets (for management view or tracking list)
app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

// API: Lookup Lab Results
app.post("/api/results/lookup", (req, res) => {
  try {
    const { referenceNumber, lastName } = req.body;
    if (!referenceNumber || !lastName) {
      return res.status(400).json({ error: "Reference Number and Last Name are required." });
    }

    const cleanedRef = referenceNumber.trim().toUpperCase();
    const cleanedLastName = lastName.trim().toLowerCase();

    // Check pre-seeded database
    const foundResult = mockLabResults.find(
      r => r.referenceNumber === cleanedRef && r.lastName.toLowerCase() === cleanedLastName
    );

    if (foundResult) {
      return res.json({ success: true, result: foundResult });
    }

    // Dynamic Generator for any non-seeded lookup to make it a fun, fully interactive sandbox!
    // If they lookup a random number, let's create a healthy-looking demo report on the fly so they can play with it!
    if (cleanedRef.startsWith("LL-") || cleanedRef.startsWith("ll-") || cleanedRef === "DEMO" || cleanedRef === "TEST") {
      const generatedResult: LabResult = {
        referenceNumber: cleanedRef === "DEMO" || cleanedRef === "TEST" ? "LL-2026-999" : cleanedRef,
        lastName: lastName.trim(),
        patientName: `Demo Patient (${lastName.trim()})`,
        age: 28,
        gender: "Female",
        testDate: new Date().toISOString().split('T')[0],
        requestingPhysician: "Dr. Corazon dela Victoria, MD",
        isReleased: true,
        tests: [
          {
            name: "Complete Blood Count (CBC)",
            items: [
              { parameter: "Hemoglobin", result: "128.0", referenceRange: "120.0 - 155.0", unit: "g/L", flag: "Normal" },
              { parameter: "Hematocrit", result: "0.39", referenceRange: "0.37 - 0.47", unit: "L/L", flag: "Normal" },
              { parameter: "White Blood Cells (WBC)", result: "5.50", referenceRange: "4.50 - 11.00", unit: "x10^9/L", flag: "Normal" },
              { parameter: "Plateletes", result: "240", referenceRange: "150 - 450", unit: "x10^9/L", flag: "Normal" }
            ]
          }
        ],
        notes: "This is a dynamic demonstration report generated for system preview. All parameters reside well within nominal clinical constraints."
      };
      return res.json({ success: true, result: generatedResult });
    }

    return res.status(404).json({
      success: false,
      error: "No matching record found. Ensure your Reference Number is correct (e.g. LL-2026-001) and matches your last name exactly."
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to perform lookup" });
  }
});

// API: Diagnostic / Guidance Chatbot using Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid message payload format." });
    }

    // Capture the last user prompt and some context
    const userPrompt = messages[messages.length - 1].content;

    // Standard base clinical identity for LLMDCI Cebu
    const systemInstruction = `
      You are the expert, professional, warm, and highly compassionate Virtual Medical Assistant of the Lapu-Lapu Medical Diagnostic Center Inc. (LLMDCI), located in FFG Arcade Brgy, A. Tumulak St, Lapu-Lapu City, 6015 Cebu, Philippines.
      Your goal is to answer patient inquiries clearly, professionally, and politely. Help boost trust, schedule bookings, and guide them with preparation rules.

      Key Details of LLMDCI to ALWAYS use when referenced:
      - Location: FFG Arcade, A. Tumulak St, Barangay Basak/Pajo area, Lapu-Lapu City, Cebu.
      - Contact Number: (032) 495 9328
      - Hours of Operation: Open Daily except Sundays. Main core operations are Mon-Sat 7:00 AM to 5:00 PM.
      - Ultrasound hours: Monday to Friday @10:30am-12:00nn and Monday to Saturday @3:00pm-4:00pm. Female gender ultrasound is available during these hours. Booking ahead is suggested.
      - Official Prices for Common Tests (Very Important, state if asked):
        * Chest X-Ray PA (CXR-PA): ₱250.00 (Highly affordable!)
        * Oral Glucose Tolerance Test (OGTT) for pregnant patients: ₱910.00
        * HbA1c (Glycated Hemoglobin) Diabetes test: ₱675.00
        * X-Ray Paranasal Sinuses: ₱460.00
      - Service Capabilities:
        * Hematology / CBC (Complete Blood Count)
        * Blood Chemistry (FBS, Lipid Profile, Creatinine, Bun, Uric Acid, SGPT, HbA1c, etc.)
        * Clinical Microscopy (Routine Urinalysis, Fecalysis / Stool test)
        * Serology / Immunology
        * Imaging (X-Ray Chest PA, Paranasal Sinuses, OB/GYN Pelvic Ultrasounds, Whole Abdomen Ultrasounds)
        * Mandatory / Pre-employment Drug Testing (Fully licensed)
      - UNSUPPORTED tests (State kindly if asked, do not fake):
        * Bronchodilator Spirometry Test is NOT available.
        * D-Dimer Test is NOT available.
      - Fasting Instructions:
        * Fasting Blood Sugar (FBS): Requires strictly 8 to 10 hours of fasting (water is allowed in small sips, no tea/coffee/sugar).
        * Lipid Profile (Cholesterol, Triglycerides, HDL, LDL): Requires strictly 10 to 12 hours of fasting.
        * Whole Abdomen Ultrasound: Requires 6 to 8 hours fasting. No fatty meal the night prior.
        * Normal CBC, HbA1c, Urinalysis, X-Ray, and Drug Testing DO NOT require fasting!

      Formatting Guidelines:
      - Answer directly, with short paragraphs and bullet points for lists. No heavy markdown or excessive formatting.
      - Keep the tone polite, compassionate, Cebuano-welcoming, and conversion-focused.
      - For users asking about bookings, encourage them to click the "Book a Test" tab on our system.
      - If you don't know an answer, direct them to call our desk at (032) 495 9328.
      - IMPORTANT: Maintain professional boundaries. Do not diagnose conditions from symptoms—ask them to consult their requesting physician, but gladly explain what tests are relevant.
    `;

    // Check if we have a real Gemini API Key available, else use a smart regex/heuristic responder to be 100% reliable
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY") {
      const gemini = getGemini();
      
      const contents = [
        { role: 'user', parts: [{ text: systemInstruction }] },
        // Map messages to Gemini SDK parts format
        ...messages.map((m: any) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      ];

      const response = await gemini.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
      });

      const assistantText = response.text || "Sorry, I am having trouble connecting to my diagnostic database. Please try again or call LLMDCI at (032) 495 9328.";
      return res.json({ role: "assistant", content: assistantText });

    } else {
      // Robust simulated fallback matching key Philippine customer inquiries for 100% offline reliability in AI Studio
      const promptLower = userPrompt.toLowerCase();
      let reply = "";

      if (promptLower.includes("fasting") || promptLower.includes("fast")) {
        reply = `Hello! Fasting is required for specific blood and ultrasound tests:
• **Fasting Blood Sugar (FBS)**: Strictly **8 to 10 hours** of fasting.
• **Lipid Profile (Cholesterol/Triglycerides)**: Strictly **10 to 12 hours** of fasting.
• **Whole Abdomen Ultrasound**: Strictly **6 to 8 hours** of fasting (fat-free meal the night before).
• **CBC, HbA1c, Urinalysis, and Chest X-Rays**: NO fasting required! You can eat normally.

Would you like to schedule one of these tests? You can use our **Book an Appointment** tab!`;
      } else if (promptLower.includes("xray") || promptLower.includes("x-ray") || promptLower.includes("chest") || promptLower.includes("pns") || promptLower.includes("sinus")) {
        reply = `Yes, we offer professional Digital X-Ray services! Our standard rates are highly competitive:
• **Chest X-Ray PA (CXR-PA)**: Only **₱250.00**
• **Paranasal Sinuses (PNS) X-Ray**: Only **₱460.00**

X-Ray services are available Monday to Saturday until 5:00 PM. No appointment is strictly required for basic X-rays, but you can book ahead via our **Book an Appointment** tab to prevent queues!`;
      } else if (promptLower.includes("ultrasound") || promptLower.includes("gender") || promptLower.includes("pelvic") || promptLower.includes("baby")) {
        reply = `Yes, we provide medical Diagnostic Ultrasounds (including biological gender determination for pregnant mothers)!
• **Ultrasound Schedule**: Monday to Friday (10:30 AM to 12:00 NN) and Monday to Saturday (3:00 PM to 4:00 PM).
• **Important Tip**: Whole abdomen ultrasound requires 6-8 hours fasting. Pelvic/OB ultrasound requires a full bladder (drink 4-6 glasses of water 1 hour before and do not urinate).

Would you like to book a slot? Just navigate to the **Book an Appointment** tab!`;
      } else if (promptLower.includes("ogtt") || promptLower.includes("glucose tolerance") || promptLower.includes("pregnant")) {
        reply = `Yes, the **Oral Glucose Tolerance Test (OGTT)** for pregnant mothers is fully available for **₱910.00**. 
This test requires strictly **8 to 10 hours of fasting** prior to blood withdrawal. The complete test takes about 2 to 3 hours as we monitor blood sugar hourly.

You can book this test today via our appointment scheduler!`;
      } else if (promptLower.includes("spirometry") || promptLower.includes("bronchodilator") || promptLower.includes("lung test")) {
        reply = `We appreciate your inquiry. Unfortunately, **Bronchodilator Spirometry / Lung Function tests are not available** at our branch. We recommend checking with larger tertiary hospitals in Cebu. If you need a standard Chest X-Ray (₱250), we can support that daily!`;
      } else if (promptLower.includes("d-dimer") || promptLower.includes("ddimer") || promptLower.includes("clot")) {
        reply = `Please be informed that the **D-Dimer test is currently unavailable** at our laboratory. We apologize for the inconvenience. For other blood tests like HbA1c (₱675) or Lipid profile, we are fully equipped to serve you!`;
      } else if (promptLower.includes("hba1c") || promptLower.includes("diabetes") || promptLower.includes("sugar")) {
        reply = `Yes! We offer the **HbA1c (Glycated Hemoglobin)** test for **₱675.00**. Unlike FBS, the HbA1c test **does NOT require fasting**. You can walk-in or book an appointment at any time of the day!`;
      } else if (promptLower.includes("price") || promptLower.includes("how much") || promptLower.includes("magkano") || promptLower.includes("pila")) {
        reply = `Here is our official pricing list for common tests at LLMDCI Cebu:
• **Chest X-Ray (CXR-PA)**: ₱250.00
• **HbA1c diabetes test**: ₱675.00
• **OGTT (Pregnancy Diabetes)**: ₱910.00
• **Paranasal Sinuses (PNS) X-Ray**: ₱460.00
• **Complete Blood Count (CBC)**: ~₱150-200
• **Routine Urinalysis**: ~₱100-150

All tests are handled by licensed Medical Technologists and Radiologic Technologists. Tap **Book an Appointment** to schedule!`;
      } else if (promptLower.includes("contact") || promptLower.includes("number") || promptLower.includes("phone")) {
        reply = `You can call our frontdesk at **(032) 495 9328**. We are located at FFG Arcade Brgy, A. Tumulak St, Lapu-Lapu City, Cebu. Our doors are open Monday to Saturday from 7:00 AM to 5:00 PM. We'd look forward to hearing from you!`;
      } else {
        reply = `Mabuhay! Welcome to Lapu-Lapu Medical Diagnostic Center Inc. (LLMDCI). I can help answer questions about:
• Test preparation rules (e.g. fasting schedules)
• Official pricing (HbA1c: ₱675, OGTT: ₱910, Chest X-Ray: ₱250, PNS X-Ray: ₱460)
• Laboratory schedules and ultrasound availability
• Patient portal search options

How can I help you take charge of your health today?`;
      }

      // Add a slight delay to simulate thinking
      await new Promise(resolve => setTimeout(resolve, 500));
      return res.json({ role: "assistant", content: reply });
    }

  } catch (error: any) {
    console.error("Gemini route error:", error);
    res.status(500).json({ error: error.message || "Something went wrong in processing your chat request." });
  }
});

// Serve frontend assets in production / fallback index.html for React SPA
// Vite middleware setup wrapping inside async bootstrap
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server executing successfully on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server bootstrap:", err);
});
