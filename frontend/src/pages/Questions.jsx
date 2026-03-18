import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Questions() {

  const location = useLocation();
  const navigate = useNavigate();

  // receive data from PostDoubt page
  const { questions, doubtId } = location.state || {};

  const [answers, setAnswers] = useState({});

  const handleChange = (qIndex, value) => {

    setAnswers({
      ...answers,
      [qIndex]: value
    });

  };

  const submitAnswers = async () => {

    try {

      const res = await API.post("/submit-answers", {
        doubtId,
        answers: Object.values(answers)
      });

      console.log(res.data);

      // ✅ send BOTH mentors and doubtId
      navigate("/mentors", {
        state: {
          mentors: res.data.mentors,
          doubtId: doubtId
        }
      });

    } catch (err) {

      console.error(err);
      alert("Error submitting answers");

    }

  };

  return (

    <div>

      <Navbar />

      <h2>Clarification Questions</h2>

      {questions?.map((q, i) => (

        <div key={i} style={{ marginBottom: "20px" }}>

          <h4>{q.question}</h4>

          {q.options.map((opt, j) => (

            <div key={j}>

              <input
                type="radio"
                name={`q${i}`}
                value={opt}
                onChange={() => handleChange(i, opt)}
              />

              <label style={{ marginLeft: "5px" }}>
                {opt}
              </label>

            </div>

          ))}

        </div>

      ))}

      <button
        onClick={submitAnswers}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Submit Answers
      </button>

    </div>

  );

}