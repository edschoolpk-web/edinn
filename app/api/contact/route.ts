"use server";

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email-utils";
import { prisma } from "@/lib/prisma";

const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
];

// Get next Saturday from a given date
function getNextSaturday(from: Date): Date {
  const date = new Date(from);
  const dayOfWeek = date.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
  date.setDate(date.getDate() + daysUntilSaturday);
  date.setHours(0, 0, 0, 0);
  return date;
}

// Format date for display
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Find next available slot
async function findNextAvailableSlot(): Promise<{ date: Date; timeSlot: string } | null> {
  let currentSaturday = getNextSaturday(new Date());

  // Check up to 12 weeks ahead
  for (let week = 0; week < 12; week++) {
    const checkDate = new Date(currentSaturday);
    checkDate.setDate(checkDate.getDate() + week * 7);
    checkDate.setHours(0, 0, 0, 0);

    // Format date as YYYY-MM-DD for MySQL DATE comparison
    const dateString = checkDate.toISOString().split('T')[0];

    // Get booked slots for this date using raw query for accurate DATE comparison
    const bookedSlots = await prisma.$queryRaw<{ timeSlot: string }[]>`
      SELECT timeSlot FROM appointment 
      WHERE DATE(date) = ${dateString} AND status = 'CONFIRMED'
    `;

    const bookedTimeSlots = bookedSlots.map((s) => s.timeSlot);

    // Find first available slot
    for (const slot of TIME_SLOTS) {
      if (!bookedTimeSlots.includes(slot)) {
        return { date: checkDate, timeSlot: slot };
      }
    }
  }

  return null;
}

