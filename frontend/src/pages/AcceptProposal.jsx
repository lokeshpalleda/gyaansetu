import React, { useEffect, useState } from "react";
import axios from "axios";
import MentorAvailability from "../components/MentorAvailability";
import { useParams } from "react-router-dom";

const AcceptProposal = () => {
  const { id } = useParams();

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const acceptProposal = async () => {
      try {
        await axios.get(`http://localhost:5000/api/proposal/accept/${id}`);
        setAccepted(true);
      } catch (err) {
        alert("Error accepting proposal");
      }
    };

    acceptProposal();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      {accepted ? (
        <>
          <h2>✅ Proposal Accepted</h2>

          <MentorAvailability
            proposalId={id}
            requesterEmail="student@gmail.com"
            mentorEmail="mentor@gmail.com"
          />
        </>
      ) : (
        <h2>Processing...</h2>
      )}
    </div>
  );
};

export default AcceptProposal;