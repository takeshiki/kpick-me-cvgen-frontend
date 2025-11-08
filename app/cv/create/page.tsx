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
        title: cvData.personalInfo.fullName || "My CV",
        data: cvData,
        templateId: "modern",
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-2 border-black border-t-transparent mx-auto mb-4"></div>
          <p className="text-black/70 font-medium">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <Logo className="h-7 w-auto text-black" />
              <span className="text-xl font-bold text-black">AdvancedCV</span>
            </div>
            <div className="flex items-center space-x-6">
              <LanguageSwitcher />
              <button
                onClick={() => router.push("/dashboard")}
                className="text-sm font-medium text-black hover:text-black transition-colors"
              >
                {t.nav.dashboard}
              </button>
              <button
                onClick={logout}
                className="text-sm font-medium text-black hover:text-black transition-colors"
              >
                {t.nav.logout}
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-black text-white border-2 border-black font-medium hover:bg-white hover:text-black transition-colors"
              >
                {t.common.save || "Save CV"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 pb-8 border-b-2 border-black/10">
          <h1 className="text-4xl font-bold text-black tracking-tight">
            {t.cv.createNew}
          </h1>
          <p className="text-black/70 mt-3 text-lg">
            Fill in your information to create a professional CV
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-2 border-black">
          <div className="p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-black">
            <CVForm initialData={cvData} onDataChange={setCvData} />
          </div>

          <div className="p-8 bg-black/[0.02]">
            <h3 className="text-2xl font-bold text-black mb-6">Live Preview</h3>
            <CVEditor cvData={cvData} onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
}
