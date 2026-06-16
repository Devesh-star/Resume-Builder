/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../components/UserContext";
import {Inputs} from "../components/Inputs";
import { validateEmail } from "../utils/helper";
import { authStyles as styles } from "../assets/dummystyle";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        { email, password }
      );

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Don't let the interceptor redirect on login failure
        setError(err.response?.data?.message || "Invalid email or password");
        return;
      }
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later"
      );
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome to CV Pilot</h3>
        <p className={styles.subtitle}>
          Sign in to continue building amazing resumes
        </p>
      </div>

      <form onSubmit={handleLogin} className={styles.form}>
        <Inputs
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="email@example.com"
          type="email"
        />

        <Inputs
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google login failed")}
            theme="filled_black"
            size="large"
            shape="pill"
            text="signin_with"
            width="100%"
          />
        </div>

        <p className={styles.switchText}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("signup")}
            className={styles.switchButton}
          >
            Sign Up
          </button>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
