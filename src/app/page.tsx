
import LandingPage from '@/components/LandingPage';
import { div } from 'framer-motion/client';

export default function HomePage() {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-black min-h-screen'>
      <main className='max-w-7xl mx-auto px-4 py-8 text-white'>
        <LandingPage />
        {/* Other sections will go here */}
      </main>
    </div>
  );
}
