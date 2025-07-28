"use client";
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Domain from "./Domain";
import Events from "./Events";
import Contact from "./Contact";

const LandingPage = () => {
  return (
    <main className="p-4 pt-2 text-white font-roboto space-y-12">
      {/* Header */}
      <Header />

      <Hero />

      {/* Events Section */}
      <Events />

      {/* Domains Section */}
      <Domain />

      {/* Contact Section */}
      <Contact />
    </main>
  );
};

export default LandingPage;
