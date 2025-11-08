'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/lib/services/auth.service';
import { useLanguage } from '@/lib/contexts/LanguageContext';

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      authService.setToken(token);
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t.auth.redirecting}</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t.common.loading}</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
      </div>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthSuccessContent />
    </Suspense>
  );
}
