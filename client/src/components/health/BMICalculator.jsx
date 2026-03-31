import { useState } from "react";
import toast from "react-hot-toast";
import MetricInput from "../forms/MetricInput";
import { calculateBMI, getBmiCategory } from "../../utils/health";

export default function BMICalculator({ initialHeight, initialWeight, onSave }) {
  const [height, setHeight] = useState(initialHeight ? String(initialHeight) : "");
  const [weight, setWeight] = useState(initialWeight ? String(initialWeight) : "");
  const [bmi, setBmi] = useState(
    calculateBMI(initialWeight, initialHeight)
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextBmi = calculateBMI(weight, height);
    if (!nextBmi) {
      toast.error("Please enter valid height and weight");
      return;
    }

    try {
      setIsSaving(true);
      setBmi(nextBmi);
      await onSave({ weight, height });
      toast.success("BMI calculated and saved");
    } catch (error) {
      toast.error(error.message || "Unable to save BMI");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="hub-card">
      <div className="hub-card-header">
        <h3>BMI calculator</h3>
        <span>Store your health baseline</span>
      </div>

      <form className="hub-form" onSubmit={handleSubmit}>
        <MetricInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="72"
          min="1"
        />
        <MetricInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="175"
          min="1"
        />
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Calculate BMI"}
        </button>
      </form>

      {bmi ? (
        <div className="bmi-result">
          <strong>{bmi}</strong>
          <span>{getBmiCategory(bmi)}</span>
        </div>
      ) : null}
    </section>
  );
}
