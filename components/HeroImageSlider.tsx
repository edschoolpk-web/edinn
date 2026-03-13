"use client";

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { toAbsoluteUploadsUrl } from '@/lib/image-utils';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type HeroSlide = {
  id: string;
  imageUrl: string;
};

export default function HeroImageSlider({ slides }: { slides: HeroSlide[] }) {
  // Default fallback if no slides from Admin
  const displaySlides = slides.length > 0 ? slides : [
    {
      id: "default-1",
      imageUrl: "/webImages/banner-img1.png",
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    customPaging: (i: number) => (
      <button
        type="button"
        className="w-2 h-2 rounded-full bg-blue-500 opacity-50 transition-all hover:opacity-100"
        aria-label={`Go to image ${i + 1}`}
      />
    )
  };

  return (
    <div className="w-full relative">
      <Slider {...settings} className="h-full w-full">
        {displaySlides.map((slide, index) => (
          <div key={slide.id} className="relative w-full focus:outline-none">
            <Image 
              src={toAbsoluteUploadsUrl(slide.imageUrl)} 
              alt="Hero image slide"
              width={0}
              height={0}
              sizes="100vw"
              priority={index === 0}
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
        ))}
      </Slider>
      
      {/* Optional: Add custom CSS overrides for Slick Dots inside this component if needed */}
      <style jsx global>{`
        .slick-dots {
          bottom: 10px;
        }
        .slick-dots li.slick-active button {
          opacity: 1;
          transform: scale(1.3);
          background-color: #08fbff;
        }
        .banner-img .slick-slider {
           border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}
