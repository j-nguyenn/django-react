import React, { useState, useEffect } from "react";
import "../styles/Task.css"; // Import CSS for styling (create this file if not exist)
import api from "../api";

const TaskPage = () => {
  // Sample tasks data (replace with your actual data or fetch from API)
  const [tasks, setTasks] = useState([]);

  // State for dialog visibility and form fields
  const [showDialog, setShowDialog] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [selectedTicketmasterProfile, setSelectedTicketmasterProfile] =
    useState("");
  const [selectedPaymentProfile, setSelectedPaymentProfile] = useState("");
  const [mode, setMode] = useState("bypass");
  const [numberOfTasks, setNumberOfTasks] = useState(1);

  // Sample data for ticketmaster and payment profiles (to be fetched from API)
  const [ticketmasterProfiles, setTicketmasterProfiles] = useState([]);
  const [paymentProfiles, setPaymentProfiles] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    api
      .get("/api/tasks/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  };

  useEffect(() => {
    // Simulated fetch from API for ticketmaster profiles
    // Replace with actual fetch call in your application
    const fetchTicketmasterProfiles = async () => {
      api
        .get("/api/profiles/")
        .then((response) => setTicketmasterProfiles(response.data));
    };

    // Simulated fetch from API for payment profiles
    // Replace with actual fetch call in your application
    const fetchPaymentProfiles = async () => {
      api
        .get("/api/payments/")
        .then((response) => setPaymentProfiles(response.data));
    };

    fetchTicketmasterProfiles();
    fetchPaymentProfiles();
  }, []);

  // Function to open the dialog
  const openDialog = () => {
    setShowDialog(true);
  };

  // Function to close the dialog and reset form fields
  const closeDialog = () => {
    setShowDialog(false);
    setBatchName("");
    setSelectedTicketmasterProfile("");
    setSelectedPaymentProfile("");
    setMode("bypass");
    setNumberOfTasks(1);
  };
  // Function to handle form submission (create task)
  const handleCreateTask = () => {
    // Here you would typically send the form data to your backend API to create a new task
    // Replace with your actual API integration
    const newTask = {
      id: tasks.length + 1,
      name: batchName,
      ticketmaster_profile: selectedTicketmasterProfile,
      payment_profile: selectedPaymentProfile,
      mode: mode,
      runtime: 0, // Add logic to calculate or specify runtime
      status: "pending", // Default status
    };

    api
      .post("/api/tasks/", newTask)
      .then(() => {
        setTasks([...tasks, newTask]);
        closeDialog();
      })
      .catch((error) => console.error("Error adding new task:", error));
  };

  return (
    <div className="task-page">
      <div className="task-header">
        <h2>Tasks</h2>
        <div className="task-controls">
          <input
            type="text"
            placeholder="Filter tasks..."
            value={""} // Replace with filter state
            onChange={() => {}} // Replace with filter change handler
          />
          <button onClick={openDialog}>Create Task</button>
        </div>
      </div>
      <div className="task-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticketmaster Profile</th>
              <th>Payment Profile</th>
              <th>Mode</th>
              <th>Runtime</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.ticketmaster_profile}</td>
                <td>{task.payment_profile}</td>
                <td>{task.mode}</td>
                <td>{task.runtime}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog for creating tasks */}
      {showDialog && (
        <div className="task-dialog">
          <h2>Create New Task</h2>
          <label htmlFor="batchName">Batch Name:</label>
          <input
            type="text"
            id="batchName"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
          />
          <label htmlFor="ticketmasterProfile">Ticketmaster Profile:</label>
          <select
            id="ticketmasterProfile"
            value={selectedTicketmasterProfile}
            onChange={(e) => setSelectedTicketmasterProfile(e.target.value)}
          >
            <option value="">Select Ticketmaster Profile</option>
            {ticketmasterProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
          <label htmlFor="paymentProfile">Payment Profile:</label>
          <select
            id="paymentProfile"
            value={selectedPaymentProfile}
            onChange={(e) => setSelectedPaymentProfile(e.target.value)}
          >
            <option value="">Select Payment Profile</option>
            {paymentProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
          <label htmlFor="mode">Mode:</label>
          <select
            id="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="bypass">Bypass</option>
            <option value="atc">ATC</option>
            <option value="checkout">Checkout</option>
          </select>
          <label htmlFor="numberOfTasks">Number of Tasks:</label>
          <input
            type="number"
            id="numberOfTasks"
            value={numberOfTasks}
            onChange={(e) => setNumberOfTasks(parseInt(e.target.value))}
          />
          <div className="dialog-buttons">
            <button onClick={handleCreateTask}>Create Task</button>
            <button onClick={closeDialog}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
