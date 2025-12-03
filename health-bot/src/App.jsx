

import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import './App.css'; 

function ChatBotPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am your AI Health Assistant. Tell me your symptoms or ask for helpline numbers.", sender: "bot" }
  ]);

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // const res = await axios.post('http://localhost:5000/api/chat', { message: input });
      const res = await axios.post('https://health-chatbot-oadv.onrender.com/api/chat', { message: input });

      setMessages([...newMessages, { text: res.data.reply, sender: "bot" }]);
    } catch {
      setMessages([...newMessages, { text: "⚠️ Error connecting to AI.", sender: "bot" }]);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>💬 Chat with AI</h2>
      
       <div style={{
        
        width:"600px",
          height: '600px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9'
        }}> 
        {/* CHAT WINDOW */}
<div className="card" style={{ height: "430px", overflowY: "auto" }}>
  {messages.map((msg, index) => (
    <div key={index} className={msg.sender === "user" ? "user" : "bot"}>
      {msg.text}
    </div>
  ))}

  {loading && <div className="bot">Typing...</div>}
</div>

{/* QUICK HEALTH SUGGESTIONS */}
<div style={{ marginTop: "12px" }}>
  {["Fever", "Headache", "Cold", "Acidity", "Anxiety"].map((item, index) => (
    <span
      key={index}
      className="chip"
      onClick={() => {
        setInput(item);
      }}
    >
      {item}
    </span>
  ))}
</div>

        {messages.map((msg, index) => (
          <div key={index} style={{
            textAlign: msg.sender === "user" ? "right" : "left",
            margin: "10px 0"
          }}>
            <div style={{
              display: 'inline-block',
              padding: '10px 15px',
              borderRadius: '15px',
              background: msg.sender === "user" ? "#007bff" : "#fff",
              color: msg.sender === "user" ? "#f3eeeeff" : "#333",
              whiteSpace: "pre-wrap"
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <p><i>Typing...</i></p>}
      </div>

      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your symptoms..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={{
          marginLeft: '10px',
          padding: '10px 20px',
          background: '#28a745',
          color: 'white',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer'
        }}>Send</button>
      </div>
    </div>
  );
}
// ---------- PAGE STYLE (must be at top before components use it) ----------
const pageStyle = {
  maxWidth: "700px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  lineHeight: "1.7",
  color:"black"
};
const pageStylee = {
  maxWidth: "700px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  color:"black",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  lineHeight: "1.7"
};

const sectionTitle = {
  marginTop: "18px",
  marginBottom: "8px",
  color: "#2c3e50"
};

const listStyle = {
  marginLeft: "20px",
  marginBottom: "10px"
};


const pageStyles = {
  maxWidth: "700px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  color:"black",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  lineHeight: "1.7"
};

const sectionTitles = {
  marginTop: "18px",
  marginBottom: "8px",
  color: "#2c3e50"
};

const listStyles = {
  marginLeft: "20px",
  marginBottom: "10px"
};







const pageStyless = {
  maxWidth: "700px",
  margin: "20px auto",
  padding: "20px",
  background: "#fff",
  color:"black",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  lineHeight: "1.7"
};

const sectionTitless = {
  marginTop: "18px",
  marginBottom: "8px",
  color: "#2c3e50"
};

const listStyless = {
  marginLeft: "20px",
  marginBottom: "10px"
};


// ----------- Pages -------------------

const About = () => (
  <div style={pageStyle}>
    <h2>ℹ️ About HealthBot</h2>
    <p>
      HealthBot is an AI-based assistant designed to help users get basic health guidance.
      It provides symptom-based suggestions, common health conditions, and safe over-the-counter medication ideas.
      This tool is NOT a replacement for a doctor, but a quick reference for primary health understanding.
    </p>
    <ul>
      <li>✔ AI-powered responses</li>
      <li>✔ Helps identify minor health issues</li>
      <li>✔ Offers OTC medication suggestions</li>
      <li>✔ Suggests emergency helpline numbers</li>
    </ul>
    <p style={{ fontWeight: "bold", color: "red" }}>
      ⚠ Always consult a certified doctor for serious medical conditions.
    </p>
  </div>
);

const Medicine = () => (
  <div style={pageStylee}>
    <h2>💊 Common Over-The-Counter Medicines</h2>
    <p style={{ marginBottom: "15px" }}>
      These medicines are commonly used for minor health issues. Dosage varies by age and condition — always read labels and consult a doctor if unsure.
    </p>

    {/* FEVER & PAIN RELIEF */}
    <h3 style={sectionTitle}>🔥 Fever & Pain Relief</h3>
    <ul style={listStyle}>
      <li>Paracetamol</li>
      <li>Ibuprofen</li>
      <li>Aspirin (Adults only)</li>
      <li>Dolo 650</li>
    </ul>

    {/* COLD, COUGH & ALLERGY */}
    <h3 style={sectionTitle}>🤧 Cold, Cough & Allergy</h3>
    <ul style={listStyle}>
      <li>Cetirizine</li>
      <li>Loratadine</li>
      <li>Benadryl Syrup</li>
      <li>Vicks Vaporub</li>
      <li>Montelukast + Levocetirizine (mild allergy relief)</li>
    </ul>

    {/* STOMACH & DIGESTION */}
    <h3 style={sectionTitle}>🍽 Stomach & Digestion</h3>
    <ul style={listStyle}>
      <li>ORS Solution (Electral)</li>
      <li>Eno / Gelusil / Digene</li>
      <li>Loperamide (for loose motion)</li>
      <li>Domperidone (for nausea)</li>
      <li>Isabgul/Psyllium Husk (for constipation)</li>
    </ul>

    {/* SKIN CARE & FIRST AID */}
    <h3 style={sectionTitle}>🩹 Skin & First Aid</h3>
    <ul style={listStyle}>
      <li>Dettol / Savlon</li>
      <li>Betadine Ointment</li>
      <li>Burnol</li>
      <li>Antibiotic Ointment (Neosporin/Fusidic acid)</li>
      <li>Calamine Lotion (for itching/rash)</li>
    </ul>

    {/* SUPPLEMENTS */}
    <h3 style={sectionTitle}>💪 Supplements</h3>
    <ul style={listStyle}>
      <li>Vitamin C</li>
      <li>Multivitamin (general)</li>
      <li>Vitamin D3 Drops/Tablets</li>
      <li>Iron + Folic Acid Tablets</li>
      <li>ORS Sachets (for dehydration)</li>
    </ul>

    <p style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}>
      ⚠ Note: Some medicines may have side effects or may not suit children, pregnant women, or people with medical conditions. Always consult a doctor if symptoms persist.
    </p>
  </div>
);

const Conditions = () => (
  <div style={pageStyles}>
    <h2>🦠 Common Health Conditions</h2>
    <p style={{ marginBottom: "15px" }}>
      These are frequently seen minor health conditions. This list is for awareness only and does not replace professional diagnosis.
    </p>

    {/* Fever & Infections */}
    <h3 style={sectionTitles}>🔥 Fever & Infections</h3>
    <ul style={listStyles}>
      <li>Common Cold</li>
      <li>Flu (Influenza)</li>
      <li>Viral Fever</li>
      <li>Tonsillitis</li>
      <li>Sinus Infection</li>
    </ul>

    {/* Digestive Conditions */}
    <h3 style={sectionTitles}>🍽 Digestive & Stomach Issues</h3>
    <ul style={listStyles}>
      <li>Acidity (Heartburn)</li>
      <li>Gas / Bloating</li>
      <li>Constipation</li>
      <li>Diarrhea (Loose Motion)</li>
      <li>Dehydration</li>
    </ul>

    {/* Pain & Neurology */}
    <h3 style={sectionTitles}>🤕 Pain & Neurological</h3>
    <ul style={listStyles}>
      <li>General Headache</li>
      <li>Migraine</li>
      <li>Muscle Pain</li>
      <li>Joint Pain</li>
      <li>Back Pain</li>
    </ul>

    {/* Skin & Allergy */}
    <h3 style={sectionTitles}>🩹 Skin & Allergies</h3>
    <ul style={listStyles}>
      <li>Skin Rash</li>
      <li>Seasonal Allergy</li>
      <li>Sunburn</li>
      <li>Minor Burns</li>
      <li>Dandruff</li>
    </ul>

    {/* General & Lifestyle */}
    <h3 style={sectionTitles}>💤 Lifestyle & General Health</h3>
    <ul style={listStyles}>
      <li>Stress</li>
      <li>Anxiety</li>
      <li>Fatigue / Weakness</li>
      <li>Vitamin Deficiency</li>
      <li>Insomnia (Difficulty Sleeping)</li>
    </ul>

    <p style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}>
      ⚠ If symptoms persist longer than 48–72 hours, consult a certified doctor.
    </p>
  </div>
);

const Contact = () => (
  <div style={pageStyless}>
    <h2>📞 Emergency & Support Contacts</h2>
    <p style={{ marginBottom: "15px" }}>
      Use the following verified emergency and healthcare support numbers in case of medical need.  
      These resources are recommended for public health assistance and urgent care.
    </p>

    {/* Emergency Services */}
    <h3 style={sectionTitless}>🚨 Emergency Helpline Numbers</h3>
    <ul style={listStyless}>
      <li><strong>National Emergency Number:</strong> 112</li>
      <li><strong>Ambulance:</strong> 108</li>
      <li><strong>Fire Department:</strong> 101</li>
      <li><strong>Police:</strong> 100</li>
    </ul>

    {/* Mental Health */}
    <h3 style={sectionTitless}>🧠 Mental Health Support</h3>
    <ul style={listStyless}>
      <li><strong>Kiran Mental Health Helpline:</strong> 1800-599-0019</li>
      <li><strong>Suicide Prevention (AASRA):</strong> +91-982099980</li>
    </ul>

    {/* WHO & Health Authority */}
    <h3 style={sectionTitless}>🌍 WHO & Medical Support</h3>
    <ul style={listStyless}>
      <li><strong>WHO India:</strong> +91-11-23061955</li>
      <li><strong>Ministry of Health (MoHFW):</strong> 1075</li>
      <li><strong>COVID Helpline:</strong> 011-23978046</li>
    </ul>

    {/* App Support */}
    <h3 style={sectionTitless}>📩 App Support</h3>
    <ul style={listStyless}>
      <li><strong>Email:</strong> support@healthbot.ai</li>
      <li><strong>Feedback:</strong> feedback@healthbot.ai</li>
    </ul>

    <p style={{ color: "red", fontWeight: "bold", marginTop: "20px" }}>
      ⚠ These numbers are for emergency or official assistance only. Use responsibly.
    </p>
  </div>
);


export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<ChatBotPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
