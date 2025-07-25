import Image from 'next/image';
import LandingPage from '@/components/LandingPage';

export default function HomePage() {
  return (
    <div className='relative bg-gradient-to-b from-gray-900 to-slate-950 min-h-screen'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image 
          src="/bg/bg-layer-1.svg" 
          alt="Background" 
          fill 
          className="object-cover opacity-60"
          priority
        />
      </div>
      
      {/* Content */}
      <main className='relative z-10 w-full md:max-w-7xl mx-auto px-4 py-8 text-white'>
        <LandingPage />
        {/* Other sections will go here */}
      </main>
    </div>
  );
}
