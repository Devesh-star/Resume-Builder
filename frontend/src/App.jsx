import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserProvider from "./components/UserContext";
import Dashboard from "./pages/Dasboard";
import EditResume from "./components/EditResume";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/resume/:resumeId" element={<EditResume/>}/>
      </Routes>

      <Toaster toastOptions={{
        className: "",
        styles: {
          fontSize: "13px"
        }
      }}>

      </Toaster>
    </UserProvider>
  );
}

export default App;
