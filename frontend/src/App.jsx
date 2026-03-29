import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

import CompleteProfile from "./pages/CompleteProfile";
import PostDoubt from "./pages/PostDoubt";
import Questions from "./pages/Questions";
import MentorList from "./pages/MentorList";
import AcceptProposal from "./pages/AcceptProposal";
import Dashboard from "./pages/Dashboard";
import StudentSessions from "./pages/StudentSessions";
import MentorSessions from "./pages/MentorSessions";
import MentorRequests from "./pages/MentorRequests";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile"; // ✅ NEW

function App() {
  return (
    <Routes>

      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Signin */}
      <Route
        path="/signin"
        element={
          <SignedOut>
            <div
              style={{
                minHeight: "100vh",
                background: "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <SignIn />
            </div>
          </SignedOut>
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>

            <SignedOut>
              <Navigate to="/signin" />
            </SignedOut>
          </>
        }
      />

      <Route
        path="/complete-profile"
        element={
          <SignedIn>
            <CompleteProfile />
          </SignedIn>
        }
      />

      <Route
        path="/post-doubt"
        element={
          <SignedIn>
            <PostDoubt />
          </SignedIn>
        }
      />

      <Route
        path="/questions"
        element={
          <SignedIn>
            <Questions />
          </SignedIn>
        }
      />

      <Route
        path="/mentors"
        element={
          <SignedIn>
            <MentorList />
          </SignedIn>
        }
      />

      <Route
        path="/accept/:id"
        element={
          <SignedIn>
            <AcceptProposal />
          </SignedIn>
        }
      />

      <Route
        path="/my-sessions"
        element={
          <SignedIn>
            <StudentSessions />
          </SignedIn>
        }
      />

      <Route
        path="/mentor-sessions"
        element={
          <SignedIn>
            <MentorSessions />
          </SignedIn>
        }
      />

      <Route
        path="/mentor-requests"
        element={
          <SignedIn>
            <MentorRequests />
          </SignedIn>
        }
      />

      {/* ✅ NEW PROFILE PAGE */}
      <Route
        path="/profile"
        element={
          <SignedIn>
            <Profile />
          </SignedIn>
        }
      />

    </Routes>
  );
}

export default App;