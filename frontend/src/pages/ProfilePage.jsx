import React, { useState, useEffect } from "react";
import "../styles/Profiles.css"; // Import the CSS for styling
import api from "../api";

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: "",
    email: "",
    password: "",
    special_code: "",
    number_of_tickets: "",
    priority: "",
  });

  useEffect(() => {
    // Fetch profiles when component mounts
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    api
      .get("/api/profiles/") // Adjust the URL as per your Django backend setup
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  };

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => {
    setShowDialog(false);
    setNewProfile({
      name: "",
      email: "",
      password: "",
      special_code: "",
      number_of_tickets: "",
      priority: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };


   const saveProfile = () => {
     api
       .post("/api/profiles/", {...newProfile, priority: parseInt(newProfile.priority), number_of_tickets: parseInt(newProfile.number_of_tickets)}) // Adjust the URL as per your Django backend setup
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
    <div className="profiles-container">
      <h2> Ticketmaster profiles</h2>
      <div className="profiles-grid">
        {profiles.map((profile, index) => (
          <div key={index} className="profile-card">
            <h3>{profile.name}</h3>
            <p>Email: {profile.email}</p>
            <p>Special Code: {profile.special_code}</p>
            <p>Number of Tickets: {profile.number_of_tickets}</p>
            <p>Priority: {profile.priority}</p>
          </div>
        ))}
        <div className="profile-card add-profile" onClick={openDialog}>
          <h3>+</h3>
        </div>
      </div>
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h2>Add New Profile</h2>
            <input
              type="text"
              name="name"
              placeholder="Profile Name"
              value={newProfile.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newProfile.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newProfile.password}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="special_code"
              placeholder="Special Code"
              value={newProfile.special_code}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="number_of_tickets"
              placeholder="Number of Tickets"
              value={newProfile.number_of_tickets}
              onChange={handleInputChange}
            />
            <input
              type="priority"
              name="priority"
              placeholder="Section priority"
              value={newProfile.priority}
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

export default Profiles;
