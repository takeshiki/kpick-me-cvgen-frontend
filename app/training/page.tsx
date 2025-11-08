'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { SkillIcon, ChevronRightIcon } from '@/components/ui/icons';
import { useAuth } from '@/lib/hooks/useAuth';
import { trainingService, type Challenge } from '@/lib/services/training.service';

export default function TrainingPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
      return;
    }

    if (isAuthenticated) {
      loadChallenges();
    }
  }, [authLoading, isAuthenticated, router]);

  const loadChallenges = async () => {
    try {
      const data = await trainingService.getChallenges();
      setChallenges(data);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChallenges = challenges.filter(
    (c) => filter === 'all' || c.difficulty.toLowerCase() === filter
  );

  if (authLoading || loading) {
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
              onClick={logout}
              className="text-sm text-neutral-600 hover:text-black transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">Skills Training</h1>
          <p className="text-lg text-neutral-600">
            Improve your coding and professional skills through interactive challenges
          </p>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-8">
          {(['all', 'easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === level
                  ? 'bg-black text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white p-6 rounded-lg border border-neutral-200 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => router.push(`/training/${challenge.id}`)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <SkillIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{challenge.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      challenge.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-700'
                        : challenge.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mb-4">Type: {challenge.type}</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                Start Challenge
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
            <p className="text-neutral-600">No challenges found for this difficulty level</p>
          </div>
        )}
      </div>
    </div>
  );
}