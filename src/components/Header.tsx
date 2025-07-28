import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "about-us", label: "ABOUT US" },
    { id: "domains", label: "DOMAINS" },
    { id: "events", label: "EVENTS" },
    // { id: "projects", label: "PROJECTS" },
    { id: "contact-us", label: "CONTACT US" },
  ];

  const handleMenuItemClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Header - Centered */}
      <div className="hidden md:flex w-full justify-center mb-8">
        <div className="bg-[#252525] rounded-full px-8 py-4 text-xs">
          <nav className="flex items-center justify-center space-x-12">
            {menuItems.map((item) => (
              <a
                key={item.id}
                className="font-medium text-white hover:text-gray-300 transition-colors cursor-pointer"
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuItemClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Button - Fixed Top Right */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-[#252525] p-3 rounded-full text-white hover:bg-gray-700 transition-colors shadow-lg"
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute right-0 inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-4 right-4 mt-16">
            <div className="bg-[#252525] rounded-2xl shadow-2xl overflow-hidden min-w-[200px]">
              <nav className="flex flex-col">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className="font-medium text-left px-6 py-4 text-white hover:bg-gray-700 transition-colors border-b border-gray-600 last:border-b-0"
                    onClick={() => handleMenuItemClick(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
