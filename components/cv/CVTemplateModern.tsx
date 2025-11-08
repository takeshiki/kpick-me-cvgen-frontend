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

interface CVTemplateModernProps {
  data: CVData;
  title?: string;
}

export function CVTemplateModern({ data, title }: CVTemplateModernProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto" id="cv-content">
      <div className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.personalInfo?.fullName || t.cv.fullName}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo?.email && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo?.phone && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo?.location && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {data.personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {data.personalInfo?.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            {t.cv.summary}
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            {t.cv.experience}
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.jobTitle}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{exp.company}</span>
                  {exp.startDate && (
                    <span className="ml-2">
                      {exp.startDate} - {exp.current ? t.cv.current : exp.endDate}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            {t.cv.education}
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{edu.institution}</span>
                  {edu.startDate && (
                    <span className="ml-2">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  )}
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            {t.cv.skills}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill.name}
                {skill.proficiency && ` - ${skill.proficiency}`}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.languages && data.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            {t.cv.languages}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {lang.name}
                {lang.proficiency && ` - ${lang.proficiency}`}
              </span>
            ))}
          </div>
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            {t.cv.projects}
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {project.url}
                  </a>
                )}
                {project.description && (
                  <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

