'use client';

import React, { useState } from 'react';
import { generateCertificateAction } from '@/app/actions/certificate';
import CertificatePreview from '@/components/admin/CertificatePreview';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CertificateGenerator() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        studentName: '',
        type: 'CHARACTER',
        commendation1: '',
        commendation2: ''
    });
    const [loading, setLoading] = useState(false);
    const [generatedPdf, setGeneratedPdf] = useState<string | null>(null);

    const isFormValid = formData.studentName.trim() !== '' &&
        formData.commendation1.trim() !== '' &&
        formData.commendation2.trim() !== '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerate = async () => {
        if (!isFormValid) {
            toast.error('All fields are required');
            return;
        }

        setLoading(true);
        setGeneratedPdf(null);

        const data = new FormData();
        data.append('studentName', formData.studentName);
        data.append('type', formData.type);
        data.append('commendation1', formData.commendation1);
        data.append('commendation2', formData.commendation2);

        const result = await generateCertificateAction(data);

        if (result.success && result.certificate) {
            toast.success('Certificate generated successfully!');
            setGeneratedPdf(result.certificate.pdfPath);
            router.refresh(); // Refresh to update list
        } else {
            toast.error('Failed to generate: ' + result.error);
        }
        setLoading(false);
    };

    const certificateTypes = [
        { value: 'CHARACTER', label: 'Character Certificate' },
        { value: 'PROVISIONAL', label: 'Provisional Certificate' },
        { value: 'LEAVING', label: 'School Leaving Certificate' },
        { value: 'APPRECIATION', label: 'Certificate of Appreciation' },
        { value: 'EXPERIENCE', label: 'Teachers Experience Certificate' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Panel: Inputs */}
            <div className="bg-white p-6 rounded-[20px] shadow-[0_3px_11px_0_rgb(0,0,0,0.02)] h-fit">
                <h2 className="text-xl font-bold mb-4 text-[#2B3674]">Certificate Details</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-[#2B3674] mb-2">Certificate Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-[#E0E5F2] rounded-xl text-[#1B2559] focus:border-[#4318FF] focus:ring-1 focus:ring-[#4318FF] outline-none transition font-medium bg-white"
                        >
                            {certificateTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#2B3674] mb-2">Presentation Text</label>
                        <input
                            type="text"
                            value="This certificate is presented to"
                            readOnly
                            className="w-full px-4 py-3 border border-[#E0E5F2] rounded-xl text-[#A3AED0] bg-gray-50 focus:outline-none transition font-medium cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#2B3674] mb-2">Recipient Name</label>
                        <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-[#E0E5F2] rounded-xl text-[#1B2559] placeholder-[#A3AED0] focus:border-[#4318FF] focus:ring-1 focus:ring-[#4318FF] outline-none transition font-medium"
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#2B3674] mb-2">Commendation Text – Line 1</label>
                        <input
                            type="text"
                            name="commendation1"
                            value={formData.commendation1}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-[#E0E5F2] rounded-xl text-[#1B2559] placeholder-[#A3AED0] focus:border-[#4318FF] focus:ring-1 focus:ring-[#4318FF] outline-none transition font-medium"
                            placeholder="e.g. For outstanding performance"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#2B3674] mb-2">Commendation Text – Line 2</label>
                        <input
                            type="text"
                            name="commendation2"
                            value={formData.commendation2}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-[#E0E5F2] rounded-xl text-[#1B2559] placeholder-[#A3AED0] focus:border-[#4318FF] focus:ring-1 focus:ring-[#4318FF] outline-none transition font-medium"
                            placeholder="e.g. and achieving clinical excellence"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={loading || !isFormValid}
                            style={{ background: loading || !isFormValid ? '#A3AED0' : 'linear-gradient(90deg, #4318FF 0%, #868CFF 100%)' }}
                            className={`w-full py-3 px-4 rounded-xl text-white font-bold transition shadow-[0_4px_10px_rgba(67,24,255,0.2)] hover:shadow-[0_6px_15px_rgba(67,24,255,0.3)] hover:-translate-y-0.5 ${loading || !isFormValid ? 'opacity-70 cursor-not-allowed shadow-none hover:translate-y-0 hover:shadow-none' : ''
                                }`}
                        >
                            {loading ? 'Generating...' : 'Generate Certificate'}
                        </button>
                    </div>

                    {generatedPdf && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl">
                            <p className="text-green-800 font-bold mb-2">Certificate Ready!</p>
                            <div className="flex gap-2">
                                <a
                                    href={`${generatedPdf}?t=${Date.now()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-center py-2 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition shadow-sm"
                                >
                                    Download / View PDF
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Live Preview */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Live Preview</h2>
                </div>

                <CertificatePreview
                    studentName={formData.studentName}
                    type={formData.type}
                    commendation1={formData.commendation1}
                    commendation2={formData.commendation2}
                />
            </div>
        </div>
    );
}
