require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
app.use(cors());

// Gemini Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a supported model name (adjust depending on what works with your key):
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// --------------- SYSTEM INSTRUCTION ----------------
const SYSTEM_INSTRUCTION = `
You are a helpful Health Awareness Assistant.

Response Rules (MANDATORY):
- ALWAYS reply in bullet points only (● style).
- Each bullet should be on a new line.
- Keep messages simple and under 250 words.
- No paragraphs, no numbering, no emojis.

Your Role:
1. Identify symptoms from user input.
2. Suggest a likely minor illness (cold, flu, acidity, dehydration, migraine, sore throat, etc.).
3. Suggest safe OTC medicine (example: Paracetamol for fever).
4. Suggest basic home care tips (rest, fluids, ORS, warm water, etc.).
5. ALWAYS include this exact final bullet:
   ● Consult a doctor for serious or persistent symptoms.

If the user asks for emergency contacts, reply ONLY:
● National Emergency: 112  
● Ambulance: 108  
● Mental Health (Kiran): 1800-599-0019  
● WHO India: +91-11-23061955
`;
// ----------------------------------------------------


app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `${SYSTEM_INSTRUCTION}\n\nUser: ${message}\nBot:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error?.response?.data || error?.message || error
    );

    res.status(500).json({
      reply:
        "Server error: " +
        (error?.response?.data?.error?.message ||
          error?.message ||
          "Unknown error"),
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
