"use client";
import React, { useActionState } from "react";
import { useFormState } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { authenticate } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Polyfill check or standard usage
// API Note: Next 16 (React 19) uses useActionState. Falling back to simple form handling for reliability if imports fail.
// We will use a standard form submission handler wrapping the server action for maximum compatibility with standard React hooks.

export default function AdminLogin() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await import("next-auth/react").then(mod =>
        mod.signIn("credentials", {
          email,
          password,
          redirect: false,
        })
      );

      if (result?.error) {
        setErrorMessage("Invalid credentials.");
        setIsPending(false);
      } else if (result?.ok) {
        // Force hard navigation to ensure URL updates to /admin
        // This fixes the sidebar visibility issue
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage("Something went wrong.");
        setIsPending(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred.");
      setIsPending(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background Ambience */}
      <div className="gradient-sphere sphere-1"></div>
      <div className="gradient-sphere sphere-2"></div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="login-header">
          <div className="logo-container">
            <Image
              src="/webImages/logo.png"
              alt="EdSchool Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <h1>Welcome Back</h1>
          <p>Access the EdSchool Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="error-message"
              >
                <i className="fas fa-exclamation-circle"></i> {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Single Glass Container for Form Fields */}
          <div className="form-glass-container">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  name="email"
                  type="email"
                  placeholder="admin@edschool.pk"
                  required
                  className="glass-input"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="glass-input"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={isPending}>
            {isPending ? <span className="loader"></span> : "Sign In Access"}
          </button>
        </form>

        <div className="footer-links">
          <a href="/">Back to Website</a>
        </div>
      </motion.div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f172a;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .gradient-sphere {
          position: absolute; border-radius: 50%; filter: blur(100px); z-index: 0; opacity: 0.5;
        }
        .sphere-1 {
          width: 500px; height: 500px; background: #4318FF; top: -100px; left: -100px;
        }
        .sphere-2 {
          width: 400px; height: 400px; background: #3B82F6; bottom: -50px; right: -100px;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 60px; /* Increased padding */
          border-radius: 40px; /* Increased radius */
          width: 100%;
          max-width: 480px; /* Increased width */
          position: relative;
          z-index: 10;
          box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.6);
        }

        .login-header { text-align: center; margin-bottom: 40px; }
        
        .logo-container {
            margin-bottom: 24px;
            display: flex; justify-content: center;
        }

        .login-header h1 { color: white; font-size: 32px; margin: 0 0 10px; font-weight: 800; }
        .login-header p { color: #94A3B8; font-size: 16px; }

        /* Single Glass Form Container */
        .form-glass-container {
          display: flex;
          flex-direction: column;
          gap: 24px; /* Increased gap */
        }

        .input-group {
            display: flex; flex-direction: column; gap: 8px;
        }

        .input-group label {
            color: #E2E8F0; /* Lighter label for better contrast */
            font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;
            margin-left: 4px;
        }

        /* Bordered Input Container */
        .input-with-icon {
            display: flex; align-items: center; gap: 14px;
            padding: 16px; /* Increased padding */
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1); /* The requested border */
            border-radius: 16px;
            transition: all 0.3s ease;
        }

        /* Active State Theme Follow */
        .input-with-icon:focus-within {
            background: rgba(255, 255, 255, 0.08);
            border-color: #4318FF; /* Website Theme Color */
            box-shadow: 0 0 0 4px rgba(67, 24, 255, 0.1);
        }

        .input-with-icon i { color: #64748B; font-size: 18px; transition: color 0.3s; }
        .input-with-icon:focus-within i { color: #4318FF; }

        .glass-input {
            background: transparent !important; 
            border: none; 
            outline: none;
            color: white !important; 
            font-size: 18px; 
            width: 100%; 
            font-weight: 500;
        }

        /* Autofill Fix for Dark Mode */
        .glass-input:-webkit-autofill,
        .glass-input:-webkit-autofill:hover, 
        .glass-input:-webkit-autofill:focus, 
        .glass-input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #131c31 inset !important; /* Matches background roughly */
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        .login-btn {
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #4318FF, #3B82F6);
          color: white;
          border: none;
          border-radius: 24px;
          font-weight: 700;
          font-size: 18px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(67, 24, 255, 0.3);
          margin-top: 20px;
        }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(67, 24, 255, 0.4); }
        .login-btn:active { transform: scale(0.98); }

        .loader {
            width: 24px; height: 24px; border: 3px solid white; border-bottom-color: transparent;
            border-radius: 50%; display: inline-block; animation: rot 1s linear infinite;
        }
        @keyframes rot { to { transform: rotate(360deg); } }

        .error-message {
            background: rgba(220, 38, 38, 0.2); color: #fca5a5; padding: 16px;
            border-radius: 16px; margin-bottom: 24px; font-size: 15px;
        }
        .footer-links { text-align: center; margin-top: 40px; }
        .footer-links a { color: #64748B; font-size: 14px; text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: white; }
      `}</style>
    </div>
  );
}
