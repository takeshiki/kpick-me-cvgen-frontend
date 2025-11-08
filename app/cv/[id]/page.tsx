'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useAuth } from '@/lib/hooks/useAuth';
import { cvService, type CV } from '@/lib/services/cv.service';
import { CVEditor } from '@/components/cv/CVEditor';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Logo } from '@/components/ui/logo';

export default function CVViewPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useLanguage();
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const [cv, setCv] = useState<CV | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/unauthorized');
      return;
    }

    if (isAuthenticated && params.id) {
      loadCV();
    }
  }, [authLoading, isAuthenticated, params.id]);

  const loadCV = async () => {
    try {
      setLoading(true);
      const data = await cvService.getOne(params.id as string);
      setCv(data);
    } catch (error) {
      console.error('Error loading CV:', error);
      alert(t.common.error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      await cvService.update(params.id as string, { data });
      alert(t.common.success);
    } catch (error) {
      console.error('Error saving CV:', error);
      alert(t.common.error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-neutral-600">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  if (!cv) {
    return null;
  }

  const cvData = (cv.content as any)?.body || cv.data;

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
              <Logo className="h-7 w-auto" />
              <span className="text-xl font-semibold">CVgen</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={() => router.push('/dashboard')}
                className="text-sm text-neutral-600 hover:text-black transition-colors"
              >
                {t.nav.dashboard}
              </button>
              <button
                onClick={logout}
                className="text-sm text-neutral-600 hover:text-black transition-colors"
              >
                {t.nav.logout}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-neutral-600 hover:text-black transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.common.back}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-neutral-900 mb-6">
          {(cv.content as any)?.title || cv.title}
        </h1>

        <CVEditor cvData={cvData} onSave={handleSave} />
      </div>
    </div>
  );
}

