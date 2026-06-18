import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../components/UserContext";
import { Inputs } from "../components/Inputs";
import { FileText } from "lucide-react";

const SignUp = ({ setCurrentPage, onSignUpSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        if (onSignUpSuccess) {
          onSignUpSuccess();
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async (credentialResponse) => {
    try {
      setError(null);
      const response = await axiosInstance.post(
        API_PATHS.AUTH.GOOGLE_LOGIN,
        { credential: credentialResponse.credential }
      );

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        if (onSignUpSuccess) {
          onSignUpSuccess();
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Google sign-up failed. Please try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
          <FileText size={24} />
        </div>
        <h3 className="text-2xl font-extrabold text-text-main tracking-tight">Create an account</h3>
        <p className="text-text-muted mt-2">Join thousands of professionals today</p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <Inputs
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />

        <Inputs
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="you@company.com"
          type="email"
        />

        <Inputs
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && (
          <div className="p-3 bg-error/10 border border-error/20 text-error text-sm rounded-lg flex items-center gap-2">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        <button 
          type="submit" 
          className="btn-primary w-full py-3 text-base mt-2"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-app-border" />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Or continue with</span>
          <hr className="flex-1 border-app-border" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSignUp}
            onError={() => setError("Google sign-up failed")}
            theme="outline"
            size="large"
            width="100%"
            text="signup_with"
            shape="rectangular"
          />
        </div>

        <p className="text-center text-sm text-text-muted mt-8">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("login")}
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Sign in
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default SignUp;
