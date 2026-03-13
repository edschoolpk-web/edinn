"use client";

import React, { useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type HeroSlide = {
  id: string;
  imageUrl: string;
  title: string | null;
  subtitle: string | null;
  buttonText: string | null;
  buttonLink: string | null;
};

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default fallback if no slides from Admin
  const displaySlides = slides.length > 0 ? slides : [
    {
      id: "default-1",
      imageUrl: "/webImages/banner-img1.png",
      title: "A School That Builds <span class='text-blue-500'>Future Innovators</span>",
      subtitle: "At Engineers & Doctors School, we provide a future-focused education that blends STEM-based learning, multilingual education, robotics and technology, art and craft, and computer literacy helping every child think critically, create boldly, and grow in a nurturing environment.",
      buttonText: "Apply for Admission",
      buttonLink: "/admission"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    appendDots: (dots: any) => (
      <div style={{ bottom: '30px', zIndex: 20 }}>
        <ul className="m-0 flex justify-center items-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button
        type="button"
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === currentSlide 
            ? "bg-blue-600 scale-125 shadow-[0_0_10px_rgba(37,99,235,0.8)]" 
            : "bg-white/50 hover:bg-white/80"
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    )
  };

  return (
    <div className="relative w-full overflow-hidden group main-section" style={{ minHeight: '650px', display: 'flex' }}>
      <Slider {...settings} className="h-full w-full absolute inset-0">
        {displaySlides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-[650px] md:h-[800px] focus:outline-none">
            
            {/* Background Image with slow zoom effect */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1 }}
              animate={{ scale: currentSlide === index ? 1.05 : 1 }}
              transition={{ duration: 7, ease: "linear" }}
            >
              <Image 
                src={slide.imageUrl} 
                alt={slide.title ? slide.title.replace(/<[^>]+>/g, '') : "Hero slide"} 
                fill 
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              {/* Overlay gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0"></div>
            </motion.div>

            {/* Content Container */}
            <div className="container relative h-full flex flex-col justify-center z-10 pt-20 pb-20">
              <div className="row align-items-center h-full">
                <div className="col-lg-8 col-md-10 z-10">
                  <div className="banner-text max-w-[800px]">
                    
                    {/* Title with Framer Motion */}
                    <AnimatePresence mode="sync">
                      {currentSlide === index && (
                        <motion.h2 
                          className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          dangerouslySetInnerHTML={{ __html: slide.title || '' }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Subtitle with Framer Motion */}
                    <AnimatePresence mode="sync">
                      {currentSlide === index && slide.subtitle && (
                        <motion.p 
                          className="text-lg md:text-xl mb-8 text-gray-200 drop-shadow-md border-l-4 border-blue-500 pl-4 py-1"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                          {slide.subtitle}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Button with Framer Motion */}
                    <AnimatePresence mode="sync">
                      {currentSlide === index && slide.buttonText && slide.buttonLink && (
                        <motion.div
                          className="lnk-dv mt-4"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                        >
                          <Link 
                            href={slide.buttonLink} 
                            title={slide.buttonText} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1 inline-flex items-center"
                          >
                            {slide.buttonText} <i className="fa fa-long-arrow-alt-right ml-3"></i>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative bottom wave or gradient */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent z-0 pointer-events-none"></div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
