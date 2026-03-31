import { useState } from "react";
import toast from "react-hot-toast";

export default function StepTrackerUI({ initialSteps, onSave }) {
  const [steps, setSteps] = useState(initialSteps);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(steps);
      toast.success("Daily step goal updated");
    } catch (error) {
      toast.error(error.message || "Unable to save steps");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="hub-card">
      <div className="hub-card-header">
        <h3>Step tracker</h3>
        <span>Daily movement target</span>
      </div>

      <div className="step-tracker">
        <input
          type="number"
          min="0"
          value={steps}
          onChange={(event) => setSteps(event.target.value)}
        />
        <button type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save steps"}
        </button>
      </div>
    </section>
  );
}
