import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookingModal({ selection, onClose, onConfirm }) {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!selection) {
      setAppointmentDate("");
    }
  }, [selection]);

  if (!selection) {
    return null;
  }

  const { provider, type } = selection;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!appointmentDate) {
      toast.error("Choose an appointment date and time");
      return;
    }

    try {
      setIsSaving(true);
      await onConfirm(provider, type, appointmentDate);
      onClose();
    } catch (error) {
      toast.error(error.message || "Unable to book appointment");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="booking-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="hub-card-header">
          <h3>Book {type}</h3>
          <button type="button" className="ghost-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <p className="booking-provider-name">{provider.name}</p>
        <p className="booking-provider-meta">
          {provider.specialty} • Rs. {provider.fee}
        </p>

        <form className="hub-form" onSubmit={handleSubmit}>
          <label className="hub-field">
            <span>Select slot</span>
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(event) => setAppointmentDate(event.target.value)}
            />
          </label>

          <button type="submit" disabled={isSaving}>
            {isSaving ? "Booking..." : "Confirm booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
