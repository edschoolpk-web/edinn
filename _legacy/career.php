<?php
// CAREERS (career.php)

$base_url = "https://edschool.pk";
$site_name = "Engineers & Doctors School";

$page_title = "Careers at Engineers & Doctors School | Jobs & Opportunities";
$meta_description = "Explore career opportunities at Engineers & Doctors School in Karachi. Join our professional team and grow your career in a supportive academic environment.";
$meta_keywords = "careers at Engineers & Doctors School, teaching jobs Karachi, school jobs Karachi, education careers, faculty positions";

$canonical_url = $base_url . "/career";
include "header.php";
?>

<section class="pager-section">
    <div class="container">
        <div class="pager-content text-center">
            <h2>Career Form</h2>
            <ul>
                <li><a href="index" title>Home</a></li>
                <li><span>Career Form</span></li>
            </ul>
        </div><!--pager-content end-->
        <h2 class="page-titlee">E&D</h2>
    </div>
</section>


<section class="admission-form-section">
    <div class="container">
        <div class="admission-form-wrap">
            <div class="section-title text-center">
                <h2> Career Form</h2>
                <p>Please fill in the details below to apply for a teaching position.</p>
            </div>
            <form class="admission-form" id="career-form" action="career-send" method="post" autocomplete="on">
                <div class="row">

                    <!-- Post Applying For -->
                    <div class="col-lg-12">
                        <div class="fl-field">
                            <select name="post" id="post" required>
                                <option value="" selected disabled></option>
                                <option>Montessori / ECE Teacher</option>
                                <option>Primary Teacher</option>
                                <option>Secondary Teacher</option>
                                <option>Subject Specialist</option>
                                <option>Coordinator</option>
                                <option>Admin Staff</option>
                                <option>Other</option>
                            </select>
                            <label for="post">Post Applying For</label>
                        </div>
                    </div>

                    <!-- Full Name -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="text" name="full_name" id="full_name" placeholder=" " required />
                            <label for="full_name">Full Name</label>
                        </div>
                    </div>

                    <!-- Father/Husband Name -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="text" name="guardian_name" id="guardian_name" placeholder=" " required />
                            <label for="guardian_name">Father / Husband Name</label>
                        </div>
                    </div>

                    <!-- CNIC -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="text" name="cnic" id="cnic" placeholder=" " required maxlength="15" />
                            <label for="cnic">CNIC (e.g., 12345-1234567-1)</label>
                        </div>
                    </div>

                    <!-- Mobile -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="tel" name="phone" id="phone" placeholder=" " required />
                            <label for="phone">Mobile Number (e.g., 03xx-xxxxxxx)</label>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="email" name="email" id="email" placeholder=" " />
                            <label for="email">Email (Optional)</label>
                        </div>
                    </div>

                    <!-- Gender -->
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

                    <!-- DOB -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="date" name="dob" id="dob" placeholder=" " required />
                            <label for="dob">Date of Birth</label>
                        </div>
                    </div>

                    <!-- Marital Status -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <select name="marital_status" id="marital_status" required>
                                <option value="" selected disabled></option>
                                <option>Single</option>
                                <option>Married</option>
                            </select>
                            <label for="marital_status">Marital Status</label>
                        </div>
                    </div>

                    <!-- Qualification -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="text" name="qualification" id="qualification" placeholder=" " required />
                            <label for="qualification">Highest Qualification (e.g., B.Ed / M.A / M.Sc)</label>
                        </div>
                    </div>

                    <!-- Experience -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="number" name="experience_years" id="experience_years" placeholder=" " min="0"
                                required />
                            <label for="experience_years">Total Experience (Years)</label>
                        </div>
                    </div>

                    <!-- Subject / Area -->
                    <div class="col-lg-12">
                        <div class="fl-field">
                            <input type="text" name="subject_area" id="subject_area" placeholder=" " required />
                            <label for="subject_area">Subjects / Area (e.g., English, Math, Montessori)</label>
                        </div>
                    </div>

                    <!-- Last Institute -->
                    <div class="col-lg-12">
                        <div class="fl-field">
                            <input type="text" name="last_institute" id="last_institute" placeholder=" " required />
                            <label for="last_institute">Last School / Institute</label>
                        </div>
                    </div>

                    <!-- Current City -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="text" name="city" id="city" placeholder=" " required />
                            <label for="city">City</label>
                        </div>
                    </div>

                    <!-- Expected Salary -->
                    <div class="col-lg-6 col-md-6">
                        <div class="fl-field">
                            <input type="text" name="expected_salary" id="expected_salary" placeholder=" " />
                            <label for="expected_salary">Expected Salary (Optional)</label>
                        </div>
                    </div>

                    <!-- Address -->
                    <div class="col-lg-12">
                        <div class="fl-field">
                            <textarea name="address" id="address" placeholder=" " rows="3" required></textarea>
                            <label for="address">Residential Address</label>
                        </div>
                    </div>

                    <!-- Message -->
                    <div class="col-lg-12">
                        <div class="fl-field">
                            <textarea name="message" id="message" placeholder=" " rows="4"></textarea>
                            <label for="message">Message / Note (Optional)</label>
                        </div>
                    </div>

                    <!-- Submit -->
                    <div class="col-lg-12">
                        <button type="submit" class="btn-default fl-submit" id="career-submit">
                            Submit Application <i class="fa fa-long-arrow-alt-right"></i>
                        </button>
                    </div>

                </div>
            </form>
        </div>
    </div>
</section>


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