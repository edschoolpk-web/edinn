"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PURPOSE_OPTIONS = [
  { value: "", label: "Select Purpose..." },
  { value: "admission", label: "Admission Enquiry" },
  { value: "complaint", label: "Complaint" },
  { value: "academic", label: "Academic Performance Discussion" },
  { value: "fees", label: "Fees Discussion" },
  { value: "principal", label: "Meeting with Principal" },
];

interface SlotConfig {
  disabledDays: number[];
  blockedDates: string[];
  generalTimeRange: { startTime: string; endTime: string };
  availableSlots: string[];
  principalDates: string[];
  principalDays: number[];
}

export default function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    phone: "",
    purpose: "",
    date: null as Date | null,
    timeSlot: "",
    Message: ""
  });
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slotConfig, setSlotConfig] = useState<SlotConfig | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch initial slot configuration
  useEffect(() => {
    fetchSlotConfig();
  }, []);

  const fetchSlotConfig = async () => {
    try {
      const res = await fetch("/api/available-slots");
      const data = await res.json();
      if (data.ok) {
        setSlotConfig(data);
      }
    } catch (error) {
      console.error("Failed to fetch slot config:", error);
    }
  };

  // Fetch available slots when date or purpose changes
  const fetchAvailableSlots = useCallback(async (date: Date, purpose: string) => {
    if (purpose !== "principal") return;
    setLoadingSlots(true);
    try {
      const dateStr = toLocalDateString(date);
      const res = await fetch(`/api/available-slots?date=${dateStr}&purpose=${purpose}`);
      const data = await res.json();
      if (data.ok) {
        setAvailableSlots(data.availableSlots);
      }
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
    }
    setLoadingSlots(false);
  }, []);

  useEffect(() => {
    if (formData.date && formData.purpose === "principal") {
      fetchAvailableSlots(formData.date, formData.purpose);
    }
  }, [formData.date, formData.purpose, fetchAvailableSlots]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Reset date and time when purpose changes
      if (name === "purpose") {
        return { ...prev, [name]: value, date: null, timeSlot: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, date, timeSlot: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date) {
      setStatus({ ok: false, msg: "Please select a date" });
      return;
    }
    if (!formData.timeSlot) {
      setStatus({ ok: false, msg: "Please select a time" });
      return;
    }

    // Basic Validations
    const phone = formData.phone;
    if (phone && !/^\d{11}$/.test(phone)) {
      setStatus({ ok: false, msg: "Phone Number must be exactly 11 digits (e.g. 03001234567)" });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: formData.date ? toLocalDateString(formData.date) : null
        }),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await res.json();
        setStatus({ ok: result.ok, msg: result.message });
        if (result.ok) {
          setFormData({ Name: "", email: "", phone: "", purpose: "", date: null, timeSlot: "", Message: "" });
        }
      } else {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        setStatus({ ok: false, msg: "Server error (non-JSON response). Check console." });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ ok: false, msg: "An error occurred: " + (error as Error).message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get local date string (YYYY-MM-DD) without timezone conversion
  const toLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filter dates for the date picker
  const filterDate = (date: Date): boolean => {
    const day = date.getDay();
    const dateStr = toLocalDateString(date);

    // Block Sundays always
    if (day === 0) {
      return false;
    }

    // Block any disabled days from config
    if (slotConfig?.disabledDays?.includes(day)) {
      return false;
    }

    // Block specific blocked dates
    if (slotConfig?.blockedDates?.includes(dateStr)) {
      return false;
    }

    // For Principal meetings, only allow dates/days that have slots configured
    if (formData.purpose === "principal") {
      const hasSpecificDate = slotConfig?.principalDates?.includes(dateStr) ?? false;
      const hasRecurringDay = slotConfig?.principalDays?.includes(day) ?? false;
      return hasSpecificDate || hasRecurringDay;
    }

    return true;
  };

  // Generate time options for general appointments
  const getTimeOptions = () => {
    if (!slotConfig?.generalTimeRange) return [];

    const { startTime, endTime } = slotConfig.generalTimeRange;
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const options: string[] = [];
    let currentHour = startHour;
    let currentMin = startMin;

    while (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
      const ampm = currentHour >= 12 ? "PM" : "AM";
      const hour12 = currentHour % 12 || 12;
      options.push(`${hour12}:${currentMin.toString().padStart(2, "0")} ${ampm}`);
      currentMin += 30;
      if (currentMin >= 60) {
        currentMin = 0;
        currentHour++;
      }
    }

    return options;
  };

  const isPrincipal = formData.purpose === "principal";

  return (
    <>
      <section className="pager-section">
        <div className="container">
          <div className="pager-content text-center">
            <h2>Contact Us </h2>
            <ul>
              <li><Link href="/" title="Home">Home</Link></li>
              <li><span>Contact Us</span></li>
            </ul>
          </div>
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
          <div className="mdp-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.4913969072113!2d66.9820026!3d24.949390599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb36b7e3b8774b5%3A0xd8796c65c9b54a7b!2sEngineers%20%26%20Doctors%20Inn%20(E%26D)%20Campus%201!5e0!3m2!1sen!2s!4v1736839585095!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mdp-contact">
            <div className="row">
              <div className="col-lg-8 col-md-7">
                <div className="comment-area">
                  <h3>Book an Appointment</h3>
                  <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="fl-field">
                          <input type="text" name="Name" id="Name" placeholder=" " required value={formData.Name} onChange={handleChange} />
                          <label htmlFor="Name"> Name</label>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="fl-field">
                          <input type="email" name="email" id="email" placeholder=" " required value={formData.email} onChange={handleChange} />
                          <label htmlFor="email">Email</label>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="fl-field">
                          <input type="tel" name="phone" id="phone" placeholder=" " required value={formData.phone} onChange={handleChange} maxLength={11} />
                          <label htmlFor="phone">Phone (11 Digits)</label>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="fl-field">
                          <select
                            name="purpose"
                            id="purpose"
                            required
                            value={formData.purpose}
                            onChange={handleChange}
                            style={selectStyle}
                          >
                            {PURPOSE_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Date & Time Selection */}
                      {formData.purpose && (
                        <>
                          {/* Selected Date/Time Display */}
                          {(formData.date || formData.timeSlot) && (
                            <div className="col-lg-12" style={{ marginBottom: "16px" }}>
                              <div style={{
                                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                                border: "2px solid #22c55e",
                                borderRadius: "12px",
                                padding: "16px 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                flexWrap: "wrap"
                              }}>
                                <span style={{ fontWeight: "600", color: "#166534" }}>📅 Your Appointment:</span>
                                {formData.date && (
                                  <span style={{ color: "#15803d", fontWeight: "500" }}>
                                    {formData.date.toLocaleDateString("en-PK", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
                                  </span>
                                )}
                                {formData.date && formData.timeSlot && (
                                  <span style={{ color: "#166534" }}>•</span>
                                )}
                                {formData.timeSlot && (
                                  <span style={{ color: "#15803d", fontWeight: "500" }}>
                                    🕐 {formData.timeSlot}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="col-lg-6 col-md-6">
                            <div className="fl-field">
                              <label style={labelStyle}>
                                <i className="fa fa-calendar" style={{ marginRight: "8px", color: "#1e3a5f" }}></i>
                                {formData.date
                                  ? `Date: ${formData.date.toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" })}`
                                  : "Select Date *"
                                }
                              </label>
                              <DatePicker
                                selected={formData.date}
                                onChange={handleDateChange}
                                filterDate={filterDate}
                                minDate={new Date()}
                                dateFormat="EEEE, MMMM d, yyyy"
                                placeholderText="Click to select date"
                                className="custom-datepicker-input"
                                calendarClassName="custom-datepicker-calendar"
                                wrapperClassName="datepicker-full-width"
                                showPopperArrow={false}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="fl-field" style={{ position: "relative" }}>
                              {/* Only show label when no date is selected or no time is selected */}
                              {(!formData.date || !formData.timeSlot) && (
                                <label style={{
                                  ...labelStyle,
                                  position: "absolute",
                                  top: "-8px",
                                  left: "12px",
                                  background: "#fff",
                                  padding: "0 6px",
                                  fontSize: "12px",
                                  zIndex: 1
                                }}>
                                  <i className="fa fa-clock" style={{ marginRight: "6px", color: "#1e3a5f" }}></i>
                                  Time <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                              )}
                              {!formData.date ? (
                                <div style={{
                                  ...selectStyle,
                                  background: "#f8fafc",
                                  color: "#94a3b8",
                                  cursor: "not-allowed"
                                }}>
                                  Please select a date first
                                </div>
                              ) : isPrincipal ? (
                                // Dropdown for Principal meetings (limited slots)
                                loadingSlots ? (
                                  <div style={loadingStyle}>Loading available slots...</div>
                                ) : availableSlots.length === 0 ? (
                                  <div style={noSlotsStyle}>No available slots for this date</div>
                                ) : (
                                  <select
                                    name="timeSlot"
                                    value={formData.timeSlot}
                                    onChange={handleChange}
                                    style={{
                                      ...selectStyle,
                                      background: formData.timeSlot ? "#f0fdf4" : "#fff",
                                      borderColor: formData.timeSlot ? "#22c55e" : "#e2e8f0"
                                    }}
                                    required
                                  >
                                    <option value="">-- Select Time Slot --</option>
                                    {availableSlots.map(slot => (
                                      <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                  </select>
                                )
                              ) : (
                                // Dropdown for general appointments (time range)
                                <select
                                  name="timeSlot"
                                  value={formData.timeSlot}
                                  onChange={handleChange}
                                  style={{
                                    ...selectStyle,
                                    background: formData.timeSlot ? "#f0fdf4" : "#fff",
                                    borderColor: formData.timeSlot ? "#22c55e" : "#e2e8f0"
                                  }}
                                  required
                                >
                                  <option value="">-- Select Time --</option>
                                  {getTimeOptions().map(time => (
                                    <option key={time} value={time}>{time}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-lg-12">
                        <div className="fl-field">
                          <textarea name="Message" id="Message" placeholder=" " required value={formData.Message} onChange={handleChange}></textarea>
                          <label htmlFor="Message">Message</label>
                        </div>
                      </div>

                      {/* Status Message */}
                      {status && (
                        <div className="col-lg-12 mb-3">
                          <div style={{
                            padding: "16px 20px",
                            borderRadius: "12px",
                            background: status.ok
                              ? "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"
                              : "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                            border: `1px solid ${status.ok ? "#10b981" : "#ef4444"}`,
                            color: status.ok ? "#065f46" : "#991b1b"
                          }}>
                            {status.ok ? (
                              <>
                                <strong style={{ fontSize: "16px" }}>✓ Request Submitted Successfully!</strong>
                                <p style={{ margin: "8px 0 0", fontSize: "14px" }}>
                                  Your appointment request has been sent to our administration team. You will receive a confirmation email once your request is approved.
                                </p>
                              </>
                            ) : (
                              <>
                                <strong>⚠️ Error</strong>
                                <p style={{ margin: "4px 0 0" }}>{status.msg}</p>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="col-lg-12">
                        <div className="form-submit">
                          <button type="submit" id="submit" className="btn-default" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Request"} <i className="fa fa-long-arrow-alt-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-4 col-md-5">
                <div className="mdp-our-contacts">
                  <h3>Our Contact</h3>
                  <ul>
                    <li>
                      <div className="d-flex flex-wrap">
                        <div className="icon-v">
                          <i className="fa-solid fa-phone-volume"></i>
                        </div>
                        <div className="dd-cont">
                          <h4>Call</h4>
                          <span>
                            <a href="tel:+923112197685">+92 311 2197685</a>
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-wrap">
                        <div className="icon-v">
                          <i className="fa-regular fa-envelope"></i>
                        </div>
                        <div className="dd-cont">
                          <h4>Email</h4>
                          <span>
                            <a href="mailto:info@edschool.pk">info@edschool.pk</a>
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-wrap">
                        <div className="icon-v">
                          <i className="fa-regular fa-clock"></i>
                        </div>
                        <div className="dd-cont">
                          <h4>School Time</h4>
                          <span>8:00am - 2:00pm Mon - Sat</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flexwrap">
                        <div className="icon-v">
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="dd-cont">
                          <h4>Address</h4>
                          <span>
                            KESC # 187, L Block Road, Islam Nagar, Sector 11, Orangi Town Karachi.
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-sec">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="newsz-ltr-text">
                  <h2>Ready to Meet? Book <br />Your Appointment</h2>
                </div>
              </div>
              <div className="col-lg-6">
                <Link href="/contact" title="Book an Appointment" className="btn-default">
                  Book an Appointment <i className="fa fa-long-arrow-alt-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom DatePicker Styles */}
      <style jsx global>{`
        .datepicker-full-width {
          width: 100%;
        }
        
        .custom-datepicker-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 15px;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .custom-datepicker-input:hover {
          border-color: #1e3a5f;
        }
        
        .custom-datepicker-input:focus {
          outline: none;
          border-color: #1e3a5f;
          box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
        }
        
        .custom-datepicker-calendar {
          font-family: inherit;
          border: none;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          padding: 16px;
        }
        
        .react-datepicker__header {
          background: linear-gradient(135deg, #1e3a5f 0%, #3a6ea5 100%);
          border: none;
          border-radius: 12px 12px 0 0;
          padding: 16px;
        }
        
        .react-datepicker__current-month {
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 8px;
        }
        
        .react-datepicker__day-name {
          font-weight: 500;
        }
        
        .react-datepicker__day {
          border-radius: 8px;
          transition: all 0.15s ease;
        }
        
        .react-datepicker__day:hover {
          background: #e2e8f0;
        }
        
        .react-datepicker__day--selected {
          background: linear-gradient(135deg, #1e3a5f 0%, #3a6ea5 100%) !important;
          color: #fff;
          font-weight: 600;
        }
        
        .react-datepicker__day--disabled {
          color: #cbd5e1 !important;
          cursor: not-allowed;
        }
        
        .react-datepicker__navigation {
          top: 30px !important;
        }
        
        .react-datepicker__navigation--previous {
          left: 6px !important;
        }
        
        .react-datepicker__navigation--next {
          right: 6px !important;
        }
        
        .react-datepicker__navigation-icon::before {
          border-color: #fff;
        }
        
        .react-datepicker__triangle {
          display: none;
        }
      `}</style>
    </>
  );
}

// Styles
const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  border: "2px solid #e2e8f0",
  borderRadius: "10px",
  fontSize: "15px",
  backgroundColor: "#fff",
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  fontSize: "14px",
  color: "#334155"
};

const loadingStyle: React.CSSProperties = {
  padding: "14px 16px",
  border: "2px solid #e2e8f0",
  borderRadius: "10px",
  background: "#f8fafc",
  color: "#64748b",
  textAlign: "center"
};

const noSlotsStyle: React.CSSProperties = {
  padding: "14px 16px",
  border: "2px solid #fecaca",
  borderRadius: "10px",
  background: "#fef2f2",
  color: "#991b1b",
  textAlign: "center"
};
