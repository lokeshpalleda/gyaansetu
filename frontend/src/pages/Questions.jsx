import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Questions() {

  const location = useLocation();
  const navigate = useNavigate();

  const { questions = [], doubtId, doubtText } = location.state || {};

  const [answers, setAnswers] = useState({});

  const handleChange = (qIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: value
    }));
  };

  const submitAnswers = async () => {

    try {

      if (!doubtText) {
        alert("Doubt text missing. Please submit doubt again.");
        return;
      }

      if (Object.keys(answers).length !== questions.length) {
        alert("Please answer all questions");
        return;
      }

      const res = await API.post("/match-mentors", {
        doubtText: doubtText
      });

      const mentors = res.data.mentors || [];

      navigate("/mentors", {
        state: {
          mentors,
          doubtId,
          doubtText
        }
      });

    } catch (err) {

      console.error(err);
      alert("Error submitting answers");

    }

  };

  return (

    <Layout>

      <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
        Clarification Questions
      </h1>

      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Answer these questions so we can match you with the best mentor
      </p>

      <div style={{ maxWidth: "750px", margin: "0 auto" }}>

        {questions.map((q, i) => (

          <div
            key={i}
            style={{
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "14px",
              padding: "25px",
              marginBottom: "20px"
            }}
          >

            <h3 style={{ marginBottom: "18px" }}>
              {q.question}
            </h3>

            {q.options.map((opt, j) => (

              <label
                key={j}
                style={{
                  display: "block",
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  cursor: "pointer"
                }}
              >

                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt}
                  onChange={() => handleChange(i, opt)}
                  style={{ marginRight: "10px" }}
                />

                {opt}

              </label>

            ))}

          </div>

        ))}

        <div style={{ textAlign: "center" }}>

          <button
            onClick={submitAnswers}
            style={{
              padding: "12px 28px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(90deg,#2563eb,#4f46e5)",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Submit Answers
          </button>

        </div>

      </div>

    </Layout>

  );

}