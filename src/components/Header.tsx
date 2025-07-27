import React, { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
    setActiveSection("about");
  };

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    // Small delay to ensure smooth scrolling completes before setting active state
    setTimeout(() => {
      setActiveSection(sectionId);
    }, 100);
  };

  useEffect(() => {
    const sectionIds = ["about", "domains", "events", "projects", "contact-us"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let maxRatio = 0;
        let mostVisibleSection = "";
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });
        
        // If we found a section that's intersecting, update active section
        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
        
        // Special handling for when we're at the very top of the page
        if (window.scrollY < 100) {
          setActiveSection("about");
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Adjusted for better triggering
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
      }
    );

    // Observe all sections including about (if it exists)
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    // Handle scroll to detect when we're at the top (about section)
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full fixed top-4 z-50 flex justify-center px-4">
      <div className="bg-[#252525] text-white rounded-full px-6 py-3 w-full max-w-4xl shadow-lg flex items-center justify-between">
        <div className="font-bold text-sm">AAKASH Research Labs</div>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex items-center space-x-6 text-xs font-medium">
          <button
            onClick={handleScrollToTop}
            className={`hover:text-gray-300 transition-colors duration-200 ${
              activeSection === "about" ? "text-white" : "text-gray-400"
            }`}
          >
            ABOUT US
          </button>
          <a
            href="#domains"
            onClick={() => handleNavClick("domains")}
            className={`hover:text-white transition-colors duration-200 ${
              activeSection === "domains" ? "text-white" : "text-gray-400"
            }`}
          >
            DOMAINS
          </a>
          <a
            href="#events"
            onClick={() => handleNavClick("events")}
            className={`hover:text-white transition-colors duration-200 ${
              activeSection === "events" ? "text-white" : "text-gray-400"
            }`}
          >
            EVENTS
          </a>
          <a
            href="#projects"
            onClick={() => handleNavClick("projects")}
            className={`hover:text-white transition-colors duration-200 ${
              activeSection === "projects" ? "text-white" : "text-gray-400"
            }`}
          >
            PROJECTS
          </a>
          <a
            href="#contact-us"
            onClick={() => handleNavClick("contact-us")}
            className={`hover:text-white transition-colors duration-200 ${
              activeSection === "contact-us" ? "text-white" : "text-gray-400"
            }`}
          >
            CONTACT US
          </a>
        </nav>

        {/* Hamburger Icon */}
        <button
          className="sm:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden absolute top-20 w-full max-w-4xl bg-[#252525] rounded-xl shadow-lg text-center py-4 space-y-3">
          <button
            onClick={handleScrollToTop}
            className={`block font-medium w-full transition-colors duration-200 ${
              activeSection === "about" ? "text-white" : "text-gray-400"
            } hover:text-gray-300`}
          >
            ABOUT US
          </button>
          {["domains", "events", "projects", "contact-us"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block font-medium transition-colors duration-200 ${
                activeSection === id ? "text-white" : "text-gray-400"
              } hover:text-gray-300`}
              onClick={() => handleNavClick(id)}
            >
              {id.toUpperCase().replace("-", " ")}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}