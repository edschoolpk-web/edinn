"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import {
    getAppointments,
    acceptAppointment,
    rejectAppointment,
    rescheduleAppointment,
    deleteAppointment,
    getTimeSettings,
    updateTimeSettings,
    getPrincipalSlots,
    createPrincipalSlot,
    deletePrincipalSlot,
    togglePrincipalSlot,
    getDayAvailability,
    toggleDayAvailability,
    getBlockedDates,
    addBlockedDate,
    removeBlockedDate,
} from "@/app/actions/appointments";

interface Appointment {
    id: string;
    name: string;
    email: string;
    phone: string;
    purpose: string;
    date: Date;
    timeSlot: string;
    message?: string | null;
    status: string;
    adminNote?: string | null;
    createdAt: Date;
}

interface PrincipalSlot {
    id: string;
    date?: Date | null;
    dayOfWeek?: number | null;
    time: string;
    isActive: boolean;
}

interface DateAvailabilityType {
    id: string;
    dayOfWeek: number;
    isAvailable: boolean;
}

interface BlockedDateType {
    id: string;
    date: Date;
    reason?: string | null;
}

const TABS = [
    { id: "submissions", label: "📋 Submissions", icon: "📋" },
    { id: "time-settings", label: "⏰ Time Settings", icon: "⏰" },
    { id: "principal-slots", label: "👔 Principal Slots", icon: "👔" },
    { id: "day-availability", label: "📅 Day Availability", icon: "📅" },
    { id: "blocked-dates", label: "🚫 Blocked Dates", icon: "🚫" },
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
    PENDING: { bg: "#fef3c7", text: "#92400e" },
    CONFIRMED: { bg: "#d1fae5", text: "#065f46" },
    REJECTED: { bg: "#fee2e2", text: "#991b1b" },
    RESCHEDULED: { bg: "#dbeafe", text: "#1e40af" },
};

export default function AppointmentsPage() {
    const [activeTab, setActiveTab] = useState("submissions");

    return (
        <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px", color: "#1e293b" }}>
                📅 Appointment Management
            </h1>

            {/* Tabs */}
            <div style={{
                display: "flex",
                gap: "8px",
                marginBottom: "24px",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "12px",
                overflowX: "auto"
            }}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            background: activeTab === tab.id ? "#1e3a5f" : "#f1f5f9",
                            color: activeTab === tab.id ? "#fff" : "#475569",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            whiteSpace: "nowrap",
                            fontSize: "14px"
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "submissions" && <SubmissionsTab />}
            {activeTab === "time-settings" && <TimeSettingsTab />}
            {activeTab === "principal-slots" && <PrincipalSlotsTab />}
            {activeTab === "day-availability" && <DayAvailabilityTab />}
            {activeTab === "blocked-dates" && <BlockedDatesTab />}

            {/* DatePicker Styles */}
            <style>{`
                .custom-datepicker,
                .react-datepicker-wrapper input,
                .datepicker-wrapper-full input {
                    width: 100% !important;
                    padding: 12px 16px !important;
                    border: 2px solid #e2e8f0 !important;
                    border-radius: 10px !important;
                    font-size: 15px !important;
                    background-color: #fff !important;
                    transition: all 0.2s !important;
                    box-sizing: border-box !important;
                }
                
                .custom-datepicker:focus,
                .react-datepicker-wrapper input:focus,
                .datepicker-wrapper-full input:focus {
                    border-color: #1e3a5f !important;
                    outline: none !important;
                }
                
                .react-datepicker-wrapper,
                .datepicker-wrapper-full {
                    width: 100% !important;
                }
                
                .react-datepicker__input-container {
                    width: 100% !important;
                }
                
                .react-datepicker {
                    border: 1px solid #e2e8f0 !important;
                    border-radius: 12px !important;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1) !important;
                }
                
                .react-datepicker__header {
                    background: #1e3a5f !important;
                    border-bottom: none !important;
                    border-radius: 12px 12px 0 0 !important;
                    padding: 16px !important;
                }
                
                .react-datepicker__current-month,
                .react-datepicker__day-name {
                    color: #fff !important;
                }
                
                .react-datepicker__day--selected {
                    background: #1e3a5f !important;
                    border-radius: 8px !important;
                }
                
                .react-datepicker__day:hover {
                    background: #f0f9ff !important;
                    border-radius: 8px !important;
                }
                
                .react-datepicker__navigation {
                    top: 10px !important;
                }
                
                .react-datepicker__navigation--previous {
                    left: 10px !important;
                }
                
                .react-datepicker__navigation--next {
                    right: 10px !important;
                }
                
                .react-datepicker__navigation-icon::before {
                    border-color: #fff !important;
                }
            `}</style>
        </div>
    );
}

