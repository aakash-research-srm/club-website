import React from "react";

export default function Domain() {
  const domains = [
    {
      name: "Electronics and IoT",
      path: "/electronics-iot",
      description:
        "Explore cutting-edge electronics, IoT devices, sensors, and embedded systems development.",
    },
    {
      name: "Technical Domain",
      path: "/technical",
      description:
        "Focus on software development, algorithms, data structures, and technical problem-solving.",
    },
    {
      name: "Healthcare",
      path: "/healthcare",
      description:
        "Innovation in medical technology, health monitoring systems, and digital healthcare solutions.",
    },
    {
      name: "PR and Sponsorship",
      path: "/pr-sponsorship",
      description:
        "Building partnerships, managing public relations, and securing sponsorships for projects.",
    },
    {
      name: "Creatives and Media",
      path: "/creatives-media",
      description:
        "Content creation, design, multimedia production, and creative marketing strategies.",
    },
  ];

  return (
    <section className="bg-black/40 rounded-[6rem] py-16 px-4 md:px-8" id="domains">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 tracking-wider">
          DOMAINS
        </h2>

        <div className="space-y-6 md:space-y-8">
          {domains.map((domain, index) => (
            <div
              key={index}
              className={`backdrop-blur-sm rounded-2xl p-4 md:p-6
                         transition-all duration-300 
                         group min-h-[200px] md:min-h-[250px]
                         ${
                           index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                         } flex gap-4 md:gap-6`}
            >
              {/* Title Section - 1/4 */}
              <div
                className="w-1/4 bg-black bg-opacity-90 rounded-xl flex items-center justify-center p-4 md:p-6
                            bordertransition-colors"
              >
                <h3
                  className="text-white text-lg md:text-xl xl:text-2xl font-bold text-center 
                             transition-colors leading-tight"
                >
                  {domain.name}
                </h3>
              </div>

              {/* Description Section - 3/4 */}
              <div className="w-3/4 bg-black bg-opacity-90 rounded-xl p-6 md:p-8 flex items-center transition-colors">
                <p
                  className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed
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
