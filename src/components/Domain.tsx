import React from "react";
import Image from "next/image";

export default function Domain() {
  const domains = [
    {
      name: "Electronics and IoT",
      description:
        "Explore cutting-edge electronics, IoT devices, sensors, and embedded systems development.",
      image: "/domain/eot-img.svg",
    },
    {
      name: "Technical Domain",
      description:
        "Focus on software development, algorithms, data structures, and technical problem-solving.",
      image: "/domain/technical-img.svg",
    },
    {
      name: "Healthcare",
      description:
        "Innovation in medical technology, health monitoring systems, and digital healthcare solutions.",
      image: "/domain/health-img.svg",
    },
    {
      name: "Creatives and Media",
      description:
        "Content creation, design, multimedia production, and creative marketing strategies.",
      image: "/domain/creatives-img.svg",
    },
    {
      name: "PR and Sponsorship",
      description:
        "Building partnerships, managing public relations, and securing sponsorships for projects.",
      image: "/domain/pr-img.svg",
    },
  ];

  return (
    <section
      className="bg-black/40 rounded-[6rem] py-16 px-4 md:px-8"
      id="domains"
    >
      <div className="md:max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 tracking-wider">
          DOMAINS
        </h2>

        <div className="space-y-6 md:space-y-8">
          {domains.map((domain, index) => (
            <div
              key={index}
              className={`backdrop-blur-sm rounded-2xl p-3 md:p-6
                         transition-all duration-300 
                         group min-h-[180px] sm:min-h-[200px] md:min-h-[250px]
                         flex flex-col sm:flex-row gap-3 md:gap-6 lg:gap-12
                         ${
                           index % 2 === 0
                             ? "sm:flex-row"
                             : "sm:flex-row-reverse"
                         }`}
            >
              {/* Image Section - 1/4 */}
              <div
                className="w-full sm:w-1/4 bg-opacity-90 rounded-xl flex items-center justify-center p-4 md:p-6
                            transition-colors min-h-[120px] sm:min-h-full"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40">
                  <Image
                    src={domain.image}
                    alt={domain.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content Section - 3/4 */}
              <div className="w-full sm:w-3/4 bg-black bg-opacity-90 rounded-xl p-4 md:p-6 lg:p-8 flex flex-col justify-center transition-colors">
                <h3
                  className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4
                             transition-colors leading-tight"
                >
                  {domain.name}
                </h3>
                <p
                  className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed
                           transition-colors"
                >
                  {domain.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
