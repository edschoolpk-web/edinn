import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Required fields check
    const requiredFields = [
      'post', 'full_name', 'guardian_name', 'cnic', 'phone', 'gender',
      'dob', 'marital_status', 'qualification', 'experience_years',
      'subject_area', 'last_institute', 'city', 'address'
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { ok: false, message: `Please fill all required fields.` },
          { status: 400 }
        );
      }
    }

    // SIMULATION: Log application data
    console.log('--- NEW CAREER APPLICATION ---');
    console.log('Applicant:', data.full_name);
    console.log('Post:', data.post);
    console.log('CNIC:', data.cnic);
    console.log('Data:', data);
    console.log('------------------------------');

    return NextResponse.json({ 
      ok: true, 
      message: 'Thanks! Your application has been submitted successfully.' 
    });

  } catch (error) {
    console.error('Career API Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
