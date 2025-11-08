'use client';

import { useLanguage } from '@/lib/contexts/LanguageContext';

interface CVData {
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    summary?: string;
  };
  experience?: Array<{
    jobTitle?: string;
    company?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    description?: string;
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  skills?: Array<{
    name?: string;
    proficiency?: string;
  }>;
  languages?: Array<{
    name?: string;
    proficiency?: string;
  }>;
  projects?: Array<{
    name?: string;
    url?: string;
    description?: string;
  }>;
}

interface CVTemplateClassicProps {
  data: CVData;
  title?: string;
}

export function CVTemplateClassic({ data, title }: CVTemplateClassicProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto" id="cv-content">
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">
          {data.personalInfo?.fullName || t.cv.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>|</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.location && <span>|</span>}
          {data.personalInfo?.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {data.personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            {t.cv.summary}
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            {t.cv.experience}
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-sm italic text-gray-700">{exp.company}</p>
                  </div>
                  {exp.startDate && (
                    <span className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? t.cv.current : exp.endDate}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-1 text-justify">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            {t.cv.education}
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm italic text-gray-700">{edu.institution}</p>
                  </div>
                  {edu.startDate && (
                    <span className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  )}
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-700 mt-1 text-justify">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            {t.cv.skills}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-sm text-gray-800">
                <span className="font-medium">{skill.name}</span>
                {skill.proficiency && (
                  <span className="text-gray-600"> ({skill.proficiency})</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.languages && data.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            {t.cv.languages}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {data.languages.map((lang, index) => (
              <div key={index} className="text-sm text-gray-800">
                <span className="font-medium">{lang.name}</span>
                {lang.proficiency && (
                  <span className="text-gray-600"> ({lang.proficiency})</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            {t.cv.projects}
          </h2>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:underline block"
                  >
                    {project.url}
                  </a>
                )}
                {project.description && (
                  <p className="text-sm text-gray-700 text-justify">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

