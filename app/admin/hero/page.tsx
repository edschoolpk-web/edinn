"use client";

import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  uploadImage
} from '@/app/actions/hero';

type HeroSlide = {
  id: string;
  imageUrl: string;
  order: number;
};

export default function HeroAdminPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  // Form states
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setIsLoading(true);
    const result = await getHeroSlides();
    if (result.success && result.slides) {
      setSlides(result.slides as HeroSlide[]);
    } else {
      toast.error(result.error || 'Failed to fetch slides');
    }
    setIsLoading(false);
  };

  const handleOpenModal = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setPreviewUrl(slide.imageUrl);
      setFile(null);
    } else {
      setEditingSlide(null);
      setPreviewUrl('');
      setFile(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSlide(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide && !file && !previewUrl) {
      toast.error('Image is required');
      return;
    }

    startTransition(async () => {
      let imageUrl = previewUrl;

      // Handle upload if new file selected
      if (file) {
        const uploadResult = await uploadImage(file);
        if (!uploadResult.success || !uploadResult.url) {
          toast.error(uploadResult.error || 'Upload failed');
          return;
        }
        imageUrl = uploadResult.url;
      }

      const data = {
        imageUrl,
      };

      let result;
      if (editingSlide) {
        result = await updateHeroSlide(editingSlide.id, data);
      } else {
        result = await createHeroSlide(data);
      }

      if (result.success) {
        toast.success(editingSlide ? 'Slide updated!' : 'Slide created!');
        fetchSlides();
        handleCloseModal();
      } else {
        toast.error(result.error || 'An error occurred');
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    startTransition(async () => {
      const result = await deleteHeroSlide(id);
      if (result.success) {
        toast.success('Image deleted');
        fetchSlides();
      } else {
        toast.error(result.error || 'Failed to delete image');
      }
    });
  };

  return (
    <div className="admin-page">
      <div className="page-header flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hero Image Slider Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage dynamic background images for the homepage hero section.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          <i className="fas fa-plus mr-2"></i> Add Image
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
      ) : slides.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <i className="fas fa-images text-4xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No images found. Click "Add Image" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col relative group">
              <div className="relative h-48 w-full bg-gray-100">
                <Image src={slide.imageUrl} alt="Slide Preview" fill className="object-contain" />
              </div>
              <div className="p-4 flex-grow">
                <div className="pt-2 flex justify-end items-center">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleOpenModal(slide)} 
                      className="text-blue-500 hover:text-blue-700"
                      disabled={isPending}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(slide.id)} 
                      className="text-red-500 hover:text-red-700"
                      disabled={isPending}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{editingSlide ? 'Edit Image' : 'Add New Image'}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image (Required)</label>
                <div className="flex flex-col gap-4">
                  {previewUrl && (
                    <div className="relative w-full h-48 border rounded overflow-hidden">
                      <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    <p className="text-xs text-gray-400 mt-1">Recommended size: 500x375px or 4:3 ratio.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition flex items-center justify-center min-w-[100px]"
                  disabled={isPending}
                >
                  {isPending ? <i className="fas fa-spinner fa-spin"></i> : editingSlide ? 'Update Image' : 'Upload Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
