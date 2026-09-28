import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
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
