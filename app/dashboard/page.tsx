"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileTextIcon,
  VideoIcon,
  SkillIcon,
  LayoutDashboardIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
} from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/lib/hooks/useAuth";
import { cvService, type CV } from "@/lib/services/cv.service";
import {
  interviewService,
  type Interview,
} from "@/lib/services/interview.service";
import {
  trainingService,
  type TrainingProgress,
} from "@/lib/services/training.service";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cvs, setCvs] = useState<CV[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [progress, setProgress] = useState<TrainingProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
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
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCV = async (id: string) => {
    if (confirm("Are you sure you want to delete this CV?")) {
      try {
        await cvService.delete(id);
        setCvs(cvs.filter((cv) => cv.id !== id));
      } catch (error) {
        console.error("Error deleting CV:", error);
        alert("Failed to delete CV");
      }
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
    challenges: progress.filter((p) => p.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Logo className="h-7 w-auto text-black" />
              <span className="text-xl font-bold text-black">AdvancedCV</span>
            </div>
            <div className="flex items-center space-x-6">
              <LanguageSwitcher />
              {user && (
                <>
                  <div className="flex items-center space-x-3">
                    {user.avatar && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8"
                      />
                    )}
                    <span className="text-sm font-medium text-black">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-black hover:text-black transition-colors"
                  >
                    {t.nav.logout}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-0 border-2 border-black">
          <div className="lg:w-64 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <div className="bg-white p-6">
              <nav className="space-y-0 divide-y-2 divide-black/10">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center space-x-3 px-4 py-4 text-sm font-medium transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-black text-white"
                      : "text-black hover:bg-black/5"
                  }`}
                >
                  <LayoutDashboardIcon className="w-5 h-5" />
                  <span>{t.nav.dashboard}</span>
                </button>
                <button
                  onClick={() => setActiveTab("cvs")}
                  className={`w-full flex items-center space-x-3 px-4 py-4 text-sm font-medium transition-colors ${
                    activeTab === "cvs"
                      ? "bg-black text-white"
                      : "text-black hover:bg-black/5"
                  }`}
                >
                  <FileTextIcon className="w-5 h-5" />
                  <span>{t.nav.cvs}</span>
                </button>
                <button
                  onClick={() => setActiveTab("interviews")}
                  className={`w-full flex items-center space-x-3 px-4 py-4 text-sm font-medium transition-colors ${
                    activeTab === "interviews"
                      ? "bg-black text-white"
                      : "text-black hover:bg-black/5"
                  }`}
                >
                  <VideoIcon className="w-5 h-5" />
                  <span>{t.nav.interviews}</span>
                </button>
                <button
                  onClick={() => setActiveTab("training")}
                  className={`w-full flex items-center space-x-3 px-4 py-4 text-sm font-medium transition-colors ${
                    activeTab === "training"
                      ? "bg-black text-white"
                      : "text-black hover:bg-black/5"
                  }`}
                >
                  <SkillIcon className="w-5 h-5" />
                  <span>{t.nav.training}</span>
                </button>
              </nav>
            </div>
          </div>
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div className="p-8 space-y-8">
                <h1 className="text-4xl font-bold text-black tracking-tight">
                  {t.nav.dashboard}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black/10 border-2 border-black">
                  <div className="bg-white p-8">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileTextIcon className="w-6 h-6 text-black" />
                      <h3 className="text-sm font-medium text-black/70">
                        {t.dashboard.totalCvs}
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-black">{stats.cvs}</p>
                  </div>
                  <div className="bg-white p-8">
                    <div className="flex items-center space-x-3 mb-3">
                      <VideoIcon className="w-6 h-6 text-black" />
                      <h3 className="text-sm font-medium text-black/70">
                        {t.dashboard.totalInterviews}
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-black">
                      {stats.interviews}
                    </p>
                  </div>
                  <div className="bg-white p-8">
                    <div className="flex items-center space-x-3 mb-3">
                      <SkillIcon className="w-6 h-6 text-black" />
                      <h3 className="text-sm font-medium text-black/70">
                        {t.dashboard.totalTraining}
                      </h3>
                    </div>
                    <p className="text-4xl font-bold text-black">
                      {stats.challenges}
                    </p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-8 border-2 border-black">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    {t.dashboard.recentActivity}
                  </h2>
                  <div className="space-y-0 divide-y-2 divide-black/10">
                    {progress.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-4"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 ${
                              item.status === "completed"
                                ? "bg-black"
                                : "bg-black/30"
                            }`}
                          ></div>
                          <span className="text-sm font-medium text-black">
                            {item.status === "completed"
                              ? "Completed"
                              : "Attempted"}{" "}
                            challenge
                          </span>
                        </div>
                        <span className="text-sm font-medium text-black">
                          Score: {item.score}
                        </span>
                      </div>
                    ))}
                    {progress.length === 0 && (
                      <p className="text-sm text-black/70 py-4">
                        No recent activity
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cvs" && (
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-bold text-black tracking-tight">
                    {t.cv.title}
                  </h1>
                  <button
                    onClick={() => router.push("/cv/create")}
                    className="flex items-center space-x-2 bg-black text-white px-6 py-3 border-2 border-black font-medium hover:bg-white hover:text-black transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>{t.cv.createNew}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y-2 md:divide-y-0 border-2 border-black">
                  {cvs.map((cv, index) => (
                    <div
                      key={cv.id}
                      className={`bg-white p-6 ${
                        index % 3 !== 2 ? "md:border-r-2 md:border-black" : ""
                      }`}
                    >
                      <h3 className="text-xl font-bold text-black mb-2">
                        {cv.title}
                      </h3>
                      <p className="text-sm text-black/70 mb-6">
                        Updated {new Date(cv.updatedAt).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-0 divide-x-2 divide-black border-2 border-black">
                        <button
                          onClick={() => router.push(`/cv/${cv.id}`)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 hover:bg-black hover:text-white transition-colors"
                        >
                          <EditIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {t.common.edit}
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteCV(cv.id)}
                          className="flex items-center justify-center px-4 py-3 text-black hover:bg-black hover:text-white transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {cvs.length === 0 && (
                    <div className="col-span-full text-center py-16 px-8">
                      <FileTextIcon className="w-16 h-16 text-black mx-auto mb-6" />
                      <p className="text-black/70 mb-6 text-lg">{t.cv.title}</p>
                      <button
                        onClick={() => router.push("/cv/create")}
                        className="bg-black text-white px-8 py-3 border-2 border-black font-medium hover:bg-white hover:text-black transition-colors"
                      >
                        {t.cv.createNew}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "interviews" && (
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-bold text-black tracking-tight">
                    {t.interviews.title}
                  </h1>
                  <button
                    onClick={() => router.push("/interviews/start")}
                    className="flex items-center space-x-2 bg-black text-white px-6 py-3 border-2 border-black font-medium hover:bg-white hover:text-black transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>{t.interviews.startInterview}</span>
                  </button>
                </div>

                <div className="space-y-0 divide-y-2 divide-black/10 border-2 border-black">
                  {interviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="bg-white p-8 hover:bg-black/5 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-black mb-2">
                            {interview.role}
                          </h3>
                          <p className="text-sm text-black/70">
                            {new Date(interview.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right border-2 border-black px-6 py-3">
                          <div className="text-3xl font-bold text-black">
                            {interview.overallScore}%
                          </div>
                          <p className="text-xs font-medium text-black/70 mt-1">
                            {t.interviews.score}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          router.push(`/interviews/${interview.id}`)
                        }
                        className="text-sm text-black font-medium hover:text-black transition-colors"
                      >
                        View Details →
                      </button>
                    </div>
                  ))}
                  {interviews.length === 0 && (
                    <div className="text-center py-16 px-8 bg-white">
                      <VideoIcon className="w-16 h-16 text-black mx-auto mb-6" />
                      <p className="text-black/70 mb-6 text-lg">
                        {t.interviews.title}
                      </p>
                      <button
                        onClick={() => router.push("/interviews/start")}
                        className="bg-black text-white px-8 py-3 border-2 border-black font-medium hover:bg-white hover:text-black transition-colors"
                      >
                        {t.interviews.startInterview}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "training" && (
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-4xl font-bold text-black tracking-tight">
                    {t.training.title}
                  </h1>
                  <button
                    onClick={() => router.push("/training")}
                    className="bg-black text-white px-6 py-3 border-2 border-black font-medium hover:bg-white hover:text-black transition-colors"
                  >
                    {t.training.startTraining}
                  </button>
                </div>

                <div className="bg-white p-8 border-2 border-black">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    {t.dashboard.recentActivity}
                  </h2>
                  <div className="space-y-0 divide-y-2 divide-black/10">
                    {progress.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-5"
                      >
                        <div>
                          <p className="font-bold text-black text-lg">
                            Challenge {item.challengeId}
                          </p>
                          <p className="text-sm text-black/70 mt-1">
                            {item.challengeType}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-4 py-2 border-2 border-black text-xs font-bold ${
                              item.status === "completed"
                                ? "bg-black text-white"
                                : item.status === "failed"
                                ? "bg-white text-black"
                                : "bg-black/10 text-black"
                            }`}
                          >
                            {item.status}
                          </span>
                          <p className="text-sm text-black font-medium mt-2">
                            Score: {item.score}
                          </p>
                        </div>
                      </div>
                    ))}
                    {progress.length === 0 && (
                      <p className="text-sm text-black/70 py-4">
                        No progress yet
                      </p>
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
