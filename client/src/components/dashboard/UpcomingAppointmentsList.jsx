import { formatDateTime } from "../../utils/health";

export default function UpcomingAppointmentsList({ appointments }) {
  return (
    <section className="hub-card">
      <div className="hub-card-header">
        <h3>Upcoming appointments</h3>
        <span>{appointments.length} scheduled</span>
      </div>

      <div className="hub-list">
        {appointments.length ? (
          appointments.slice(0, 4).map((appointment) => (
            <div className="hub-list-item" key={appointment.id}>
              <div>
                <strong>
                  {appointment.providerName || appointment.doctorName}
                </strong>
                <p>
                  {appointment.providerSpecialty ||
                    appointment.doctorSpeciality ||
                    "General consultation"}
                </p>
              </div>
              <div className="hub-list-meta">
                <span>{appointment.type || "doctor"}</span>
                <small>{formatDateTime(appointment.appointmentDate)}</small>
              </div>
            </div>
          ))
        ) : (
          <p className="hub-empty-state">
            No appointments yet. Use the booking page to schedule one.
          </p>
        )}
      </div>
    </section>
  );
}
