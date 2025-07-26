import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <section
      className="bg-black/50 rounded-[6rem] py-24 md:py-32 lg:py-40 px-4 md:px-8 lg:px-12 relative overflow-hidden"
      id="contact-us"
    >
      <div className="max-w-7xl w-full mx-auto">
        {/* Title */}
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-16 md:mb-24 tracking-wider">
          CONTACT US
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                Get in Touch
              </h3>
              <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                Ready to collaborate, innovate, or just want to learn more about
                what we do? We'd love to hear from you. Reach out to us through
                any of the channels below.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:arl.corporate.team@gmail.com"
                    className="text-white/70 text-sm sm:text-base break-all hover:text-white/90 transition-colors duration-300 cursor-pointer"
                  >
                    arl.corporate.team@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg mb-1">
                    Phone
                  </h4>
                  <a
                    href="tel:+917200377954"
                    className="text-white/70 text-sm sm:text-base hover:text-white/90 transition-colors duration-300 cursor-pointer"
                  >
                    +91 72003 77954
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base sm:text-lg mb-1">
                    Location
                  </h4>
                  <a
                    href="https://maps.app.goo.gl/52KaJKoib657px676?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 text-sm sm:text-base leading-relaxed hover:text-white/90 transition-colors duration-300 cursor-pointer inline-block"
                  >
                    11th Floor Tech Park
                    <br />
                    SRM Institute of Science & Technology
                    <br />
                    Kattankulathur, Chennai - 603203
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 sm:pt-8">
              <h4 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://www.instagram.com/aakashresearchlabs?igsh=MWZjd2R0OG51eXpjZA=="
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-lg sm:rounded-xl flex items-center justify-center hover:from-white/30 hover:to-white/20 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/aakash-research-labs/"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-lg sm:rounded-xl flex items-center justify-center hover:from-white/30 hover:to-white/20 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-slate-900 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-[1px] border-white/10 shadow-2xl">
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter your email address"
                        required
                    />
                </div>

                {/* Subject */}
                <div>
                    <label
                        htmlFor="subject"
                        className="block text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    >
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter message subject"
                        required
                    />
                </div>

                {/* Message */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-white/80 text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/30 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                        placeholder="Write your message here..."
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl border border-white/20 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base"
                >
                    Send Message
                </button>
            </form>
        </div>
        </div>
      </div>
    </section>
  );
}
