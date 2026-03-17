import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostDoubt(){

 const { user } = useUser();
 const navigate = useNavigate();

 const [title,setTitle] = useState("");
 const [description,setDescription] = useState("");

 const submitDoubt = async () => {

  try {

   if(!title || !description){
    alert("Please fill all fields");
    return;
   }

   if(!user){
    alert("User not logged in");
    return;
   }

   const res = await API.post("/doubt",{
    userId: user.id,
    title,
    description
   });

   console.log(res.data);

   navigate("/questions",{ state: res.data });

  } catch(err){
   console.error(err);
   alert("Error posting doubt");
  }

 };

 return(
  <div>

   <Navbar/>

   <h2>Post Your Doubt</h2>

   <input
    placeholder="Title"
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
   />

   <br/><br/>

   <textarea
    placeholder="Describe your doubt"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
   />

   <br/><br/>

   <button onClick={submitDoubt}>
    Submit Doubt
   </button>

  </div>
 )
}