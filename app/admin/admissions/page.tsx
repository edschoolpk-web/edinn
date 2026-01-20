"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import {
    getAdmissionApplications,
    updateAdmissionStatus,
    deleteAdmissionApplication,
} from "@/app/actions/admissions";
import { toAbsoluteUploadsUrl } from "@/lib/image-utils";

interface AdmissionApplication {
    id: string;
    admissionClass: string;
    session: string;
    studentName: string;
    gender: string;
    dob: string;
    bform: string | null;
    lastSchool: string | null;
    address: string;
    fatherName: string;
    fatherCnic: string;
    fatherOccupation: string | null;
    fatherCell: string;
    email: string;
    motherName: string | null;
    motherOccupation: string | null;
    motherCell: string | null;
    emergencyName: string;
    emergencyPhone: string;
    studentImage: string | null;
    status: string;
    meetingDate: Date | null;
    meetingTime: string | null;
    createdAt: Date;
}

export default function AdmissionsPage() {
    const [applications, setApplications] = useState<AdmissionApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewModal, setViewModal] = useState<{ open: boolean; app: AdmissionApplication | null }>({ open: false, app: null });
    const [filter, setFilter] = useState("all");

    const loadApplications = async () => {
        setLoading(true);
        try {
            const data = await getAdmissionApplications() as any;
            setApplications(data);
        } catch {
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const handleView = async (app: AdmissionApplication) => {
        setViewModal({ open: true, app });
        if (app.status === "NEW") {
            await updateAdmissionStatus(app.id, "VIEWED");
            loadApplications();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this application permanently?")) return;
        try {
            await deleteAdmissionApplication(id);
            toast.success("Deleted!");
            loadApplications();
        } catch {
            toast.error("Failed to delete");
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await updateAdmissionStatus(id, status);
            toast.success("Status updated!");
            loadApplications();
        } catch {
            toast.error("Failed to update");
        }
    };

    const filteredApps = applications.filter(app =>
        filter === "all" ? true : app.status === filter
    );

    const getStatusStyle = (status: string) => {
        const styles: Record<string, { bg: string; color: string; icon: string }> = {
            NEW: { bg: "#E6F7FF", color: "#1890FF", icon: "fa-baby" },
            VIEWED: { bg: "#FFF7E6", color: "#FAAD14", icon: "fa-eye" },
            ENROLLED: { bg: "#F6FFED", color: "#52C41A", icon: "fa-user-check" },
        };
        return styles[status] || styles.NEW;
    };

    return (
        <div className="admin-page-container">
            {/* Header Section */}
            <div className="admin-header-card">
                <div className="header-info">
                    <div className="header-icon">
                        <i className="fas fa-user-graduate"></i>
                    </div>
                    <div>
                        <h1 className="header-title">Admission Applications</h1>
                        <p className="header-subtitle">Manage new student enrollments and reviews.</p>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="filter-group">
                        {["all", "NEW", "VIEWED", "ENROLLED"].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`filter-btn ${filter === f ? 'active' : ''}`}
                            >
                                {f === "all" ? "All" : f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="premium-table-card">
                {loading ? (
                    <div className="table-loader">
                        <i className="fas fa-circle-notch fa-spin"></i>
                        <span>Loading applications...</span>
                    </div>
                ) : filteredApps.length === 0 ? (
                    <div className="table-empty-state">
                        <i className="fas fa-user-slash"></i>
                        <p>No admission applications found.</p>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Class & Session</th>
                                    <th>Parent Info</th>
                                    <th>Submission</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.map(app => {
                                    const statusStyle = getStatusStyle(app.status);
                                    return (
                                        <tr key={app.id}>
                                            <td>
                                                <div className="student-cell">
                                                    <div className="student-avatar">
                                                        {app.studentImage ? (
                                                            <img src={toAbsoluteUploadsUrl(app.studentImage)} alt={app.studentName} />
                                                        ) : (
                                                            <i className="fa fa-user"></i>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="student-name">{app.studentName}</span>
                                                        <span className="student-gender">{app.gender} • {app.dob}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="class-cell">
                                                    <span className="class-badge">{app.admissionClass}</span>
                                                    <span className="session-text">{app.session}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="parent-cell">
                                                    <span className="parent-name">{app.fatherName}</span>
                                                    <span className="parent-phone">{app.fatherCell}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="date-text">{new Date(app.createdAt).toLocaleDateString("en-PK")}</span>
                                            </td>
                                            <td>
                                                <span className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                                                    <i className={`fas ${statusStyle.icon} mr-1`}></i>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button onClick={() => handleView(app)} className="action-btn view" title="View Profile">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <select
                                                        value={app.status}
                                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                        className="status-selector"
                                                    >
                                                        <option value="NEW">New</option>
                                                        <option value="VIEWED">Viewed</option>
                                                        <option value="ENROLLED">Enrolled</option>
                                                    </select>
                                                    <button onClick={() => handleDelete(app.id)} className="action-btn delete" title="Delete">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {viewModal.open && viewModal.app && (
                <div className="modal-overlay" onClick={() => setViewModal({ open: false, app: null })}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Student Profile</h3>
                            <button onClick={() => setViewModal({ open: false, app: null })} className="modal-close">&times;</button>
                        </div>
                        <div className="modal-body profile-layout">
                            {/* Left Side: Photo & Quick Stats */}
                            <div className="profile-sidebar">
                                <div className="profile-photo-container">
                                    {viewModal.app.studentImage ? (
                                        <img src={toAbsoluteUploadsUrl(viewModal.app.studentImage)} alt={viewModal.app.studentName} className="profile-photo" />
                                    ) : (
                                        <div className="profile-photo-placeholder">
                                            <i className="fa fa-user"></i>
                                        </div>
                                    )}
                                </div>
                                <div className="profile-quick-info">
                                    <h3>{viewModal.app.studentName}</h3>
                                    <span className="profile-badge">{viewModal.app.admissionClass}</span>
                                    <div className="profile-meta">
                                        <span><i className="fa fa-venus-mars"></i> {viewModal.app.gender}</span>
                                        <span><i className="fa fa-calendar-alt"></i> {viewModal.app.dob}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Tabular Info */}
                            <div className="profile-main">
                                <div className="detail-section">
                                    <h4>Basic Admission Info</h4>
                                    <div className="details-grid">
                                        <DetailRow label="Class" value={viewModal.app.admissionClass} />
                                        <DetailRow label="Session" value={viewModal.app.session} />
                                        <DetailRow label="B-Form Number" value={viewModal.app.bform || "N/A"} />
                                        <DetailRow label="Previous School" value={viewModal.app.lastSchool || "None"} />
                                        {viewModal.app.meetingDate && (
                                            <DetailRow
                                                label="Visit Appointment"
                                                value={`${new Date(viewModal.app.meetingDate).toLocaleDateString("en-PK", { timeZone: "Asia/Karachi", dateStyle: 'medium' })} at ${viewModal.app.meetingTime}`}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="detail-section">
                                    <h4>Family Information</h4>
                                    <div className="details-grid">
                                        <DetailRow label="Father Name" value={viewModal.app.fatherName} />
                                        <DetailRow label="Father CNIC" value={viewModal.app.fatherCnic} />
                                        <DetailRow label="Father Occupation" value={viewModal.app.fatherOccupation || "N/A"} />
                                        <DetailRow label="Mother Name" value={viewModal.app.motherName || "N/A"} />
                                        <DetailRow label="Emergency Contact" value={viewModal.app.emergencyName} />
                                        <DetailRow label="Emergency Phone" value={viewModal.app.emergencyPhone} />
                                    </div>
                                </div>

                                <div className="detail-section full-width">
                                    <h4>Contact Details</h4>
                                    <div className="details-grid">
                                        <DetailRow label="Primary Mobile" value={viewModal.app.fatherCell} />
                                        <DetailRow label="Email Address" value={viewModal.app.email} />
                                        <DetailRow label="Residential Address" value={viewModal.app.address} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .admin-page-container {
                    padding-bottom: 40px;
                    animation: fadeIn 0.5s ease;
                }

                /* Header Card */
                .admin-header-card {
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                    border: 1px solid rgba(0,0,0,0.02);
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .header-info {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .header-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #868CFF 0%, #4318FF 100%);
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    box-shadow: 0 10px 20px rgba(67, 24, 255, 0.15);
                }

                .header-title {
                    margin: 0;
                    font-size: 24px;
                    font-weight: 800;
                    color: #2B3674;
                }

                .header-subtitle {
                    margin: 4px 0 0;
                    color: #A3AED0;
                    font-size: 14px;
                    font-weight: 500;
                }

                /* Filters */
                .filter-group {
                    display: flex;
                    background: #F4F7FE;
                    padding: 6px;
                    border-radius: 14px;
                    gap: 5px;
                }

                .filter-btn {
                    padding: 10px 20px;
                    border-radius: 10px;
                    border: none;
                    background: transparent;
                    color: #A3AED0;
                    font-weight: 700;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .filter-btn.active {
                    background: white;
                    color: #4318FF;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                /* Table Styling */
                .premium-table-card {
                    background: white;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 4px 25px rgba(0,0,0,0.03);
                    border: 1px solid rgba(0,0,0,0.02);
                }

                .table-loader, .table-empty-state {
                    padding: 80px 20px;
                    text-align: center;
                    color: #A3AED0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }

                .table-loader i { font-size: 40px; color: #4318FF; }

                .premium-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .premium-table th {
                    text-align: left;
                    padding: 20px 24px;
                    background: #F8FAFC;
                    color: #A3AED0;
                    font-size: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .premium-table td {
                    padding: 20px 24px;
                    border-bottom: 1px solid #F4F7FE;
                    vertical-align: middle;
                }

                .student-cell { display: flex; align-items: center; gap: 15px; }
                .student-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #F4F7FE;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #A3AED0;
                    border: 1px solid #E0E5F2;
                }
                .student-avatar img { width: 100%; height: 100%; object-fit: cover; }
                .student-name { display: block; font-weight: 700; color: #2B3674; font-size: 15px; }
                .student-gender { display: block; font-size: 12px; color: #A3AED0; }

                .class-badge {
                    display: inline-block;
                    padding: 4px 10px;
                    background: #E6F7FF;
                    color: #1890FF;
                    border-radius: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    margin-bottom: 4px;
                }
                .session-text { display: block; font-size: 12px; color: #A3AED0; }

                .parent-name { display: block; font-weight: 600; color: #2B3674; font-size: 14px; }
                .parent-phone { display: block; font-size: 12px; color: #A3AED0; }

                .status-badge {
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    display: inline-flex;
                    align-items: center;
                }

                .actions-cell { display: flex; align-items: center; gap: 10px; justify-content: flex-end; }
                .action-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .action-btn.view { background: #F4F7FE; color: #4318FF; }
                .action-btn.view:hover { background: #4318FF; color: white; }
                .action-btn.delete { background: #FFF1F0; color: #FF4D4F; }
                .action-btn.delete:hover { background: #FF4D4F; color: white; }

                .status-selector {
                    padding: 8px 12px;
                    border-radius: 10px;
                    border: 1px solid #E0E5F2;
                    background: white;
                    font-size: 12px;
                    font-weight: 600;
                    color: #2B3674;
                }

                /* Modal Styling */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(11, 14, 35, 0.6);
                    backdrop-filter: blur(5px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .modal-container {
                    background: #fff;
                    border-radius: 24px;
                    width: 100%;
                    max-width: 900px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px #0003;
                    max-height: 670px;
                    overflow-y: scroll;
                }
                .modal-header {
                    padding: 24px 30px;
                    border-bottom: 1px solid #F4F7FE;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #F8FAFC;
                }
                .modal-title { margin: 0; font-size: 20px; font-weight: 800; color: #2B3674; }
                .modal-close { font-size: 28px; color: #A3AED0; background: none; border: none; cursor: pointer; }

                .modal-body.profile-layout {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    padding: 0;
                }
                .profile-sidebar {
                    padding: 40px 30px;
                    background: #F8FAFC;
                    border-right: 1px solid #F4F7FE;
                    text-align: center;
                }
                .profile-photo-container {
                    width: 180px;
                    height: 180px;
                    border-radius: 30px;
                    overflow: hidden;
                    margin: 0 auto 25px;
                    border: 5px solid white;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    background: white;
                }
                .profile-photo { width: 100%; height: 100%; object-fit: cover; object-position:top;}
                .profile-photo-placeholder {
                    width: 100%; height: 100%;
                    display: flex; align-items: center; justify-content: center;
                    background: #E0E5F2; color: #A3AED0; font-size: 60px;
                }
                .profile-quick-info h3 { margin: 0; font-size: 22px; color: #2B3674; font-weight: 800; }
                .profile-badge {
                    display: inline-block;
                    margin: 10px 0;
                    background: #4318FF;
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-weight: 700;
                    font-size: 13px;
                }
                .profile-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 20px;
                    color: #A3AED0;
                    font-size: 14px;
                }
                .profile-meta span i { color: #4318FF; margin-right: 8px; width: 15px; }

                .profile-main { padding: 40px; }
                .detail-section { margin-bottom: 30px; }
                .detail-section h4 {
                    margin: 0 0 15px;
                    font-size: 14px;
                    font-weight: 800;
                    color: #4318FF;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-bottom: 2px solid #F4F7FE;
                    padding-bottom: 8px;
                }
                .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 900px) {
                    .modal-body.profile-layout { grid-template-columns: 1fr; }
                    .profile-sidebar { border-right: none; border-bottom: 1px solid #F4F7FE; }
                }
            `}</style>
        </div>
    );
}

function DetailRow({ label, value, fullWidth }: { label: string; value: string; fullWidth?: boolean }) {
    return (
        <div style={{ gridColumn: fullWidth ? "1 / -1" : undefined, marginBottom: "10px" }}>
            <div style={{ fontSize: "11px", color: "#A3AED0", fontWeight: "700", textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
            <div style={{ fontSize: "14px", color: "#2B3674", fontWeight: "600" }}>{value}</div>
        </div>
    );
}

