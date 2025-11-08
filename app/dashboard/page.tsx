'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileTextIcon,
  VideoIcon,
  SkillIcon,
  LayoutDashboardIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  DownloadIcon,
} from '@/components/ui/icons';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/lib/hooks/useAuth';
import { cvService, type CV } from '@/lib/services/cv.service';
import { interviewService, type Interview } from '@/lib/services/interview.service';
import { trainingService, type TrainingProgress } from '@/lib/services/training.service';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cvs, setCvs] = useState<CV[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [progress, setProgress] = useState<TrainingProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
      return;
    }

    if (isAuthenticated) {
      loadData();
    }
  }, [authLoading, isAuthenticated, router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cvsData, interviewsData, progressData] = await Promise.all([
        cvService.getAll(),
        interviewService.getAll(),
        trainingService.getProgress(),
      ]);
      setCvs(cvsData);
      setInterviews(interviewsData);
      setProgress(progressData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCV = async (id: string) => {
    if (confirm('Are you sure you want to delete this CV?')) {
      try {
        await cvService.delete(id);
        setCvs(cvs.filter(cv => cv.id !== id));
      } catch (error) {
        console.error('Error deleting CV:', error);
        alert('Failed to delete CV');
      }
    }
  };

  const handleExportPDF = async (id: string, title: string) => {
    try {
      const blob = await cvService.exportPDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF');
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

  const stats = {
    cvs: cvs.length,
    interviews: interviews.length,
    challenges: progress.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Logo className="h-7 w-auto" />
              <span className="text-xl font-semibold">CVgen</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              {user && (
                <>
                  <div className="flex items-center space-x-2">
                    {user.avatar && (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    )}
                    <span className="text-sm font-medium text-neutral-700">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm text-neutral-600 hover:text-black transition-colors"
                  >
                    {t.nav.logout}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg border border-neutral-200 p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <LayoutDashboardIcon className="w-5 h-5" />
                  <span>{t.nav.dashboard}</span>
                </button>
                <button
                  onClick={() => setActiveTab('cvs')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'cvs'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <FileTextIcon className="w-5 h-5" />
                  <span>{t.nav.cvs}</span>
                </button>
                <button
                  onClick={() => setActiveTab('interviews')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'interviews'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <VideoIcon className="w-5 h-5" />
                  <span>{t.nav.interviews}</span>
                </button>
                <button
                  onClick={() => setActiveTab('training')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'training'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <SkillIcon className="w-5 h-5" />
                  <span>{t.nav.training}</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-neutral-900">{t.nav.dashboard}</h1>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-neutral-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileTextIcon className="w-5 h-5 text-blue-600" />
                      <h3 className="text-sm font-medium text-neutral-600">{t.dashboard.totalCvs}</h3>
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{stats.cvs}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-neutral-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <VideoIcon className="w-5 h-5 text-purple-600" />
                      <h3 className="text-sm font-medium text-neutral-600">{t.dashboard.totalInterviews}</h3>
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{stats.interviews}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-neutral-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <SkillIcon className="w-5 h-5 text-green-600" />
                      <h3 className="text-sm font-medium text-neutral-600">{t.dashboard.totalTraining}</h3>
                    </div>
                    <p className="text-3xl font-bold text-neutral-900">{stats.challenges}</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg border border-neutral-200">
                  <h2 className="text-xl font-semibold mb-4">{t.dashboard.recentActivity}</h2>
                  <div className="space-y-3">
                    {progress.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <span className="text-sm text-neutral-700">
                            {item.status === 'completed' ? 'Completed' : 'Attempted'} challenge
                          </span>
                        </div>
                        <span className="text-sm text-neutral-500">Score: {item.score}</span>
                      </div>
                    ))}
                    {progress.length === 0 && (
                      <p className="text-sm text-neutral-500">No recent activity</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cvs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-neutral-900">{t.cv.title}</h1>
                  <button
                    onClick={() => router.push('/cv/create')}
                    className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>{t.cv.createNew}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cvs.map((cv) => (
                    <div key={cv.id} className="bg-white p-6 rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{cv.title}</h3>
                      <p className="text-sm text-neutral-500 mb-4">
                        Updated {new Date(cv.updatedAt).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/cv/${cv.id}`)}
                          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <EditIcon className="w-4 h-4" />
                          <span className="text-sm">{t.common.edit}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCV(cv.id)}
                          className="flex items-center justify-center px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {cvs.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <FileTextIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                      <p className="text-neutral-600 mb-4">{t.cv.title}</p>
                      <button
                        onClick={() => router.push('/cv/create')}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        {t.cv.createNew}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'interviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-neutral-900">{t.interviews.title}</h1>
                  <button
                    onClick={() => router.push('/interviews/start')}
                    className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>{t.interviews.startInterview}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {interviews.map((interview) => (
                    <div key={interview.id} className="bg-white p-6 rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-neutral-900">{interview.role}</h3>
                          <p className="text-sm text-neutral-500">
                            {new Date(interview.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{interview.overallScore}%</div>
                          <p className="text-sm text-neutral-500">{t.interviews.score}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push(`/interviews/${interview.id}`)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Details →
                      </button>
                    </div>
                  ))}
                  {interviews.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                      <VideoIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                      <p className="text-neutral-600 mb-4">{t.interviews.title}</p>
                      <button
                        onClick={() => router.push('/interviews/start')}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        {t.interviews.startInterview}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'training' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-neutral-900">{t.training.title}</h1>
                  <button
                    onClick={() => router.push('/training')}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    {t.training.startTraining}
                  </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-neutral-200">
                  <h2 className="text-xl font-semibold mb-4">{t.dashboard.recentActivity}</h2>
                  <div className="space-y-3">
                    {progress.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
                        <div>
                          <p className="font-medium text-neutral-900">Challenge {item.challengeId}</p>
                          <p className="text-sm text-neutral-500">{item.challengeType}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'completed' 
                              ? 'bg-green-100 text-green-700' 
                              : item.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status}
                          </span>
                          <p className="text-sm text-neutral-500 mt-1">Score: {item.score}</p>
                        </div>
                      </div>
                    ))}
                    {progress.length === 0 && (
                      <p className="text-sm text-neutral-500">No progress yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}