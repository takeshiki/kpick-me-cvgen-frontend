"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { useAuth } from "@/lib/hooks/useAuth";
import { cvService } from "@/lib/services/cv.service";
import { CVEditor } from "@/components/cv/CVEditor";
import { CVForm } from "@/components/cv/CVForm";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Logo } from "@/components/ui/logo";

export default function CVCreatePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      links: {
        linkedin: "",
        github: "",
        portfolio: "",
        website: "",
      },
    },
    summary: "",
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: null,
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: null,
        current: false,
      },
    ],
    skills: {
      technical: [],
      soft: [],
      languages: [
        {
          name: "",
          level: "Intermediate",
        },
      ],
      tools: [],
    },
    projects: [
      {
        name: "",
        description: "",
        technologies: [],
        link: "",
        github: "",
        startDate: "",
        endDate: null,
      },
    ],
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
        expiryDate: null,
        credentialId: "",
        credentialUrl: "",
      },
    ],
    extras: {
      interests: [],
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/unauthorized");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSave = async () => {
    try {
      const newCV = await cvService.create({
        content: { body: cvData },
        template: "modern",
      });
      alert(t.common.success || "CV created successfully!");
      router.push(`/cv/${newCV.id}`);
    } catch (error) {
      console.error("Error creating CV:", error);
      alert(t.common.error || "Error creating CV");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-neutral-600">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <Logo className="h-7 w-auto" />
              <span className="text-xl font-semibold">CVgen</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={() => router.push("/dashboard")}
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
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {t.common.save || "Save CV"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            {t.cv.createNew}
          </h1>
          <p className="text-neutral-600 mt-2">
            Fill in your information to create a professional CV
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="space-y-6">
            <CVForm initialData={cvData} onDataChange={setCvData} />
          </div>

          {/* Right Side - Preview */}
          <div className="sticky top-8 h-fit">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Live Preview
            </h3>
            <CVEditor cvData={cvData} onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
