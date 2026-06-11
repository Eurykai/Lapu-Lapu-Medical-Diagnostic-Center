export interface TestPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  preps: string[];
  duration: string;
  category: "all" | "chemistry" | "microscopy" | "imaging" | "package" | "other";
  whoNeedsIt: string;
}

export interface AppointmentPayload {
  name: string;
  contact: string;
  email?: string;
  testSelection: string;
  preferredDate: string;
  preferredTime: string;
}

export interface ScheduledAppointment extends AppointmentPayload {
  id: string;
  status: "Pending" | "Confirmed";
  referenceCode: string;
  createdAt: string;
}

export interface TestResultItem {
  parameter: string;
  result: string;
  referenceRange: string;
  unit: string;
  flag?: "Normal" | "High" | "Low";
}

export interface LabTestCategory {
  name: string;
  items: TestResultItem[];
}

export interface PatientLabResult {
  referenceNumber: string;
  lastName: string;
  patientName: string;
  age: number;
  gender: string;
  testDate: string;
  requestingPhysician: string;
  tests: LabTestCategory[];
  isReleased: boolean;
  notes?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedDate: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "booking" | "results" | "fasting" | "services" | "general";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
