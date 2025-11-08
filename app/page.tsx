'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { 
  Navigation, 
  HeroSection, 
  FeaturesSection, 
  Footer 
} from '@/components/landing';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Navigation 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        onGetStarted={handleGetStarted}
      />
      <main className="grow">
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection onGetStarted={handleGetStarted} />
      </main>
      <Footer name="AdvancedCV" />
    </div>
  );
}