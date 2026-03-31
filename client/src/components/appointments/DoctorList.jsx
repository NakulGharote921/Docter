export default function DoctorList({ doctors, onBook }) {
  return (
    <div className="hub-grid two-column">
      {doctors.map((doctor) => (
        <article className="hub-card" key={doctor.id}>
          <p className="hub-tag">{doctor.specialty}</p>
          <h3>{doctor.name}</h3>
          <span>{doctor.availability}</span>
          <small>Consultation fee: Rs. {doctor.fee}</small>
          <button type="button" onClick={() => onBook(doctor, "doctor")}>
            Book doctor slot
          </button>
        </article>
      ))}
    </div>
  );
}
