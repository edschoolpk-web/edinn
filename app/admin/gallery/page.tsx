"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const MOCK_IMAGES = [
  { id: '1', url: '/webImages/gallery1.jpg', title: 'Classroom Activity' },
  { id: '2', url: '/webImages/gallery2.jpg', title: 'Sports Day' },
  { id: '3', url: '/webImages/gallery3.jpg', title: 'Science Fair' },
  { id: '4', url: '/webImages/gallery4.jpg', title: 'Art Exhibition' },
  { id: '5', url: '/webImages/gallery5.jpg', title: 'Award Ceremony' },
  { id: '6', url: '/webImages/gallery6.jpg', title: 'School Trip' },
];

export default function AdminGallery() {
  const [images, setImages] = useState(MOCK_IMAGES);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gallery Management</h1>
        <button className="add-btn">
          <i className="fas fa-cloud-upload-alt"></i> Upload New Image
        </button>
      </div>

      <div className="upload-zone">
        <div className="upload-content">
          <i className="fas fa-image icon-upload"></i>
          <h3>Drag & Drop your image here</h3>
          <p>or click to browse from your computer</p>
        </div>
      </div>

      <div className="gallery-grid">
        {images.map((img) => (
          <div className="gallery-item" key={img.id}>
            <div className="img-wrapper">
              <Image src={img.url} alt={img.title} width={300} height={200} className="gallery-img" />
              <div className="overlay">
                 <button className="del-btn"><i className="fas fa-trash"></i></button>
              </div>
            </div>
            <div className="caption">{img.title}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .page-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #2B3674;
          margin: 0;
        }

        .add-btn {
          background: #4318FF;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.3s;
        }

        .add-btn:hover {
          background: #3311CC;
        }

        .upload-zone {
          background: white;
          border: 2px dashed #E0E5F2;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          margin-bottom: 30px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .upload-zone:hover {
          border-color: #4318FF;
          background: #F4F7FE;
        }

        .icon-upload {
          font-size: 48px;
          color: #4318FF;
          margin-bottom: 16px;
        }

        .upload-content h3 {
          margin: 0 0 8px 0;
          color: #2B3674;
        }

        .upload-content p {
          margin: 0;
          color: #A3AED0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .gallery-item {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .img-wrapper {
          position: relative;
          height: 150px;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .img-wrapper:hover .overlay {
          opacity: 1;
        }

        .del-btn {
          background: #FF5B5B;
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .caption {
          padding: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #2B3674;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}
