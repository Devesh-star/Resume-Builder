import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../components/UserContext";
import { Inputs } from "../components/Inputs";
import { validateEmail } from "../utils/helper";
import { FileText } from "lucide-react";

const Login = ({ setCurrentPage, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        { email, password }
      );

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError(err.response?.data?.message || "Invalid email or password");
      } else {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again later"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
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
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Google login failed. Please try again."
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
        <h3 className="text-2xl font-extrabold text-text-main tracking-tight">Welcome back</h3>
        <p className="text-text-muted mt-2">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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
          placeholder="••••••••"
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
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-app-border" />
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Or continue with</span>
          <hr className="flex-1 border-app-border" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google login failed")}
            theme="outline"
            size="large"
            width="100%"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        <p className="text-center text-sm text-text-muted mt-8">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("signup")}
            className="font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Sign up
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
