import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import UserProvider from "./components/UserContext";
import Dashboard from "./pages/Dasboard";
import EditResume from "./components/EditResume";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  return (
    <UserProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/resume/:resumeId" element={<EditResume/>}/>
        </Routes>
      </AnimatePresence>

      <Toaster toastOptions={{
        className: "",
        style: {
          fontSize: "13px",
          background: "#12121a",
          color: "#f0f0f5",
          border: "1px solid rgba(255, 45, 120, 0.15)",
        }
      }}>

      </Toaster>
    </UserProvider>
  );
}

export default App;
