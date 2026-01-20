"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
    getCareerApplications,
    updateCareerStatus,
    deleteCareerApplication,
} from "@/app/actions/careers";
import { toAbsoluteUploadsUrl } from "@/lib/image-utils";

interface CareerApplication {
    id: string;
    post: string;
    fullName: string;
    guardianName: string;
    cnic: string;
    phone: string;
    email: string | null;
    gender: string;
    dob: string;
    maritalStatus: string;
    qualification: string;
    experienceYears: string;
    subjectArea: string;
    lastInstitute: string;
    city: string;
    expectedSalary: string | null;
    address: string;
    message: string | null;
    cvFile: string | null;
    status: string;
    meetingDate: Date | null;
    meetingTime: string | null;
    createdAt: Date;
}

export default function CareersPage() {
    const [applications, setApplications] = useState<CareerApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewModal, setViewModal] = useState<{ open: boolean; app: CareerApplication | null }>({ open: false, app: null });
    const [filter, setFilter] = useState("all");

    const loadApplications = async () => {
        setLoading(true);
        try {
            const data = await getCareerApplications() as any;
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

    const handleView = async (app: CareerApplication) => {
        setViewModal({ open: true, app });
        if (app.status === "NEW") {
            await updateCareerStatus(app.id, "VIEWED");
            loadApplications();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this application permanently?")) return;
        try {
            await deleteCareerApplication(id);
            toast.success("Deleted!");
            loadApplications();
        } catch {
            toast.error("Failed to delete");
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await updateCareerStatus(id, status);
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
            NEW: { bg: "#E6F7FF", color: "#1890FF", icon: "fa-envelope" },
            VIEWED: { bg: "#FFF7E6", color: "#FAAD14", icon: "fa-eye" },
            CONTACTED: { bg: "#F6FFED", color: "#52C41A", icon: "fa-phone" },
        };
        return styles[status] || styles.NEW;
    };

    return (
        <div className="admin-page-container">
            {/* Header Section */}
            <div className="admin-header-card">
                <div className="header-info">
                    <div className="header-icon">
                        <i className="fas fa-briefcase"></i>
                    </div>
                    <div>
                        <h1 className="header-title">Career Applications</h1>
                        <p className="header-subtitle">Review and manage job applications for teaching positions.</p>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="filter-group">
                        {["all", "NEW", "VIEWED", "CONTACTED"].map(f => (
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
                        <span>Fetching applications...</span>
                    </div>
                ) : filteredApps.length === 0 ? (
                    <div className="table-empty-state">
                        <i className="fas fa-folder-open"></i>
                        <p>No career applications found matching the criteria.</p>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table className="premium-table">
                            <thead>
                                <tr>
                                    <th>Applicant</th>
                                    <th>Post Applied</th>
                                    <th>Contact Info</th>
                                    <th>CV / Resume</th>
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
                                                <div className="applicant-cell">
                                                    <span className="applicant-name">{app.fullName}</span>
                                                    <span className="applicant-date">{new Date(app.createdAt).toLocaleDateString("en-PK")}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="post-badge">{app.post}</span>
                                            </td>
                                            <td>
                                                <div className="contact-cell">
                                                    <span><i className="fas fa-phone mr-1"></i> {app.phone}</span>
                                                    {app.email && <span className="email-text"><i className="fas fa-envelope mr-1"></i> {app.email}</span>}
                                                </div>
                                            </td>
                                            <td>
                                                {app.cvFile ? (
                                                    <a
                                                        href={toAbsoluteUploadsUrl(app.cvFile)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="cv-download-btn"
                                                    >
                                                        <i className="fas fa-file-pdf"></i> View CV
                                                    </a>
                                                ) : (
                                                    <span className="text-muted text-xs">No CV uploaded</span>
                                                )}
                                            </td>
                                            <td>
                                                <span className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                                                    <i className={`fas ${statusStyle.icon} mr-1`}></i>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="actions-cell">
                                                    <button onClick={() => handleView(app)} className="action-btn view" title="View Details">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <select
                                                        value={app.status}
                                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                        className="status-selector"
                                                    >
                                                        <option value="NEW">New</option>
                                                        <option value="VIEWED">Viewed</option>
                                                        <option value="CONTACTED">Contacted</option>
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
                            <h3 className="modal-title">Application Details</h3>
                            <button onClick={() => setViewModal({ open: false, app: null })} className="modal-close">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="details-grid">
                                <div className="detail-section">
                                    <h4>Personal Information</h4>
                                    <DetailRow label="Full Name" value={viewModal.app.fullName} />
                                    <DetailRow label="Guardian Name" value={viewModal.app.guardianName} />
                                    <DetailRow label="CNIC" value={viewModal.app.cnic} />
                                    <DetailRow label="Gender" value={viewModal.app.gender} />
                                    <DetailRow label="DOB" value={viewModal.app.dob} />
                                    <DetailRow label="Marital Status" value={viewModal.app.maritalStatus} />
                                    {viewModal.app.meetingDate && (
                                        <DetailRow
                                            label="Interview Slot"
                                            value={`${new Date(viewModal.app.meetingDate).toLocaleDateString("en-PK", { timeZone: "Asia/Karachi", dateStyle: 'medium' })} at ${viewModal.app.meetingTime}`}
                                        />
                                    )}
                                </div>
                                <div className="detail-section">
                                    <h4>Professional Info</h4>
                                    <DetailRow label="Applying For" value={viewModal.app.post} />
                                    <DetailRow label="Qualification" value={viewModal.app.qualification} />
                                    <DetailRow label="Experience" value={viewModal.app.experienceYears + " Years"} />
                                    <DetailRow label="Subject Area" value={viewModal.app.subjectArea} />
                                    <DetailRow label="Last Institute" value={viewModal.app.lastInstitute} />
                                    <DetailRow label="Expected Salary" value={viewModal.app.expectedSalary || "N/A"} />
                                </div>
                                <div className="detail-section full-width">
                                    <h4>Contact & Location</h4>
                                    <div className="grid-3">
                                        <DetailRow label="Phone" value={viewModal.app.phone} />
                                        <DetailRow label="Email" value={viewModal.app.email || "N/A"} />
                                        <DetailRow label="City" value={viewModal.app.city} />
                                    </div>
                                    <DetailRow label="Residential Address" value={viewModal.app.address} />
                                </div>
                                {viewModal.app.message && (
                                    <div className="detail-section full-width">
                                        <h4>Message / Note</h4>
                                        <p className="message-text">{viewModal.app.message}</p>
                                    </div>
                                )}
                                <div className="detail-section full-width">
                                    <h4>Resume / CV</h4>
                                    {viewModal.app.cvFile ? (
                                        <div className="cv-box">
                                            <div className="cv-info">
                                                <i className="fas fa-file-pdf"></i>
                                                <span>Curriculum Vitae (PDF/Doc)</span>
                                            </div>
                                            <a
                                                href={toAbsoluteUploadsUrl(viewModal.app.cvFile)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cv-large-btn"
                                            >
                                                <i className="fas fa-external-link-alt mr-2"></i> Open & Download CV
                                            </a>
                                        </div>
                                    ) : (
                                        <p className="text-danger font-bold">No CV file was uploaded with this application.</p>
                                    )}
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
                    background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    box-shadow: 0 10px 20px rgba(245, 124, 0, 0.2);
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

                /* Table Card */
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
                .table-empty-state i { font-size: 50px; opacity: 0.3; }

                .table-wrapper { overflow-x: auto; }

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
                    transition: all 0.2s;
                }

                .premium-table tr:hover td {
                    background: #F8FAFC;
                }

                .applicant-cell { display: flex; flex-direction: column; }
                .applicant-name { font-weight: 700; color: #2B3674; font-size: 15px; }
                .applicant-date { font-size: 12px; color: #A3AED0; margin-top: 2px; }

                .post-badge {
                    padding: 6px 12px;
                    background: #F0F5FF;
                    color: #2F54EB;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .contact-cell { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #475569; }
                .email-text { color: #A3AED0; font-size: 12px; }

                .status-badge {
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    display: inline-flex;
                    align-items: center;
                }

                .cv-download-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 14px;
                    background: #4318FF;
                    color: white;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: 700;
                    transition: all 0.2s;
                    box-shadow: 0 4px 10px rgba(67, 24, 255, 0.15);
                }

                .cv-download-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(67, 24, 255, 0.25);
                }

                .actions-cell {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    justify-content: flex-end;
                }

                .action-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
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
                    cursor: pointer;
                    outline: none;
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
                    max-width: 800px;
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

                .modal-body { padding: 30px; max-height: 80vh; overflow-y: auto; }

                .details-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
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
                .full-width { grid-column: span 2; }
                .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

                .message-text {
                    background: #F8FAFC;
                    padding: 15px;
                    border-radius: 12px;
                    font-size: 14px;
                    color: #475569;
                    line-height: 1.6;
                    border: 1px solid #E0E5F2;
                }

                .cv-box {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #F0F5FF;
                    padding: 20px;
                    border-radius: 16px;
                    border: 1px dashed #2F54EB;
                }

                .cv-info { display: flex; align-items: center; gap: 15px; color: #2F54EB; font-weight: 700; }
                .cv-info i { font-size: 32px; }

                .cv-large-btn {
                    padding: 12px 24px;
                    background: #2F54EB;
                    color: white;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 14px;
                    box-shadow: 0 8px 16px rgba(47, 84, 235, 0.2);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                @media (max-width: 768px) {
                    .details-grid { grid-template-columns: 1fr; }
                    .full-width { grid-column: span 1; }
                    .grid-3 { grid-template-columns: 1fr; }
                    .cv-box { flex-direction: column; gap: 20px; text-align: center; }
                }
            `}</style>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ marginBottom: "15px" }}>
            <div style={{ fontSize: "11px", color: "#A3AED0", fontWeight: "700", textTransform: "uppercase", marginBottom: "3px" }}>{label}</div>
            <div style={{ fontSize: "14px", color: "#2B3674", fontWeight: "600" }}>{value}</div>
        </div>
    );
}

