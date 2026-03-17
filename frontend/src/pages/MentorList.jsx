import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useUser } from "@clerk/clerk-react";

export default function MentorList(){

 const location = useLocation();
 const mentors = location.state ?? [];
 {mentors.length === 0 && <p>No mentors found</p>}

 const { user } = useUser();

 const sendProposal = async (mentorId) => {

  try{

   await API.post("/proposal",{
    studentId: user.id,
    mentorId: mentorId,
    doubtId: "temp_doubt_id"
   });

   alert("Proposal sent successfully!");

  }catch(err){
   console.error(err);
  }

 };

 return(
  <div>

   <Navbar/>

   <h2>Available Mentors</h2>

   {mentors.map((mentor,i)=>(
    <div key={i} style={{border:"1px solid gray",padding:"10px",margin:"10px"}}>

     <h3>{mentor.name}</h3>

     <p>Skills: {mentor.skills.join(", ")}</p>

     <p>Rating: {mentor.rating}</p>

     <button onClick={()=>sendProposal(mentor._id)}>
      Send Proposal
     </button>

    </div>
   ))}

  </div>
 )
}