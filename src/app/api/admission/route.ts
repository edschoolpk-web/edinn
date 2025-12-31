import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic Validation Check (Simplified)
    const requiredFields = [
      'admission_class', 'session', 'student_name', 'gender', 'dob',
      'address', 'father_name', 'father_cnic', 'father_occupation',
      'father_cell', 'email', 'emergency_name', 'emergency_phone'
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
         return NextResponse.json(
          { ok: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // SIMULATION: Log enrollment data
    console.log('--- NEW ENROLLMENT SUBMISSION ---');
    console.log('Student:', data.student_name);
    console.log('Class:', data.admission_class);
    console.log('Parent Email:', data.email);
    console.log('Data:', data);
    console.log('---------------------------------');

    return NextResponse.json({ 
      ok: true, 
      message: 'Enrollment submitted successfully!' 
    });

  } catch (error) {
    console.error('Admission API Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
