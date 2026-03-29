import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {

  const { user } = useUser();
  const navigate = useNavigate();

  const defaultSkills = [
    "React",
    "Node",
    "Python",
    "Java",
    "MongoDB",
    "Express",
    "HTML",
    "CSS",
    "DSA"
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");

  const toggleSkill = (skill) => {

    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }

  };

  const addCustomSkill = () => {

    if (!customSkill.trim()) return;

    const newSkill = customSkill.trim();

    setCustomSkills([...customSkills, newSkill]);
    setSelectedSkills([...selectedSkills, newSkill]);

    setCustomSkill("");

  };

  const saveProfile = async () => {

  try {

    const email = user.primaryEmailAddress.emailAddress;

    await API.post("/mentors", {
      name: user.fullName,
      email,
      skills: selectedSkills
    });

    navigate("/dashboard");

  } catch (err) {

    console.error(err);

  }

};

  return (

    <Layout>

      <div
        style={{
          maxWidth: "750px",
          margin: "auto",
          textAlign: "center"
        }}
      >

        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Complete Your Profile
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
          Select or add your skills so others can find you as a mentor.
        </p>

        {/* DEFAULT SKILLS */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "15px"
          }}
        >

          {defaultSkills.map((skill) => (

            <div
              key={skill}
              onClick={() => toggleSkill(skill)}
              style={{
                padding: "10px 18px",
                borderRadius: "20px",
                border: selectedSkills.includes(skill)
                  ? "1px solid #3b82f6"
                  : "1px solid #1e293b",
                background: selectedSkills.includes(skill)
                  ? "#2563eb"
                  : "#020617",
                cursor: "pointer"
              }}
            >
              {skill}
            </div>

          ))}

        </div>

        {/* CUSTOM SKILLS */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "25px"
          }}
        >

          {customSkills.map((skill) => (

            <div
              key={skill}
              onClick={() => toggleSkill(skill)}
              style={{
                padding: "10px 18px",
                borderRadius: "20px",
                border: "1px solid #16a34a",
                background: "#16a34a",
                cursor: "pointer"
              }}
            >
              {skill}
            </div>

          ))}

        </div>

        {/* ADD CUSTOM SKILL */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "30px"
          }}
        >

          <input
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            placeholder="Add custom skill"
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #1e293b",
              background: "#020617",
              color: "white",
              width: "220px"
            }}
          />

          <button
            onClick={addCustomSkill}
            style={{
              background: "#2563eb",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Add
          </button>

        </div>

        {/* SAVE BUTTON */}

        <button
          onClick={saveProfile}
          style={{
            background: "linear-gradient(90deg,#2563eb,#4f46e5)",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Save & Continue
        </button>

      </div>

    </Layout>

  );

}