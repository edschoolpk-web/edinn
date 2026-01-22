"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Admission() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dob, setDob] = useState<Date | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        e.target.value = "";
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Basic Validations
    const fatherCell = formData.get("father_cell") as string;
    if (fatherCell && !/^\d{11}$/.test(fatherCell)) {
      setStatus({ ok: false, msg: "Father's Mobile must be exactly 11 digits." });
      setIsSubmitting(false);
      return;
    }

    const fatherCnic = formData.get("father_cnic") as string;
    if (fatherCnic && !/^\d{13}$/.test(fatherCnic)) {
      setStatus({ ok: false, msg: "Father's CNIC must be exactly 13 digits (numeric)." });
      setIsSubmitting(false);
      return;
    }

    if (!dob) {
      setStatus({ ok: false, msg: "Please select student's Date of Birth." });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await res.json();
        setStatus({ ok: result.ok, msg: result.message });
        if (result.ok) {
          form.reset();
          setImagePreview(null);
          setDob(null);
          toast.success("Enrollment submitted successfully!");
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
        .photo-upload-zone {
          background: #f8f9fa;
          border: 2px dashed #004aad;
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .photo-upload-zone:hover {
          background: rgba(0, 74, 173, 0.05);
        }
        .preview-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 15px;
          overflow: hidden;
          background: #fff;
          border: 4px solid #fff;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .preview-circle i {
          font-size: 50px;
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
            <h2>Admission</h2>
            <ul>
              <li><Link href="/" title="Home">Home</Link></li>
              <li><span>Admission</span></li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>
      {/* pager-section end */}

      <div className="container" style={{ marginBottom: "100px" }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div
              className="modern-form-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center mb-5">
                <span className="badge p-2 px-3 mb-3" style={{ background: "rgba(0, 74, 173, 0.1)", color: "#004aad", borderRadius: "50px", fontWeight: 700 }}>
                  SESSION {new Date().getFullYear()}-{new Date().getFullYear() + 1}
                </span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#1a1a1a" }}>Admission Application</h2>
                <p className="text-muted">Register your child for a bright and successful future at Edinn School.</p>
              </div>

              <form onSubmit={handleSubmit} className="modern-form">
                <div className="row">
                  {/* ... form content ... */}
                  {/* Note: I'm keeping the form content as it was in the modern redesign */}
                  <div className="col-12">
                    <div className="form-section-header">
                      <i className="fa fa-info-circle"></i>
                      <span>Admission Details</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="admission_class">Class to Enroll In <span className="text-danger">*</span></label>
                      <select name="admission_class" id="admission_class" className="modern-select" required defaultValue="">
                        <option value="" disabled>Select Class</option>
                        <option>Montessori (Pre-Primary)</option>
                        <option>Prep I (Pre-Primary)</option>
                        <option>Prep II (Pre-Primary)</option>
                        <option>Grade I (Primary)</option>
                        <option>Grade II (Primary)</option>
                        <option>Grade III (Primary)</option>
                        <option>Grade IV (Primary)</option>
                        <option>Grade V (Primary)</option>
                        <option>Grade VI (Secondary)</option>
                        <option>Grade VII (Secondary)</option>
                        <option>Grade VIII (Secondary)</option>
                        <option>Grade IX (Secondary)</option>
                        <option>Grade X (Secondary)</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="session">Admission Session <span className="text-danger">*</span></label>
                      <select name="session" id="session" className="modern-select" required defaultValue="2025-26">
                        <option>2025-26</option>
                        <option>2026-27</option>
                      </select>
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="col-12">
                    <div className="form-section-header">
                      <i className="fa fa-user-graduate"></i>
                      <span>Student Information</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="student_name">Student’s Full Name <span className="text-danger">*</span></label>
                      <input type="text" name="student_name" id="student_name" className="modern-input" placeholder="e.g. John Doe" required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="gender">Gender <span className="text-danger">*</span></label>
                      <select name="gender" id="gender" className="modern-select" required defaultValue="">
                        <option value="" disabled>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="dob">Date of Birth <span className="text-danger">*</span></label>
                      <DatePicker
                        selected={dob}
                        onChange={(date: Date | null) => setDob(date)}
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
                      <input type="hidden" name="dob" value={dob ? `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, '0')}-${String(dob.getDate()).padStart(2, '0')}` : ""} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="bform">B-Form / CRC No. (13 Digits)</label>
                      <input type="text" name="bform" id="bform" className="modern-input" placeholder="e.g. 4210112345671" maxLength={13} />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="modern-input-group">
                      <label htmlFor="last_school">Last School Attended</label>
                      <input type="text" name="last_school" id="last_school" className="modern-input" placeholder="Which school was student previously attending?" />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="modern-input-group">
                      <label htmlFor="address">Residential Address <span className="text-danger">*</span></label>
                      <textarea name="address" id="address" className="modern-textarea" rows={3} placeholder="Full home address" required></textarea>
                    </div>
                  </div>

                  <div className="col-12 mb-4">
                    <label className="font-weight-bold mb-2 d-block text-dark">Student's Photo <span className="text-danger">*</span></label>
                    <div className="photo-upload-zone" onClick={() => document.getElementById("student_image")?.click()}>
                      <div className="preview-circle">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Student Preview" />
                        ) : (
                          <i className="fa fa-camera"></i>
                        )}
                      </div>
                      <div className="text-dark font-weight-bold mb-1">Click to Upload Photo</div>
                      <div className="text-muted small">JPG, PNG up to 5MB</div>
                      <input
                        type="file"
                        name="student_image"
                        id="student_image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="d-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Father Details */}
                  <div className="col-12">
                    <div className="form-section-header">
                      <i className="fa fa-user-tie"></i>
                      <span>Father’s Information</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="father_name">Father’s Full Name <span className="text-danger">*</span></label>
                      <input type="text" name="father_name" id="father_name" className="modern-input" required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="father_cnic">Father’s CNIC (13 Digits) <span className="text-danger">*</span></label>
                      <input type="text" name="father_cnic" id="father_cnic" className="modern-input" placeholder="e.g. 4210112345671" required maxLength={13} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="father_occupation">Father’s Occupation <span className="text-danger">*</span></label>
                      <select name="father_occupation" id="father_occupation" className="modern-select" required defaultValue="">
                        <option value="" disabled>Select Occupation</option>
                        <option>Business</option>
                        <option>Private Job</option>
                        <option>Government Job</option>
                        <option>Self-Employed</option>
                        <option>Unemployed</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="father_cell">Father’s Mobile (11 digits) <span className="text-danger">*</span></label>
                      <input type="tel" name="father_cell" id="father_cell" className="modern-input" placeholder="e.g. 03001234567" maxLength={11} required />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="modern-input-group">
                      <label htmlFor="email">Parent Email Address <span className="text-danger">*</span></label>
                      <input type="email" name="email" id="email" className="modern-input" required />
                    </div>
                  </div>

                  {/* Mother Details */}
                  <div className="col-12 mt-3">
                    <div className="form-section-header">
                      <i className="fa fa-user"></i>
                      <span>Mother’s Information (Optional)</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="mother_name">Mother’s Full Name</label>
                      <input type="text" name="mother_name" id="mother_name" className="modern-input" />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="mother_cell">Mother’s Mobile</label>
                      <input type="tel" name="mother_cell" id="mother_cell" className="modern-input" maxLength={11} />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="col-12 mt-3">
                    <div className="form-section-header">
                      <i className="fa fa-phone-alt"></i>
                      <span>Emergency Contact</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="emergency_name">Contact Name <span className="text-danger">*</span></label>
                      <input type="text" name="emergency_name" id="emergency_name" className="modern-input" required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="modern-input-group">
                      <label htmlFor="emergency_phone">Contact Mobile (11 digits) <span className="text-danger">*</span></label>
                      <input type="tel" name="emergency_phone" id="emergency_phone" className="modern-input" placeholder="e.g. 03001234567" maxLength={11} required />
                    </div>
                  </div>


                  {/* Status Message */}
                  {status && (
                    <div className="col-12 mt-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`alert p-3 ${status.ok ? "alert-success border-0" : "alert-danger border-0"}`}
                        style={{ borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px" }}
                      >
                        <i className={`fa ${status.ok ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
                        {status.msg}
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
                          <span className="spinner-border spinner-border-sm"></span> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application <i className="fa fa-long-arrow-alt-right"></i>
                        </>
                      )}
                    </button>
                    <p className="text-center mt-3 text-muted small">
                      By submitting, you agree to the school's terms and conditions regarding admissions.
                    </p>
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
                  <h2>Build Your Career<br />With Us</h2>
                </div>
                {/* newsz-ltr-text end */}
              </div>

              <div className="col-lg-6">
                <Link href="/contact" title="Build your career with us" className="btn-default">
                  Apply Now <i className="fa fa-long-arrow-alt-right"></i>
                </Link>
                {/* newsletter-form end */}
              </div>
            </div>
          </div>
          {/* newsletter-sec end */}
        </div>
      </section>
      {/* newsletter-sec end */}
    </>
  );
}
