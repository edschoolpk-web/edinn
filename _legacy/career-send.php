<?php
header('Content-Type: application/json; charset=utf-8');

// Change these:
// ✅ Change these:
$toEmail = "info@edschool.pk";          // where you want to receive messages
$siteName = "Engineers & Doctors School";                     // shown in email subject/header
$fromEmail = "info@edschool.pk";   // must be a valid email on your domain for best deliverability
$fromName = $siteName . " Website";

function clean($v): string {
  $v = trim((string)$v);
  $v = str_replace(["\r","\n"], " ", $v);
  return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

function isValidCnic($cnic): bool {
  // Accept: 1234512345671 OR 12345-1234567-1
  return (bool)preg_match('/^\d{5}-\d{7}-\d{1}$/', $cnic) || (bool)preg_match('/^\d{13}$/', $cnic);
}

$post            = clean($_POST['post'] ?? '');
$full_name       = clean($_POST['full_name'] ?? '');
$guardian_name   = clean($_POST['guardian_name'] ?? '');
$cnic            = clean($_POST['cnic'] ?? '');
$phone           = clean($_POST['phone'] ?? '');
$email_raw       = $_POST['email'] ?? '';
$email           = $email_raw ? filter_var($email_raw, FILTER_VALIDATE_EMAIL) : '';
$gender          = clean($_POST['gender'] ?? '');
$dob             = clean($_POST['dob'] ?? '');
$marital_status  = clean($_POST['marital_status'] ?? '');
$qualification   = clean($_POST['qualification'] ?? '');
$experience_years= clean($_POST['experience_years'] ?? '');
$subject_area    = clean($_POST['subject_area'] ?? '');
$last_institute  = clean($_POST['last_institute'] ?? '');
$city            = clean($_POST['city'] ?? '');
$expected_salary = clean($_POST['expected_salary'] ?? '');
$address         = clean($_POST['address'] ?? '');
$message         = clean($_POST['message'] ?? '');

// Required checks
if ($post==='' || $full_name==='' || $guardian_name==='' || $cnic==='' || $phone==='' || $gender==='' || $dob==='' ||
    $marital_status==='' || $qualification==='' || $experience_years==='' || $subject_area==='' ||
    $last_institute==='' || $city==='' || $address==='') {
  echo json_encode(['ok' => false, 'message' => 'Please fill all required fields.']);
  exit;
}

// CNIC validation
if (!isValidCnic($cnic)) {
  echo json_encode(['ok' => false, 'message' => 'Please enter a valid CNIC (12345-1234567-1).']);
  exit;
}

$subject = "{$siteName} Teacher Career Form - {$full_name}";
$submittedAt = date("d M Y, h:i A");

$replyTo = $email ? "Reply-To: {$full_name} <{$email}>\r\n" : "";

$html = '
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Teacher Career Form</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="650" cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9eef3;">
          <tr>
            <td style="padding:18px 22px;background:#0f172a;color:#fff;">
              <div style="font-size:18px;font-weight:700;">'.$siteName.' - Teacher Career Application</div>
              <div style="opacity:.85;font-size:12px;margin-top:4px;">Submitted: '.$submittedAt.'</div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 22px;">
              <div style="font-size:14px;color:#334155;line-height:1.6;">
                New teacher application received from the website.
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-collapse:collapse;">
                <tr><td style="padding:10px 12px;width:220px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Post</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$post.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Full Name</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$full_name.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Father/Husband Name</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$guardian_name.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>CNIC</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$cnic.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Mobile</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$phone.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Email</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.($email ? $email : 'N/A').'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Gender</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$gender.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>DOB</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$dob.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Marital Status</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$marital_status.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Qualification</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$qualification.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Experience (Years)</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$experience_years.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Subject / Area</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$subject_area.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Last Institute</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$last_institute.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>City</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.$city.'</td></tr>

                <tr><td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Expected Salary</strong></td>
                    <td style="padding:10px 12px;background:#fff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">'.($expected_salary ? $expected_salary : 'N/A').'</td></tr>
              </table>

              <div style="margin-top:18px;padding:14px;border:1px solid #e9eef3;background:#f8fafc;border-radius:10px;">
                <div style="font-size:13px;color:#475569;font-weight:700;margin-bottom:6px;">Address</div>
                <div style="font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">'.$address.'</div>
              </div>

              <div style="margin-top:14px;padding:14px;border:1px solid #e9eef3;background:#ffffff;border-radius:10px;">
                <div style="font-size:13px;color:#475569;font-weight:700;margin-bottom:6px;">Message / Note</div>
                <div style="font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">'.($message ? $message : 'N/A').'</div>
              </div>

            </td>
          </tr>

          <tr>
            <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #e9eef3;color:#64748b;font-size:12px;">
              © '.date("Y").' '.$siteName.' — Teacher Career Form
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: {$fromName} <{$fromEmail}>\r\n";
$headers .= $replyTo;

$success = mail($toEmail, $subject, $html, $headers);

if ($success) {
  echo json_encode(['ok' => true, 'message' => 'Thanks! Your application has been submitted successfully.']);
} else {
  echo json_encode(['ok' => false, 'message' => 'Sorry, mail server error. Please try again later.']);
}
exit;
