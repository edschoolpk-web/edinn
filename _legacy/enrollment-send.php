<?php
header('Content-Type: application/json; charset=utf-8');

// ✅ Change these:
$toEmail = "info@edschool.pk";          // where you want to receive messages
$siteName = "Engineers & Doctors School";                     // shown in email subject/header
$fromEmail = "info@edschool.pk";   // must be a valid email on your domain for best deliverability
$fromName = $siteName . " Website";

// ===== HELPERS =====
function clean($v)
{
    return htmlspecialchars(trim((string) $v), ENT_QUOTES, 'UTF-8');
}

function validCnic($v)
{
    return preg_match('/^\d{5}-\d{7}-\d$/', $v);
}

// ===== COLLECT DATA =====
$data = [
    'Class' => clean($_POST['admission_class'] ?? ''),
    'Session' => clean($_POST['session'] ?? ''),
    'Student Name' => clean($_POST['student_name'] ?? ''),
    'Gender' => clean($_POST['gender'] ?? ''),
    'Date of Birth' => clean($_POST['dob'] ?? ''),
    'B-Form' => clean($_POST['bform'] ?? ''),
    'Last School' => clean($_POST['last_school'] ?? ''),
    'Address' => clean($_POST['address'] ?? ''),
    'Father Name' => clean($_POST['father_name'] ?? ''),
    'Father CNIC' => clean($_POST['father_cnic'] ?? ''),
    'Father Occupation' => clean($_POST['father_occupation'] ?? ''),
    'Father Mobile' => clean($_POST['father_cell'] ?? ''),
    'Parent Email' => clean($_POST['email'] ?? ''),
    'Mother Name' => clean($_POST['mother_name'] ?? ''),
    'Mother Occupation' => clean($_POST['mother_occupation'] ?? ''),
    'Mother Mobile' => clean($_POST['mother_cell'] ?? ''),
    'Emergency Name' => clean($_POST['emergency_name'] ?? ''),
    'Emergency Mobile' => clean($_POST['emergency_phone'] ?? '')
];

// ===== REQUIRED CHECK =====
$required = [
    'Class',
    'Session',
    'Student Name',
    'Gender',
    'Date of Birth',
    'Address',
    'Father Name',
    'Father CNIC',
    'Father Occupation',
    'Father Mobile',
    'Parent Email',
    'Emergency Name',
    'Emergency Mobile'
];

foreach ($required as $r) {
    if (empty($data[$r])) {
        echo json_encode(['ok' => false, 'message' => 'Please fill all required fields.']);
        exit;
    }
}

if (!validCnic($data['Father CNIC'])) {
    echo json_encode(['ok' => false, 'message' => 'Invalid Father CNIC format.']);
    exit;
}

// ===== BUILD EMAIL =====
$rows = '';
foreach ($data as $label => $value) {
    $rows .= "
  <tr>
    <td style='padding:10px;border:1px solid #e5e7eb;background:#f8fafc;width:35%'><strong>$label</strong></td>
    <td style='padding:10px;border:1px solid #e5e7eb'>$value</td>
  </tr>";
}

$subject = "$siteName – New Student Enrollment";
$date = date("d M Y, h:i A");

$html = "
<!doctype html>
<html>
<body style='margin:0;background:#f4f6f8;font-family:Arial'>
<table width='100%' cellpadding='0' cellspacing='0'>
<tr><td align='center'>
<table width='650' style='background:#fff;border-radius:12px;overflow:hidden'>
<tr>
<td style='background:#0f172a;color:#fff;padding:18px'>
<strong>$siteName – Student Enrollment</strong><br>
<small>Submitted: $date</small>
</td>
</tr>
<tr>
<td style='padding:20px'>
<table width='100%' cellpadding='0' cellspacing='0'>
$rows
</table>
</td>
</tr>
<tr>
<td style='background:#f8fafc;padding:12px;font-size:12px;color:#64748b'>
© " . date("Y") . " $siteName
</td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>
";

// ===== SEND =====
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: $fromName <$fromEmail>\r\n";

$sent = mail($toEmail, $subject, $html, $headers);

echo json_encode([
    'ok' => $sent,
    'message' => $sent
        ? 'Enrollment submitted successfully!'
        : 'Mail server error. Please try again later.'
]);
exit;
