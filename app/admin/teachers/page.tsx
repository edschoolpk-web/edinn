"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock Data
const MOCK_TEACHERS = [
  { id: '1', name: 'Sir Gohar', role: 'Math Teacher', email: 'gohar@example.com', image: '/webImages/img5.jpg' },
  { id: '2', name: 'Miss Ayesha', role: 'English Teacher', email: 'ayesha@example.com', image: '/webImages/img6.jpg' },
  { id: '3', name: 'Miss Sumaiqa', role: 'Biology Teacher', email: 'sumaiqa@example.com', image: '/webImages/img7.jpg' },
  { id: '4', name: 'Miss Afsha', role: 'Islamiat Teacher', email: 'afsha@example.com', image: '/webImages/img8.jpg' },
];

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState(MOCK_TEACHERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Teachers Management</h1>
        <button className="add-btn">
          <i className="fas fa-plus"></i> Add New Teacher
        </button>
      </div>

      <div className="controls-row">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search teachers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Teacher</th>
              <th>Role</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>
                  <div className="teacher-cell">
                    <div className="avatar-small">
                      <Image src={teacher.image} alt={teacher.name} width={40} height={40} className="rounded-full object-cover" />
                    </div>
                    <span>{teacher.name}</span>
                  </div>
                </td>
                <td>{teacher.role}</td>
                <td>{teacher.email}</td>
                <td>
                  <div className="actions">
                    <button className="action-btn edit" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete" title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #2B3674;
          margin: 0;
        }

        .add-btn {
          background: #4318FF;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.3s;
        }

        .add-btn:hover {
          background: #3311CC;
        }

        .controls-row {
          margin-bottom: 24px;
        }

        .search-box {
          background: white;
          padding: 10px 20px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 300px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.02);
        }

        .search-box input {
          border: none;
          outline: none;
          width: 100%;
          color: #2B3674;
        }

        .search-box i {
          color: #A3AED0;
        }

        .table-container {
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12);
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 12px 20px;
          color: #A3AED0;
          font-weight: 500;
          font-size: 14px;
          border-bottom: 1px solid #E9EDF7;
        }

        td {
          padding: 16px 20px;
          color: #2B3674;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 1px solid #E9EDF7;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .teacher-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-small img {
          border-radius: 50%;
        }

        .rounded-full { border-radius: 50%; }

        .actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn.edit {
          background: #EFF4FB;
          color: #4318FF;
        }

        .action-btn.edit:hover {
          background: #4318FF;
          color: white;
        }

        .action-btn.delete {
          background: #FEEEEE;
          color: #D32F2F;
        }

        .action-btn.delete:hover {
          background: #D32F2F;
          color: white;
        }
      `}</style>
    </div>
  );
}
