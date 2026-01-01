
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTeachers, createTeacher, deleteTeacher } from '@/app/actions/teacher';

// Types
interface Teacher {
  id: string;
  name: string;
  role: string;
  email: string | null;
  bio: string | null;
  image: string | null;
}

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    bio: ''
  });

  const fetchTeachers = async () => {
    setIsLoading(true);
    const result = await getTeachers();
    if (result.success && result.data) {
      setTeachers(result.data as Teacher[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('email', formData.email);
    data.append('bio', formData.bio);

    // Optimistic Update or Wait needs handling?
    // For now simple wait
    const res = await createTeacher(data);
    if (res.success) {
      setIsModalOpen(false);
      setFormData({ name: '', role: '', email: '', bio: '' });
      fetchTeachers();
    } else {
      alert("Failed to create teacher");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteTeacher(id);
      fetchTeachers();
    }
  };

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Teachers Management</h1>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
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
        {isLoading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        ) : (
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
                        {/* Placeholder or actual image */}
                        <Image
                          src={teacher.image || '/webImages/img5.jpg'}
                          alt={teacher.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <span>{teacher.name}</span>
                    </div>
                  </td>
                  <td>{teacher.role}</td>
                  <td>{teacher.email}</td>
                  <td>
                    <div className="actions">
                      <button className="action-btn delete" title="Delete" onClick={() => handleDelete(teacher.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>Add Teacher</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input type="text" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Existing Styles ... */
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
          cursor: pointer;
          display: flex; gap: 8px; align-items: center;
        }
        .controls-row { margin-bottom: 24px; }
        .search-box {
          background: white; padding: 10px 20px; border-radius: 30px;
          display: flex; align-items: center; gap: 10px; width: 300px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.02);
        }
        .search-box input { border: none; outline: none; width: 100%; color: #2B3674; }
        .table-container { background: white; padding: 20px; border-radius: 20px; box-shadow: 0px 18px 40px rgba(112, 144, 176, 0.12); }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px 20px; color: #A3AED0; border-bottom: 1px solid #E9EDF7; }
        td { padding: 16px 20px; color: #2B3674; border-bottom: 1px solid #E9EDF7; }
        .teacher-cell { display: flex; align-items: center; gap: 12px; }
        .avatar-small img { border-radius: 50%; }
        .action-btn { width: 32px; height: 32px; border-radius: 8px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .action-btn.delete { background: #FEEEEE; color: #D32F2F; }

        /* Modal Styles */
        .admin-modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(5px);
            display: flex; justify-content: center; align-items: center;
            z-index: 9999;
        }
        .admin-modal {
            display: block !important; /* Force display to override any conflicts */
            background: #ffffff; 
            padding: 30px; 
            border-radius: 20px;
            width: 500px;
            max-width: 90%;
            position: relative;
            z-index: 10000;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .form-group { margin-bottom: 20px; }
        .form-group label { 
            display: block; 
            margin-bottom: 8px; 
            font-weight: 600; 
            color: #2B3674; 
            font-size: 14px;
        }
        .form-group input, .form-group textarea {
            width: 100%; 
            padding: 12px; 
            border: 1px solid #E9EDF7; 
            border-radius: 12px;
            background: #F4F7FE;
            color: #2B3674;
            font-size: 14px;
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-color: #4318FF;
            background: #ffffff;
        }
        .modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
        .modal-actions button {
            padding: 10px 24px;
            border-radius: 10px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        .modal-actions button[type="button"] {
            background: transparent;
            border: 1px solid #E9EDF7;
            color: #A3AED0;
        }
        .modal-actions button[type="button"]:hover {
            background: #F4F7FE;
            color: #2B3674;
        }
        .save-btn { 
            background: #4318FF; 
            color: white; 
            border: none; 
        }
        .save-btn:hover {
            background: #3311db;
        }
      `}</style>
    </div>
  );
}
