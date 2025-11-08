'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { CVTemplateModern } from './CVTemplateModern';
import { CVTemplateClassic } from './CVTemplateClassic';
import { cvService } from '@/lib/services/cv.service';

interface CVEditorProps {
  cvData: any;
  onSave?: (data: any) => void;
}

export function CVEditor({ cvData, onSave }: CVEditorProps) {
  const { t } = useLanguage();
  const [template, setTemplate] = useState<'modern' | 'classic'>('modern');
  const [data, setData] = useState(cvData);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await cvService.exportPDF('cv-content', `${data.personalInfo?.fullName || 'cv'}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert(t.common.error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsExporting(true);
    try {
      await cvService.exportDOCX(data, `${data.personalInfo?.fullName || 'cv'}.docx`);
    } catch (error) {
      console.error('Error exporting DOCX:', error);
      alert(t.common.error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    try {
      cvService.exportJSON(data, `${data.personalInfo?.fullName || 'cv'}.json`);
    } catch (error) {
      console.error('Error exporting JSON:', error);
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
      <div className="flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-lg border border-neutral-200">
        <div className="flex gap-2">
          <button
            onClick={() => setTemplate('modern')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              template === 'modern'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.cv.modernTemplate}
          </button>
          <button
            onClick={() => setTemplate('classic')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              template === 'classic'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.cv.classicTemplate}
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {t.cv.exportPdf}
          </button>
          <button
            onClick={handleExportDOCX}
            disabled={isExporting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {t.cv.exportDocx}
          </button>
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            {t.cv.exportJson}
          </button>
          {onSave && (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              {t.common.save}
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        {template === 'modern' ? (
          <CVTemplateModern data={data} />
        ) : (
          <CVTemplateClassic data={data} />
        )}
      </div>
    </div>
  );
}

