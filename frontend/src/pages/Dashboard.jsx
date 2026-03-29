import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import API from "../services/api";

export default function Dashboard() {

  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const [mentors, setMentors] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    completedSessions: 0,
    pendingRequests: 0
  });

  const [sessions, setSessions] = useState([]);

  /* ===============================
     CHECK PROFILE
  =============================== */

  useEffect(() => {

    if (!isLoaded || !user) return;

    const checkProfile = async () => {

      try {

        const email = user.primaryEmailAddress.emailAddress;

        const res = await API.get(`/mentor/${email}`);

        if (!res.data) {
          navigate("/complete-profile");
        }

      } catch (error) {

        navigate("/complete-profile");

      }

    };

    checkProfile();

  }, [isLoaded, user, navigate]);

  /* ===============================
     FETCH MENTORS
  =============================== */

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {

    try {

      const res = await API.get("/mentors");

      setMentors(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  /* ===============================
     FETCH DASHBOARD STATS
  =============================== */

  useEffect(() => {

    if (!isLoaded || !user) return;

    fetchStats();

  }, [isLoaded, user]);

  const fetchStats = async () => {

    try {

      const email = user.primaryEmailAddress.emailAddress;

      const sessionRes = await API.get(`/sessions/student/${email}`);

      const sessionsData = sessionRes.data;

      setSessions(sessionsData);

      const completed = sessionsData.filter(
        (s) => s.status === "completed"
      ).length;

      setStats({
        totalSessions: sessionsData.length,
        completedSessions: completed,
        pendingRequests: sessionsData.length - completed
      });

    } catch (error) {

      console.error(error);

    }

  };

  const cardStyle = {
    background: "linear-gradient(145deg,#0f172a,#020617)",
    border: "1px solid #1e293b",
    borderRadius: "18px",
    padding: "35px",
    width: "260px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    cursor: "pointer"
  };

  const panelStyle = {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
  };

  const buttonStyle = {
    background: "linear-gradient(90deg,#2563eb,#4f46e5)",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    color: "white",
    marginTop: "12px",
    cursor: "pointer"
  };

  return (

    <Layout>

      <h1 style={{fontSize:"36px",marginBottom:"35px"}}>
        Dashboard
      </h1>

      {/* ===============================
         STATS CARDS
      =============================== */}

      <div style={{
        display:"flex",
        gap:"30px",
        marginBottom:"40px",
        justifyContent:"center",
        flexWrap:"wrap"
      }}>

        <div style={cardStyle}>
          <h3>Total Sessions</h3>
          <h1>{stats.totalSessions}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Completed Sessions</h3>
          <h1>{stats.completedSessions}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Pending Sessions</h3>
          <h1>{stats.pendingRequests}</h1>
        </div>

      </div>

      {/* ===============================
         ACTION CARDS
      =============================== */}

      <div style={{
        display:"flex",
        gap:"30px",
        marginBottom:"40px",
        justifyContent:"center",
        flexWrap:"wrap"
      }}>

        <div
          style={cardStyle}
          onClick={()=>navigate("/post-doubt")}
        >

          <h3 style={{fontSize:"22px",marginBottom:"8px"}}>
            Post Doubt
          </h3>

          <p style={{color:"#94a3b8"}}>
            Ask your question
          </p>

          <button style={buttonStyle}>
            Post a Doubt
          </button>

        </div>

        <div
          style={cardStyle}
          onClick={()=>navigate("/mentors")}
        >

          <h3 style={{fontSize:"22px",marginBottom:"8px"}}>
            Find Mentors
          </h3>

          <p style={{color:"#94a3b8"}}>
            Connect with experts
          </p>

          <button style={buttonStyle}>
            Browse Mentors
          </button>

        </div>

        <div
          style={cardStyle}
          onClick={()=>navigate("/my-sessions")}
        >

          <h3 style={{fontSize:"22px",marginBottom:"8px"}}>
            Sessions
          </h3>

          <p style={{color:"#94a3b8"}}>
            View your scheduled sessions
          </p>

          <button style={buttonStyle}>
            View Sessions
          </button>

        </div>

      </div>

      {/* ===============================
         MAIN GRID
      =============================== */}

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:"30px"
        }}
      >

        {/* FIND MENTORS */}

        <div style={panelStyle}>

          <h2 style={{marginBottom:"20px"}}>
            Find Mentors
          </h2>

          {mentors.length === 0 && (
            <p style={{color:"#94a3b8"}}>No mentors available</p>
          )}

          {mentors.slice(0,3).map((mentor)=>(
            <div
              key={mentor._id}
              style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"15px",
                alignItems:"center"
              }}
            >

              <span>
                {mentor.name} - {mentor.skills.join(", ")}
              </span>

              <button style={buttonStyle}>
                Request Help
              </button>

            </div>
          ))}

          <button
            onClick={()=>navigate("/mentors")}
            style={{
              marginTop:"10px",
              background:"transparent",
              border:"1px solid #3b82f6",
              padding:"8px 14px",
              borderRadius:"8px",
              color:"#3b82f6",
              cursor:"pointer"
            }}
          >
            View All Mentors
          </button>

        </div>

        {/* UPCOMING SESSIONS */}

        <div style={panelStyle}>

          <h2 style={{marginBottom:"20px"}}>
            Upcoming Sessions
          </h2>

          {sessions.length === 0 && (
            <p style={{color:"#94a3b8"}}>No sessions scheduled</p>
          )}

          {sessions.slice(0,3).map((session)=>(
            <div
              key={session._id}
              style={{
                marginBottom:"15px",
                padding:"12px",
                background:"#0f172a",
                borderRadius:"8px",
                border:"1px solid #1e293b"
              }}
            >

              <p>
                <b>Time:</b> {session.time}
              </p>

              <p style={{fontSize:"13px",color:"#94a3b8"}}>
                Meeting link has been sent to your email
              </p>

            </div>
          ))}

        </div>

      </div>

    </Layout>

  );

}