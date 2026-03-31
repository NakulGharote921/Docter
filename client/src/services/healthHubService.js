import { get, push, ref, set, update } from "firebase/database";
import { db } from "../config/firebase";
import { calculateBMI, getTodayKey } from "../utils/health";

function mapAppointments(snapshot) {
  const appointments = [];

  if (!snapshot.exists()) {
    return appointments;
  }

  snapshot.forEach((childSnapshot) => {
    appointments.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });

  return appointments.sort((a, b) => {
    const left = new Date(a.appointmentDate || a.date || 0).getTime();
    const right = new Date(b.appointmentDate || b.date || 0).getTime();
    return left - right;
  });
}

export async function getUserDashboardSnapshot(userId) {
  const [healthSnapshot, stepsSnapshot, appointmentsSnapshot] = await Promise.all(
    [
      get(ref(db, `users/${userId}/health`)),
      get(ref(db, `users/${userId}/steps`)),
      get(ref(db, `appointments/${userId}`)),
    ]
  );

  return {
    health: healthSnapshot.exists() ? healthSnapshot.val() : {},
    steps: stepsSnapshot.exists() ? stepsSnapshot.val() : {},
    appointments: mapAppointments(appointmentsSnapshot),
  };
}

export async function saveBmiRecord(userId, { weight, height }) {
  const bmi = calculateBMI(weight, height);

  if (!bmi) {
    throw new Error("Please enter valid height and weight values.");
  }

  await update(ref(db, `users/${userId}/health`), {
    weight: Number(weight),
    height: Number(height),
    bmi,
    updatedAt: new Date().toISOString(),
  });

  return bmi;
}

export async function saveWaterIntake(userId, waterIntake) {
  await update(ref(db, `users/${userId}/health`), {
    waterIntake: Number(waterIntake),
    updatedAt: new Date().toISOString(),
  });
}

export async function saveDailySteps(userId, steps) {
  await set(ref(db, `users/${userId}/steps/${getTodayKey()}`), Number(steps));
}

export async function createWellnessAppointment(user, provider, type, appointmentDate) {
  const payload = {
    userId: user.uid,
    userEmail: user.email,
    providerId: provider.id,
    providerName: provider.name,
    providerSpecialty: provider.specialty,
    doctorName: provider.name,
    doctorSpeciality: provider.specialty,
    doctorFee: provider.fee,
    type,
    appointmentDate,
    status: "Scheduled",
    createdAt: new Date().toISOString(),
  };

  const appointmentRef = push(ref(db, `appointments/${user.uid}`));
  await set(appointmentRef, payload);

  return { id: appointmentRef.key, ...payload };
}
