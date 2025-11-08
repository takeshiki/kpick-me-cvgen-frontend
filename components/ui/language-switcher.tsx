'use client';

import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center h-9.5 border-2 border-black bg-white overflow-hidden">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'h-full px-3 flex-1 text-sm font-medium transition-colors',
          language === 'en' 
            ? 'bg-black text-white' 
            : 'text-black hover:bg-gray-100'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('uk')}
        className={cn(
          'h-full px-3 flex-1 text-sm font-medium transition-colors',
          language === 'uk' 
            ? 'bg-black text-white' 
            : 'text-black hover:bg-gray-100'
        )}
      >
        UA
      </button>
    </div>
  );
}

