// Email templates for appointment notifications

export function generateSubmittedEmail(name: string, purpose: string, date: string, time: string): string {
    return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="padding:40px 40px 30px;background:linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);text-align:center;">
                <div style="width:70px;height:70px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:36px;">📝</span>
                </div>
                <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Request Submitted!</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:40px;">
                <p style="margin:0 0 20px;color:#334155;font-size:16px;line-height:1.6;">
                  Dear <strong>${name}</strong>,
                </p>
                <p style="margin:0 0 25px;color:#334155;font-size:16px;line-height:1.6;">
                  Thank you for your appointment request! Your request has been submitted to our administration team and is awaiting approval.
                </p>
                
                <!-- Details Card -->
                <div style="background:linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);border-radius:16px;padding:25px;margin-bottom:25px;border:2px dashed #c084fc;">
                  <div style="text-align:center;margin-bottom:15px;">
                    <span style="background:#7c3aed;color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;">Pending Approval</span>
                  </div>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                        <span style="color:#7c3aed;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Purpose</span>
                        <div style="color:#0f172a;font-size:17px;font-weight:600;margin-top:5px;">${purpose}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                        <span style="color:#7c3aed;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">📅 Requested Date</span>
                        <div style="color:#0f172a;font-size:17px;font-weight:600;margin-top:5px;">${date}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;">
                        <span style="color:#7c3aed;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">🕐 Requested Time</span>
                        <div style="color:#0f172a;font-size:17px;font-weight:600;margin-top:5px;">${time}</div>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- Info Box -->
                <div style="background:#f0fdf4;border-radius:12px;padding:16px 20px;margin-bottom:25px;border-left:4px solid #22c55e;">
                  <p style="margin:0;color:#166534;font-size:14px;line-height:1.5;">
                    <strong>What's next?</strong><br>
                    You will receive a confirmation email once your appointment is approved by our administration team. This usually takes 1-2 business days.
                  </p>
                </div>
                
                <p style="margin:0;color:#64748b;font-size:14px;line-height:1.6;">
                  If you have any urgent inquiries, please feel free to contact us directly.
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding:25px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="margin:0 0 8px;color:#1e3a5f;font-size:16px;font-weight:600;">Engineers & Doctors School</p>
                <p style="margin:0;color:#64748b;font-size:13px;">
                  <a href="tel:+923112197685" style="color:#3a6ea5;text-decoration:none;">+92 311 2197685</a> • 
                  <a href="mailto:info@edschool.pk" style="color:#3a6ea5;text-decoration:none;">info@edschool.pk</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function generateConfirmationEmail(name: string, purpose: string, date: string, time: string): string {
    return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="padding:40px 40px 30px;background:linear-gradient(135deg, #1e3a5f 0%, #3a6ea5 100%);text-align:center;">
                <div style="width:70px;height:70px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:36px;">✓</span>
                </div>
                <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Appointment Confirmed!</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:40px;">
                <p style="margin:0 0 20px;color:#334155;font-size:16px;line-height:1.6;">
                  Dear <strong>${name}</strong>,
                </p>
                <p style="margin:0 0 25px;color:#334155;font-size:16px;line-height:1.6;">
                  Great news! Your appointment request has been approved. Here are your appointment details:
                </p>
                
                <!-- Details Card -->
                <div style="background:linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);border-radius:16px;padding:25px;margin-bottom:25px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                        <span style="color:#64748b;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Purpose</span>
                        <div style="color:#0f172a;font-size:17px;font-weight:600;margin-top:5px;">${purpose}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                        <span style="color:#64748b;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">📅 Date</span>
                        <div style="color:#0f172a;font-size:17px;font-weight:600;margin-top:5px;">${date}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;">
                        <span style="color:#64748b;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">🕐 Time</span>
                        <div style="color:#0f172a;font-size:17px;font-weight:600;margin-top:5px;">${time}</div>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- Location -->
                <div style="background:#fef9c3;border-radius:12px;padding:16px 20px;margin-bottom:25px;">
                  <p style="margin:0;color:#713f12;font-size:14px;line-height:1.5;">
                    <strong>📍 Location:</strong> Engineers & Doctors School, KESC # 187, L Block Road, Islam Nagar, Sector 11, Orangi Town Karachi
                  </p>
                </div>
                
                <p style="margin:0;color:#64748b;font-size:14px;line-height:1.6;">
                  Please arrive 5-10 minutes before your scheduled time. If you need to reschedule, please contact us.
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding:25px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="margin:0 0 8px;color:#1e3a5f;font-size:16px;font-weight:600;">Engineers & Doctors School</p>
                <p style="margin:0;color:#64748b;font-size:13px;">
                  <a href="tel:+923112197685" style="color:#3a6ea5;text-decoration:none;">+92 311 2197685</a> • 
                  <a href="mailto:info@edschool.pk" style="color:#3a6ea5;text-decoration:none;">info@edschool.pk</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function generateRejectionEmail(name: string, reason?: string): string {
    return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="padding:40px 40px 30px;background:linear-gradient(135deg, #64748b 0%, #475569 100%);text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Appointment Update</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:40px;">
                <p style="margin:0 0 20px;color:#334155;font-size:16px;line-height:1.6;">
                  Dear <strong>${name}</strong>,
                </p>
                <p style="margin:0 0 25px;color:#334155;font-size:16px;line-height:1.6;">
                  Thank you for your interest in visiting Engineers & Doctors School. Unfortunately, we are unable to accommodate your appointment request at this time.
                </p>
                
                ${reason ? `
                <div style="background:#f1f5f9;border-left:4px solid #64748b;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:25px;">
                  <p style="margin:0;color:#334155;font-size:14px;line-height:1.6;">
                    <strong>Note from Administration:</strong><br>${reason}
                  </p>
                </div>
                ` : ''}
                
                <p style="margin:0;color:#334155;font-size:16px;line-height:1.6;">
                  Please feel free to submit a new appointment request or contact our office directly for assistance.
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding:25px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="margin:0 0 8px;color:#1e3a5f;font-size:16px;font-weight:600;">Engineers & Doctors School</p>
                <p style="margin:0;color:#64748b;font-size:13px;">
                  <a href="tel:+923112197685" style="color:#3a6ea5;text-decoration:none;">+92 311 2197685</a> • 
                  <a href="mailto:info@edschool.pk" style="color:#3a6ea5;text-decoration:none;">info@edschool.pk</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function generateRescheduleEmail(name: string, newDate: string, newTime: string): string {
    return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="padding:40px 40px 30px;background:linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);text-align:center;">
                <div style="width:70px;height:70px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;">
                  <span style="font-size:36px;">🔄</span>
                </div>
                <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Appointment Rescheduled</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:40px;">
                <p style="margin:0 0 20px;color:#334155;font-size:16px;line-height:1.6;">
                  Dear <strong>${name}</strong>,
                </p>
                <p style="margin:0 0 25px;color:#334155;font-size:16px;line-height:1.6;">
                  Your appointment has been rescheduled to a new date and time. Please find the updated details below:
                </p>
                
                <!-- New Details Card -->
                <div style="background:linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);border-radius:16px;padding:25px;margin-bottom:25px;border:2px solid #22d3ee;">
                  <div style="text-align:center;margin-bottom:15px;">
                    <span style="background:#0891b2;color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;">New Schedule</span>
                  </div>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);">
                        <span style="color:#0e7490;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">📅 Date</span>
                        <div style="color:#0f172a;font-size:18px;font-weight:600;margin-top:5px;">${newDate}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;">
                        <span style="color:#0e7490;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">🕐 Time</span>
                        <div style="color:#0f172a;font-size:18px;font-weight:600;margin-top:5px;">${newTime}</div>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <!-- Location -->
                <div style="background:#fef9c3;border-radius:12px;padding:16px 20px;margin-bottom:25px;">
                  <p style="margin:0;color:#713f12;font-size:14px;line-height:1.5;">
                    <strong>📍 Location:</strong> Engineers & Doctors School, KESC # 187, L Block Road, Islam Nagar, Sector 11, Orangi Town Karachi
                  </p>
                </div>
                
                <p style="margin:0;color:#64748b;font-size:14px;line-height:1.6;">
                  If this new schedule doesn't work for you, please contact us to arrange an alternative.
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding:25px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="margin:0 0 8px;color:#1e3a5f;font-size:16px;font-weight:600;">Engineers & Doctors School</p>
                <p style="margin:0;color:#64748b;font-size:13px;">
                  <a href="tel:+923112197685" style="color:#3a6ea5;text-decoration:none;">+92 311 2197685</a> • 
                  <a href="mailto:info@edschool.pk" style="color:#3a6ea5;text-decoration:none;">info@edschool.pk</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
