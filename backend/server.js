require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const doubtRoutes = require("./routes/doubtRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const matchRoutes = require("./routes/matchRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const mentorRoutes = require("./routes/mentorRoutes");

const app = express();

/* ✅ FIX CORS HERE */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gyaansetu-frontend.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

/* connect database */
connectDB();

/* routes */
app.use("/api", doubtRoutes);
app.use("/api", proposalRoutes);
app.use("/api", matchRoutes);
app.use("/api", sessionRoutes);
app.use("/api", mentorRoutes);

app.get("/", (req, res) => {
  res.send("GyaanSetu backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
