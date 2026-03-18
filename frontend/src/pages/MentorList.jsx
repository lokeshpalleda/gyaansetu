import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import API from "../services/api";

export default function MentorList() {

  const location = useLocation();
  console.log("MentorList state:", location.state);

  const mentors = location.state?.mentors || [];
  const doubtId = location.state?.doubtId;

  const { user } = useUser();

  const sendProposal = async (mentor) => {

    try {

      await API.post("/proposal", {
        doubtId: doubtId,
        requesterEmail: user.primaryEmailAddress.emailAddress,
        mentorEmail: mentor.email,
        masterSentence: "Need help with this doubt"
      });

      alert("✅ Proposal sent successfully!");

    } catch (err) {

      console.error(err);
      alert("❌ Failed to send proposal");

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Available Mentors</h2>

      {mentors.length === 0 && (
        <p>No mentors found</p>
      )}

      {mentors.map((mentor) => (

        <div
          key={mentor._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >

          <h3>{mentor.name}</h3>

          <p>{mentor.email}</p>

          <p>
            <b>Skills:</b> {mentor.skills.join(", ")}
          </p>

          <button
            onClick={() => sendProposal(mentor)}
            style={{
              padding: "8px 12px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Send Proposal
          </button>

        </div>

      ))}

    </div>

  );
}