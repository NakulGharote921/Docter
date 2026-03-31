export default function WorkoutList({ items }) {
  return (
    <div className="hub-grid two-column">
      {items.map((item) => (
        <article className="hub-card" key={item.title}>
          <p className="hub-tag">{item.focus}</p>
          <h3>{item.title}</h3>
          <span>{item.duration}</span>
        </article>
      ))}
    </div>
  );
}