// ============ SUBMISSIONS TAB ============

function SubmissionsTab() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: "all",
        purpose: "all",
        search: ""
    });
    const [rescheduleModal, setRescheduleModal] = useState<{
        open: boolean;
        appointment?: Appointment;
        newDate?: Date;
        newTime?: string;
        note?: string;
    }>({ open: false });
    const [rejectModal, setRejectModal] = useState<{
        open: boolean;
        appointment?: Appointment;
        reason?: string;
    }>({ open: false });

    useEffect(() => {
        loadAppointments();
    }, [filters]);

    const loadAppointments = async () => {
        setLoading(true);
        const data = await getAppointments(filters);
        setAppointments(data);
        setLoading(false);
    };

    const handleAccept = async (id: string) => {
        if (!confirm("Confirm this appointment?")) return;
        const loadingToast = toast.loading("Sending confirmation...");
        try {
            await acceptAppointment(id);
            toast.success("Appointment confirmed & email sent!", { id: loadingToast });
            loadAppointments();
        } catch {
            toast.error("Failed to confirm appointment", { id: loadingToast });
        }
    };

    const handleReject = async () => {
        if (!rejectModal.appointment) return;
        const loadingToast = toast.loading("Sending rejection...");
        try {
            await rejectAppointment(rejectModal.appointment.id, rejectModal.reason);
            toast.success("Appointment rejected & email sent!", { id: loadingToast });
            setRejectModal({ open: false });
            loadAppointments();
        } catch {
            toast.error("Failed to reject appointment", { id: loadingToast });
        }
    };

    const handleReschedule = async () => {
        if (!rescheduleModal.appointment || !rescheduleModal.newDate || !rescheduleModal.newTime) {
            toast.error("Please select date and time");
            return;
        }
        const loadingToast = toast.loading("Rescheduling...");
        try {
            // Normalize date to noon local time to avoid timezone issues
            const normalizedDate = new Date(rescheduleModal.newDate);
            normalizedDate.setHours(12, 0, 0, 0);

            await rescheduleAppointment(
                rescheduleModal.appointment.id,
                normalizedDate,
                rescheduleModal.newTime,
                rescheduleModal.note
            );
            toast.success("Appointment rescheduled & email sent!", { id: loadingToast });
            setRescheduleModal({ open: false });
            loadAppointments();
        } catch {
            toast.error("Failed to reschedule", { id: loadingToast });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this appointment permanently?")) return;
        try {
            await deleteAppointment(id);
            toast.success("Deleted!");
            loadAppointments();
        } catch {
            toast.error("Failed to delete");
        }
    };

    return (
        <div>
            {/* Filters */}
            <div style={{
                display: "flex",
                gap: "12px",
                marginBottom: "20px",
                flexWrap: "wrap",
                alignItems: "center"
            }}>
                <input
                    type="text"
                    placeholder="Search name, email, phone..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    style={{
                        padding: "10px 16px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        width: "250px",
                        fontSize: "14px"
                    }}
                />
                <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    style={{
                        padding: "10px 16px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "14px",
                        background: "#fff"
                    }}
                >
                    <option value="all">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="RESCHEDULED">Rescheduled</option>
                </select>
                <select
                    value={filters.purpose}
                    onChange={(e) => setFilters(prev => ({ ...prev, purpose: e.target.value }))}
                    style={{
                        padding: "10px 16px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        fontSize: "14px",
                        background: "#fff"
                    }}
                >
                    <option value="all">All Purposes</option>
                    <option value="Admission">Admission</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Academic">Academic</option>
                    <option value="Fees">Fees</option>
                    <option value="Principal">Principal</option>
                </select>
            </div>

            {/* Table */}
            <div style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden"
            }}>
                {loading ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading...</div>
                ) : appointments.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>No appointments found</div>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#f8fafc" }}>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Contact</th>
                                <th style={thStyle}>Purpose</th>
                                <th style={thStyle}>Date & Time</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(apt => (
                                <tr key={apt.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                                    <td style={tdStyle}>
                                        <strong>{apt.name}</strong>
                                        <div style={{ fontSize: "12px", color: "#64748b" }}>
                                            {new Date(apt.createdAt).toLocaleDateString("en-PK", { timeZone: "Asia/Karachi" })}
                                        </div>
                                    </td>
                                    <td style={tdStyle}>
                                        <div>{apt.email}</div>
                                        <div style={{ fontSize: "13px", color: "#64748b" }}>{apt.phone}</div>
                                    </td>
                                    <td style={tdStyle}>{apt.purpose}</td>
                                    <td style={tdStyle}>
                                        <div>{new Date(apt.date).toLocaleDateString("en-PK", { timeZone: "Asia/Karachi", weekday: "short", month: "short", day: "numeric" })}</div>
                                        <div style={{ fontSize: "13px", color: "#64748b" }}>{apt.timeSlot}</div>
                                    </td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            padding: "4px 10px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            background: STATUS_COLORS[apt.status]?.bg || "#f1f5f9",
                                            color: STATUS_COLORS[apt.status]?.text || "#475569"
                                        }}>
                                            {apt.status}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                            {apt.status === "PENDING" && (
                                                <>
                                                    <button onClick={() => handleAccept(apt.id)} style={acceptBtnStyle}>✓ Accept</button>
                                                    <button onClick={() => setRejectModal({ open: true, appointment: apt })} style={rejectBtnStyle}>✗ Reject</button>
                                                    <button onClick={() => setRescheduleModal({ open: true, appointment: apt })} style={rescheduleBtnStyle}>🔄</button>
                                                </>
                                            )}
                                            <button onClick={() => handleDelete(apt.id)} style={deleteBtnStyle}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Reject Modal */}
            {rejectModal.open && (
                <Modal onClose={() => setRejectModal({ open: false })}>
                    <h3 style={{ marginTop: 0 }}>Reject Appointment</h3>
                    <p>Rejecting appointment for <strong>{rejectModal.appointment?.name}</strong></p>
                    <textarea
                        placeholder="Reason for rejection (optional)"
                        value={rejectModal.reason || ""}
                        onChange={(e) => setRejectModal(prev => ({ ...prev, reason: e.target.value }))}
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            marginBottom: "16px",
                            minHeight: "80px",
                            fontSize: "14px"
                        }}
                    />
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button onClick={() => setRejectModal({ open: false })} style={cancelBtnStyle}>Cancel</button>
                        <button onClick={handleReject} style={rejectBtnStyle}>Send Rejection</button>
                    </div>
                </Modal>
            )}

            {/* Reschedule Modal */}
            {rescheduleModal.open && (
                <Modal onClose={() => setRescheduleModal({ open: false })}>
                    <h3 style={{ marginTop: 0 }}>Reschedule Appointment</h3>
                    <p>Rescheduling for <strong>{rescheduleModal.appointment?.name}</strong></p>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>New Date</label>
                        <DatePicker
                            selected={rescheduleModal.newDate}
                            onChange={(date: Date | null) => setRescheduleModal(prev => ({ ...prev, newDate: date || undefined }))}
                            minDate={new Date()}
                            filterDate={(date: Date) => date.getDay() !== 0}
                            dateFormat="EEEE, MMMM d, yyyy"
                            className="custom-datepicker"
                            wrapperClassName="datepicker-wrapper"
                        />
                    </div>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>New Time</label>
                        <input
                            type="time"
                            value={rescheduleModal.newTime || ""}
                            onChange={(e) => setRescheduleModal(prev => ({ ...prev, newTime: e.target.value }))}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                fontSize: "14px"
                            }}
                        />
                    </div>
                    <textarea
                        placeholder="Note for user (optional)"
                        value={rescheduleModal.note || ""}
                        onChange={(e) => setRescheduleModal(prev => ({ ...prev, note: e.target.value }))}
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            marginBottom: "16px",
                            minHeight: "60px",
                            fontSize: "14px"
                        }}
                    />
                    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button onClick={() => setRescheduleModal({ open: false })} style={cancelBtnStyle}>Cancel</button>
                        <button onClick={handleReschedule} style={rescheduleBtnStyle}>Reschedule & Send Email</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// ============ TIME SETTINGS TAB ============

