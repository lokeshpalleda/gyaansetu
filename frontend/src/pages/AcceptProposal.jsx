import React, { useEffect, useState } from "react";
import axios from "axios";
import MentorAvailability from "../components/MentorAvailability";
import { useParams } from "react-router-dom";

const AcceptProposal = () => {

  const { id } = useParams();

  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [requesterEmail, setRequesterEmail] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");

  useEffect(() => {

    const acceptProposal = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/proposal/accept/${id}`
        );

        console.log(res.data);

        const proposal = res.data.proposal;

        setRequesterEmail(proposal.requesterEmail);
        setMentorEmail(proposal.mentorEmail);

        setAccepted(true);
        setLoading(false);

      } catch (err) {

        console.error(err);
        alert("Error accepting proposal");
        setLoading(false);

      }

    };

    acceptProposal();

  }, [id]);

  if (loading) {

    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Processing proposal...</h2>
      </div>
    );

  }

  return (
    <div style={{ padding: "30px" }}>

      {accepted ? (
        <>
          <h2>✅ Proposal Accepted</h2>
          <p>Please select an available time for the session.</p>

          <MentorAvailability
            proposalId={id}
            requesterEmail={requesterEmail}
            mentorEmail={mentorEmail}
          />

        </>
      ) : (
        <h2>Proposal could not be accepted</h2>
      )}

    </div>
  );
};

export default AcceptProposal;