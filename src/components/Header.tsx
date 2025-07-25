import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-slate-800 rounded-full px-6 py-3 text-xs flex items-center justify-center">
      <div className="flex w-full max-w-3xl items-center justify-between">
        <nav className="flex items-center justify-between w-full">
          <a className="text-white font-medium hover:text-gray-300 transition-colors" href="#about-us">
            ABOUT US
          </a>
          <a className="text-gray-400 font-medium hover:text-white transition-colors" href="#projects">
            PROJECTS
          </a>
          <a className="text-gray-400 font-medium hover:text-white transition-colors" href="#events">
            EVENTS
          </a>
          <a className="text-gray-400 font-medium hover:text-white transition-colors" href="#domains">
            DOMAINS
          </a>
          <a className="text-gray-400 font-medium hover:text-white transition-colors" href="#contact-us">
            CONTACT US
          </a>
          {/* <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button> */}
        </nav>
      </div>
    </header>
  );
}
