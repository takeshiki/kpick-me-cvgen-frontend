"use client";

import { useLanguage } from "@/lib/contexts/LanguageContext";

interface CVData {
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    links?: {
      linkedin?: string;
      github?: string;
      portfolio?: string;
      website?: string;
    };
  };
  summary?: string;
  experience?: Array<{
    position?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string | null;
    current?: boolean;
    description?: string;
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string | null;
    description?: string;
  }>;
  skills?: {
    technical?: string[];
    soft?: string[];
    languages?: Array<{
      name?: string;
      level?: string;
    }>;
    tools?: string[];
  };
  projects?: Array<{
    name?: string;
    description?: string;
    technologies?: string[];
    link?: string;
    github?: string;
    startDate?: string;
    endDate?: string | null;
  }>;
  certifications?: Array<{
    name?: string;
    issuer?: string;
    date?: string;
    expiryDate?: string | null;
    credentialId?: string;
    credentialUrl?: string;
  }>;
  extras?: {
    interests?: string[];
  };
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
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {data.personalInfo.location}
            </span>
          )}
        </div>
        {data.personalInfo?.links && (
          <div className="flex flex-wrap gap-3 mt-3 text-sm">
            {data.personalInfo.links.linkedin && (
              <a
                href={data.personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {data.personalInfo.links.github && (
              <a
                href={data.personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}
            {data.personalInfo.links.portfolio && (
              <a
                href={data.personalInfo.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Portfolio
              </a>
            )}
            {data.personalInfo.links.website && (
              <a
                href={data.personalInfo.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Website
              </a>
            )}
          </div>
        )}
      </div>

      {data.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.position}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{exp.company}</span>
                  {exp.location && (
                    <span className="ml-2">• {exp.location}</span>
                  )}
                  {exp.startDate && (
                    <span className="ml-2">
                      {exp.startDate} -{" "}
                      {exp.current ? "Present" : exp.endDate || "Present"}
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
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{edu.institution}</span>
                  {edu.fieldOfStudy && (
                    <span className="ml-2">• {edu.fieldOfStudy}</span>
                  )}
                  {edu.startDate && (
                    <span className="ml-2">
                      {edu.startDate} - {edu.endDate || "Present"}
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

      {data.skills && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <div className="space-y-3">
            {data.skills.technical && data.skills.technical.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft && data.skills.soft.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.tools && data.skills.tools.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.languages && data.skills.languages.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {lang.name} {lang.level && `- ${lang.level}`}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.name}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline block"
                  >
                    {project.link}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline block"
                  >
                    GitHub: {project.github}
                  </a>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.description && (
                  <p className="text-gray-700 text-sm mt-1">
                    {project.description}
                  </p>
                )}
                {(project.startDate || project.endDate) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {project.startDate}{" "}
                    {project.endDate && `- ${project.endDate}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-4">
                <h3 className="text-base font-semibold text-gray-900">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {cert.issuer}
                  {cert.date && ` • ${cert.date}`}
                  {cert.expiryDate && ` - ${cert.expiryDate}`}
                </p>
                {cert.credentialId && (
                  <p className="text-xs text-gray-500">
                    ID: {cert.credentialId}
                  </p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.extras?.interests && data.extras.interests.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.extras.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
