import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Events() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const events = [
    {
      title: "Tech Workshop 2025",
      date: "March 15, 2025",
      description:
        "Hands-on workshop covering latest technologies in AI and Machine Learning.",
      gradient: "from-gray-900 via-black to-gray-800",
      textOverlay: "bloom",
    },
    {
      title: "Hackathon Championship",
      date: "April 20, 2025",
      description:
        "48-hour coding marathon with exciting prizes and networking opportunities.",
      gradient: "from-black via-gray-900 to-gray-800",
      textOverlay: "vivid",
    },
    {
      title: "Research Symposium",
      date: "May 10, 2025",
      description:
        "Academic conference showcasing cutting-edge research in technology.",
      gradient: "from-gray-800 via-black to-gray-900",
      textOverlay: "petales",
    },
    {
      title: "Industry Meet",
      date: "June 5, 2025",
      description:
        "Network with industry professionals and explore career opportunities.",
      gradient: "from-slate-900 via-black to-gray-900",
      textOverlay: "connect",
    },
    {
      title: "Innovation Expo",
      date: "July 18, 2025",
      description:
        "Showcase of innovative projects and startup ideas from students.",
      gradient: "from-gray-900 via-black to-slate-900",
      textOverlay: "innovate",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, events.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false); // Pause auto-play on manual interaction
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false); // Pause auto-play on manual interaction
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length
    );
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false); // Pause auto-play on manual interaction
    setCurrentIndex(index);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getResponsiveValues = () => {
    if (windowWidth === 0) {
      // Default values for SSR
      return { scale: 0.75, spacing: 120, rotation: 5 };
    }

    if (windowWidth < 640) {
      return { scale: 0.6, spacing: 120, rotation: 3 };
    } else if (windowWidth < 1024) {
      return { scale: 0.75, spacing: 120, rotation: 4 };
    } else {
      return { scale: 0.75, spacing: 240, rotation: 5 };
    }
  };

  const getVisibleEvents = () => {
    const visibleEvents = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + events.length) % events.length;
      visibleEvents.push({ ...events[index], position: i });
    }
    return visibleEvents;
  };

  return (
    <section
      className="bg-black/50 rounded-[6rem] py-24 md:py-32 lg:py-40 px-4 md:px-8 lg:px-12 relative overflow-hidden"
      id="events"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Title */}
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-16 md:mb-24 tracking-wider">
          EVENTS
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[350px] sm:min-h-[400px] md:min-h-[500px]">
          <div className="flex items-center justify-center w-full relative px-4 sm:px-8 md:px-0">
            {getVisibleEvents().map((event, index) => {
              const { scale, spacing, rotation } = getResponsiveValues();

              return (
                <motion.div
                  key={`${event.title}-${event.position}`}
                  // ========== RESPONSIVE SLIDING ANIMATIONS ==========
                  animate={{
                    scale: event.position === 0 ? 1 : scale,
                    x: event.position * spacing,
                    rotateY: event.position * rotation,
                    z: event.position !== 0 ? -30 : 0,
                    filter:
                      event.position !== 0
                        ? "blur(1px) brightness(0.9)"
                        : "blur(0px) brightness(1)",
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    scale: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                    x: {
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                    rotateY: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                    filter: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  }}
                  className={`absolute ${
                    event.position === 0
                      ? "z-30"
                      : event.position === -1
                      ? "z-10"
                      : "z-20"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <motion.div
                    className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-300 ${
                      event.position === 0
                        ? "w-64 sm:w-72 md:w-80 lg:w-96 h-80 sm:h-88 md:h-96 lg:h-[480px]"
                        : "w-48 sm:w-56 md:w-64 lg:w-80 h-64 sm:h-72 md:h-80 lg:h-96"
                    }`}
                    whileHover={event.position === 0 ? { scale: 1.02 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient Background - Always visible */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-90`}
                    >
                      {/* Decorative Elements */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10"></div>
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-white/10 rounded-full blur-xl"></div>
                      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-2 sm:left-4 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-white/20 rounded-full blur-lg"></div>
                    </div>

                    {/* Large Text Overlay - Always visible */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h2
                        className={`text-white font-bold text-center leading-none opacity-30 ${
                          event.position === 0
                            ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                            : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                        }`}
                      >
                        {event.textOverlay}
                      </h2>
                    </div>

                    {/* Content Overlay - ONLY VISIBLE FOR CENTER CARD WITH FADE IN */}
                    <AnimatePresence mode="wait">
                      {event.position === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: "easeOut",
                          }}
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8">
                            <motion.h3
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.4, delay: 0.3 }}
                              className="text-white font-bold mb-1 sm:mb-2 text-base sm:text-lg md:text-xl lg:text-2xl"
                            >
                              {event.title}
                            </motion.h3>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.4, delay: 0.4 }}
                              className="text-white/80 font-medium mb-2 sm:mb-3 text-xs sm:text-sm md:text-base"
                            >
                              {event.date}
                            </motion.p>
                            <motion.p
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.4, delay: 0.5 }}
                              className="text-white/70 leading-relaxed text-xs sm:text-sm md:text-base"
                            >
                              {event.description}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-300 z-30 text-2xl sm:text-3xl md:text-4xl cursor-pointer"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-300 z-30 text-2xl sm:text-3xl md:text-4xl cursor-pointer"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-[#252525]/70 backdrop-blur-sm rounded-full px-2.5 py-1.5">
          <div className="flex space-x-2 sm:space-x-3">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "bg-white scale-110"
                    : "bg-gray-500/70 hover:bg-gray-400/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
