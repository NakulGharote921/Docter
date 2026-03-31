export default function HealthSummaryCard({ label, value, accent, helper }) {
  return (
    <article className="hub-card summary-card">
      <p>{label}</p>
      <strong style={{ color: accent }}>{value}</strong>
      <span>{helper}</span>
    </article>
  );
}
