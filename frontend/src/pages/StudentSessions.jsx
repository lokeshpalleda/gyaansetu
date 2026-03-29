import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useUser } from "@clerk/clerk-react";

export default function StudentSessions() {

  const { user, isLoaded } = useUser();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {

    if (!isLoaded || !user) return;

    const fetchSessions = async () => {

      try {

        const email = user.primaryEmailAddress?.emailAddress;

        const res = await API.get(`/sessions/student/${email}`);

        setSessions(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    fetchSessions();

  }, [isLoaded, user]);

  return (

    <Layout>

      <div style={{ maxWidth: "800px", margin: "auto" }}>

        <h1 style={{ fontSize: "36px", marginBottom: "30px" }}>
          My Sessions
        </h1>

        {sessions.length === 0 && (
          <p>No sessions yet</p>
        )}

        {sessions.map((session) => (

          <div
            key={session._id}
            style={{
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "14px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
            }}
          >

            <p style={{ marginBottom: "8px" }}>
              👨‍🏫 <b>Mentor:</b> {session.mentorEmail}
            </p>

            <p style={{ marginBottom: "8px" }}>
              📅 <b>Date:</b> {new Date(session.createdAt).toLocaleDateString()}
            </p>

            <p style={{ marginBottom: "8px" }}>
              ⏰ <b>Time:</b> {session.time}
            </p>

            <p style={{ marginBottom: "8px" }}>
              🟢 <b>Status:</b> {session.status}
            </p>

            <p
              style={{
                marginTop: "10px",
                color: "#94a3b8",
                fontSize: "14px"
              }}
            >
              📩 Meeting link has been sent to your email.
            </p>

          </div>

        ))}

      </div>

    </Layout>

  );
}