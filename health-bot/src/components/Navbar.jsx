import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav style={navStyle}>
      
      {/* Brand + Bot Icon Animated */}
      <div style={logoContainer}>
        <span style={botIcon}>🩺</span>
        <span style={logoText}>HealthBot</span>
      </div>

      <div style={linkGroupStyle}>
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/about" className="nav-item">About</NavLink>
        <NavLink to="/medicine" className="nav-item">Medicine</NavLink>
        <NavLink to="/conditions" className="nav-item">Conditions</NavLink>
        <NavLink to="/contact" className="nav-item">Contact</NavLink>
      </div>

      {/* Right Section - Mic + Dark Mode */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {/* Voice Icon Placeholder */}
        <button className="icon-btn" title="Voice Input Coming Soon 🎤">
          🎤
        </button>

        {/* Dark Mode Toggle */}
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}



// -------- Styles --------

const navStyle = {
  background: "#374758ff",
  padding: "15px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  borderRadius: "8px",
  marginBottom: "20px",
  position: "sticky",
  top: 0,
  zIndex: 10
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const botIcon = {
  fontSize: "24px",
  animation: "pulse 1.5s infinite"
};

const logoText = {
  fontSize: "20px",
  fontWeight: "bold"
};

const linkGroupStyle = {
  display: "flex",
  gap: "18px"
};