// Generate confirmation email HTML
function generateConfirmationEmail(name: string, purpose: string, date: string, time: string): string {
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Appointment Confirmed</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:30px 24px;background:linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Engineers & Doctors School</h1>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Appointment Confirmation</p>
              </td>
            </tr>
            
            <!-- Success Icon -->
            <tr>
              <td style="padding:30px 24px 0;text-align:center;">
                <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr>
                    <td style="width:70px;height:70px;background:#22c55e;border-radius:50%;text-align:center;vertical-align:middle;">
                      <span style="color:#fff;font-size:32px;line-height:70px;">✓</span>
                    </td>
                  </tr>
                </table>
                <h2 style="margin:20px 0 8px;color:#0f172a;font-size:22px;font-weight:700;">Your Appointment is Confirmed!</h2>
                <p style="margin:0;color:#64748b;font-size:14px;">Dear ${name}, your meeting has been scheduled.</p>
              </td>
            </tr>
            
            <!-- Appointment Details -->
            <tr>
              <td style="padding:24px;">
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">
                        <span style="color:#64748b;font-size:13px;">Purpose</span>
                        <div style="color:#0f172a;font-size:15px;font-weight:600;margin-top:4px;">${purpose}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">
                        <span style="color:#64748b;font-size:13px;">📅 Date</span>
                        <div style="color:#0f172a;font-size:15px;font-weight:600;margin-top:4px;">${date}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;">
                        <span style="color:#64748b;font-size:13px;">🕐 Time</span>
                        <div style="color:#0f172a;font-size:15px;font-weight:600;margin-top:4px;">${time}</div>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Note -->
            <tr>
              <td style="padding:0 24px 24px;">
                <div style="background:#fef9c3;border:1px solid #fde047;border-radius:8px;padding:14px;font-size:13px;color:#713f12;">
                  <strong>📍 Location:</strong> Engineers & Doctors School, KESC # 187, L Block Road, Islam Nagar, Sector 11, Orangi Town Karachi
                </div>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding:20px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                <p style="margin:0;color:#64748b;font-size:12px;">© ${new Date().getFullYear()} Engineers & Doctors School</p>
                <p style="margin:6px 0 0;font-size:12px;">
                  <a href="tel:+923112197685" style="color:#1e3a5f;text-decoration:none;">+92 311 2197685</a> | 
                  <a href="mailto:info@edschool.pk" style="color:#1e3a5f;text-decoration:none;">info@edschool.pk</a>
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

// Generate admin notification email
function generateAdminNotificationEmail(
  name: string,
  email: string,
  phone: string,
  purpose: string,
  message: string,
  date?: string,
  time?: string
): string {
  const siteName = "Engineers & Doctors School";
  const submittedAt = new Date().toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const appointmentSection = date && time ? `
    <tr>
      <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Appointment Date</strong></td>
      <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${date}</td>
    </tr>
    <tr>
      <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Appointment Time</strong></td>
      <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${time}</td>
    </tr>
  ` : "";

  return `
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
                <div style="font-size:18px;font-weight:700;">${siteName} - Contact Message</div>
                <div style="opacity:.85;font-size:12px;margin-top:4px;">Submitted: ${submittedAt}</div>
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
                    <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Email</strong></td>
                    <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Phone</strong></td>
                    <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e9eef3;font-size:13px;color:#475569;"><strong>Purpose</strong></td>
                    <td style="padding:10px 12px;background:#ffffff;border:1px solid #e9eef3;font-size:13px;color:#0f172a;">${purpose}</td>
                  </tr>
                  ${appointmentSection}
                </table>
                <div style="margin-top:18px;padding:14px 14px;border:1px solid #e9eef3;background:#f8fafc;border-radius:10px;">
                  <div style="font-size:13px;color:#475569;font-weight:700;margin-bottom:6px;">Message</div>
                  <div style="font-size:14px;color:#0f172a;line-height:1.7;white-space:pre-wrap;">${message}</div>
                </div>
                <div style="margin-top:18px;font-size:12px;color:#64748b;">
                  Note: Reply directly to this email to respond to the user (Reply-To is set).
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 22px;background:#f8fafc;border-top:1px solid #e9eef3;color:#64748b;font-size:12px;">
                © ${new Date().getFullYear()} ${siteName} — Website Contact Form
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

const PURPOSE_LABELS: Record<string, string> = {
  admission: "Admission Enquiry",
  complaint: "Complaint",
  academic: "Academic Performance Discussion",
  fees: "Fees Discussion",
  principal: "Meeting with Principal",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Name, email, phone, purpose, Message, website } = body;

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: false, message: "Spam detected." }, { status: 400 });
    }

    if (!Name || !email || !phone || !purpose || !Message) {
      return NextResponse.json(
        { ok: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const purposeLabel = PURPOSE_LABELS[purpose] || purpose;
    let slotInfo: { date: string; time: string } | undefined;

    // If Principal meeting, assign slot with retry logic for race conditions
    if (purpose === "principal") {
      let appointmentCreated = false;
      let attempts = 0;
      const maxAttempts = 3;
      let bookedSlot: { date: Date; timeSlot: string } | null = null;

      while (!appointmentCreated && attempts < maxAttempts) {
        attempts++;
        const availableSlot = await findNextAvailableSlot();

        if (!availableSlot) {
          return NextResponse.json(
            { ok: false, message: "Sorry, no appointment slots are available in the next 12 weeks. Please call us directly." },
            { status: 400 }
          );
        }

        try {
          // Create appointment
          await prisma.appointment.create({
            data: {
              name: Name,
              email,
              phone,
              purpose: purposeLabel,
              date: availableSlot.date,
              timeSlot: availableSlot.timeSlot,
              message: Message,
              status: "CONFIRMED",
            },
          });
          appointmentCreated = true;
          bookedSlot = availableSlot;
        } catch (err: unknown) {
          // Check if it's a unique constraint error (P2002)
          const prismaError = err as { code?: string };
          if (prismaError.code === "P2002" && attempts < maxAttempts) {
            // Slot was taken by another request, retry with next slot
            console.log(`Slot conflict on attempt ${attempts}, retrying...`);
            continue;
          }
          throw err; // Re-throw if not a unique constraint error or max attempts reached
        }
      }

      if (!bookedSlot) {
        return NextResponse.json(
          { ok: false, message: "Could not book appointment slot. Please try again." },
          { status: 500 }
        );
      }

      slotInfo = {
        date: formatDate(bookedSlot.date),
        time: bookedSlot.timeSlot,
      };

      // Send confirmation to user
      await sendEmail({
        to: email,
        subject: "Your Appointment is Confirmed - Engineers & Doctors School",
        html: generateConfirmationEmail(Name, purposeLabel, slotInfo.date, slotInfo.time),
      });
    }

    // Send notification to admin
    const adminResult = await sendEmail({
      to: process.env.SMTP_FROM_EMAIL || "info@edschool.pk",
      subject: `Engineers & Doctors School Contact - ${Name}`,
      html: generateAdminNotificationEmail(Name, email, phone, purposeLabel, Message, slotInfo?.date, slotInfo?.time),
      replyTo: `${Name} <${email}>`,
    });

    if (adminResult.ok) {
      const successMsg = purpose === "principal"
        ? "Thanks! Your appointment has been booked. A confirmation email has been sent to you."
        : "Thanks! Your message has been sent successfully.";

      return NextResponse.json({ ok: true, message: successMsg, slot: slotInfo });
    } else {
      return NextResponse.json(
        { ok: false, message: adminResult.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
