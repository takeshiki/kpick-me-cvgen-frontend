'use client';

import { Logo } from '@/components/ui/logo';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Logo className="h-7 w-auto" />
            <span className="ml-3 text-lg font-medium text-white">{name}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/kpick-me/" target='_blank' className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            © {currentYear} {name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
