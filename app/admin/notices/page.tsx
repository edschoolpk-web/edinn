"use client";
import React, { useState } from 'react';

export default function AdminNotices() {
  const [notice, setNotice] = useState({
    content: "Admissions are Open for Spring 2026. Apply Now!",
    isActive: true,
  });

  const [message, setMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Notice updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Notice Management</h1>
      </div>

      <div className="card notice-card">
        <form onSubmit={handleSave}>
          <div className="form-group toggle-group">
            <label>Notice Status</label>
            <div 
              className={`toggle-switch ${notice.isActive ? 'active' : ''}`}
              onClick={() => setNotice({ ...notice, isActive: !notice.isActive })}
            >
              <div className="slider"></div>
            </div>
            <span>{notice.isActive ? 'Enabled' : 'Disabled'}</span>
          </div>

          <div className="form-group">
            <label>Notice Content</label>
            <textarea 
              rows={4} 
              value={notice.content} 
              onChange={(e) => setNotice({ ...notice, content: e.target.value })}
              placeholder="Enter the text that will appear in the popup..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              <i className="fas fa-save"></i> Save Changes
            </button>
            {message && <span className="success-msg">{message}</span>}
          </div>
        </form>
      </div>

      <div className="preview-section">
        <h3>Preview</h3>
        <p>This is how the notice will appear on the website:</p>
        
        <div className={`preview-popup ${notice.isActive ? 'show' : ''}`}>
           <div className="popup-content">
              <div className="popup-icon">
                 <i className="fas fa-bullhorn"></i>
              </div>
              <div className="popup-text">
                 <h4>Important Announcement</h4>
                 <p>{notice.content}</p>
              </div>
              <button className="close-preview">×</button>
           </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          margin-bottom: 30px;
        }

        .page-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #2B3674;
          margin: 0;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
          max-width: 600px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #2B3674;
        }

        textarea {
          width: 100%;
          padding: 15px;
          border: 1px solid #E0E5F2;
          border-radius: 12px;
          font-family: inherit;
          resize: vertical;
        }

        textarea:focus {
          border-color: #4318FF;
          outline: none;
        }

        .toggle-group {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .toggle-group label { margin: 0; }

        .toggle-switch {
          width: 50px;
          height: 26px;
          background: #E0E5F2;
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s;
        }

        .toggle-switch.active {
          background: #4318FF;
        }

        .slider {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: left 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .toggle-switch.active .slider {
          left: 27px;
        }

        .save-btn {
          background: #4318FF;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .save-btn:hover {
          background: #3311CC;
        }

        .form-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .success-msg {
          color: #01B574;
          font-weight: 500;
        }

        .preview-section {
          margin-top: 40px;
        }
        
        .preview-popup {
          max-width: 500px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          overflow: hidden;
          border-left: 5px solid #4318FF;
          margin-top: 20px;
          opacity: 0.5;
          filter: grayscale(100%);
        }

        .preview-popup.show {
          opacity: 1;
          filter: none;
        }

        .popup-content {
          padding: 20px;
          display: flex;
          gap: 20px;
          position: relative;
        }

        .popup-icon {
          width: 40px;
          height: 40px;
          background: #F4F7FE;
          color: #4318FF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .popup-text h4 {
          margin: 0 0 5px 0;
          color: #2B3674;
        }

        .popup-text p {
          margin: 0;
          color: #707EAE;
          font-size: 14px;
        }

        .close-preview {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #A3AED0;
        }
      `}</style>
    </div>
  );
}
