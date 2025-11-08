'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/lib/hooks/useAuth';
import { trainingService } from '@/lib/services/training.service';

export default function ChallengePage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [solution, setSolution] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ status: string; score: number } | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await trainingService.submitChallenge(
        params.id as string,
        solution
      );
      setResult({ status: response.status, score: response.score });
    } catch (error) {
      console.error('Error submitting challenge:', error);
      alert('Failed to submit solution');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/training')}>
              <Logo className="h-7 w-auto" />
              <span className="text-xl font-semibold">CVgen</span>
            </div>
            <button
              onClick={() => router.push('/training')}
              className="text-sm text-neutral-600 hover:text-black transition-colors"
            >
              Back to Challenges
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Challenge {params.id}
            </h1>
            <div className="prose prose-sm">
              <p className="text-neutral-600">
                Write a function that solves this problem. Your solution will be
                evaluated based on correctness and efficiency.
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Example:</h3>
              <pre className="bg-neutral-100 p-3 rounded">
                <code>Input: [1, 2, 3]
Output: 6</code>
              </pre>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-white p-6 rounded-lg border border-neutral-200">
            <h2 className="text-lg font-semibold mb-4">Your Solution</h2>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="w-full h-64 p-4 font-mono text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your code here..."
            />
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handleSubmit}
                disabled={submitting || !solution}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Solution'}
              </button>
              {result && (
                <div className="text-right">
                  <p className={`font-semibold ${
                    result.status === 'completed' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.status === 'completed' ? 'Passed!' : 'Failed'}
                  </p>
                  <p className="text-sm text-neutral-600">Score: {result.score}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}