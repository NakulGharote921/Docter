import { useState } from "react";
import toast from "react-hot-toast";
import BookingModal from "../../components/appointments/BookingModal";
import DoctorList from "../../components/appointments/DoctorList";
import TrainerList from "../../components/appointments/TrainerList";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../hooks/useAuth";
import { doctors, trainers } from "../../services/healthHubData";
import { createWellnessAppointment } from "../../services/healthHubService";

export default function Appointments() {
  const { user } = useAuth();
  const [selection, setSelection] = useState(null);

  const handleConfirm = async (provider, type, appointmentDate) => {
    await createWellnessAppointment(user, provider, type, appointmentDate);
    toast.success(`${type} appointment booked successfully`);
  };

  return (
    <div className="hub-page">
      <SectionHeader
        eyebrow="Scheduling"
        title="Book doctors and trainers"
        description="Use the shared appointment flow to schedule medical consults or wellness coaching."
      />

      <div className="hub-page-stack">
        <section>
          <div className="hub-subheading">
            <h3>Doctors</h3>
            <p>Specialists available for online scheduling.</p>
          </div>
          <DoctorList
            doctors={doctors}
            onBook={(provider, type) => setSelection({ provider, type })}
          />
        </section>

        <section>
          <div className="hub-subheading">
            <h3>Trainers</h3>
            <p>Pair fitness sessions with your broader care plan.</p>
          </div>
          <TrainerList
            trainers={trainers}
            onBook={(provider, type) => setSelection({ provider, type })}
          />
        </section>
      </div>

      <BookingModal
        selection={selection}
        onClose={() => setSelection(null)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
