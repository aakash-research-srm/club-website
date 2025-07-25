"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Hero from "./Hero";
import Domain from "./Domain";

const LandingPage = () => {
  const router = useRouter();

  

  return (
    <main className="p-4 pt-2 text-white font-roboto space-y-12">
      {/* Header */}
      <Header />

      <Hero />

      {/* Domains Section */}
      <Domain />

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
