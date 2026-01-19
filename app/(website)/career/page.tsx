"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Career() {
  const [formData, setFormData] = useState({
    post: "",
    full_name: "",
    guardian_name: "",
    cnic: "",
    phone: "",
    email: "",
    gender: "",
    dob: null as Date | null,
    marital_status: "",
    qualification: "",
    experience_years: "",
    subject_area: "",
    last_institute: "",
    city: "",
    expected_salary: "",
    address: "",
    message: ""
  });

  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const bodyFormData = new FormData(form);

    // Basic Validations
    const phone = bodyFormData.get("phone") as string;
    if (phone && !/^\d{11}$/.test(phone)) {
      setStatus({ ok: false, msg: "Mobile Number must be exactly 11 digits." });
      setIsSubmitting(false);
      return;
    }

    const cnic = bodyFormData.get("cnic") as string;
    if (cnic && !/^\d{13}$/.test(cnic)) {
      setStatus({ ok: false, msg: "CNIC must be exactly 13 digits." });
      setIsSubmitting(false);
      return;
    }

    if (!formData.dob) {
      setStatus({ ok: false, msg: "Please select Date of Birth." });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/career", {
        method: "POST",
        body: bodyFormData,
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await res.json();
        setStatus({ ok: result.ok, msg: result.message });
        if (result.ok) {
          form.reset();
          setFormData({
            post: "", full_name: "", guardian_name: "", cnic: "", phone: "", email: "", gender: "", dob: null,
            marital_status: "", qualification: "", experience_years: "", subject_area: "", last_institute: "",
            city: "", expected_salary: "", address: "", message: ""
          });
          toast.success("Application submitted successfully!");
        }
      } else {
        setStatus({ ok: false, msg: "Server error. Please try again later." });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ ok: false, msg: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .modern-form-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
          padding: 40px;
          border: 1px solid #eee;
          margin-top: 40px;
          position: relative;
          z-index: 10;
        }
        .form-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 30px 0 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f0f0;
        }
        .form-section-header i {
          color: #004aad;
          font-size: 1.2rem;
        }
        .form-section-header span {
          font-weight: 700;
          color: #2d3436;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }
        .modern-input-group {
          margin-bottom: 25px;
        }
        .modern-input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a4a4a;
          font-size: 0.9rem;
        }
        .modern-input, .modern-select, .modern-textarea {
          width: 100%;
          padding: 12px 18px;
          border-radius: 12px;
          border: 1px solid #e1e1e1;
          background: #fdfdfd;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        .modern-input:focus, .modern-select:focus, .modern-textarea:focus {
          border-color: #004aad;
          box-shadow: 0 0 0 4px rgba(0, 74, 173, 0.1);
          outline: none;
          background: #fff;
        }
        .cv-upload-zone {
          background: #f8f9fa;
          border: 2px dashed #004aad;
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .cv-upload-zone:hover {
          background: #f0f4f8;
          border-color: #002c6b;
        }
        .upload-icon-box {
          width: 60px;
          height: 60px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .upload-icon-box i {
          font-size: 1.5rem;
          color: #004aad;
        }

        /* Custom DatePicker Styles */
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__header {
          background: linear-gradient(135deg, #004aad 0%, #0066cc 100%);
          border: none;
          border-radius: 12px 12px 0 0;
          padding: 16px;
        }
        .react-datepicker__current-month, 
        .react-datepicker__day-name, 
        .react-datepicker-time__header {
          color: #fff;
          font-weight: 600;
        }
        .react-datepicker__day {
          border-radius: 8px;
          transition: all 0.15s ease;
        }
        .react-datepicker__day:hover {
          background: #e1e7f0;
        }
        .react-datepicker__day--selected, 
        .react-datepicker__day--keyboard-selected {
          background: linear-gradient(135deg, #004aad 0%, #0066cc 100%) !important;
          color: white !important;
          font-weight: 600;
        }
        .react-datepicker {
          border: none;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          font-family: inherit;
        }
        .react-datepicker__navigation {
          top: 15px !important;
        }
        .react-datepicker__navigation-icon::before {
          border-color: #fff !important;
          border-width: 2px 2px 0 0 !important;
        }
        .react-datepicker__year-read-view--selected-year {
          color: #fff !important;
          font-weight: 700 !important;
          font-size: 1.1rem !important;
        }
        .react-datepicker__year-read-view--down-arrow {
          border-color: #fff !important;
          margin-top: 4px !important;
        }
        .react-datepicker__year-dropdown {
          background-color: #fff !important;
          border: 1px solid #eee !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
        }
        .react-datepicker__year-option:hover {
          background-color: #f0f7ff !important;
          color: #004aad !important;
        }
        .react-datepicker__year-option--selected {
          background-color: #004aad !important;
          color: #fff !important;
        }
        .react-datepicker__triangle {
          display: none;
        }
      `}</style>

      <section className="pager-section">
        <div className="container">
          <div className="pager-content text-center">
            <h2>Career Form</h2>
            <ul>
              <li><Link href="/" title="Home">Home</Link></li>
              <li><span>Career Form</span></li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>

      <div className="container" style={{ marginBottom: "120px" }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div
              className="modern-form-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-center mb-5">
                <span className="badge p-2 px-3 mb-3" style={{ background: "rgba(0, 74, 173, 0.1)", color: "#004aad", borderRadius: "50px", fontWeight: 700 }}>
                  WORK WITH US
                </span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#1a1a1a" }}>Join Our Core Team</h2>
                <p className="text-muted">Join our mission to empower the next generation. We are looking for passionate educators.</p>
              </div>

              <form onSubmit={handleSubmit} className="modern-form">
                <div className="row">
                  {/* Position Info */}
                  <div className="col-12">
                    <div className="form-section-header">
                      <i className="fa fa-briefcase"></i>
                      <span>Position Details</span>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="modern-input-group">
                      <label htmlFor="post">Post Applying For <span className="text-danger">*</span></label>
                      <select name="post" id="post" className="modern-select" required value={formData.post} onChange={handleChange}>
                        <option value="" disabled>Select the position you are interested in</option>
                        <option>Montessori / ECE Teacher</option>
                        <option>Primary Teacher</option>
                        <option>Secondary Teacher</option>
                        <option>Subject Specialist</option>
                        <option>Coordinator</option>
                        <option>Admin Staff</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="col-12">
                    <div className="form-section-header">
                      <i className="fa fa-user"></i>
                      <span>Personal Information</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="full_name">Full Name <span className="text-danger">*</span></label>
                      <input type="text" name="full_name" id="full_name" className="modern-input" placeholder="Your complete name" required value={formData.full_name} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="guardian_name">Father / Husband Name <span className="text-danger">*</span></label>
                      <input type="text" name="guardian_name" id="guardian_name" className="modern-input" required value={formData.guardian_name} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="cnic">CNIC (13 Digits) <span className="text-danger">*</span></label>
                      <input type="text" name="cnic" id="cnic" className="modern-input" placeholder="e.g. 4210112345671" required maxLength={13} value={formData.cnic} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="phone">Mobile Number (11 Digits) <span className="text-danger">*</span></label>
                      <input type="tel" name="phone" id="phone" className="modern-input" placeholder="03xx-xxxxxxx" required maxLength={11} value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" name="email" id="email" className="modern-input" placeholder="example@mail.com" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="modern-input-group">
                      <label htmlFor="gender">Gender <span className="text-danger">*</span></label>
                      <select name="gender" id="gender" className="modern-select" required value={formData.gender} onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="modern-input-group">
                      <label htmlFor="marital_status">Marital Status <span className="text-danger">*</span></label>
                      <select name="marital_status" id="marital_status" className="modern-select" required value={formData.marital_status} onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="dob">Date of Birth <span className="text-danger">*</span></label>
                      <DatePicker
                        selected={formData.dob}
                        onChange={(date: Date | null) => setFormData(prev => ({ ...prev, dob: date }))}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        dropdownMode="scroll"
                        placeholderText="Select Date of Birth"
                        className="modern-input"
                        required
                      />
                      <input type="hidden" name="dob" value={formData.dob ? `${formData.dob.getFullYear()}-${String(formData.dob.getMonth() + 1).padStart(2, '0')}-${String(formData.dob.getDate()).padStart(2, '0')}` : ""} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="city">Current City <span className="text-danger">*</span></label>
                      <input type="text" name="city" id="city" className="modern-input" required value={formData.city} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="col-12">
                    <div className="form-section-header">
                      <i className="fa fa-graduation-cap"></i>
                      <span>Professional Qualifications</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="qualification">Highest Qualification <span className="text-danger">*</span></label>
                      <input type="text" name="qualification" id="qualification" className="modern-input" placeholder="e.g. M.Phil in Physics" required value={formData.qualification} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="experience_years">Experience (Years) <span className="text-danger">*</span></label>
                      <input type="number" name="experience_years" id="experience_years" className="modern-input" min="0" required value={formData.experience_years} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="subject_area">Major Subjects / Specialist Area <span className="text-danger">*</span></label>
                      <input type="text" name="subject_area" id="subject_area" className="modern-input" placeholder="e.g. Science, Arts, Management" required value={formData.subject_area} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="expected_salary">Expected Salary (PKR)</label>
                      <input type="text" name="expected_salary" id="expected_salary" className="modern-input" value={formData.expected_salary} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="modern-input-group">
                      <label htmlFor="last_institute">Last Organization / Institute <span className="text-danger">*</span></label>
                      <input type="text" name="last_institute" id="last_institute" className="modern-input" required value={formData.last_institute} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="modern-input-group">
                      <label htmlFor="address">Residential Address <span className="text-danger">*</span></label>
                      <textarea name="address" id="address" className="modern-textarea" rows={3} required value={formData.address} onChange={handleChange}></textarea>
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div className="col-12 mb-4">
                    <label className="font-weight-bold mb-2 d-block text-dark">Upload Resume / CV <span className="text-danger">*</span></label>
                    <div className="cv-upload-zone" onClick={() => document.getElementById("cv_file")?.click()}>
                      <div className="upload-icon-box">
                        <i className="fa fa-file-pdf"></i>
                      </div>
                      <div className="text-dark font-weight-bold mb-1">Click to Upload CV</div>
                      <div className="text-muted small">PDF, DOC, DOCX up to 5MB</div>
                      <input
                        type="file"
                        name="cv_file"
                        id="cv_file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) toast.success(`Selected: ${file.name}`);
                        }}
                        className="d-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="modern-input-group">
                      <label htmlFor="message">Cover Letter / Note</label>
                      <textarea name="message" id="message" className="modern-textarea" rows={4} placeholder="Tell us why you're a great fit..." value={formData.message} onChange={handleChange}></textarea>
                    </div>
                  </div>


                  {/* Status Message */}
                  {status && (
                    <div className="col-12 mt-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`alert p-4 ${status.ok ? "alert-success border-0" : "alert-danger border-0"}`}
                        style={{ borderRadius: "15px", display: "flex", alignItems: "center", gap: "10px" }}
                      >
                        <i className={`fa ${status.ok ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
                        <span style={{ fontWeight: 600 }}>{status.msg}</span>
                      </motion.div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn-default w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm"></span> Processing...
                        </>
                      ) : (
                        <>
                          Submit Application <i className="fa fa-long-arrow-alt-right"></i>
                        </>
                      )}
                    </button>
                    <div className="text-center mt-4">
                      <p className="text-muted small">
                        Our HR team will review your application and contact you if your profile matches our requirements.
                      </p>
                    </div>
                  </div>

                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* newsletter-sec starts */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-sec">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="newsz-ltr-text">
                  <h2>Ready to Meet? Book <br />Your Appointment</h2>
                </div>
                {/* newsz-ltr-text end */}
              </div>

              <div className="col-lg-6">
                <Link href="/contact" title="Book an Appointment" className="btn-default">
                  Book an Appointment <i className="fa fa-long-arrow-alt-right"></i>
                </Link>
                {/* newsletter-form end */}
              </div>
            </div>
          </div>
          {/* newsletter-sec end */}
        </div>
      </section>
    </>
  );
}
