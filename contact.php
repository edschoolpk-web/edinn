<?php include_once 'header.php'; ?>
<section class="pager-section">
    <div class="container">
        <div class="pager-content text-center">
            <h2>Contact Us </h2>
            <ul>
                <li><a href="#" title>Home</a></li>
                <li><span>Contact Us</span></li>
            </ul>
        </div><!--pager-content end-->
        <h2 class="page-titlee">E&D</h2>
    </div>
</section>

<section class="page-content">
    <div class="container">
        <div class="mdp-map"><iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.4913969072113!2d66.9820026!3d24.949390599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb36b7e3b8774b5%3A0xd8796c65c9b54a7b!2sEngineers%20%26%20Doctors%20Inn%20(E%26D)%20Campus%201!5e0!3m2!1sen!2s!4v1736839585095!5m2!1sen!2s"></iframe>
        </div><!--mdp-map end-->
        <div class="mdp-contact">
            <div class="row">
                <div class="col-lg-8 col-md-7">
                    <div class="comment-area">
                        <h3>Leave Your Message</h3>
                        <form id="contact-form" method="post" action="#">
                            <div class="response"></div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group"><input type="text" name="name" class="name"
                                            placeholder="Name" required></div><!--form-group end-->
                                </div>
                                <div class="col-lg-6">
                                    <div class="form-group"><input type="email" name="email" class="email"
                                            placeholder="Email" required></div><!--form-group end-->
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group"><input type="tel" name="phone" class="phone"
                                            placeholder="Phone" required></div><!--form-group end-->
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group"><textarea name="message" placeholder="Message"></textarea>
                                    </div><!--form-group end-->
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-submit"><button type="button" id="submit" class="btn-default">Send
                                            Now <i class="fa fa-long-arrow-alt-right"></i></button></div>
                                    <!--form-submit end-->
                                </div>
                            </div>
                        </form>
                    </div><!--comment-area end-->
                </div>
                <div class="col-lg-4 col-md-5">
                    <div class="mdp-our-contacts">
                        <h3>Our Contact</h3>
                        <ul>
                            <li>
                                <div class="d-flex flex-wrap">
                                    <div class="icon-v"><img src="assets/img/icon15.png" alt></div>
                                    <div class="dd-cont">
                                        <h4>Call</h4><span><a href="tel:+923032660229">+92
                                                303
                                                2660229</a></span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex flex-wrap">
                                    <div class="icon-v"><img src="assets/img/icon16.png" alt></div>
                                    <div class="dd-cont">
                                        <h4>Work
                                            Time</h4><span>8:00am
                                            - 2:00pm Mon -
                                            Fri</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex flex-wrap">
                                    <div class="icon-v"><img src="assets/img/icon17.png" alt></div>
                                    <div class="dd-cont">
                                        <h4>Address</h4><span>KESC
                                            # 187, L Block Road,
                                            Islam Nagar, Sector
                                            11, Orangi Town
                                            Karachi.</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div><!--mdp-our-contacts end-->
                </div>
            </div>
        </div><!--mdp-contact end-->
    </div>
</section>

<!--newsletter-sec starts-->
<section class="newsletter-section">
    <div class="container">
        <div class="newsletter-sec">
            <div class="row align-items-center">
                <div class="col-lg-4">
                    <div class="newsz-ltr-text">
                        <h2>Request<br />Admission </h2>
                        <a href="admission.html" title="View admission details" class="btn-default">
                            View Admissions <i class="fa fa-long-arrow-alt-right"></i>
                        </a>
                    </div>
                    <!--newsz-ltr-text end-->
                </div>

                <div class="col-lg-8">
                    <form class="newsletter-form">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="text" name="name" placeholder="Parent / Guardian Name" />
                                </div>
                                <!--form-group end-->
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="email" name="email" placeholder="Email Address" />
                                </div>
                                <!--form-group end-->
                            </div>

                            <div class="col-md-4">
                                <div class="form-group select-tg">
                                    <select name="class">
                                        <option selected disabled>Class
                                            Applying
                                            For</option>
                                        <option>Montessori /
                                            Early Years</option>
                                        <option>Primary (Grade I
                                            – V)</option>
                                        <option>Secondary (Grade
                                            VI – X)</option>
                                        <option>Transfer /
                                            Migration</option>
                                        <option>Not Sure
                                            Yet</option>
                                    </select>
                                </div>
                                <!--form-group end-->
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea name="message"
                                        placeholder="Share your query (admission, fee, campus visit, etc.)"></textarea>
                                </div>
                                <!--form-group end-->
                            </div>
                        </div>
                    </form>
                    <!--newsletter-form end-->
                </div>
            </div>
        </div>
        <!--newsletter-sec end-->
    </div>
</section>
<!--newsletter-sec end-->

<?php include_once 'footer.php'; ?>