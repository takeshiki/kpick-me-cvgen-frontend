'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 border-b border-gray-200">
      <div className="text-center sm:text-left max-w-3xl mx-auto sm:mx-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-4 sm:mb-6 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-base sm:text-lg text-black/80 mb-8 sm:mb-10 max-w-xl mx-auto sm:mx-0">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="font-medium w-full sm:w-auto px-6 py-3 text-base text-white"
          >
            {t.hero.cta}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="font-medium w-full sm:w-auto px-6 py-3 text-base sm:text-inherit"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.hero.features}
          </Button>
        </div>
      </div>
    </div>
  );
}
