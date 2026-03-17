import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

import PostDoubt from "./pages/PostDoubt";
import Questions from "./pages/Questions";
import MentorList from "./pages/MentorList";
import Mentors from "./pages/Mentors";

function App() {
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <Routes>
          <Route path="/" element={<PostDoubt />} />
          <Route path="/post-doubt" element={<PostDoubt />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/mentors" element={<MentorList />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/session" element={<h2>Sessions Page</h2>} />
        </Routes>
      </SignedIn>
    </>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import AcceptProposal from "./pages/AcceptProposal";

// function App() {
//   return (
//     <Routes>
//       <Route path="/accept/:id" element={<AcceptProposal />} />
//     </Routes>
//   );
// }

// export default App;