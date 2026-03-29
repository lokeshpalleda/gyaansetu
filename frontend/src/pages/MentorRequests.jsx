import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MentorRequests() {

  const { user, isLoaded } = useUser();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchRequests();
  }, [isLoaded, user]);

  const fetchRequests = async () => {
    try {

      const email = user.primaryEmailAddress.emailAddress;

      const res = await API.get(`/mentor-proposals/${email}`);

      setRequests(res.data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load mentor requests");

    }
  };

  const acceptProposal = async (req) => {

    try {

      await API.get(`/proposal/accept/${req._id}`);

      toast.success("Proposal accepted");

      /* REDIRECT TO TIME SELECTION PAGE */
      navigate(`/accept/${req._id}`, {
        state: {
          proposalId: req._id,
          requesterEmail: req.requesterEmail,
          mentorEmail: req.mentorEmail
        }
      });

    } catch (err) {

      console.error(err);
      toast.error("Failed to accept proposal");

    }

  };

  const rejectProposal = async (id) => {

    try {

      await API.get(`/proposal/reject/${id}`);

      toast.success("Proposal rejected");

      fetchRequests();

    } catch (err) {

      console.error(err);
      toast.error("Failed to reject proposal");

    }

  };

  const getStatusColor = (status) => {

    if (status === "pending") return "#facc15";
    if (status === "accepted") return "#22c55e";
    if (status === "rejected") return "#ef4444";
    if (status === "expired") return "#94a3b8";

    return "#94a3b8";

  };

  return (

    <Layout>

      <h1
        style={{
          fontSize: "34px",
          marginBottom: "30px"
        }}
      >
        Mentor Requests
      </h1>

      {requests.length === 0 && (
        <p>No mentor requests</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "22px"
        }}
      >

        {requests.map((req) => (

          <div
            key={req._id}
            style={{
              background: "#020617",
              border: "1px solid #1e293b",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 15px 30px rgba(0,0,0,0.5)",
              transition: "0.2s"
            }}
          >

            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "18px" }}>👤</span>{" "}
              <b>{req.requesterEmail}</b>
            </div>

            <div
              style={{
                background: "#0f172a",
                border: "1px solid #334155",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px"
              }}
            >
              ❗ {req.masterSentence}
            </div>

            <div style={{ marginBottom: "15px" }}>
              Status:{" "}
              <span
                style={{
                  background: "#0f172a",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  color: getStatusColor(req.status),
                  fontWeight: "600",
                  fontSize: "13px"
                }}
              >
                {req.status}
              </span>
            </div>

            {req.status === "pending" && (

              <div
                style={{
                  display: "flex",
                  gap: "10px"
                }}
              >

                <button
                  onClick={() => acceptProposal(req)}
                  style={{
                    flex: 1,
                    background: "#22c55e",
                    border: "none",
                    padding: "11px",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  ✔ Accept
                </button>

                <button
                  onClick={() => rejectProposal(req._id)}
                  style={{
                    flex: 1,
                    background: "#ef4444",
                    border: "none",
                    padding: "11px",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600"
                  }}
                >
                  ✖ Reject
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </Layout>

  );
}