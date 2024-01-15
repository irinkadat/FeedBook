import React from "react";
import "../styles/Settings.css";

const Settings = ({ onThemeChange, onLanguageChange }) => {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <label className="settings-label">
        Theme:
        <select
          className="settings-select"
          onChange={(e) => onThemeChange(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label className="settings-label">
        Language:
        <select
          className="settings-select"
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="english">English</option>
          <option value="georgian">Georgian</option>
        </select>
      </label>
    </div>
  );
};

export default Settings;
