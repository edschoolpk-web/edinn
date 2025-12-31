<?php
// ADMISSION FORM (admission.php)

$base_url  = "https://edschool.pk";
$site_name = "Engineers & Doctors School";

$page_title = "Admissions | Apply to Engineers & Doctors School";
$meta_description = "Apply for admission at Engineers & Doctors School in Karachi. Fill out the admission form and our team will guide you through eligibility, documents, and next steps.";
$meta_keywords = "Engineers & Doctors School admissions, admission form Karachi, school admission Karachi, apply for admission, enrollment";

$canonical_url = $base_url . "/admission";
include "header.php";
?>


<section class="pager-section">
  <div class="container">
    <div class="pager-content text-center">
      <h2>Admission</h2>
      <ul>
        <li><a href="index" title>Home</a></li>
        <li><span>Admission</span></li>
      </ul>
    </div><!--pager-content end-->
    <h2 class="page-titlee">E&D</h2>
  </div>
</section><!--pager-section end-->

<!-- Admission Form Section -->
<section class="admission-form-section">
  <div class="container">
    <div class="admission-form-wrap">
      <div class="section-title text-center">
        <h2> Admission Form</h2>
        <p>Please fill in the details below to register your child.</p>
      </div>

      <form class="admission-form" id="enrollment-form" action="enrollment-send" method="post" autocomplete="on">
        <div class="row">

          <!-- Admission Info -->
          <div class="col-lg-12">
            <div class="fl-divider">
              <span>Admission Details</span>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <select name="admission_class" id="admission_class" required>
                <option value="" selected disabled></option>
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
              <label for="admission_class">Class to Enroll In</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <select name="session" id="session" required>
                <option value="" selected disabled></option>
                <option>2025-26</option>
                <option>2026-27</option>
              </select>
              <label for="session">Admission Session</label>
            </div>
          </div>

          <!-- Student Details -->
          <div class="col-lg-12">
            <div class="fl-divider">
              <span>Student’s Details</span>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="text" name="student_name" id="student_name" placeholder=" " required />
              <label for="student_name">Student’s Full Name</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <select name="gender" id="gender" required>
                <option value="" selected disabled></option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <label for="gender">Gender</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="date" name="dob" id="dob" placeholder=" " required />
              <label for="dob">Date of Birth</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="text" name="bform" id="bform" placeholder=" " />
              <label for="bform">B-Form / CRC No. (Optional)</label>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="fl-field">
              <input type="text" name="last_school" id="last_school" placeholder=" " />
              <label for="last_school">Last School Attended (If Any)</label>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="fl-field">
              <textarea name="address" id="address" placeholder=" " rows="3" required></textarea>
              <label for="address">Residential Address</label>
            </div>
          </div>

          <!-- Father Details -->
          <div class="col-lg-12">
            <div class="fl-divider">
              <span>Father’s Details</span>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="text" name="father_name" id="father_name" placeholder=" " required />
              <label for="father_name">Father’s Full Name</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="text" name="father_cnic" id="father_cnic" placeholder=" " required />
              <label for="father_cnic">Father’s CNIC (12345-1234567-1)</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <select name="father_occupation" id="father_occupation" required>
                <option value="" selected disabled></option>
                <option>Business</option>
                <option>Private Job</option>
                <option>Government Job</option>
                <option>Self-Employed</option>
                <option>Unemployed</option>
                <option>Other</option>
              </select>
              <label for="father_occupation">Father’s Occupation</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="tel" name="father_cell" id="father_cell" placeholder=" " maxlength="11" required />
              <label for="father_cell">Father’s Mobile (11 digits)</label>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="fl-field">
              <input type="email" name="email" id="email" placeholder=" " required />
              <label for="email">Parent Email Address</label>
            </div>
          </div>

          <!-- Mother Details -->
          <div class="col-lg-12">
            <div class="fl-divider">
              <span>Mother’s Details</span>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="text" name="mother_name" id="mother_name" placeholder=" " />
              <label for="mother_name">Mother’s Full Name (Optional)</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <select name="mother_occupation" id="mother_occupation">
                <option value="" selected disabled></option>
                <option>Housewife</option>
                <option>Private Job</option>
                <option>Government Job</option>
                <option>Self-Employed</option>
                <option>Unemployed</option>
                <option>Other</option>
              </select>
              <label for="mother_occupation">Mother’s Occupation (Optional)</label>
            </div>
          </div>

          <div class="col-lg-12">
            <div class="fl-field">
              <input type="tel" name="mother_cell" id="mother_cell" placeholder=" " maxlength="11" />
              <label for="mother_cell">Mother’s Mobile (Optional)</label>
            </div>
          </div>

          <!-- Emergency Contact -->
          <div class="col-lg-12">
            <div class="fl-divider">
              <span>Emergency Contact</span>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="text" name="emergency_name" id="emergency_name" placeholder=" " required />
              <label for="emergency_name">Emergency Contact Name</label>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="fl-field">
              <input type="tel" name="emergency_phone" id="emergency_phone" placeholder=" " maxlength="11" required />
              <label for="emergency_phone">Emergency Contact Mobile (11 digits)</label>
            </div>
          </div>

          <!-- Submit -->
          <div class="col-lg-12">
            <button type="submit" class="btn-default fl-submit" id="enrollment-submit">
              Submit Enrollment <i class="fa fa-long-arrow-alt-right"></i>
            </button>
          </div>

        </div>
      </form>

    </div>
  </div>
</section>
<!-- Admission Form Section End -->

<!--newsletter-sec starts-->
<section class="newsletter-section">
  <div class="container">
    <div class="newsletter-sec">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="newsz-ltr-text">
            <h2>Build Your Career<br />With Us</h2>
          </div>
          <!--newsz-ltr-text end-->
        </div>

        <div class="col-lg-6">
          <a href="career" title="Career Opportunities" class="btn-default">
            Career Opportunities <i class="fa fa-long-arrow-alt-right"></i>
          </a>
          <!--newsletter-form end-->
        </div>
      </div>
    </div>
    <!--newsletter-sec end-->
  </div>
</section>
<!--newsletter-sec end-->

<?php include_once 'footer.php'; ?>