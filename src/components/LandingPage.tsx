"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const domains = [
    { name: "Electronics and IoT", path: "/electronics-iot" },
    { name: "Technical Domain", path: "/technical" },
    { name: "Healthcare", path: "/healthcare" },
    { name: "PR and Sponsorship", path: "/pr-sponsorship" },
    { name: "Creatives and Media", path: "/creatives-media" }
  ];

  const handleDomainClick = (path: string) => {
    router.push(path);
  };

  return (
    <main className="p-4 min-h-screen text-white font-roboto bg-[#0d0d0d] space-y-6">
      {/* Header */}
      <header className="container-glow p-4">
        <nav className="flex items-center justify-between text-xs text-gray-400">
          <a className="text-white font-bold" href="#">About us</a>
          <a href="#">Events</a>
          <a href="#">Domains</a>
          <a href="#">Contact Us</a>
        </nav>

        <div className="flex flex-col md:flex-row items-start md:items-center mt-6">
          <div className="w-full md:w-1/3">
            <img
              alt="Aakash Research Labs logo"
              className="w-full h-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfTxHFESOJ7-LtfhDAhfve9IBzTEamYsHNmG8_dxKsiGYggXXgb7tZ3-HkAgqm3mXlmUraz7XsWX-DGxizDRs6BHX_K3OkiZm99u2H8RW11yzF82EKn0vTxsMu75if07vP23G60cbShd0lJgOE-MfeFIvYbq8A1H0lsIDg8kCY2W5k3b3_D5QhqBZ33QuFcWek-qGDcBkLYF9Ly8sxg3yVn26Q4abOGR4OK20gX_rLSmk-T1gXLC4NQ8FJF_ExlJdCvlOIqneLPZA"
            />
          </div>
          <div className="md:ml-6 mt-4 md:mt-0 text-sm">
            <p>
              Aakash Research Labs is a student-driven R&D lab focusing on robotics, AI, Android systems, and embedded technology under the guidance of SRM IST.
            </p>
          </div>
        </div>
      </header>

      {/* Domains Section */}
      <section className="container-glow p-6">
        <h2 className="text-2xl font-bold mb-4">DOMAINS</h2>
        <div className="space-y-4">
          {domains.map((domain, index) => (
            <button
              key={index}
              onClick={() => handleDomainClick(domain.path)}
              className="w-full bg-black bg-opacity-40 hover:bg-opacity-60 p-4 rounded-xl h-16 
                         flex items-center justify-center text-white font-medium text-lg
                         transition-all duration-300 hover:scale-105 hover:shadow-lg
                         border border-gray-700 hover:border-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {domain.name}
            </button>
          ))}
        </div>
        <div className="text-right text-xs text-gray-400 mt-2 cursor-pointer hover:text-white transition-colors">
          SHOW MORE
        </div>
      </section>

      {/* Events Section */}
      <section className="container-glow p-6">
        <h2 className="text-2xl font-bold mb-4">EVENTS</h2>
        <div className="bg-black bg-opacity-40 rounded-xl h-48"></div>
        <div className="text-right text-xs text-gray-400 mt-2">SHOW MORE</div>
      </section>

      {/* Contact Section */}
      <section className="container-glow p-6">
        <h2 className="text-2xl font-bold mb-4">CONTACT US</h2>
        <div className="bg-black bg-opacity-40 rounded-xl h-32"></div>
        <div className="text-right text-xs text-gray-400 mt-2">SHOW MORE</div>
      </section>
    </main>
  );
};

export default LandingPage;
