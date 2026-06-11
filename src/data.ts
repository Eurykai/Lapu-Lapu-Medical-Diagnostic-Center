import { TestPackage, BlogPost, FAQItem } from "./types";

export const TEST_PACKAGES: TestPackage[] = [
  {
    id: "cxr-pa",
    name: "Chest X-Ray PA (Digital)",
    price: 250,
    description: "Standard radiographic evaluation of the lungs, heart, and chest wall. Used for employment clearance, routine checks, and respiratory assessments.",
    preps: [
      "No absolute fasting is required.",
      "Wear comfortable clothing. You will be asked to change into a patient gown.",
      "Remove all metal jewelry, necklaces, or body piercings around the chest region before shooting."
    ],
    duration: "10 - 15 minutes (Results in 2-4 hours)",
    category: "imaging",
    whoNeedsIt: "OFWs, pre-employment applicants, individuals with chronic cough, shortness of breath, or medical clearance requirements."
  },
  {
    id: "ogtt-preg",
    name: "Oral Glucose Tolerance Test (OGTT)",
    price: 910,
    description: "A comprehensive multi-phase blood sugar evaluation specifically for expectant mothers to diagnose gestational diabetes mellitus.",
    preps: [
      "Requires strictly 8 to 10 hours of overnight fasting.",
      "You will have a baseline fasting blood draw, after which you will drink a concentrated glucose syrup.",
      "Your blood will be drawn again at 1-hour and 2-hour intervals. You must rest quietly in the clinic; no eating, drinking, or heavy physical exertion is allowed during the testing process."
    ],
    duration: "2.5 - 3 hours (Results released next-day)",
    category: "chemistry",
    whoNeedsIt: "Pregnant mothers between their 24th to 28th weeks of gestation, or as customized by their OB-GYN."
  },
  {
    id: "hba1c-test",
    name: "HbA1c (Glycated Hemoglobin)",
    price: 675,
    description: "Measures average blood sugar levels over the past 2 to 3 months. Essential for tracking diabetes wellness and identifying prediabetic states.",
    preps: [
      "No fasting is required. This test can be conducted at any time of the day, regardless of your food intake.",
      "Ensure you inform our medical technologist if you have any history of anemia or blood disorders."
    ],
    duration: "5 - 10 minutes (Results in 3-5 hours)",
    category: "chemistry",
    whoNeedsIt: "Known diabetic patients monitoring therapeutic response, or individuals at high-risk for metabolic syndromes."
  },
  {
    id: "pns-xray",
    name: "Paranasal Sinuses (PNS) X-Ray",
    price: 460,
    description: "Detailed radiographic imaging focusing on the frontal, ethmoid, sphenoid, and maxillary sinus cavities.",
    preps: [
      "No fasting is required.",
      "Remove hairpins, earrings, glasses, or dental prosthetics containing metal before the procedure."
    ],
    duration: "15 minutes (Results in 3-5 hours)",
    category: "imaging",
    whoNeedsIt: "Patients suffering from chronic sinusitis, recurrent severe headaches, nasal blockages, or suspected polyps."
  },
  {
    id: "routine-urna",
    name: "Routine Urinalysis with Microscopy",
    price: 120,
    description: "Physical, chemical, and microscopic examination of urine. Detects urinary tract infections (UTI), kidney performance, and systemic disorders.",
    preps: [
      "A clean-catch, mid-stream urine sample is desired. Clean the genital area with soap and water before collecting.",
      "First morning void sample is optimal on account of high concentration, but random collection is fully accepted."
    ],
    duration: "5 minutes (Results in 1-2 hours)",
    category: "microscopy",
    whoNeedsIt: "Annual physical examinees, or anyone dealing with painful urination, pelvic cramps, cloudy urine, or hematuria."
  },
  {
    id: "cbc-diff",
    name: "Complete Blood Count (CBC) with Platelets",
    price: 180,
    description: "Screens for infection, inflammatory response, anemia, blood disorders, and immune system health by evaluating red cells, white cells, and blood platelets.",
    preps: [
      "No fasting is required. Drink plenty of water to help make your blood vessels more accessible."
    ],
    duration: "5-10 minutes (Results in 2-3 hours)",
    category: "chemistry", // Hematology represented here
    whoNeedsIt: "General baseline health screening, pre-ops, and monitoring fever, inflammation, or bruising."
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile (Full Panel)",
    price: 550,
    description: "Measures Total Cholesterol, HDL (good cholesterol), LDL (bad cholesterol), and Triglycerides in your blood to evaluate cardiovascular risks.",
    preps: [
      "Requires strictly 10 to 12 hours of absolute fasting. No food or sweetened drinks. Water is fully encouraged."
    ],
    duration: "5 minutes (Results in 3-5 hours)",
    category: "chemistry",
    whoNeedsIt: "Adults over 30, individuals tracking cardiovascular disease therapies, or those with familial metabolic histories."
  },
  {
    id: "fbs-test",
    name: "Fasting Blood Sugar (FBS)",
    price: 150,
    description: "Measures blood sugar concentration after a fasting period to screen for diabetes and insulin resistance.",
    preps: [
      "Requires strictly 8 to 10 hours of overnight fasting. Avoid midnight snacks, heavy exercises, or alcohol preceding the blood draw."
    ],
    duration: "5 minutes (Results in 2-3 hours)",
    category: "chemistry",
    whoNeedsIt: "Regular health screening for metabolism risk tracking."
  },
  {
    id: "matern-ultra",
    name: "Prenatal / OB GYN Ultrasound",
    price: 650,
    description: "Non-invasive obstetric imaging using advanced ultrasound echoes. Evaluates fetal growth, checks amniotic fluid, and determines gender.",
    preps: [
      "For early pregnancy pelvic scans, a moderately full bladder is required. Drink 4 large glasses of water 1 hour prior and hold your urination.",
      "Wear easy-to-slip-off apparel to enable quick abdominal access."
    ],
    duration: "20 - 30 minutes (By scheduling block)",
    category: "imaging",
    whoNeedsIt: "Expectant mothers tracking baby health. Available weekdays Mon-Fri 10:30am-12nn, and Mon-Sat 3:00pm-4:00pm."
  },
  {
    id: "drug-test",
    name: "Drug Testing (Meth/THC)",
    price: 300,
    description: "Standard multi-panel urine screening for illicit substances including Methamphetamine (Shabu) and Tetrahydrocannabinol (Marijuana).",
    preps: [
      "A supervised urine sample is required to be produced at the clinic.",
      "Ensure you bring a valid government ID for identity verification.",
      "Inform the medical technologist of any prescription maintenance medicines you are currently taking."
    ],
    duration: "10-15 minutes (Results in 1-2 hours)",
    category: "other",
    whoNeedsIt: "Pre-employment applicants, individuals renewing LTO driver's licenses, and for standard occupational clearance."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "fasting-guide-101",
    title: "The Ultimate Guide to Pre-Lab Fasting: 8, 10, or 12 Hours?",
    excerpt: "Preparing for a blood draw can be confusing. Learn exactly why fasting matters, what you can drink, and how to survive the wait.",
    category: "Testing Preparation",
    readTime: "4 min read",
    publishedDate: "June 08, 2026",
    content: `
      ### Why Does Fasting Matter?
      When you eat, your digestive system breaks down food, releasing glucose, lipids (fats), and other nutrients directly into your bloodstream. This temporarily spikes their concentrations. If blood is drawn during this digestion window, your results will show elevated baseline stats, potentially leading to a misdiagnosis of diabetes or high cholesterol.

      ### Fasting Milestones:
      1. **8 to 10 Hours (Fasting Blood Sugar / FBS)**: Strictly required to establish your body's true glucose regulation. Exceeding 12 hours can trigger starvation metabolism, which paradoxically skews sugar readings.
      2. **10 to 12 Hours (Lipid Panel)**: Lipids take much longer to clear. Avoid consuming grease or heavy sugary meals the night before.
      3. **No Fasting (HbA1c & CBC)**: Since HbA1c evaluates glucose bonded to red cells over a 90-day lifecycle, breakfast will not affect this rating.

      ### Rules of Thumb:
      * **Water is allowed**: You SHOULD drink plain water. Proper hydration keeps your veins plump and accessible, reducing discomfort.
      * **No Coffee or Tea**: Even black coffee with zero sugar contains trace biological chemical stimulants that trigger liver enzyme activity, corrupting enzyme blood panels.
    `
  },
  {
    id: "hba1c-vs-fbs",
    title: "HbA1c vs. FBS: What is the Difference for Diabetes Screening?",
    excerpt: "Both monitor blood sugar, but they tell completely different stories. Discover which test is optimal for your metabolic tracking.",
    category: "Health Tips",
    readTime: "5 min read",
    publishedDate: "May 24, 2026",
    content: `
      While Fasting Blood Sugar (FBS) offers a precise snapshot of your sugar concentrations at one exact minute, **HbA1c** serves as a 3-month video history.

      ### The Breakdown:
      * **FBS (Fasting Blood Sugar)**: High-resolution snapshot. Skewed easily by poor sleep, intense stress on test morning, or a sneaky dessert late last night.
      * **HbA1c (Glycated Hemoglobin)**: Evaluates the percentage of hemoglobin bounded to sugar molecules. Because red cells survive roughly 120 days inside your system, HbA1c is highly stable and immune to short-term stress or dietary cheating.
      
      At **Lapu-Lapu Medical Diagnostic Center**, we suggest a combination of both tests for initial screenings. If your HbA1c resides in the **5.7% to 6.4%** window, it prompts a warning for Pre-diabetes—alerting you to start healthy routines immediately.
    `
  },
  {
    id: "pregnancy-ogtt",
    title: "Expecting? Demystifying the Gestational OGTT Screening",
    excerpt: "What to expect during the 3-hour Oral Glucose Tolerance Test (OGTT), and how to prepare your body for maximum safety.",
    category: "Maternal Wellness",
    readTime: "6 min read",
    publishedDate: "April 15, 2026",
    content: `
      The **Oral Glucose Tolerance Test (OGTT)** is one of the most vital test sequences for pregnant women between the **24th and 28th weeks**. It ensures your placenta-produced hormones aren't triggering maternal insulin resistance.

      ### What Occurs During the Test?
      1. **First Draw**: Baseline fasting sugar evaluation.
      2. **The Drink**: You will be asked to consume a highly sweet glucose solution (typically 75g) in a short span.
      3. **Subsequent Draws**: Blood is drawn exactly 1 hour and 2 hours later to chart how rapidly your pancreas clears the insulin load.

      ### Preparation Tips:
      * Maintain a normal, non-restrictive carbohydrate diet for 3 days prior.
      * fast strictly for **8 to 10 hours** preceding the baseline draw.
      * Carry a book or device. You will be required to sit resting in our lobby for 2 full hours. Movement or stress speeds up metabolization, skewing results!
    `
  }
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    question: "Do you offer Chest X-Rays? How much is it?",
    answer: "Yes, we have high-quality digital Chest X-Ray (CXR-PA) services available for only ₱250.00. This is fully licensed and suitable for employment, school, or travel medical clearances.",
    category: "services"
  },
  {
    question: "Is fasting required for an HbA1c test?",
    answer: "No, fasting is not required for an HbA1c test. You can eat normally or have the test done at any time of day. However, if you are scheduling HbA1c in combination with Fasting Blood Sugar (FBS), you must fast for 8-10 hours.",
    category: "fasting"
  },
  {
    question: "What is your schedule for Prenatal Ultrasounds?",
    answer: "Our Diagnostic Ultrasound scans are scheduled for Monday to Friday from 10:30 AM to 12:00 NN, and Monday to Saturday in the afternoon from 3:00 PM to 4:00 PM. We suggest booking in advance.",
    category: "general"
  },
  {
    question: "How much is the OGTT test for pregnant mothers?",
    answer: "The Oral Glucose Tolerance Test (OGTT) for pregnant individuals at our diagnostic facility is priced at ₱910.00. Please schedule this in advance and fast strictly for 8 to 10 hours overnight.",
    category: "general"
  },
  {
    question: "Are your test results accepted for OFWs and employment clearances?",
    answer: "Yes, LLMDCI is fully licensed by the Department of Health (DOH) in the Philippines. Our diagnostic reports are accepted by major local employers, corporate offices, and regulatory agencies.",
    category: "services"
  },
  {
    question: "How can I check my laboratory results online?",
    answer: "You can securely search for released results using our 'Results Inquiry' tab. Simply input your Reference Number (found at the top portion of your receipt, e.g., LL-2026-001) and your Last Name.",
    category: "results"
  }
];

export const MEDICAL_AFFILIANDS = [
  { name: "Dr. Ana Reyes, MD", specialization: "Pathologist & Medical Director" },
  { name: "Dr. Manuel Co, MD", specialization: "Internal Medicine & Occupational Health" },
  { name: "Dr. Corazon dela Victoria, MD", specialization: "Radiology Associate Director" },
  { name: "Lic. Ma. Teresa Gomez, RMT", specialization: "Chief Medical Technologist" }
];
