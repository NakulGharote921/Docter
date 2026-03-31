import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { ref, get, update, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const snapshot = await get(ref(db, `appointments/${user.uid}`));
          const appts = [];
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              appts.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
          }
          setAppointments(appts);
        } catch (error) {
          console.error("Error fetching appointments: ", error);
        }
      } else {
        setAppointments([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const uId = auth.currentUser.uid;
      await update(ref(db, `appointments/${uId}/${id}`), {
        appointmentDate: editDate.toISOString(),
      });
      setAppointments(appointments.map(a => a.id === id ? { ...a, appointmentDate: editDate.toISOString() } : a));
      setEditId(null);
      toast.success("Appointment successfully rescheduled!");
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const uId = auth.currentUser.uid;
      await remove(ref(db, `appointments/${uId}/${id}`));
      setAppointments(appointments.filter(a => a.id !== id));
      toast.success("Booking cancelled successfully!");
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  if (loading) return <div className="p-5 text-center">Loading appointments...</div>;

  return (
    <div className="container mt-5 mb-5 p-4 rounded shadow bg-white">
      <h3 className="text-center text-primary mb-4">My Appointments</h3>
      {appointments.length === 0 ? (
        <p className="text-center">No appointments found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Doctor</th>
              <th>Speciality</th>
              <th>Fee</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.doctorName}</td>
                <td>{appt.doctorSpeciality}</td>
                <td>{appt.doctorFee}</td>
                <td>
                  {editId === appt.id ? (
                    <DatePicker
                      className="calender"
                      selected={editDate}
                      onChange={(date) => setEditDate(date)}
                      showTimeSelect
                      timeFormat="h:mm aa"
                      timeIntervals={30}
                      dateFormat={"d-MMMM-yyyy h:mm aa"}
                      minDate={new Date()}
                      minTime={new Date()}
                      maxTime={setHours(setMinutes(new Date(), 2), 22)}
                    />
                  ) : (
                    new Date(appt.appointmentDate).toLocaleString()
                  )}
                </td>
                <td><span className={appt.status === "Pending" ? "badge bg-warning text-dark" : "badge bg-success"}>{appt.status}</span></td>
                <td>
                  {editId === appt.id ? (
                    <>
                      <button className="btn btn-sm btn-success me-2" onClick={() => handleUpdate(appt.id)}>Save</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => { setEditId(appt.id); setEditDate(new Date(appt.appointmentDate)); }}>
                        Reschedule
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(appt.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;
