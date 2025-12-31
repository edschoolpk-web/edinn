import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { Name, email, phone, Message } = data;
    if (!Name || !email || !phone || !Message) {
      return NextResponse.json(
        { ok: false, message: 'Please fill all required fields.' },
        { status: 400 }
      );
    }

    // SIMULATION: Log email content to console instead of sending
    console.log('--- NEW CONTACT FORM SUBMISSION ---');
    console.log('From:', Name, `<${email}>`);
    console.log('Phone:', phone);
    console.log('Message:', Message);
    console.log('-----------------------------------');

    // In a real app, you would use a library like 'nodemailer' here.
    // e.g., await transporter.sendMail({ ... });

    return NextResponse.json({ 
      ok: true, 
      message: 'Thanks! Your message has been sent successfully.' 
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
