import React from "react";
import axios from "axios";

const MentorAvailability = ({ proposalId, requesterEmail, mentorEmail }) => {

  // 🔥 generate next 4 hour slots
  const generateSlots = () => {
    const slots = [];
    const now = new Date();

    for (let i = 0; i < 4; i++) {
      const start = new Date(now.getTime() + i * 60 * 60 * 1000);
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      slots.push({
        label: `${start.getHours()}:00 - ${end.getHours()}:00`,
        value: start.toISOString()
      });
    }

    return slots;
  };

  const slots = generateSlots();

  // 🔘 when mentor clicks slot
  const handleSelect = async (time) => {
    try {

      const res = await axios.post("http://localhost:5000/api/session", {
        proposalId,
        requesterEmail,
        mentorEmail,
        scheduledTime: time
      });

      alert("✅ Session created!");
      console.log(res.data);

    } catch (err) {
      alert("❌ Error: " + err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Time Slot</h2>

      {slots.map((slot, index) => (
        <button
          key={index}
          onClick={() => handleSelect(slot.value)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          {slot.label}
        </button>
      ))}
    </div>
  );
};

export default MentorAvailability;