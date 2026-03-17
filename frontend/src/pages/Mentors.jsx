import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mentors() {

  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchMentors = async () => {

      const res = await axios.post(
        "http://localhost:5000/api/match-mentors",
        {
          keywords: ["nodejs"],
          userId: "test_user"
        }
      );
      console.log(res.data);
      setMentors(res.data);

    };

    fetchMentors();

  }, []);

  const openMentorList = () => {
    navigate("/mentor-list", { state: mentors });
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Available Mentors</h2>

      {mentors.length === 0 && <p>No mentors found</p>}

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
            onClick={openMentorList}
            style={{
              padding: "8px 12px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Request Help
          </button>

        </div>

      ))}

    </div>
  );
}