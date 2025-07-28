export interface EventData {
  id: string;
  title: string;
  date: string;
  description: string;
  gradient: string;
  image: string;
  organizer: string;
  mode: string;
  location: string;
  eligibility: string;
  teamSize: string;
  about: string;
  theme?: string;
  stages?: {
    title: string;
    description: string;
    mode: string;
    deliverable?: string;
    date?: string;
    venue?: string;
  }[];
  judgingCriteria?: string[];
  disqualificationPolicy?: string[];
  registrationLink?: string;
  whatsappLink?: string;
  contactInfo?: {
    name: string;
    phone: string;
  }[];
  email?: string;
  instagram?: string;
  entryFee?: string;
  includes?: string;
  speakers?: {
    name: string;
    title: string;
    company: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
}

export const eventsData: EventData[] = [
  {
    id: "hack-and-beyond-hackathon",
    title: "Hack & Beyond – 24-Hour Hybrid Hackathon",
    date: "August 13, 2025",
    description:
      "24-hour hybrid hackathon with online idea pitching and on-campus prototyping. Theme: Electronics & IOT.",
    gradient: "from-black via-gray-900 to-gray-800",
    image: "/events/hack-n-beyond-1.jpg",
    organizer:
      "Aakash Research Labs (ARL), SRM Institute of Science and Technology (SRMIST)",
    mode: "Hybrid - Online (Round 1) + Offline (Round 2 at SRMIST)",
    location: "SRMIST, Kattankulathur Campus, Chennai",
    eligibility:
      "Open to all undergraduate and postgraduate students across India",
    teamSize: "1 – 3 members",
    theme: "Electronics, IOT",
    about:
      "Hack & Beyond is ARL's innovation showdown — a dynamic three-day tech sprint designed to empower the next generation of problem solvers. From idea to prototype, this hybrid hackathon challenges students to build solutions that make a difference in the real world. Get ready for a journey that begins online with idea pitching and culminates in a thrilling 24-hour offline hackathon at SRM Kattankulathur.",
    stages: [
      {
        title: "Round 1: Online Idea Screening",
        description:
          "Participants must submit a concise and compelling pitch highlighting the problem statement, proposed solution, tech stack, and expected impact. Top teams will be shortlisted for the final on-campus round.",
        mode: "Online (via Unstop)",
        deliverable: "PPT (template will be provided)",
      },
      {
        title: "Round 2: On-Campus 24-Hour Hackathon",
        description:
          "Shortlisted teams will participate in a 24-hour prototype development round at SRMIST. Mentoring support will be provided at the venue.",
        mode: "Offline",
        date: "13th August 2025",
        venue: "Will be announced",
      },
    ],
    judgingCriteria: [
      "Creativity and Innovation",
      "Technical Feasibility",
      "Impact and Relevance",
      "Presentation",
    ],
    disqualificationPolicy: [
      "Submission of plagiarized content",
      "Misconduct or non-compliance with event rules",
      "Failure to build and submit within the given timeframe",
    ],
    contactInfo: [
      {
        name: "Tejasvin Kansal",
        phone: "+91 72003 77954",
      },
      {
        name: "Naseeya Begum",
        phone: "+91 88076 57251",
      },
    ],
    email: "aakash.research.labs@gmail.com",
    faq: [
      {
        question: "What is the theme of the hackathon?",
        answer: "The theme for Hack & Beyond is Electronics & IOT. Participants are expected to develop solutions in these domains that address real-world problems."
      },
      {
        question: "Can I participate alone or do I need a team?",
        answer: "You can participate both individually or in teams. Team size can be 1-3 members. If you're looking for teammates, you can connect with other participants through our WhatsApp group."
      },
      {
        question: "Do I need to be physically present for the entire hackathon?",
        answer: "The hackathon has 2 rounds - Round 1 is online (idea screening via Unstop), and only shortlisted teams need to be present for the 24-hour offline hackathon at SRMIST Kattankulathur campus."
      },
      {
        question: "What should I bring for the offline round?",
        answer: "Bring your laptop, chargers, any required software pre-installed, and your creativity! We'll provide mentoring support, workspace, and refreshments during the 24-hour hackathon."
      },
      {
        question: "Is there any registration fee for the hackathon?",
        answer: "The hackathon itself is free to participate. However, if you want additional preparation, you can join our 2-day workshop (11-12 August) for ₹350 which includes hands-on training with industry experts."
      }
    ],
  },
  {
    id: "hack-and-beyond-workshop",
    title: "Hack & Beyond – Hands On Workshop",
    date: "11-12 August 2025",
    description:
      "A 2-day hands-on workshop with industry experts to gear you up with tools, tech, and confidence to build real-world solutions. Venue: JC Bose Hall, SRMIST.",
    gradient: "from-gray-900 via-black to-gray-800",
    image: "/events/hack-n-beyond-2.jpg",
    organizer: "Aakash Research Labs, SRMIST",
    mode: "Offline",
    location: "JC Bose Hall, SRMIST",
    eligibility: "Open to all students",
    teamSize: "Individual participation",
    entryFee: "₹350/-",
    includes:
      "Live demos, skill sessions, practical tasks & participation certificates",
    about:
      "Before you hack, it's time to skill up! A 2-day hands-on workshop to gear you up with the tools, tech, and confidence to build real-world solutions.",
    speakers: [
      {
        name: "Mr. Shankar Moorthy",
        title: "Assistant Manager",
        company: "Royal Enfield Global Technical Center",
      },
      {
        name: "Mr. Esakki Raja",
        title: "Co-Founder",
        company: "Thynk Loop",
      },
    ],
    registrationLink: "https://forms.gle/QJ3x9iG99PaynXdx8",
    whatsappLink: "https://chat.whatsapp.com/KpcwQcK5GZp4yAbubnyMn8",
    contactInfo: [
      {
        name: "Tejasvin Kansal",
        phone: "+91 72003 77954",
      },
      {
        name: "Naseeya Begum",
        phone: "+91 88076 57251",
      },
    ],
    email: "aakash.research.labs@gmail.com",
    faq: [
      {
        question: "What will I learn in this workshop?",
        answer: "You'll get hands-on experience with industry-standard tools and technologies used in electronics and IoT development. The workshop includes live demos, skill sessions, and practical tasks guided by industry experts."
      },
      {
        question: "Do I need any prior experience to attend?",
        answer: "No prior experience is required! The workshop is designed for all students, from beginners to those with some experience. Our experts will guide you through everything step by step."
      },
      {
        question: "What does the registration fee include?",
        answer: "The ₹350 fee includes access to both days of the workshop, live demos, skill sessions, practical tasks, refreshments, and a participation certificate."
      },
      {
        question: "Is this workshop mandatory for the hackathon?",
        answer: "No, the workshop is optional but highly recommended. It will help you prepare for the hackathon by providing you with the necessary tools, techniques, and confidence to build real-world solutions."
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, all participants who complete the 2-day workshop will receive a participation certificate from Aakash Research Labs, SRMIST."
      }
    ],
  },
];
