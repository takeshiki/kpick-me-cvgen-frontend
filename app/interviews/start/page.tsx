'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/lib/hooks/useAuth';
import { interviewService } from '@/lib/services/interview.service';
import { cvService, type CV } from '@/lib/services/cv.service';

export default function StartInterviewPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [selectedCvId, setSelectedCvId] = useState('');
  const [role, setRole] = useState('');
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
      return;
    }

    if (isAuthenticated) {
      loadCvs();
    }
  }, [authLoading, isAuthenticated, router]);

  const loadCvs = async () => {
    try {
      const data = await cvService.getAll();
      setCvs(data);
      if (data.length > 0) {
        setSelectedCvId(data[0].id);
      }
    } catch (error) {
      console.error('Error loading CVs:', error);
    }
  };

  const handleStart = async () => {
    if (!role || !selectedCvId) return;

    setStarting(true);
    try {
      const interview = await interviewService.start(role, selectedCvId);
      router.push(`/interviews/${interview.id}`);
    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Failed to start interview');
    } finally {
      setStarting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
              <Logo className="h-7 w-auto" />
              <span className="text-xl font-semibold">CVgen</span>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm text-neutral-600 hover:text-black transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg border border-neutral-200">
          <h1 className="text-3xl font-bold text-neutral-900 mb-6">
            Start Interview Practice
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Target Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Frontend Developer, Product Manager"
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Select CV
              </label>
              {cvs.length > 0 ? (
                <select
                  value={selectedCvId}
                  onChange={(e) => setSelectedCvId(e.target.value)}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {cvs.map((cv) => (
                    <option key={cv.id} value={cv.id}>
                      {cv.title}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-sm text-neutral-600">
                  No CVs found.{' '}
                  <button
                    onClick={() => router.push('/cv/create')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Create one first
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleStart}
              disabled={starting || !role || !selectedCvId}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {starting ? 'Starting...' : 'Start Interview'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}