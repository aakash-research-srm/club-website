"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { eventsData, EventData } from "../../../data/events";
import Link from "next/link";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const event = eventsData.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center cursor-pointer">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${event.image})`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-85`} />

        
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wider">
            {event.title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8">
            {event.date}
          </p>
          <p className="text-lg sm:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            {event.description}
          </p>
          
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mt-8 bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-3 px-6 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer" 
          >
            ← Back to Events
          </button>
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-black/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* About Section */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
              About the Event
            </h2>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <p className="text-lg leading-relaxed text-white/90 mb-8">
                {event.about}
              </p>

              {/* Event Image - Responsive Size */}
              <div className="flex justify-center mb-8">
                <div className="relative group w-full max-w-2xl">
                  <div className="overflow-hidden rounded-xl shadow-2xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 max-h-96 sm:max-h-[450px] md:max-h-[500px]"
                      loading="lazy"
                    />
                  </div>
                  {/* Optional subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </div>
              </div>
              
              {/* Event Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Organizer</h4>
                    <p className="text-white/70">{event.organizer}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Mode</h4>
                    <p className="text-white/70">{event.mode}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Location</h4>
                    <p className="text-white/70">{event.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Eligibility</h4>
                    <p className="text-white/70">{event.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Team Size</h4>
                    <p className="text-white/70">{event.teamSize}</p>
                  </div>
                  {event.theme && (
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Theme</h4>
                      <p className="text-white/70">{event.theme}</p>
                    </div>
                  )}
                  {event.entryFee && (
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Entry Fee</h4>
                      <p className="text-white/70">{event.entryFee}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Registration Section - Moved here */}
          {(event.registrationLink || event.whatsappLink) && (
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                Registration
              </h2>
              <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-green-500/20">
                <div className="space-y-4">
                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 text-center"
                    >
                      Register Now
                    </a>
                  )}
                  {event.whatsappLink && (
                    <a
                      href={event.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 text-center"
                    >
                      Join WhatsApp Group
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Stages Section */}
          {event.stages && (
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                Stages and Timeline
              </h2>
              <div className="space-y-6">
                {event.stages.map((stage, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white">{stage.title}</h3>
                    <p className="text-white/80 leading-relaxed mb-4">{stage.description}</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <span className="text-white/60 text-sm">Mode:</span>
                        <p className="text-white font-medium">{stage.mode}</p>
                      </div>
                      {stage.deliverable && (
                        <div>
                          <span className="text-white/60 text-sm">Deliverable:</span>
                          <p className="text-white font-medium">{stage.deliverable}</p>
                        </div>
                      )}
                      {stage.date && (
                        <div>
                          <span className="text-white/60 text-sm">Date:</span>
                          <p className="text-white font-medium">{stage.date}</p>
                        </div>
                      )}
                      {stage.venue && (
                        <div>
                          <span className="text-white/60 text-sm">Venue:</span>
                          <p className="text-white font-medium">{stage.venue}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speakers Section */}
          {event.speakers && (
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                Learn from Industry Experts
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {event.speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{speaker.name}</h3>
                    <p className="text-white/80 font-medium mb-1">{speaker.title}</p>
                    <p className="text-white/60">{speaker.company}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Judging Criteria */}
          {event.judgingCriteria && (
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                Judging Criteria
              </h2>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.judgingCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/90">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Disqualification Policy */}
          {event.disqualificationPolicy && (
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                Disqualification Policy
              </h2>
              <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-red-500/20">
                <div className="space-y-3">
                  {event.disqualificationPolicy.map((policy, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                      <span className="text-white/90">{policy}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {event.faq && (
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {event.faq.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {faq.question}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information and Media Partner */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-500/20">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-4">
                  {event.contactInfo && event.contactInfo.map((contact, index) => (
                    <div key={index}>
                      <p className="text-white font-medium">{contact.name}</p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                  {event.email && (
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <a
                        href={`mailto:${event.email}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {event.email}
                      </a>
                    </div>
                  )}
                  {event.instagram && (
                    <div>
                      <p className="text-white font-medium">Instagram</p>
                      <span className="text-blue-400">{event.instagram}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Media Partner */}
                <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/20">
                  <h3 className="text-2xl font-bold mb-6 text-white">Media Partner</h3>
                  <div className="flex justify-center">
                    <a
                      href="https://eventopia.in/branding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <img
                        src="/media/Eventopia-Logo-07.png"
                        alt="Eventopia - Media Partner"
                        className="h-16 w-auto object-contain mb-4 filter brightness-75 transition duration-300 ease-in-out hover:brightness-60"
                      />
                      <span className="text-white text-lg font-semibold uppercase tracking-wider text-center">
                        Eventopia
                      </span>
                    </a>
                  </div>
                </div>
              
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                Build with Purpose. Compete with Passion.
              </h3>
              <p className="text-white/80 text-lg mb-6">
                If you are a coder, designer, innovator, or domain enthusiast — this is your opportunity to build something that truly matters.
              </p>
              <p className="text-white/90 font-medium">
                Register now and take your ideas beyond the ordinary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}