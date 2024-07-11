import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import "../styles/Home.css"; // Import the new CSS file
import TaskPage from "./TaskPage";
import Profiles from "./ProfilePage";
import Payments from "./PaymentPage";
import Proxies from "./ProxiesPage";
import Settings from "./Settings";

function Home() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [activeTab, setActiveTab] = useState("Dashboard"); // Initialize state for active tab

  useEffect(() => {
    // When the component mounts or the location changes, update active tab based on hash
    const hash = location.hash.slice(1); // Get the hash part of the URL and remove the leading '#'
    if (hash) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard.</p>
          </div>
        );
      case "Tasks":
        return (
          <TaskPage />
        );
      case "Profiles":
        return (
          <Profiles />
        );
      case "Payment":
        return (
          <Payments />
        );
      case "Proxies":
        return (
          <Proxies />
        );
      case "Settings":
        return (
          <Settings />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <a
          href="#Dashboard"
          className={activeTab === "Dashboard" ? "activeTab" : ""}
          onClick={() => setActiveTab("Dashboard")}
        >
          Dashboard
        </a>
        <a
          href="#Tasks"
          className={activeTab === "Tasks" ? "activeTab" : ""}
          onClick={() => setActiveTab("Tasks")}
        >
          Tasks
        </a>
        <a
          href="#Profiles"
          className={activeTab === "Profiles" ? "activeTab" : ""}
          onClick={() => setActiveTab("Profiles")}
        >
          Ticketmaster profiles
        </a>
        <a
          href="#Payment"
          className={activeTab === "Payment" ? "activeTab" : ""}
          onClick={() => setActiveTab("Payment")}
        >
          Payment profiles
        </a>
        <a
          href="#Proxies"
          className={activeTab === "Proxies" ? "activeTab" : ""}
          onClick={() => setActiveTab("Proxies")}
        >
          Proxies
        </a>
        <a
          href="#Settings"
          className={activeTab === "Settings" ? "activeTab" : ""}
          onClick={() => setActiveTab("Settings")}
        >
          Settings
        </a>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default Home;
