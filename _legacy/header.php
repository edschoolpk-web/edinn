<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />

  <?php
  // -----------------------
  // Global defaults
  // -----------------------
  $base_url = $base_url ?? "https://edschool.pk";
  $site_name = $site_name ?? "Engineers & Doctors School";

  // Per-page defaults
  $page_title = $page_title ?? "$site_name | Karachi";
  $meta_description = $meta_description ?? "Engineers & Doctors School in Karachi offers quality education with strong academics, admissions guidance, and a supportive learning environment.";
  $meta_keywords = $meta_keywords ?? "Engineers & Doctors School, ED School Karachi, school in Karachi, admissions, academics, education";
  $canonical_url = $canonical_url ?? ($base_url . "/");

  // OG defaults
  $og_title = $og_title ?? $page_title;
  $og_description = $og_description ?? $meta_description;
  $og_url = $og_url ?? $canonical_url;
  $og_image = $og_image ?? ($base_url . "/webImages/og-image.jpg");

  // Twitter defaults
  $twitter_title = $twitter_title ?? $og_title;
  $twitter_desc = $twitter_desc ?? $og_description;
  $twitter_image = $twitter_image ?? $og_image;

  // Robots
  $robots = $robots ?? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

  // Author branding
  $meta_author_name = $meta_author_name ?? "Itnnovator";
  $meta_author_url = $meta_author_url ?? "https://itnnovator.com";
  ?>

  <title><?= htmlspecialchars($page_title) ?></title>

  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="description" content="<?= htmlspecialchars($meta_description) ?>" />
  <meta name="keywords" content="<?= htmlspecialchars($meta_keywords) ?>" />
  <meta name="robots" content="<?= htmlspecialchars($robots) ?>" />

  <!-- Author -->
  <meta name="author" content="<?= htmlspecialchars($meta_author_name) ?>" />
  <meta name="publisher" content="<?= htmlspecialchars($meta_author_url) ?>" />
  <meta name="copyright" content="<?= htmlspecialchars($meta_author_name) ?>" />

  <!-- Canonical -->
  <link rel="canonical" href="<?= htmlspecialchars($canonical_url) ?>" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="<?= htmlspecialchars($site_name) ?>" />
  <meta property="og:title" content="<?= htmlspecialchars($og_title) ?>" />
  <meta property="og:description" content="<?= htmlspecialchars($og_description) ?>" />
  <meta property="og:url" content="<?= htmlspecialchars($og_url) ?>" />
  <meta property="og:image" content="<?= htmlspecialchars($og_image) ?>" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="<?= htmlspecialchars($twitter_title) ?>" />
  <meta name="twitter:description" content="<?= htmlspecialchars($twitter_desc) ?>" />
  <meta name="twitter:image" content="<?= htmlspecialchars($twitter_image) ?>" />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet">

  <!-- Font Awesome CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/default.min.css" />
  <link rel="icon" href="webImages/favicon.png" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />

  <link rel="stylesheet" type="text/css" href="css/main.min.css" />
  <link rel="stylesheet" type="text/css" href="css/button.min.css" />
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-MX158PHENN"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-MX158PHENN');
  </script>
</head>

<body>
  <div class="wrapper">

    <header>
      <div class="container">
        <div class="header-content d-flex flex-wrap align-items-center">
          <div class="logo">
            <a href="index" title="Engineers &amp; Doctors School - Home">
              <img src="webImages/logo.png" alt="Engineers &amp; Doctors School Logo">
            </a>
          </div><!--logo end-->

          <ul class="contact-add d-flex flex-wrap">
            <li>
              <div class="contact-info">
                <i class="fa-solid fa-phone-volume"></i>
                <div class="contact-tt">
                  <h4>Call / WhatsApp</h4>
                  <span> <a href="tel:+923032660229">+92 303 2660229</a></span>
                </div>
              </div><!--contact-info end-->
            </li>
            <li>
              <div class="contact-info">
                <i class="fa fa-envelope"></i>
                <div class="contact-tt">
                  <h4>Email</h4>
                  <span> <a href="mailto:info@edschool.pk">info@edschool.pk</a></span>
                </div>
              </div><!--contact-info end-->
            </li>
          </ul><!--contact-information end-->

          <div class="menu-btn">
            <a href="#"><span class="bar1"></span> <span class="bar2"></span> <span class="bar3"></span></a>
          </div><!--menu-btn end-->
        </div><!--header-content end-->

        <div class="navigation-bar d-flex flex-wrap align-items-center">
          <nav>
            <ul>
              <li><a href="index" title="Home">Home</a></li>
              <li><a href="about" title="About Us">About Us</a></li>
              <li><a href="academics" title="academics">Academics</a></li>
              <li><a href="admission" title="Admissions">Admissions</a></li>
              <li><a href="gallery" title="Gallery">Gallery</a></li>
              <li><a href="contact" title="Contact">Contact</a></li>
            </ul>
          </nav><!--nav end-->
        </div><!--navigation-bar end-->
      </div>
    </header>

    <div class="responsive-menu">
      <ul>
        <li>
          <a class="active" href="index" title="Home">Home</a>
        </li>
        <li>
          <a href="about" title="About Engineers &amp; Doctors School">About Us</a>
        </li>
        <li>
          <a href="academics" title="Academic Programs">Academics</a>
        </li>
        <li>
          <a href="admission" title="Admissions">Admissions</a>
        </li>
        <li>
          <a href="gallery" title="Admissions">Gallery</a>
        </li>
        <li>
          <a href="contact" title="Contact">Contact</a>
        </li>
      </ul>
    </div>