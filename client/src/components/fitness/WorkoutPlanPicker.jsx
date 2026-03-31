const levels = ["beginner", "intermediate", "advanced"];

export default function WorkoutPlanPicker({ selectedLevel, onChange }) {
  return (
    <div className="plan-picker">
      {levels.map((level) => (
        <button
          key={level}
          type="button"
          className={selectedLevel === level ? "active" : ""}
          onClick={() => onChange(level)}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
