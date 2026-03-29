import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function MentorList() {

  const location = useLocation();
  const { user } = useUser();

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const doubtId = location.state?.doubtId;
  const doubtText = location.state?.doubtText;

  useEffect(() => {

    if (location.state?.mentors) {
      setMentors(location.state.mentors);
      setLoading(false);
    } else {
      fetchMentors();
    }

  }, [location.state]);

  const fetchMentors = async () => {

    try {

      const res = await API.get("/mentors");

      setMentors(res.data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to load mentors");

    } finally {

      setLoading(false);

    }

  };

  const sendProposal = async (mentor) => {

  try {

    const masterSentence = `
Description:
${doubtText}
`;

    await API.post("/proposal", {
      doubtId,
      requesterEmail: user?.primaryEmailAddress?.emailAddress,
      mentorEmail: mentor.email,
      masterSentence
    });

    toast.success("Proposal sent to mentor!");

  } catch (err) {

    console.error(err);
    toast.error("Failed to send proposal");

  }

};

  return (

    <Layout>

      <h1 style={{ fontSize: "34px", marginBottom: "5px" }}>
        Find Mentors
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "35px" }}>
        Connect with expert mentors to solve your doubts
      </p>

      {loading && <p>Loading mentors...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px"
        }}
      >

        {mentors.map((mentor) => (

          <div
            key={mentor._id}
            style={{
              background: "#020617",
              padding: "25px",
              borderRadius: "16px",
              border: "1px solid #1e293b",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >

            <div>

              <h3 style={{
                fontSize: "20px",
                marginBottom: "6px",
                fontWeight: "600"
              }}>
                {mentor.name}
              </h3>

              <p style={{
                color: "#94a3b8",
                fontSize: "14px",
                marginBottom: "15px"
              }}>
                {mentor.email}
              </p>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px"
              }}>

                {mentor.skills?.map((skill, i) => (

                  <span
                    key={i}
                    style={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      color: "#e2e8f0"
                    }}
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            {doubtId && (

              <button
                onClick={() => sendProposal(mentor)}
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "linear-gradient(90deg,#2563eb,#4f46e5)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                Request Help
              </button>

            )}

          </div>

        ))}

      </div>

    </Layout>

  );

}