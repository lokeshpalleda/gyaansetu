import { useNavigate } from "react-router-dom";
import mentorImage from "../assets/mentor.png";

export default function Landing() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          fontSize: "60px",
          fontWeight: "700",
          marginBottom: "10px",
          background: "linear-gradient(90deg,#38bdf8,#6366f1)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
      >
        GyaanSetu
      </h1>

      <p
        style={{
          maxWidth: "650px",
          color: "#cbd5f5",
          marginBottom: "30px",
          fontSize: "18px"
        }}
      >
        Connect with skilled mentors to solve your doubts instantly.
        Ask questions, share knowledge, and grow together.
      </p>

      {/* BUTTON */}

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "14px 30px",
          fontSize: "16px",
          border: "none",
          borderRadius: "10px",
          background: "linear-gradient(90deg,#2563eb,#4f46e5)",
          color: "white",
          cursor: "pointer",
          marginBottom: "40px"
        }}
      >
        Get Started
      </button>

      {/* IMAGE */}

      <img
        src={mentorImage}
        alt="Mentorship"
        style={{
          width: "420px",
          marginBottom: "40px",
          borderRadius: "12px"
        }}
      />

      {/* FEATURES */}

      <div
        style={{
          display: "flex",
          gap: "50px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >

        <div>
          <h3>❓ Post Doubts</h3>
          <p style={{ color: "#94a3b8" }}>
            Ask questions and get expert help.
          </p>
        </div>

        <div>
          <h3>🧠 Skill Matching</h3>
          <p style={{ color: "#94a3b8" }}>
            Find mentors based on skills.
          </p>
        </div>

        <div>
          <h3>🤝 Mentorship</h3>
          <p style={{ color: "#94a3b8" }}>
            Learn directly from experienced peers.
          </p>
        </div>

      </div>

    </div>

  );
}