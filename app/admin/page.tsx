"use client";
import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <div className="icon-box icon-purple">
           <i className="fas fa-chalkboard-teacher"></i>
        </div>
        <div className="stat-info">
          <span>Total Teachers</span>
          <h3>12</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon-box icon-blue">
           <i className="fas fa-images"></i>
        </div>
        <div className="stat-info">
          <span>Gallery Images</span>
          <h3>48</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon-box icon-green">
           <i className="fas fa-bullhorn"></i>
        </div>
        <div className="stat-info">
          <span>Active Notice</span>
          <h3>Enabled</h3>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <p>No recent activity.</p>
      </div>

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: #fff;
          padding: 20px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
        }

        .icon-box {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .icon-purple { background: #F4F7FE; color: #4318FF; }
        .icon-blue { background: #F4F7FE; color: #3965FF; }
        .icon-green { background: #F4F7FE; color: #01B574; }

        .stat-info span {
          color: #A3AED0;
          font-size: 14px;
        }

        .stat-info h3 {
          margin: 0;
          color: #2B3674;
          font-size: 24px;
          font-weight: 700;
        }

        .recent-activity {
          grid-column: 1 / -1;
          background: white;
          padding: 20px;
          border-radius: 20px;
          margin-top: 20px;
          box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
        }
      `}</style>
    </div>
  );
}
