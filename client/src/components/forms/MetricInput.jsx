export default function MetricInput({
  label,
  type = "number",
  value,
  onChange,
  placeholder,
  min,
}) {
  return (
    <label className="hub-field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        min={min}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
