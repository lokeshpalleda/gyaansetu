import Layout from "../components/Layout";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostDoubt() {

  const { user } = useUser();
  const navigate = useNavigate();

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const submitDoubt = async () => {

    try{

      const res = await API.post("/doubt",{
        userId:user.id,
        title,
        description
      });

      // IMPORTANT: send doubtText so mentor matching works
      navigate("/questions",{
        state:{
          ...res.data,
          doubtText:title
        }
      });

    }catch(err){
      console.error(err);
      alert("Error posting doubt");
    }

  };

  return(

    <Layout>

      <h1 style={{fontSize:"32px",marginBottom:"10px"}}>
        Post a Doubt
      </h1>

      <p style={{color:"#94a3b8",marginBottom:"35px"}}>
        Describe your coding problem and get help from mentors
      </p>

      <div
        style={{
          background:"#020617",
          padding:"40px",
          borderRadius:"16px",
          border:"1px solid #1e293b",
          maxWidth:"650px",
          margin:"0 auto"
        }}
      >

        <input
          placeholder="for BEST findings enter only subject name"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          style={{
            width:"100%",
            padding:"14px",
            marginBottom:"20px",
            borderRadius:"8px",
            border:"1px solid #334155",
            background:"#020617",
            color:"white"
          }}
        />

        <textarea
          placeholder="Describe your problem..."
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          style={{
            width:"100%",
            padding:"14px",
            height:"140px",
            borderRadius:"8px",
            border:"1px solid #334155",
            background:"#020617",
            color:"white"
          }}
        />

        <button
          onClick={submitDoubt}
          style={{
            marginTop:"20px",
            padding:"12px 25px",
            borderRadius:"8px",
            border:"none",
            background:"linear-gradient(90deg,#2563eb,#4f46e5)",
            color:"white",
            cursor:"pointer"
          }}
        >
          Submit Doubt
        </button>

      </div>

    </Layout>

  );

}