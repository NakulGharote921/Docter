export default function DailyWorkoutMini({ items }) {
  return (
    <section className="hub-card">
      <div className="hub-card-header">
        <h3>Today&apos;s workout focus</h3>
        <span>{items.length} blocks</span>
      </div>

      <div className="hub-stack">
        {items.map((item) => (
          <div className="mini-workout-item" key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.focus}</p>
            <span>{item.duration}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
