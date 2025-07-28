"use client";

import React from "react";
import { eventsData } from "../../data/events";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="min-h-screen text-white py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16 tracking-wider">
          ALL EVENTS
        </h1>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-80">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${event.image})`,
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white/90 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-white/80 font-medium mb-3 text-sm">
                    {event.date}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-3 px-6 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
