<?php
// contact-send.php

header('Content-Type: application/json; charset=utf-8');

// ✅ Change these:
$toEmail = "info@edschool.pk";          // where you want to receive messages
$siteName = "Engineers & Doctors School";                     // shown in email subject/header
$fromEmail = "info@edschool.pk";   // must be a valid email on your domain for best deliverability
$fromName = $siteName . " Website";

// Basic anti-bot (optional): if you add <input type="text" name="website" style="display:none">
if (!empty($_POST['website'] ?? '')) {
    echo json_encode(['ok' => false, 'message' => 'Spam detected.']);
    exit;
}

function clean($v): string
{
    $v = trim((string) $v);
    $v = str_replace(["\r", "\n"], " ", $v);
    return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

$name = clean($_POST['Name'] ?? '');
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = clean($_POST['phone'] ?? '');
$message = clean($_POST['Message'] ?? '');

if ($name === '' || !$email || $phone === '' || $message === '') {
    echo json_encode(['ok' => false, 'message' => 'Please fill all required fields.']);
    exit;
}

// Subject
$subject = "{$siteName} Contact Form - {$name}";

// Build HTML email
$submittedAt = date("d M Y, h:i A");

$html = '
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Contact Form</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="650" cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9eef3;">
          <tr>
            <td style="padding:18px 22px;background:#0f172a;color:#fff;">
              <div style="font-size:18px;font-weight:700;">' . $siteName . ' - Contact Message</div>
              <div style="opacity:.85;font-size:12px;margin-top:4px;">Submitted: ' . $submittedAt . '</div>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 22px;">
              <div style="font-size:14px;color:#334155;line-height:1.6;">
                You have received a new message from the website contact form.
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 12px;width:170px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Name</strong></td>
                  <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">' . $name . '</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Email</strong></td>
                  <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">' . $email . '</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Phone</strong></td>
                  <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">' . $phone . '</td>
                </tr>
              </table>

              <div style="margin-top:18px;padding:14px 14px;border:1px solid #e9eef3;background:#f8fafc;border-radius:10px;">
                <div style="font-size:13px;color:#475569;font-weight:700;margin-bottom:6px;">Message</div>
                <div style="font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">' . $message . '</div>
              </div>

              <div style="margin-top:18px;font-size:12px;color:#64748b;">
                Note: Reply directly to this email to respond to the user (Reply-To is set).
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #e9eef3;color:#64748b;font-size:12px;">
              © ' . date("Y") . ' ' . $siteName . ' — Website Contact Form
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

// Email headers
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: {$fromName} <{$fromEmail}>";
$headers[] = "Reply-To: {$name} <{$email}>";

$success = mail($toEmail, $subject, $html, implode("\r\n", $headers));

if ($success) {
    echo json_encode(['ok' => true, 'message' => 'Thanks! Your message has been sent successfully.']);
} else {
    echo json_encode(['ok' => false, 'message' => 'Sorry, mail server error. Please try again later.']);
}
exit;