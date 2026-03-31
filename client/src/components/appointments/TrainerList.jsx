export default function TrainerList({ trainers, onBook }) {
  return (
    <div className="hub-grid two-column">
      {trainers.map((trainer) => (
        <article className="hub-card" key={trainer.id}>
          <p className="hub-tag">{trainer.specialty}</p>
          <h3>{trainer.name}</h3>
          <span>{trainer.availability}</span>
          <small>Session fee: Rs. {trainer.fee}</small>
          <button type="button" onClick={() => onBook(trainer, "trainer")}>
            Book trainer session
          </button>
        </article>
      ))}
    </div>
  );
}
