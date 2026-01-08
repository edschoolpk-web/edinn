"use client";

import React from 'react';

interface TeacherBioProps {
    content: string;
}

export default function TeacherBio({ content }: TeacherBioProps) {
    return (
        <>
            <div
                className="teacher-bio-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <style jsx global>{`
                .teacher-bio-content {
                    color: #666;
                    line-height: 1.8;
                    margin-bottom: 30px;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    word-break: normal !important;
                    display: block !important;
                    height: auto !important;
                    overflow: visible !important;
                    max-height: none !important;
                }
                .teacher-bio-content p { 
                    margin-bottom: 15px;
                    display: block !important;
                    -webkit-line-clamp: none !important;
                    line-clamp: none !important;
                    overflow: visible !important;
                    max-height: none !important;
                    height: auto !important;
                }
                .teacher-bio-content strong { font-weight: 700; color: #333; }
                .teacher-bio-content em { font-style: italic; }
                .teacher-bio-content b { font-weight: 700; }
                .teacher-bio-content i { font-style: italic; }
                .teacher-bio-content ul {
                    padding-left: 20px;
                    margin-bottom: 20px;
                    list-style-type: disc !important;
                    display: block !important;
                }
                .teacher-bio-content ol {
                    padding-left: 20px;
                    margin-bottom: 20px;
                    list-style-type: decimal !important;
                    display: block !important;
                }
                .teacher-bio-content li { margin-bottom: 5px; list-style: inherit !important; display: list-item !important; }
                .teacher-bio-content h1, .teacher-bio-content h2, .teacher-bio-content h3 {
                    margin-top: 20px;
                    margin-bottom: 10px;
                    color: #333;
                }
                
                /* Quill Alignment Support */
                .teacher-bio-content .ql-align-center { text-align: center; }
                .teacher-bio-content .ql-align-right { text-align: right; }
                .teacher-bio-content .ql-align-justify { text-align: justify; }
            `}</style>
        </>
    );
}
