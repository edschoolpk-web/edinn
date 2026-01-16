"use client";
import React, { useEffect, useState } from 'react';
import { getNotice } from "@/app/actions/notice";
import Image from 'next/image';
import { toAbsoluteUploadsUrl } from "@/lib/image-utils";

export default function NoticePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [notice, setNotice] = useState<{
        content: string;
        image: string | null;
        isActive: boolean;
        id: string; // Added ID to type
    } | null>(null);

    useEffect(() => {
        async function fetchNotice() {
            try {
                const res = await getNotice();
                if (res.success && res.data && res.data.isActive) {
                    setNotice(res.data as any);
                    setTimeout(() => setIsVisible(true), 1000);
                }
            } catch (err) {
                console.error("Error loading notice:", err);
            }
        }
        fetchNotice();
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (isVisible && !notice) {
        return (
            <div className="notice-overlay">
                <div className="notice-popup">
                    <div className="popup-header">
                        <span className="notice-label">NOTICE BOARD</span>
                        <div className="close-btn" style={{ opacity: 0 }}>×</div>
                    </div>
                    <div className="popup-body">
                        <div className="skeleton-image shimmer" style={{ height: '200px', width: '100%' }}></div>
                        <div className="popup-content">
                            <div className="skeleton-line shimmer" style={{ width: '90%' }}></div>
                            <div className="skeleton-line shimmer" style={{ width: '100%' }}></div>
                            <div className="skeleton-line shimmer" style={{ width: '80%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!notice || !isVisible) return null;

    return (
        <div className="notice-overlay">
            <div className="notice-popup">
                <div className="popup-header">
                    <span className="notice-label">NOTICE BOARD</span>
                    <button onClick={handleClose} className="close-btn">×</button>
                </div>

                <div className="popup-body">
                    {notice.image && (
                        <div className="popup-image-container">
                            <Image
                                src={toAbsoluteUploadsUrl(notice.image)}
                                alt="Notice"
                                width={500}
                                height={300}
                                className="popup-image"
                            />
                        </div>
                    )}
                    <div className="popup-content">
                        <div dangerouslySetInnerHTML={{ __html: notice.content }}></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .notice-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(4px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease-out;
                    padding: 20px;
                }

                .notice-popup {
                    background: white;
                    width: 100%;
                    max-width: 500px;
                    border: none;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    animation: slideUp 0.4s ease-out;
                    overflow: hidden;
                    position: relative;
                    border-radius: 12px;
                }

                .popup-header {
                    background: linear-gradient(90deg, #01ffff, #63f101);
                    color: #000;
                    padding: 12px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .notice-label {
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    font-size: 14px;
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: #000;
                    font-size: 28px;
                    line-height: 1;
                    cursor: pointer;
                    padding: 0;
                    transition: transform 0.2s;
                }
                
                .close-btn:hover {
                    transform: scale(1.1);
                }

                .popup-body {
                    max-height: 80vh;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                }

                .popup-image-container {
                    width: 100%;
                    background: #f5f5f5;
                    flex-shrink: 0;
                }

                .popup-image {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .popup-content {
                    padding: 30px;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    word-break: break-word;
                    white-space: normal;
                }

                /* Skeleton Loader Support */
                .shimmer {
                    position: relative;
                    overflow: hidden;
                    background: #f2f2f2;
                }

                .shimmer::after {
                    position: absolute;
                    top: 0; right: 0; bottom: 0; left: 0;
                    transform: translateX(-100%);
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0,
                        rgba(255, 255, 255, 0.2) 20%,
                        rgba(255, 255, 255, 0.5) 60%,
                        rgba(255, 255, 255, 0)
                    );
                    animation: shimmer 2s infinite;
                    content: '';
                }

                @keyframes shimmer { 100% { transform: translateX(100%); } }

                .skeleton-line {
                    height: 16px;
                    margin-bottom: 15px;
                    border-radius: 4px;
                    width: 100%;
                }
                
                /* Quill Alignment Classes */
                .popup-content :global(.ql-align-center) { text-align: center; }
                .popup-content :global(.ql-align-right) { text-align: right; }
                .popup-content :global(.ql-align-justify) { text-align: justify; }
                .popup-content :global(.ql-align-left) { text-align: left; }

                .popup-content :global(*) {
                    color: #000;
                }
                .popup-content :global(p) {
                    font-size: 16px;
                    line-height: 1.6;
                    margin: 0 0 10px 0;
                }
                .popup-content :global(strong) { font-weight: 700; }
                .popup-content :global(em) { font-style: italic; }
                .popup-content :global(ul) {
                    text-align: left;
                    padding-left: 20px;
                    margin-bottom: 10px;
                    list-style-type: disc !important;
                }
                .popup-content :global(ol) {
                    text-align: left;
                    padding-left: 20px;
                    margin-bottom: 10px;
                    list-style-type: decimal !important;
                }
                .popup-content :global(li) { margin-bottom: 5px; list-style: inherit !important; }
                .popup-content :global(h1), .popup-content :global(h2), .popup-content :global(h3) {
                    margin-bottom: 10px;
                    line-height: 1.3;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
