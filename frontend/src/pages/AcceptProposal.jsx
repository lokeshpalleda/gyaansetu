import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function AcceptProposal() {

  const { id } = useParams();

  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [requesterEmail, setRequesterEmail] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");

  /* ===============================
     GET PROPOSAL DATA
  ================================ */

  useEffect(() => {

    const fetchProposal = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/proposal/${id}`
        );

        const proposal = res.data;

        setRequesterEmail(proposal.requesterEmail);
        setMentorEmail(proposal.mentorEmail);

      } catch (error) {

        console.error(error);
        toast.error("Failed to load proposal");

      }

    };

    fetchProposal();

  }, [id]);

  /* ===============================
     TIME LIMIT (NOW → 4 HOURS)
  ================================ */

  const now = new Date();
  const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000);

  const minTime = now.toTimeString().slice(0,5);
  const maxTime = fourHoursLater.toTimeString().slice(0,5);

  /* ===============================
     CONFIRM SESSION
  ================================ */

  const confirmMeeting = async () => {

    if (!selectedTime) {
      toast.error("Please select a time first");
      return;
    }

    try {

      setLoading(true);

      // Fetch proposal again to guarantee emails exist
      const proposalRes = await axios.get(
        `http://localhost:5000/api/proposal/${id}`
      );

      const proposal = proposalRes.data;

      await axios.post("http://localhost:5000/api/sessions", {
        proposalId: id,
        requesterEmail: proposal.requesterEmail,
        mentorEmail: proposal.mentorEmail,
        time: selectedTime
      });

      toast.success("Meeting link sent to both mentor and student!");

    } catch (error) {

      console.error(error);
      toast.error("Failed to schedule session");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top,#1e293b,#020617)"
      }}
    >

      <div
        style={{
          width: "420px",
          background: "rgba(15,23,42,0.8)",
          border: "1px solid #334155",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          textAlign: "center"
        }}
      >

        <h1
          style={{
            color: "#22c55e",
            marginBottom: "10px",
            fontSize: "28px"
          }}
        >
          ✔ Proposal Accepted
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px"
          }}
        >
          Choose a time within the next 4 hours.
        </p>

        <div
          style={{
            background: "#020617",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid #1e293b"
          }}
        >

          <h2 style={{ marginBottom: "20px" }}>
            Schedule Session
          </h2>

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#cbd5f5"
            }}
          >
            Select Time
          </label>

          <input
            type="time"
            min={minTime}
            max={maxTime}
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={{
              width: "200px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #3b82f6",
              background: "#ffffff",
              color: "#020617",
              fontSize: "16px",
              fontWeight: "500",
              marginBottom: "20px"
            }}
          />

          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              marginBottom: "25px"
            }}
          >
            Allowed range: {minTime} → {maxTime}
          </p>

          <button
            onClick={confirmMeeting}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background:
                "linear-gradient(90deg,#2563eb,#4f46e5)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            {loading ? "Sending..." : "Confirm & Send Meeting Link"}
          </button>

        </div>

      </div>

    </div>

  );

}