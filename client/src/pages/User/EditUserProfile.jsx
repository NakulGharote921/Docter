import React, { useState, useEffect } from "react";
import "./User.css";
import { auth, db } from "../../firebase";
import { ref, update } from "firebase/database";
import toast from "react-hot-toast";

const EditUserProfile = ({ isOpen, onClose, currentProfile }) => {
  const [name, setName] = useState(currentProfile?.name || "");
  const [gender, setGender] = useState(currentProfile?.gender || "male");
  const [dob, setDob] = useState(currentProfile?.dob || "");
  const [phone, setPhone] = useState(currentProfile?.phone || "");
  const [address, setAddress] = useState(currentProfile?.address || "");
  const [pic, setPic] = useState(currentProfile?.pic || "");

  useEffect(() => {
    if (currentProfile) {
      setName(currentProfile.name || "");
      setGender(currentProfile.gender || "male");
      setDob(currentProfile.dob || "");
      setPhone(currentProfile.phone || "");
      setAddress(currentProfile.address || "");
      setPic(currentProfile.pic || "");
    }
  }, [currentProfile]);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return toast.error("Not logged in");

      const updates = {
        name,
        gender,
        dob,
        phone,
        address,
        pic,
      };

      await update(ref(db, `users/${user.uid}`), updates);
      toast.success("Profile saved safely");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save profile");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="editModal modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Your Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <div className="mod-details d-flex flex-column gap-3">
                <div className="d-flex justify-content-center">
                  <img
                    src={
                      pic ||
                      currentProfile?.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="userPic"
                    height={80}
                    width={80}
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Profile image URL"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="d-flex flex-row gap-2">
                  <select
                    className="form-select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
