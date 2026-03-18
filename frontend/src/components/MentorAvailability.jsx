import React, { useState } from "react";
import axios from "axios";

const MentorAvailability = ({ proposalId, requesterEmail, mentorEmail }) => {

  const [message, setMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  // 🔥 generate next 4 hour slots
  const generateSlots = () => {

    const slots = [];
    const now = new Date();

    for (let i = 1; i <= 4; i++) {

      const start = new Date(now.getTime() + i * 60 * 60 * 1000);

      const label = start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      slots.push({
        label,
        value: start.toISOString()
      });
    }

    return slots;
  };

  const slots = generateSlots();

  // 🔘 when mentor clicks slot
  const handleSelect = async (time) => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/session",
        {
          proposalId,
          requesterEmail,
          mentorEmail,
          scheduledTime: time
        }
      );

      console.log(res.data);

      setMessage("✅ Session Scheduled Successfully!");
      setMeetingLink(res.data.session.meetingLink);

    } catch (err) {

      console.error(err);
      setMessage("❌ Error scheduling session");

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Select Time Slot</h2>

      {!meetingLink && (
        <div>

          {slots.map((slot, index) => (

            <button
              key={index}
              onClick={() => handleSelect(slot.value)}
              style={{
                display: "block",
                margin: "10px 0",
                padding: "12px",
                cursor: "pointer",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#f5f5f5"
              }}
            >
              {slot.label}

            </button>

          ))}

        </div>
      )}

      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      {meetingLink && (
        <div style={{ marginTop: "20px" }}>

          <h3>Meeting Link</h3>

          <a
            href={meetingLink}
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            Join Meeting
          </a>

        </div>
      )}

    </div>
  );
};

export default MentorAvailability;