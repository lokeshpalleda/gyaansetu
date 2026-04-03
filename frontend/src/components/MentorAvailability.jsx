import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MentorAvailability = ({ proposalId, requesterEmail, mentorEmail }) => {

  const [startTime, setStartTime] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [loading, setLoading] = useState(false);

  /* Handle start time */
  const handleStartTime = (e) => {

    const time = e.target.value;
    setStartTime(time);

    const [h, m] = time.split(":");

    const start = new Date();
    start.setHours(h);
    start.setMinutes(m);

    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

    const max = end.toTimeString().slice(0, 5);

    setMaxTime(max);
  };

  /* Confirm meeting */
  const confirmMeeting = async () => {

    if (!selectedTime) {
      toast.error("Please select a time");
      return;
    }

    try {

      setLoading(true);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/sessions`, {
        proposalId,
        requesterEmail,
        mentorEmail,
        time: selectedTime
      });

      toast.success("Meeting link sent to mentor and student!");

    } catch (err) {

      console.error(err);
      toast.error("Failed to schedule meeting");

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

      {/* CARD */}

      <div
        style={{
          width: "500px",
          background: "rgba(15,23,42,0.7)",
          backdropFilter: "blur(15px)",
          border: "1px solid #334155",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            fontSize: "30px",
            marginBottom: "10px",
            color: "#22c55e"
          }}
        >
          ✔ Proposal Accepted
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "35px"
          }}
        >
          Choose a suitable time to schedule the mentorship session.
        </p>

        {/* SCHEDULER */}

        <div
          style={{
            background: "#020617",
            borderRadius: "16px",
            padding: "30px",
            border: "1px solid #1e293b"
          }}
        >

          <h2
            style={{
              fontSize: "24px",
              marginBottom: "20px"
            }}
          >
            Schedule Session
          </h2>

          {/* START TIME */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#cbd5f5"
            }}
          >
            Select Start Time
          </label>

          <input
            type="time"
            value={startTime}
            onChange={handleStartTime}
            style={{
              width: "180px",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #3b82f6",
              background: "#ffffff",
              color: "#020617",
              fontSize: "16px",
              fontWeight: "500",
              marginBottom: "20px"
            }}
          />

          {/* SELECT ACTUAL TIME */}

          {startTime && (

            <>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#cbd5f5"
                }}
              >
                Choose Session Time
              </label>

              <input
                type="time"
                value={selectedTime}
                min={startTime}
                max={maxTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{
                  width: "180px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #3b82f6",
                  background: "#ffffff",
                  color: "#020617",
                  fontSize: "16px",
                  fontWeight: "500",
                  marginBottom: "30px"
                }}
              />

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  marginBottom: "20px"
                }}
              >
                Allowed range: {startTime} → {maxTime}
              </p>

            </>

          )}

          {/* BUTTON */}

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
              cursor: "pointer",
              transition: "0.2s"
            }}
          >
            {loading
              ? "Sending..."
              : "Confirm & Send Meeting Link"}
          </button>

        </div>

      </div>

    </div>

  );

};

export default MentorAvailability;