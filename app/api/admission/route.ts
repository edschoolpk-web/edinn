import { NextResponse } from "next/server";
import { sendEmail, isValidCnic } from "@/lib/email-utils";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const admission_class = formData.get("admission_class") as string;
    const session = formData.get("session") as string;
    const student_name = formData.get("student_name") as string;
    const gender = formData.get("gender") as string;
    const dob = formData.get("dob") as string;
    const bform = formData.get("bform") as string;
    const last_school = formData.get("last_school") as string;
    const address = formData.get("address") as string;
    const father_name = formData.get("father_name") as string;
    const father_cnic = formData.get("father_cnic") as string;
    const father_occupation = formData.get("father_occupation") as string;
    const father_cell = formData.get("father_cell") as string;
    const email = formData.get("email") as string;
    const mother_name = formData.get("mother_name") as string;
    const mother_occupation = formData.get("mother_occupation") as string;
    const mother_cell = formData.get("mother_cell") as string;
    const emergency_name = formData.get("emergency_name") as string;
    const emergency_phone = formData.get("emergency_phone") as string;
    const studentImageFile = formData.get("student_image") as File;
    const meeting_date = formData.get("meeting_date") as string;
    const meeting_time = formData.get("meeting_time") as string;

    // Required checks
    const required = [
      admission_class,
      session,
      student_name,
      gender,
      dob,
      address,
      father_name,
      father_cnic,
      father_occupation,
      father_cell,
      email,
      emergency_name,
      emergency_phone,
    ];

    if (required.some((field) => !field || field.toString().trim() === "")) {
      return NextResponse.json(
        { ok: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    if (!isValidCnic(father_cnic)) {
      return NextResponse.json(
        { ok: false, message: "Invalid Father CNIC format (Exactly 13 digits required)." },
        { status: 400 }
      );
    }

    if (!/^\d{11}$/.test(father_cell)) {
      return NextResponse.json(
        { ok: false, message: "Father Mobile must be exactly 11 digits." },
        { status: 400 }
      );
    }

    // Handle Image Upload
    let studentImagePath = "";
    if (studentImageFile && studentImageFile.size > 0) {
      studentImagePath = await storage.upload(studentImageFile, "admissions");
    }

    // Save to database
    await prisma.admissionApplication.create({
      data: {
        admissionClass: admission_class,
        session,
        studentName: student_name,
        gender,
        dob,
        bform: bform || null,
        lastSchool: last_school || null,
        address,
        fatherName: father_name,
        fatherCnic: father_cnic,
        fatherOccupation: father_occupation || null,
        fatherCell: father_cell,
        email,
        motherName: mother_name || null,
        motherOccupation: mother_occupation || null,
        motherCell: mother_cell || null,
        emergencyName: emergency_name,
        emergencyPhone: emergency_phone,
        studentImage: studentImagePath,
        meetingDate: meeting_date ? new Date(meeting_date + 'T12:00:00') : null,
        meetingTime: meeting_time || null,
      }
    });

    const siteName = "Engineers & Doctors School";
    const date = new Date().toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const dataMap: Record<string, string> = {
      Class: admission_class,
      Session: session,
      "Student Name": student_name,
      Gender: gender,
      "Date of Birth": dob,
      "B-Form": bform || "",
      "Last School": last_school || "",
      Address: address,
      "Father Name": father_name,
      "Father CNIC": father_cnic,
      "Father Occupation": father_occupation || "",
      "Father Mobile": father_cell,
      "Parent Email": email,
      "Mother Name": mother_name || "",
      "Mother Occupation": mother_occupation || "",
      "Mother Mobile": mother_cell || "",
      "Emergency Name": emergency_name,
      "Emergency Mobile": emergency_phone,
      "Preferred Visit Date": meeting_date || "Not Scheduled",
      "Preferred Visit Time": meeting_time || "Not Scheduled",
    };

    let rows = "";
    for (const [label, value] of Object.entries(dataMap)) {
      rows += `
      <tr>
        <td style='padding:10px;border:1px solid #e5e7eb;background:#f8fafc;width:35%'><strong>${label}</strong></td>
        <td style='padding:10px;border:1px solid #e5e7eb'>${value}</td>
      </tr>`;
    }

    const html = `
    <!doctype html>
    <html>
    <body style='margin:0;background:#f4f6f8;font-family:Arial'>
      <table width='100%' cellpadding='0' cellspacing='0'>
        <tr><td align='center'>
          <table width='650' style='background:#fff;border-radius:12px;overflow:hidden'>
            <tr>
              <td style='background:#0f172a;color:#fff;padding:18px'>
                <strong>${siteName} – Student Enrollment</strong><br>
                <small>Submitted: ${date}</small>
              </td>
            </tr>
            <tr>
              <td style='padding:20px'>
                <table width='100%' cellpadding='0' cellspacing='0'>
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style='background:#f8fafc;padding:12px;font-size:12px;color:#64748b'>
                © ${new Date().getFullYear()} ${siteName}
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
    `;

    const result = await sendEmail({
      to: process.env.SMTP_FROM_EMAIL || "info@edschool.pk",
      subject: `${siteName} – New Student Enrollment`,
      html,
      // No replyTo set in PHP for admission, so omitting
    });

    if (result.ok) {
      return NextResponse.json({
        ok: true,
        message: "Enrollment submitted successfully!",
      });
    } else {
      return NextResponse.json(
        { ok: false, message: "Mail server error. Please try again later." },
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
