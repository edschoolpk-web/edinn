"use server";

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-utils";
import { prisma } from "@/lib/prisma";
import { generateSubmittedEmail } from "@/lib/email-templates";

const PURPOSE_LABELS: Record<string, string> = {
  admission: "Admission Enquiry",
  complaint: "Complaint",
  academic: "Academic Performance Discussion",
  fees: "Fees Discussion",
  principal: "Meeting with Principal",
};

// Format date for display
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-PK", {
    timeZone: "Asia/Karachi",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Generate admin notification email
function generateAdminNotificationEmail(
  name: string,
  email: string,
  phone: string,
  purpose: string,
  message: string,
  date: string,
  time: string
): string {
  const siteName = "Engineers & Doctors School";
  const submittedAt = new Date().toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });

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
          <table width="650" cellpadding="0" cellspacing="0" style="max-width:650px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="padding:24px 30px;background:linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);color:#fff;">
                <div style="font-size:20px;font-weight:700;">📋 New Appointment Request</div>
                <div style="opacity:.85;font-size:13px;margin-top:4px;">Submitted: ${submittedAt}</div>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <div style="background:#faf5ff;border:2px dashed #c084fc;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;">
                  <span style="background:#7c3aed;color:#fff;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;">Pending Approval</span>
                </div>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;color:#64748b;width:140px;"><strong>Name</strong></td>
                    <td style="padding:12px 16px;background:#fff;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;color:#64748b;"><strong>Email</strong></td>
                    <td style="padding:12px 16px;background:#fff;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;"><a href="mailto:${email}" style="color:#7c3aed;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;color:#64748b;"><strong>Phone</strong></td>
                    <td style="padding:12px 16px;background:#fff;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;"><a href="tel:${phone}" style="color:#7c3aed;">${phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;color:#64748b;"><strong>Purpose</strong></td>
                    <td style="padding:12px 16px;background:#fff;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;">${purpose}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;color:#64748b;"><strong>📅 Date</strong></td>
                    <td style="padding:12px 16px;background:#fff;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;">${date}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13px;color:#64748b;"><strong>🕐 Time</strong></td>
                    <td style="padding:12px 16px;background:#fff;border:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;">${time}</td>
                  </tr>
                </table>
                
                <div style="margin-top:20px;padding:16px;border:1px solid #e2e8f0;background:#f8fafc;border-radius:10px;">
                  <div style="font-size:13px;color:#64748b;font-weight:700;margin-bottom:8px;">Message</div>
                  <div style="font-size:14px;color:#0f172a;line-height:1.6;white-space:pre-wrap;">${message}</div>
                </div>
                
                <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:10px;border:1px solid #bbf7d0;">
                  <p style="margin:0;font-size:14px;color:#166534;">
                    <strong>Action Required:</strong> Please review this request in the admin panel and Accept, Reject, or Reschedule the appointment.
                  </p>
                </div>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding:20px 30px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="margin:0;color:#64748b;font-size:12px;">© ${new Date().getFullYear()} ${siteName}</p>
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Name, email, phone, purpose, date, timeSlot, Message, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: false, message: "Spam detected." }, { status: 400 });
    }

    // Validation
    if (!Name || !email || !phone || !purpose || !date || !timeSlot || !Message) {
      return NextResponse.json(
        { ok: false, message: "Please fill all required fields including date and time." },
        { status: 400 }
      );
    }

    const purposeLabel = PURPOSE_LABELS[purpose] || purpose;
    // Set to local noon to avoid shifts
    const appointmentDate = new Date(date + 'T12:00:00');
    const formattedDate = formatDate(appointmentDate);

    // Check if slot is already booked
    const toLocalDateString = (d: Date): string => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const dateString = toLocalDateString(appointmentDate);
    const existingBooking = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM appointment 
      WHERE DATE(date) = ${dateString} 
      AND timeSlot = ${timeSlot}
      AND status IN ('PENDING', 'CONFIRMED', 'RESCHEDULED')
    `;

    if (existingBooking.length > 0) {
      return NextResponse.json(
        { ok: false, message: "This time slot is no longer available. Please select a different time." },
        { status: 400 }
      );
    }

    // Create appointment with PENDING status
    try {
      await prisma.appointment.create({
        data: {
          name: Name,
          email,
          phone,
          purpose: purposeLabel,
          date: appointmentDate,
          timeSlot,
          message: Message,
          status: "PENDING",
        },
      });
    } catch (err: unknown) {
      const prismaError = err as { code?: string };
      if (prismaError.code === "P2002") {
        return NextResponse.json(
          { ok: false, message: "This time slot was just booked. Please select a different time." },
          { status: 400 }
        );
      }
      throw err;
    }

    // Send "Request Submitted" email to user
    await sendEmail({
      to: email,
      subject: "Appointment Request Submitted - Engineers & Doctors School",
      html: generateSubmittedEmail(Name, purposeLabel, formattedDate, timeSlot),
    });

    // Send notification to admin
    await sendEmail({
      to: process.env.SMTP_FROM_EMAIL || "info@edschool.pk",
      subject: `🗓️ New Appointment Request - ${Name}`,
      html: generateAdminNotificationEmail(Name, email, phone, purposeLabel, Message, formattedDate, timeSlot),
      replyTo: `${Name} <${email}>`,
    });

    return NextResponse.json({
      ok: true,
      message: "Your appointment request has been submitted successfully! You will receive a confirmation email once approved."
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
