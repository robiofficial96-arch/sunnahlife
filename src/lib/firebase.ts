import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNc60j2i6mbFNkWkHYkEnIieBDdkTNdDw",
  authDomain: "sunnahlife-a88bd.firebaseapp.com",
  projectId: "sunnahlife-a88bd",
  storageBucket: "sunnahlife-a88bd.firebasestorage.app",
  messagingSenderId: "415605343846",
  appId: "1:415605343846:web:65c8606f3c89afa6754fa7",
  measurementId: "G-XBZX1T5ZV3"
};

// Initialize Firebase (singleton pattern for Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface OnlineAppointment {
  id?: string;
  name: string;
  phone: string;
  district?: string;
  serviceId?: string;
  serviceName: string;
  fee?: string;
  duration?: string;
  date: string;
  timeSlot: string;
  problemDescription: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: number; // Unix timestamp
  createdAtFormatted?: string;
}

// Function to save new appointment to Firestore
export async function saveOnlineAppointment(data: Omit<OnlineAppointment, "id" | "createdAt" | "status">) {
  const docRef = await addDoc(collection(db, "appointments"), {
    ...data,
    status: "pending",
    createdAt: Date.now(),
    createdAtFormatted: new Date().toLocaleString("bn-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  });
  return docRef.id;
}

// Real-time listener for appointments (for Admin dashboard)
export function subscribeToAppointments(callback: (appointments: OnlineAppointment[]) => void) {
  const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const list: OnlineAppointment[] = [];
    snapshot.forEach((d) => {
      list.push({ id: d.id, ...d.data() } as OnlineAppointment);
    });
    callback(list);
  }, (err) => {
    console.error("Firestore subscribe error:", err);
  });
}

// Update status
export async function updateAppointmentStatus(id: string, status: OnlineAppointment["status"]) {
  const ref = doc(db, "appointments", id);
  await updateDoc(ref, { status });
}

// Delete appointment
export async function deleteAppointmentRecord(id: string) {
  const ref = doc(db, "appointments", id);
  await deleteDoc(ref);
}

export interface PaymentInstallment {
  id: string;
  amount: number;
  date: string;       // e.g. "১১ অক্টোবর ২০২৬" or formatted
  rawDate?: string;   // YYYY-MM-DD
  method?: "cash" | "bkash" | "nagad" | "bank" | "other";
  notes?: string;
  createdAt?: number; // timestamp
}

export interface TreatmentSession {
  id: string;
  date: string;          // e.g. "১১ অক্টোবর ২০২৬"
  rawDate?: string;      // YYYY-MM-DD
  treatmentTitle: string;// e.g. "২য় সেশন রুকইয়াহ" / "হিজামা থেরাপি"
  treatmentType?: "ruqyah" | "hijama" | "both";
  cost: number;          // এই সেশনের মোট খরচ / ধার্য ফি (৳)
  paid: number;          // পরিশোধিত (৳)
  due: number;           // বকেয়া (৳)
  paymentMethod?: "cash" | "bkash" | "nagad" | "bank" | "other";
  prescription?: string; // প্রেসক্রিপশন / আমল
  notes?: string;        // কেস নোট
  createdAt?: number;
}

export interface PatientFirestoreRecord {
  id: string;
  name: string;
  age?: number | string;
  phone: string;
  address: string;
  type: "online" | "offline";
  treatmentType?: "ruqyah" | "hijama" | "both";
  problemType: string;
  service?: string;
  fee?: number;
  paid?: number;
  due?: number;
  payments?: PaymentInstallment[];
  sessions?: TreatmentSession[]; // একাধিক সেশন / ভিজিটের খতিয়ান
  notes: string;
  prescription: string;
  date: string;
  timeSlot?: string;
  status: "new" | "running" | "followup" | "cured";
  lastFollowupDate?: string;
  nextFollowupDate?: string;
  nextFollowupNote?: string;
  rawDate?: string;
  createdAt?: string;
  updatedAt?: number;
}

// Save or set patient record in Firestore
export async function savePatientToFirestore(patient: PatientFirestoreRecord) {
  const ref = doc(db, "patients", patient.id);
  await setDoc(ref, {
    ...patient,
    updatedAt: Date.now(),
  }, { merge: true });
}

// Update partial patient record in Firestore
export async function updatePatientInFirestore(id: string, updates: Partial<PatientFirestoreRecord>) {
  const ref = doc(db, "patients", id);
  await updateDoc(ref, {
    ...updates,
    updatedAt: Date.now(),
  });
}

// Delete patient from Firestore
export async function deletePatientFromFirestore(id: string) {
  const ref = doc(db, "patients", id);
  await deleteDoc(ref);
}

// Real-time listener for patients
export function subscribeToPatients(callback: (patients: PatientFirestoreRecord[]) => void) {
  const colRef = collection(db, "patients");
  return onSnapshot(colRef, (snapshot) => {
    const list: PatientFirestoreRecord[] = [];
    snapshot.forEach((d) => {
      list.push(d.data() as PatientFirestoreRecord);
    });
    // Sort so newest or largest ID comes first
    list.sort((a, b) => {
      const numA = parseInt(a.id.replace(/\D/g, ""), 10) || 0;
      const numB = parseInt(b.id.replace(/\D/g, ""), 10) || 0;
      return numB - numA;
    });
    callback(list);
  }, (err) => {
    console.error("Firestore patients subscribe error:", err);
  });
}

