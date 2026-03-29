import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function Profile() {

  const { user, isLoaded } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {

    if (!isLoaded || !user) return;

    const fetchProfile = async () => {

      try {

        const userEmail = user.primaryEmailAddress.emailAddress;

        const res = await API.get(`/mentor/${userEmail}`);

        if (res.data) {
          setName(res.data.name || "");
          setEmail(res.data.email || "");
          setSkills(res.data.skills.join(", "));
        }

      } catch (err) {

        console.error(err);

      }

    };

    fetchProfile();

  }, [isLoaded, user]);

  const updateProfile = async () => {

    try {

      const skillsArray = skills.split(",").map(s => s.trim());

      await API.put("/mentor/update", {
        name,
        email,
        skills: skillsArray
      });

      toast.success("Profile updated successfully");

    } catch (err) {

      console.error(err);
      toast.error("Failed to update profile");

    }

  };

  return (

    <Layout>

      <div style={{ maxWidth:"600px", margin:"auto" }}>

        <h1 style={{ fontSize:"36px", marginBottom:"30px" }}>
          My Profile
        </h1>

        <div style={{
          background:"#020617",
          border:"1px solid #1e293b",
          borderRadius:"14px",
          padding:"30px"
        }}>

          <label>Name</label>

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"15px",
              borderRadius:"8px",
              border:"1px solid #334155",
              background:"#0f172a",
              color:"white"
            }}
          />

          <label>Email</label>

          <input
            value={email}
            disabled
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"15px",
              borderRadius:"8px",
              border:"1px solid #334155",
              background:"#0f172a",
              color:"#94a3b8"
            }}
          />

          <label>Skills (comma separated)</label>

          <input
            value={skills}
            onChange={(e)=>setSkills(e.target.value)}
            placeholder="React, Node.js, MongoDB"
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"20px",
              borderRadius:"8px",
              border:"1px solid #334155",
              background:"#0f172a",
              color:"white"
            }}
          />

          <button
            onClick={updateProfile}
            style={{
              background:"linear-gradient(90deg,#2563eb,#4f46e5)",
              border:"none",
              padding:"12px 20px",
              borderRadius:"8px",
              color:"white",
              cursor:"pointer"
            }}
          >
            Update Profile
          </button>

        </div>

      </div>

    </Layout>

  );

}