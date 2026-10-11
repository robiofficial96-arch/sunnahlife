"use client";

import { useEffect } from "react";
import { savePatientToFirestore, saveOnlineAppointment } from "@/lib/firebase";

export default function AutoCloudSyncManager() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const performSync = async () => {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        return;
      }

      // 1. Automatically sync unsynced patient records from localStorage to Firebase Cloud
      try {
        const localPatientsStr = localStorage.getItem("sunnahlife_patients_records");
        if (localPatientsStr) {
          const patients = JSON.parse(localPatientsStr);
          if (Array.isArray(patients) && patients.length > 0) {
            const syncedIdsStr = localStorage.getItem("sunnahlife_synced_patient_ids") || "[]";
            let syncedIds: Set<string>;
            try {
              syncedIds = new Set<string>(JSON.parse(syncedIdsStr));
            } catch {
              syncedIds = new Set<string>();
            }

            for (const p of patients) {
              if (p?.id && !syncedIds.has(p.id)) {
                try {
                  await savePatientToFirestore(p);
                  syncedIds.add(p.id);
                } catch (err) {
                  console.error("Auto sync single patient error:", err);
                }
              }
            }
            localStorage.setItem("sunnahlife_synced_patient_ids", JSON.stringify(Array.from(syncedIds)));
          }
        }
      } catch (err) {
        console.error("Auto patient cloud sync error:", err);
      }

      // 2. Automatically sync any offline pending appointments
      try {
        const localAptsStr = localStorage.getItem("sunnahlife_pending_appointments");
        if (localAptsStr) {
          const apts = JSON.parse(localAptsStr);
          if (Array.isArray(apts) && apts.length > 0) {
            const remaining: any[] = [];
            for (const apt of apts) {
              if (apt?.id && (apt.id.startsWith("offline_") || apt.id.startsWith("local_"))) {
                try {
                  const { id, ...dataToSave } = apt;
                  await saveOnlineAppointment(dataToSave);
                } catch {
                  remaining.push(apt);
                }
              } else {
                remaining.push(apt);
              }
            }
            localStorage.setItem("sunnahlife_pending_appointments", JSON.stringify(remaining));
          }
        }
      } catch (err) {
        console.error("Auto appointment cloud sync error:", err);
      }
    };

    // Attempt sync immediately if online
    if (navigator.onLine) {
      performSync();
    }

    // Trigger sync automatically the second network reconnects!
    const handleOnline = () => {
      console.log("Internet connection detected! Auto-syncing local data to Firebase Cloud...");
      performSync();
    };

    // Trigger sync when phone screen turns on or user switches back to browser tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && navigator.onLine) {
        performSync();
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("focus", handleOnline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Periodic heartbeat check every 30 seconds if online
    const interval = setInterval(() => {
      if (navigator.onLine) {
        performSync();
      }
    }, 30000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("focus", handleOnline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  return null;
}
