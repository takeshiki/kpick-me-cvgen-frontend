"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { CVTemplateModern } from "./CVTemplateModern";
import { CVTemplateClassic } from "./CVTemplateClassic";
import { cvService } from "@/lib/services/cv.service";

interface CVEditorProps {
  cvData: any;
  onSave?: (data: any) => void;
}

export function CVEditor({ cvData, onSave }: CVEditorProps) {
  const { t } = useLanguage();
  const [template, setTemplate] = useState<"modern" | "classic">("modern");
  const [data, setData] = useState(cvData);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      console.log("Starting PDF export...", { data });
      await cvService.exportPDF(
        "cv-content",
        `${data.personalInfo?.fullName || "cv"}.pdf`
      );
      console.log("PDF export completed");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert(
        `${t.common.error}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsExporting(true);
    try {
      await cvService.exportDOCX(
        data,
        `${data.personalInfo?.fullName || "cv"}.docx`
      );
    } catch (error) {
      console.error("Error exporting DOCX:", error);
      alert(t.common.error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    try {
      cvService.exportJSON(data, `${data.personalInfo?.fullName || "cv"}.json`);
    } catch (error) {
      console.error("Error exporting JSON:", error);
      alert(t.common.error);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-0 border-2 border-black divide-x-2 divide-black">
        <button
          onClick={() => setTemplate("modern")}
          className={`flex-1 px-6 py-3 font-bold transition-colors ${
            template === "modern"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black/5"
          }`}
        >
          {t.cv.modernTemplate}
        </button>
        <button
          onClick={() => setTemplate("classic")}
          className={`flex-1 px-6 py-3 font-bold transition-colors ${
            template === "classic"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black/5"
          }`}
        >
          {t.cv.classicTemplate}
        </button>
      </div>

      <div className="space-y-0 border-2 border-black divide-y-2 divide-black">
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="w-full px-6 py-4 bg-white text-black font-bold text-left hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.cv.exportPdf}
        </button>
        <button
          onClick={handleExportDOCX}
          disabled={isExporting}
          className="w-full px-6 py-4 bg-white text-black font-bold text-left hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.cv.exportDocx}
        </button>
        <button
          onClick={handleExportJSON}
          className="w-full px-6 py-4 bg-white text-black font-bold text-left hover:bg-black hover:text-white transition-colors"
        >
          {t.cv.exportJson}
        </button>
        {onSave && (
          <button
            onClick={handleSave}
            className="w-full px-6 py-4 bg-black text-white font-bold text-left hover:bg-white hover:text-black transition-colors"
          >
            {t.common.save}
          </button>
        )}
      </div>

      <div className="bg-white p-8 border-2 border-black" id="cv-content">
        {template === "modern" ? (
          <CVTemplateModern data={data} />
        ) : (
          <CVTemplateClassic data={data} />
        )}
      </div>
    </div>
  );
}
