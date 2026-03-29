import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Navbar() {

  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#3b82f6" : "#cbd5e1",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
    transition: "0.2s",
  });

  return (
    <nav
      style={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(12px)",
        background: "rgba(2,6,23,0.8)",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        {/* LOGO */}
        <Link
          to="/dashboard"
          style={{
            fontSize: "22px",
            fontWeight: "700",
            textDecoration: "none",
            background: "linear-gradient(90deg,#3b82f6,#6366f1)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          GyaanSetu
        </Link>

        {/* NAV LINKS */}
        <div
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "center",
          }}
        >

          <Link to="/dashboard" style={linkStyle("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/post-doubt" style={linkStyle("/post-doubt")}>
            Post Doubt
          </Link>

          <Link to="/mentors" style={linkStyle("/mentors")}>
            Mentors
          </Link>

          <Link to="/my-sessions" style={linkStyle("/my-sessions")}>
            Sessions
          </Link>

          <Link to="/mentor-requests" style={linkStyle("/mentor-requests")}>
            Requests
          </Link>

          <Link to="/profile" style={linkStyle("/profile")}>
            Profile
          </Link>

        </div>

        {/* USER */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <UserButton afterSignOutUrl="/" />
        </div>

      </div>
    </nav>
  );
}