"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access the admin panel.</p>
        </div>

        <form className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="admin@edschool.pk" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="login-btn">
            Sign In
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
          background: #F4F7FE;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: "";
          position: absolute;
          width: 50%;
          height: 100%;
          top: 0;
          right: 0;
          background: #4318FF;
          border-bottom-left-radius: 200px;
          z-index: 0;
        }

        .login-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 10;
        }

        .login-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #2B3674;
          margin-bottom: 10px;
        }

        .login-header p {
          color: #A3AED0;
          margin-bottom: 30px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #2B3674;
        }

        .input-group input {
          width: 100%;
          padding: 15px;
          border: 1px solid #E0E5F2;
          border-radius: 12px;
          font-size: 14px;
          background: transparent;
        }

        .input-group input:focus {
          border-color: #4318FF;
          outline: none;
        }

        .login-btn {
          width: 100%;
          padding: 15px;
          background: #4318FF;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .login-btn:hover {
          background: #3311CC;
        }

        .footer-links {
          margin-top: 20px;
          text-align: center;
        }

        .footer-links a {
          color: #A3AED0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
