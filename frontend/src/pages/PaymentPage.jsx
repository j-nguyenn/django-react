import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Payments.css"; // Import the CSS for styling

function Payments() {
  const [payments, setPayments] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newPayment, setNewPayment] = useState({
    name: "",
    card_holder_name: "",
    card_number: "",
    expire: "",
    cvv: "",
  });

  useEffect(() => {
    // Fetch profiles when component mounts
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    api
      .get("/api/payments/") // Adjust the URL as per your Django backend setup
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  };

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => {
    setShowDialog(false);
    setNewPayment({
      name: "",
      card_holder_name: "",
      card_number: "",
      expire: "",
      cvv: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const saveProfile = () => {
    api
      .post("/api/payments/", newPayment) // Adjust the URL as per your Django backend setup
      .then((response) => {
        console.log("Profile created successfully:", response.data);
        fetchProfiles(); // Refresh profiles list
        closeDialog();
      })
      .catch((error) => {
        console.error("Error creating profile:", error);
      });
  };

  return (
    <div className="payments-container">
      <h2>Payment profiles</h2>
      <div className="payments-grid">
        {payments.map((profile, index) => (
          <div key={index} className="profile-card">
            <h3>{profile.name}</h3>
            <p>Name: {profile.card_holder_name}</p>
          </div>
        ))}
        <div className="profile-card add-profile" onClick={openDialog}>
          <h3>+</h3>
        </div>
      </div>
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Add New Payment</h2>
            <input
              type="text"
              name="name"
              placeholder="Profile Name"
              value={newPayment.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="card_holder_name"
              placeholder="Card Holder Name"
              value={newPayment.card_holder_name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="card_number"
              placeholder="Card Number"
              value={newPayment.card_number}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="expire"
              placeholder="Expire"
              value={newPayment.expire}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cvv"
              placeholder="Cvv"
              value={newPayment.cvv}
              onChange={handleInputChange}
            />

            <div className="dialog-buttons">
              <button onClick={saveProfile}>Save</button>
              <button onClick={closeDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
