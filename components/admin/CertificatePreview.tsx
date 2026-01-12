'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CertificatePreviewProps {
    studentName: string;
    type: string;
    commendation1: string;
    commendation2: string;
}

const CERTIFICATE_TEMPLATES: Record<string, string> = {
    'CHARACTER': 'character-certificate.jpg',
    'PROVISIONAL': 'provisional-certificate.jpg',
    'LEAVING': 'leaving-certificate.jpg',
    'APPRECIATION': 'appreciation-certificate.jpg',
    'EXPERIENCE': 'teacher-experience-certificate.jpg'
};

const CertificatePreview: React.FC<CertificatePreviewProps> = ({
    studentName,
    type,
    commendation1,
    commendation2,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(([entry]) => {
            const width = entry.contentRect.width;
            const newScale = width / 2000;

            setScale(prev => {
                if (Math.abs(prev - newScale) < 0.002) return prev;
                return newScale;
            });
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const backgroundImage = `/webImages/certificates/${CERTIFICATE_TEMPLATES[type] || 'character-certificate.jpg'}`;

    return (
        <div
            className="w-full bg-gray-100 border rounded-lg relative"
            ref={containerRef}
            style={{
                height: containerRef.current ? (containerRef.current.offsetWidth / 2000) * 1414 : 'auto',
                overflow: 'hidden',
                transition: 'height 0.1s ease-out'
            }}
        >
            <div
                style={{
                    width: '2000px',
                    height: '1414px',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                }}
            >
                {/* Student Name */}
                <div
                    style={{
                        position: 'absolute',
                        top: '750px', // user updated baseline
                        left: 0,
                        width: '2000px',
                        textAlign: 'center',
                        fontSize: '105px',
                        fontFamily: "'Great Vibes', cursive",
                        color: '#000000',
                        fontWeight: 'normal',
                        lineHeight: 1,
                        transform: 'translateY(-100%)',
                    }}
                >
                    {studentName || 'Student Name'}
                </div>

                {/* Commendation Line 1 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '860px',
                        left: 0,
                        width: '2000px',
                        textAlign: 'center',
                        fontSize: '53px',
                        fontFamily: "'Playfair Display', serif",
                        color: '#000000',
                        fontWeight: 600,
                        lineHeight: 1,
                        transform: 'translateY(-100%)',
                    }}
                >
                    {commendation1 || 'Commendation Text – Line 1'}
                </div>

                {/* Commendation Line 2 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '930px',
                        left: 0,
                        width: '2000px',
                        textAlign: 'center',
                        fontSize: '53px',
                        fontFamily: "'Playfair Display', serif",
                        color: '#000000',
                        fontWeight: 600,
                        lineHeight: 1,
                        transform: 'translateY(-100%)',
                    }}
                >
                    {commendation2 || 'Commendation Text – Line 2'}
                </div>

                {/* QR Code Placeholder */}
                <div
                    style={{
                        fontSize: '10px',
                        border: '1px dashed #000',
                        position: 'absolute',
                        left: '1770px',
                        top: '1184px',
                        width: '200px',
                        height: '200px',
                    }}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        QR Preview
                        <div
                            style={{
                                position: 'absolute',
                                width: '60px', // matched PDF logic
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img src="/favicon.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CertificatePreview;
