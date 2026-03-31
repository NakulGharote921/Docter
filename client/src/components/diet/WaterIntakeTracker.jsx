import { useState } from "react";
import toast from "react-hot-toast";

export default function WaterIntakeTracker({ initialValue, onSave }) {
  const [waterIntake, setWaterIntake] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  const glasses = Array.from({ length: 8 }, (_, index) => index + 1);

  const handleSave = async (nextValue) => {
    try {
      setIsSaving(true);
      setWaterIntake(nextValue);
      await onSave(nextValue);
      toast.success("Hydration progress saved");
    } catch (error) {
      toast.error(error.message || "Unable to save hydration");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="hub-card">
      <div className="hub-card-header">
        <h3>Water intake tracker</h3>
        <span>{waterIntake}/8 glasses</span>
      </div>

      <div className="water-grid">
        {glasses.map((glass) => (
          <button
            key={glass}
            type="button"
            className={glass <= waterIntake ? "filled" : ""}
            onClick={() => handleSave(glass)}
            disabled={isSaving}
          >
            {glass}
          </button>
        ))}
      </div>
    </section>
  );
}
