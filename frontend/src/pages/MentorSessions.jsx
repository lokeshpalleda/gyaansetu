import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function MentorSessions() {

  const { user, isLoaded } = useUser();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {

    if (!isLoaded || !user) return;

    fetchSessions();

  }, [isLoaded, user]);

  const fetchSessions = async () => {

    try {

      const email = user.primaryEmailAddress?.emailAddress;

      const res = await API.get(`/sessions/mentor/${email}`);

      setSessions(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  const completeSession = async (id) => {

    try {

      await API.patch(`/sessions/complete/${id}`);

      toast.success("Session marked completed");

      fetchSessions();

    } catch (err) {

      console.error(err);
      toast.error("Error completing session");

    }

  };

  return (

    <Layout>

      <h1 style={{fontSize:"34px",marginBottom:"30px"}}>
        Mentor Sessions
      </h1>

      {sessions.length === 0 && (
        <p>No sessions yet</p>
      )}

      {sessions.map((session)=>(
        <div
          key={session._id}
          style={{
            background:"#020617",
            border:"1px solid #1e293b",
            borderRadius:"12px",
            padding:"20px",
            marginBottom:"20px"
          }}
        >

          <p><b>Student:</b> {session.studentEmail}</p>
          <p><b>Time:</b> {session.time}</p>
          <p><b>Status:</b> {session.status}</p>

          {session.status === "active" && (

            <button
              onClick={()=>completeSession(session._id)}
              style={{
                marginTop:"10px",
                background:"#22c55e",
                border:"none",
                padding:"10px 15px",
                borderRadius:"6px",
                color:"white",
                cursor:"pointer"
              }}
            >
              Mark Completed
            </button>

          )}

        </div>
      ))}

    </Layout>

  );

}