'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="text-center px-4 max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="text-9xl font-bold text-neutral-900 mb-6">404</div>
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            {t.errors.notFound}
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
            {t.errors.notFound}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 text-base"
          >
            {t.nav.dashboard}
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="px-8 py-3 text-base"
          >
            {t.nav.home}
          </Button>
        </div>
      </div>
    </div>
  );
}

