import React, { useState, useEffect } from "react";
import "../styles/Settings.css"; // Import CSS for styling

const Settings = () => {
  // Initialize state with default values or fetch from localStorage
  const initialSettings = {
    generateLink: localStorage.getItem("generateLink") === "true",
    linkToQueue: localStorage.getItem("linkToQueue") || "",
    maxTimeout: parseInt(localStorage.getItem("maxTimeout")) || 0,
    tgBotApiToken: localStorage.getItem("tgBotApiToken") || "",
    tgChannelIds: localStorage.getItem("tgChannelIds") || "",
  };

  const [settings, setSettings] = useState(initialSettings);

  // Effect to update localStorage when settings change
  useEffect(() => {
    localStorage.setItem("generateLink", settings.generateLink);
    localStorage.setItem("linkToQueue", settings.linkToQueue);
    localStorage.setItem("maxTimeout", settings.maxTimeout);
    localStorage.setItem("tgBotApiToken", settings.tgBotApiToken);
    localStorage.setItem("tgChannelIds", settings.tgChannelIds);
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setSettings({ ...settings, [name]: newValue });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Generate Link:
          <input
            type="checkbox"
            name="generateLink"
            checked={settings.generateLink}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Link to Queue:
          <input
            type="text"
            name="linkToQueue"
            value={settings.linkToQueue}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Max Timeout:
          <input
            type="number"
            name="maxTimeout"
            value={settings.maxTimeout}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Telegram Bot API Token:
          <input
            type="text"
            name="tgBotApiToken"
            value={settings.tgBotApiToken}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Telegram Channel IDs (newline separated):
          <textarea
            name="tgChannelIds"
            value={settings.tgChannelIds}
            onChange={handleInputChange}
            rows="4"
          />
        </label>
        <br />
        <button onClick={() => alert("Settings saved locally!")}>
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
