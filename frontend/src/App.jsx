import React from "react";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import UserProvider from "./components/UserContext";
import Dashboard from "./pages/Dasboard";
import EditResume from "./components/EditResume";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TemplatesPage from "./pages/TemplatesPage";
import ATSReportsPage from "./pages/ATSReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ExamplesPage from "./pages/ExamplesPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import GuidePage from "./pages/GuidePage";
import HelpCenterPage from "./pages/HelpCenterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  return (
    <UserProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/templates" element={<TemplatesPage/>}/>
          <Route path="/ats-reports" element={<ATSReportsPage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/resume/:resumeId" element={<EditResume/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Static Pages */}
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
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
