"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { getHeroSlides, createHeroSlide, deleteHeroSlide } from '@/app/actions/hero';
import toast from 'react-hot-toast';
import { toAbsoluteUploadsUrl } from "@/lib/image-utils";

type HeroSlide = {
  id: string;
  imageUrl: string;
  order: number;
};

export default function AdminHero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const data = await getHeroSlides();
      setSlides(data as HeroSlide[]);
    } catch (error) {
      toast.error("Failed to fetch slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const files = Array.from(e.target.files);
    
    let successCount = 0;
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const res = await createHeroSlide(formData);
        if (res.success) {
          successCount++;
        } else {
          toast.error(`Failed to upload ${file.name}: ${res.error}`);
        }
      } catch (err) {
        toast.error(`Error uploading ${file.name}`);
      }
    }

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} slide(s)`);
      fetchSlides();
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero slide?')) return;
    const res = await deleteHeroSlide(id);
    if (res.success) {
      toast.success('Slide deleted');
      setSlides(slides.filter(s => s.id !== id));
    } else {
      toast.error(res.error || 'Delete failed');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Hero Slider Management</h1>
        <p>Manage the images that appear on the homepage hero slider.</p>
      </div>

      <div className="hero-admin-content">
        <div className="actions-toolbar">
          <div className="left-actions">
            <span className="selection-count">{slides.length} active slide(s)</span>
          </div>
          <div className="right-actions">
            <button
              className="btn-primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <i className="fas fa-plus"></i> Add New Slide
            </button>
            <input
              type="file"
              hidden
              multiple
              ref={fileInputRef}
              onChange={handleUpload}
              accept="image/*"
              disabled={uploading}
            />
          </div>
        </div>

        <div className="slides-list-container">
          {uploading && (
            <div className="uploading-overlay">
              <div className="spinner"></div>
              <p>Uploading slide(s)...</p>
            </div>
          )}

          {loading ? (
            <div className="slides-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton-slide shimmer"></div>
              ))}
            </div>
          ) : (
            <>
              {slides.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon"><i className="fas fa-images"></i></div>
                  <h3>No Hero Slides</h3>
                  <p>Upload high-quality images for your homepage.</p>
                </div>
              ) : (
                <div className="slides-grid">
                  {slides.map((slide) => (
                    <div className="slide-card" key={slide.id}>
                      <div className="slide-img-wrapper">
                        <Image 
                          src={toAbsoluteUploadsUrl(slide.imageUrl)} 
                          alt="Hero Slide" 
                          fill
                          className="slide-img" 
                        />
                        <div className="slide-actions">
                          <button className="delete-btn" onClick={() => handleDelete(slide.id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <div className="slide-info">
                         <span className="slide-path">{slide.imageUrl.split('/').pop()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .page-container { animation: fadeIn 0.5s ease; width: 100%; }
        .page-header { margin-bottom: 24px; }
        .page-header h1 { font-size: 24px; font-weight: 700; color: #2B3674; margin: 0; }
        .page-header p { color: #A3AED0; margin: 4px 0 0; font-size: 14px; }
        
        .hero-admin-content {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          overflow: hidden;
          padding: 24px;
        }

        .actions-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f2f5;
        }

        .btn-primary {
          background: linear-gradient(90deg, #4318FF 0%, #868CFF 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(67, 24, 255, 0.25); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .slides-list-container { position: relative; min-height: 300px; }
        
        .slides-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .slide-card {
          border-radius: 16px;
          overflow: hidden;
          background: white;
          border: 1px solid #f0f2f5;
          transition: all 0.3s;
        }
        .slide-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }

        .slide-img-wrapper { 
          position: relative; 
          width: 100%; 
          aspect-ratio: 16/9; 
          background: #f8fafc;
        }
        .slide-img { object-fit: contain; }

        .slide-actions {
          position: absolute;
          top: 10px; right: 10px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .slide-card:hover .slide-actions { opacity: 1; }

        .delete-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: white;
          color: #E31A1A;
          border: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .delete-btn:hover { background: #E31A1A; color: white; }

        .slide-info { padding: 12px; border-top: 1px solid #f0f2f5; }
        .slide-path { font-size: 12px; color: #718096; word-break: break-all; }

        .empty-state { text-align: center; padding: 60px; color: #A3AED0; }
        .empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.3; }
        .empty-state h3 { color: #2B3674; margin: 0 0 8px; }

        .uploading-overlay {
          position: absolute;
          inset: 0; background: rgba(255,255,255,0.8);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 10; border-radius: 16px;
        }

        .spinner {
          width: 40px; height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #4318FF;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .skeleton-slide { background: #f1f5f9; border-radius: 16px; aspect-ratio: 16/9; }
        .shimmer { position: relative; overflow: hidden; }
        .shimmer::after {
          position: absolute; inset: 0;
          background-image: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: translateX(-100%);
          animation: shimmer 1.5s infinite;
          content: '';
        }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}