function TimeSettingsTab() {
    const [startTime, setStartTime] = useState("10:00");
    const [endTime, setEndTime] = useState("14:00");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const settings = await getTimeSettings();
        if (settings) {
            setStartTime(settings.startTime);
            setEndTime(settings.endTime);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (startTime >= endTime) {
            toast.error("Start time must be before end time");
            return;
        }
        setSaving(true);
        try {
            await updateTimeSettings(startTime, endTime);
            toast.success("Time settings saved!");
        } catch {
            toast.error("Failed to save");
        }
        setSaving(false);
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

    return (
        <div style={{ maxWidth: "500px" }}>
            <div style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
                <h3 style={{ marginTop: 0, marginBottom: "8px" }}>General Appointment Time Range</h3>
                <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
                    Set the available time range for general appointments. Users can select any time within this range.
                </p>

                <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>Start Time</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            style={timeInputStyle}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>End Time</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            style={timeInputStyle}
                        />
                    </div>
                </div>

                <div style={{
                    background: "#f0fdf4",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "24px",
                    border: "1px solid #bbf7d0"
                }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#166534" }}>
                        <strong>Preview:</strong> Users will be able to book appointments from {formatTime(startTime)} to {formatTime(endTime)}
                    </p>
                </div>

                <button onClick={handleSave} disabled={saving} style={saveBtnStyle}>
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </div>
        </div>
    );
}

// ============ PRINCIPAL SLOTS TAB ============

function PrincipalSlotsTab() {
    const [slots, setSlots] = useState<PrincipalSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [newSlot, setNewSlot] = useState<{
        type: "date" | "day";
        date?: Date;
        dayOfWeek?: number;
        time: string;
    }>({ type: "date", time: "10:00" });

    useEffect(() => {
        loadSlots();
    }, []);

    const loadSlots = async () => {
        const data = await getPrincipalSlots();
        setSlots(data);
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!newSlot.time) {
            toast.error("Please select a time");
            return;
        }
        if (newSlot.type === "date" && !newSlot.date) {
            toast.error("Please select a date");
            return;
        }
        if (newSlot.type === "day" && newSlot.dayOfWeek === undefined) {
            toast.error("Please select a day");
            return;
        }

        try {
            // Normalize date to noon local time to avoid timezone issues
            let normalizedDate: Date | undefined;
            if (newSlot.type === "date" && newSlot.date) {
                normalizedDate = new Date(newSlot.date);
                normalizedDate.setHours(12, 0, 0, 0);
            }

            await createPrincipalSlot({
                date: normalizedDate,
                dayOfWeek: newSlot.type === "day" ? newSlot.dayOfWeek : undefined,
                time: formatTime(newSlot.time),
            });
            toast.success("Slot added!");
            setNewSlot({ type: "date", time: "10:00" });
            loadSlots();
        } catch {
            toast.error("Failed to add slot");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this slot?")) return;
        try {
            await deletePrincipalSlot(id);
            toast.success("Deleted!");
            loadSlots();
        } catch {
            toast.error("Failed to delete");
        }
    };

    const handleToggle = async (id: string, isActive: boolean) => {
        try {
            await togglePrincipalSlot(id, !isActive);
            loadSlots();
        } catch {
            toast.error("Failed to update");
        }
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

    return (
        <div>
            <div style={{
                background: "#fff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                marginBottom: "24px"
            }}>
                <h3 style={{ marginTop: 0, marginBottom: "8px", fontWeight: "700", fontSize: "18px", color: "#1e293b" }}>
                    Add Principal Meeting Slot
                </h3>
                <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
                    Principal meetings are only available at specific times you define here.
                </p>

                {/* Slot Type Selection */}
                <div style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "24px",
                    flexWrap: "wrap"
                }}>
                    <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: newSlot.type === "date" ? "2px solid #1e3a5f" : "2px solid #e2e8f0",
                        background: newSlot.type === "date" ? "#f0f9ff" : "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: newSlot.type === "date" ? "#1e3a5f" : "#64748b",
                        transition: "all 0.2s"
                    }}>
                        <input
                            type="radio"
                            checked={newSlot.type === "date"}
                            onChange={() => setNewSlot(prev => ({ ...prev, type: "date" }))}
                            style={{ width: "18px", height: "18px", accentColor: "#1e3a5f" }}
                        />
                        📅 Specific Date
                    </label>
                    <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: newSlot.type === "day" ? "2px solid #1e3a5f" : "2px solid #e2e8f0",
                        background: newSlot.type === "day" ? "#f0f9ff" : "#fff",
                        fontWeight: "600",
                        fontSize: "14px",
                        color: newSlot.type === "day" ? "#1e3a5f" : "#64748b",
                        transition: "all 0.2s"
                    }}>
                        <input
                            type="radio"
                            checked={newSlot.type === "day"}
                            onChange={() => setNewSlot(prev => ({ ...prev, type: "day" }))}
                            style={{ width: "18px", height: "18px", accentColor: "#1e3a5f" }}
                        />
                        🔄 Recurring Day
                    </label>
                </div>

                {/* Form Fields Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                    alignItems: "end"
                }}>
                    {newSlot.type === "date" ? (
                        <div>
                            <label style={formLabelStyle}>
                                <span style={{ marginRight: "6px" }}>📅</span> Date
                            </label>
                            <DatePicker
                                selected={newSlot.date}
                                onChange={(date: Date | null) => setNewSlot(prev => ({ ...prev, date: date || undefined }))}
                                minDate={new Date()}
                                filterDate={(date: Date) => date.getDay() !== 0}
                                dateFormat="EEEE, MMM d, yyyy"
                                placeholderText="Select a date"
                                className="custom-datepicker"
                                wrapperClassName="datepicker-wrapper-full"
                            />
                        </div>
                    ) : (
                        <div>
                            <label style={formLabelStyle}>
                                <span style={{ marginRight: "6px" }}>📅</span> Day of Week
                            </label>
                            <select
                                value={newSlot.dayOfWeek ?? ""}
                                onChange={(e) => setNewSlot(prev => ({ ...prev, dayOfWeek: Number(e.target.value) }))}
                                style={formSelectStyle}
                            >
                                <option value="">Select day...</option>
                                {DAY_NAMES.map((name, i) => (
                                    i !== 0 && <option key={i} value={i}>{name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label style={formLabelStyle}>
                            <span style={{ marginRight: "6px" }}>🕐</span> Time
                        </label>
                        <input
                            type="time"
                            value={newSlot.time}
                            onChange={(e) => setNewSlot(prev => ({ ...prev, time: e.target.value }))}
                            style={formInputStyle}
                        />
                    </div>

                    <div>
                        <button onClick={handleAdd} style={{
                            ...addBtnStyle,
                            width: "100%",
                            padding: "14px 24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px"
                        }}>
                            <i className="fas fa-plus"></i> Add Slot
                        </button>
                    </div>
                </div>
            </div>

            {/* Slots List */}
            <div style={{
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden"
            }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
                    <h4 style={{ margin: 0 }}>Principal Meeting Slots ({slots.length})</h4>
                </div>
                {slots.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                        No slots configured yet
                    </div>
                ) : (
                    <div style={{ padding: "12px" }}>
                        {slots.map(slot => (
                            <div key={slot.id} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px 16px",
                                background: slot.isActive ? "#f8fafc" : "#fef2f2",
                                borderRadius: "8px",
                                marginBottom: "8px"
                            }}>
                                <div>
                                    <span style={{ fontWeight: "600" }}>
                                        {slot.date
                                            ? new Date(slot.date).toLocaleDateString("en-PK", { weekday: "long", month: "short", day: "numeric", year: "numeric" })
                                            : `Every ${DAY_NAMES[slot.dayOfWeek ?? 0]}`}
                                    </span>
                                    <span style={{ marginLeft: "12px", color: "#64748b" }}>{slot.time}</span>
                                    {!slot.isActive && <span style={{ marginLeft: "8px", color: "#dc2626", fontSize: "12px" }}>(Disabled)</span>}
                                </div>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                        onClick={() => handleToggle(slot.id, slot.isActive)}
                                        style={{
                                            ...smallBtnStyle,
                                            background: slot.isActive ? "#fef3c7" : "#d1fae5"
                                        }}
                                    >
                                        {slot.isActive ? "Disable" : "Enable"}
                                    </button>
                                    <button onClick={() => handleDelete(slot.id)} style={{ ...smallBtnStyle, background: "#fee2e2" }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ============ DAY AVAILABILITY TAB ============

function DayAvailabilityTab() {
    const [days, setDays] = useState<DateAvailabilityType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDays();
    }, []);

    const loadDays = async () => {
        const data = await getDayAvailability();
        setDays(data);
        setLoading(false);
    };

    const handleToggle = async (dayOfWeek: number, currentValue: boolean) => {
        if (dayOfWeek === 0) {
            toast.error("Sunday cannot be enabled");
            return;
        }
        try {
            await toggleDayAvailability(dayOfWeek, !currentValue);
            loadDays();
        } catch {
            toast.error("Failed to update");
        }
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

    return (
        <div style={{ maxWidth: "500px" }}>
            <div style={{
                background: "#fff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
                <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Day Availability</h3>
                <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
                    Toggle which days of the week are available for appointments. Sunday is always disabled.
                </p>

                {DAY_NAMES.map((name, i) => {
                    const dayData = days.find(d => d.dayOfWeek === i);
                    const isAvailable = dayData?.isAvailable ?? (i !== 0);
                    const isSunday = i === 0;

                    return (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "14px 16px",
                            background: isSunday ? "#fef2f2" : isAvailable ? "#f0fdf4" : "#f8fafc",
                            borderRadius: "8px",
                            marginBottom: "8px"
                        }}>
                            <span style={{ fontWeight: "500" }}>{name}</span>
                            <button
                                onClick={() => handleToggle(i, isAvailable)}
                                disabled={isSunday}
                                style={{
                                    padding: "6px 16px",
                                    borderRadius: "20px",
                                    border: "none",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    cursor: isSunday ? "not-allowed" : "pointer",
                                    background: isSunday ? "#e5e7eb" : isAvailable ? "#22c55e" : "#e5e7eb",
                                    color: isSunday ? "#9ca3af" : isAvailable ? "#fff" : "#475569"
                                }}
                            >
                                {isSunday ? "Disabled" : isAvailable ? "Available" : "Unavailable"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ============ BLOCKED DATES TAB ============

function BlockedDatesTab() {
    const [blockedDates, setBlockedDates] = useState<BlockedDateType[]>([]);
    const [loading, setLoading] = useState(true);
    const [newDate, setNewDate] = useState<Date | undefined>();
    const [newReason, setNewReason] = useState("");

    useEffect(() => {
        loadBlockedDates();
    }, []);

    const loadBlockedDates = async () => {
        const data = await getBlockedDates();
        setBlockedDates(data);
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!newDate) {
            toast.error("Please select a date");
            return;
        }
        try {
            // Normalize date to noon local time to avoid timezone issues
            const normalizedDate = new Date(newDate);
            normalizedDate.setHours(12, 0, 0, 0);

            await addBlockedDate(normalizedDate, newReason || undefined);
            toast.success("Date blocked!");
            setNewDate(undefined);
            setNewReason("");
            loadBlockedDates();
        } catch {
            toast.error("Failed to add");
        }
    };

    const handleRemove = async (id: string) => {
        if (!confirm("Remove this blocked date?")) return;
        try {
            await removeBlockedDate(id);
            toast.success("Removed!");
            loadBlockedDates();
        } catch {
            toast.error("Failed to remove");
        }
    };

    if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

    return (
        <div>
            <div style={{
                background: "#fff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                marginBottom: "24px"
            }}>
                <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Add Blocked Date</h3>
                <p style={{ color: "#64748b", marginBottom: "20px", fontSize: "14px" }}>
                    Block specific dates for holidays, closures, or special events.
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>Date</label>
                        <DatePicker
                            selected={newDate}
                            onChange={(date: Date | null) => setNewDate(date || undefined)}
                            minDate={new Date()}
                            dateFormat="EEEE, MMM d, yyyy"
                            placeholderText="Select a date"
                            className="custom-datepicker"
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: "200px" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>Reason (optional)</label>
                        <input
                            type="text"
                            value={newReason}
                            onChange={(e) => setNewReason(e.target.value)}
                            placeholder="e.g., Public Holiday"
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                                fontSize: "14px"
                            }}
                        />
                    </div>
                    <button onClick={handleAdd} style={addBtnStyle}>+ Block Date</button>
                </div>
            </div>

            {/* Blocked Dates List */}
            <div style={{
                background: "#fff",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden"
            }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
                    <h4 style={{ margin: 0 }}>Blocked Dates ({blockedDates.length})</h4>
                </div>
                {blockedDates.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                        No dates blocked
                    </div>
                ) : (
                    <div style={{ padding: "12px" }}>
                        {blockedDates.map(bd => (
                            <div key={bd.id} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px 16px",
                                background: "#fef2f2",
                                borderRadius: "8px",
                                marginBottom: "8px"
                            }}>
                                <div>
                                    <span style={{ fontWeight: "600" }}>
                                        {new Date(bd.date).toLocaleDateString("en-PK", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                                    </span>
                                    {bd.reason && <span style={{ marginLeft: "12px", color: "#64748b" }}>— {bd.reason}</span>}
                                </div>
                                <button onClick={() => handleRemove(bd.id)} style={{ ...smallBtnStyle, background: "#fee2e2" }}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ============ MODAL COMPONENT ============

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "20px"
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "24px",
                    maxWidth: "500px",
                    width: "100%",
                    maxHeight: "90vh",
                    overflow: "auto"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

// ============ HELPERS ============

function formatTime(time: string): string {
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

// ============ STYLES ============

const thStyle: React.CSSProperties = {
    padding: "14px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "13px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
};

const tdStyle: React.CSSProperties = {
    padding: "14px 16px",
    fontSize: "14px"
};

const timeInputStyle: React.CSSProperties = {
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "14px",
    width: "100%"
};

const selectStyle: React.CSSProperties = {
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "14px",
    background: "#fff",
    minWidth: "150px"
};

const acceptBtnStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#d1fae5",
    color: "#065f46",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer"
};

const rejectBtnStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#fee2e2",
    color: "#991b1b",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer"
};

const rescheduleBtnStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#dbeafe",
    color: "#1e40af",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer"
};

const deleteBtnStyle: React.CSSProperties = {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#f1f5f9",
    cursor: "pointer",
    fontSize: "12px"
};

const cancelBtnStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontWeight: "600",
    cursor: "pointer"
};

const saveBtnStyle: React.CSSProperties = {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    background: "#1e3a5f",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%"
};

const addBtnStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#1e3a5f",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap"
};

const smallBtnStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    fontWeight: "500",
    fontSize: "12px",
    cursor: "pointer"
};

const formLabelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "14px",
    color: "#334155"
};

const formInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "15px",
    backgroundColor: "#fff",
    transition: "all 0.2s"
};

const formSelectStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "15px",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.2s"
};
