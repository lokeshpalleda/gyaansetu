import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Layout({ children }) {

  const item = {
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "10px",
    color: "#cbd5f5",
    textDecoration: "none",
    display: "block",
    transition: "0.2s"
  };

  return (

    <div style={{
      display: "flex",
      height: "100vh",
      background: "#020617",
      color: "white"
    }}>

      {/* SIDEBAR */}

      <div style={{
        width: "230px",
        padding: "25px",
        borderRight: "1px solid #1e293b",
        background: "#020617"
      }}>

        <h2 style={{
          marginBottom: "30px",
          color: "#60a5fa"
        }}>
          GyaanSetu
        </h2>

        <Link to="/dashboard" style={item}>🏠 Dashboard</Link>

        <Link to="/post-doubt" style={item}>❓ Doubts</Link>

        <Link to="/mentors" style={item}>👨‍🏫 Mentors</Link>

        <Link to="/my-sessions" style={item}>📅 Sessions</Link>

        <Link to="/mentor-requests" style={item}>📨 Requests</Link>

        {/* ✅ NEW PROFILE LINK */}
        <Link to="/profile" style={item}>👤 Profile</Link>

      </div>

      {/* MAIN AREA */}

      <div style={{ flex: 1, padding: "35px" }}>

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px"
        }}>
          <UserButton afterSignOutUrl="/" />
        </div>

        {children}

      </div>

    </div>
  );
}