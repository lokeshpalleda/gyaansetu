import Navbar from "../components/Navbar";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard(){

 const { user } = useUser();

 return(
  <div>

   <Navbar/>

   <h1>Welcome {user?.firstName}</h1>

   <p>This is your GyaanSetu dashboard.</p>

  </div>
 )
}