'use client';

import { FileTextIcon, VideoIcon, UserIcon } from '@/components/ui/icons';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface FeaturesSectionProps {
  onGetStarted: () => void;
}

export function FeaturesSection({ onGetStarted }: FeaturesSectionProps) {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <FileTextIcon className="w-8 h-8" />,
      title: t.features.aiPowered,
      description: t.features.aiDesc,
    },
    {
      icon: <VideoIcon className="w-8 h-8" />,
      title: t.features.interviewPractice,
      description: t.features.interviewDesc,
    },
    {
      icon: <UserIcon className="w-8 h-8" />,
      title: t.features.multipleTemplates,
      description: t.features.templatesDesc,
    }
  ];
  
  return (
    <section className="bg-white py-16" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black sm:text-4xl">
            {t.hero.features}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 divide-y-2 divide-black/10 md:divide-y-0 md:grid-cols-3 md:divide-x-2">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8"
            >
              <div className="text-black mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-black/90">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-3 border-2 border-black text-base font-medium text-white bg-black"
          >
            {t.hero.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
