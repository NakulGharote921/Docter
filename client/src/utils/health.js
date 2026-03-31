export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function calculateBMI(weight, heightCm) {
  const parsedWeight = Number(weight);
  const parsedHeight = Number(heightCm);

  if (!parsedWeight || !parsedHeight || parsedWeight <= 0 || parsedHeight <= 0) {
    return null;
  }

  const heightInMeters = parsedHeight / 100;
  return Number(
    (parsedWeight / (heightInMeters * heightInMeters)).toFixed(1)
  );
}

export function getBmiCategory(bmi) {
  if (!bmi) return "No data";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function formatDateTime(value) {
  if (!value) return "Not scheduled";

  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function getWaterProgress(currentGlasses, targetGlasses = 8) {
  const safeCurrent = Number(currentGlasses) || 0;
  return Math.min(100, Math.round((safeCurrent / targetGlasses) * 100));
}
