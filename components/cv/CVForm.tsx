"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

interface CVFormProps {
  initialData: any;
  onDataChange: (data: any) => void;
}

export function CVForm({ initialData, onDataChange }: CVFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialData);

  const updateData = (path: string[], value: any) => {
    const newData = { ...formData };
    let current: any = newData;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    setFormData(newData);
    onDataChange(newData);
  };

  const addArrayItem = (path: string[], template: any) => {
    const newData = { ...formData };
    let current: any = newData;

    for (const key of path) {
      current = current[key];
    }
    current.push({ ...template });

    setFormData(newData);
    onDataChange(newData);
  };

  const removeArrayItem = (path: string[], index: number) => {
    const newData = { ...formData };
    let current: any = newData;

    for (const key of path) {
      current = current[key];
    }
    current.splice(index, 1);

    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg border border-neutral-200">
      {/* Personal Info Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 border-b pb-2">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.personalInfo.fullName}
              onChange={(e) =>
                updateData(["personalInfo", "fullName"], e.target.value)
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) =>
                updateData(["personalInfo", "email"], e.target.value)
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) =>
                updateData(["personalInfo", "phone"], e.target.value)
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.personalInfo.location}
              onChange={(e) =>
                updateData(["personalInfo", "location"], e.target.value)
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New York, USA"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              value={formData.personalInfo.links.linkedin}
              onChange={(e) =>
                updateData(
                  ["personalInfo", "links", "linkedin"],
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              GitHub
            </label>
            <input
              type="url"
              value={formData.personalInfo.links.github}
              onChange={(e) =>
                updateData(["personalInfo", "links", "github"], e.target.value)
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://github.com/johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Portfolio
            </label>
            <input
              type="url"
              value={formData.personalInfo.links.portfolio}
              onChange={(e) =>
                updateData(
                  ["personalInfo", "links", "portfolio"],
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://johndoe.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={formData.personalInfo.links.website}
              onChange={(e) =>
                updateData(["personalInfo", "links", "website"], e.target.value)
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 border-b pb-2">
          Professional Summary
        </h2>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Summary
          </label>
          <textarea
            value={formData.summary}
            onChange={(e) => updateData(["summary"], e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="A brief professional summary highlighting your key skills and experience..."
          />
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-neutral-900">
            Work Experience
          </h2>
          <button
            onClick={() =>
              addArrayItem(["experience"], {
                company: "",
                position: "",
                location: "",
                startDate: "",
                endDate: null,
                current: false,
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            + Add Experience
          </button>
        </div>

        {formData.experience.map((exp: any, index: number) => (
          <div
            key={index}
            className="p-4 bg-neutral-50 rounded-lg space-y-3 relative"
          >
            <button
              onClick={() => removeArrayItem(["experience"], index)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].company = e.target.value;
                    updateData(["experience"], newExp);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].position = e.target.value;
                    updateData(["experience"], newExp);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].location = e.target.value;
                    updateData(["experience"], newExp);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].startDate = e.target.value;
                    updateData(["experience"], newExp);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  value={exp.endDate || ""}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].endDate = e.target.value || null;
                    updateData(["experience"], newExp);
                  }}
                  disabled={exp.current}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-100"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[index].current = e.target.checked;
                      if (e.target.checked) {
                        newExp[index].endDate = null;
                      }
                      updateData(["experience"], newExp);
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-neutral-700">
                    Current Position
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-neutral-900">Education</h2>
          <button
            onClick={() =>
              addArrayItem(["education"], {
                institution: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: null,
                description: "",
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            + Add Education
          </button>
        </div>

        {formData.education.map((edu: any, index: number) => (
          <div
            key={index}
            className="p-4 bg-neutral-50 rounded-lg space-y-3 relative"
          >
            <button
              onClick={() => removeArrayItem(["education"], index)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].institution = e.target.value;
                    updateData(["education"], newEdu);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].degree = e.target.value;
                    updateData(["education"], newEdu);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].fieldOfStudy = e.target.value;
                    updateData(["education"], newEdu);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Computer Science, Business, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].startDate = e.target.value;
                    updateData(["education"], newEdu);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  value={edu.endDate || ""}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].endDate = e.target.value || null;
                    updateData(["education"], newEdu);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Leave empty if current"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                value={edu.description}
                onChange={(e) => {
                  const newEdu = [...formData.education];
                  newEdu[index].description = e.target.value;
                  updateData(["education"], newEdu);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Notable achievements, coursework, GPA, etc."
              />
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 border-b pb-2">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Technical Skills
            </label>
            <input
              type="text"
              value={formData.skills.technical.join(", ")}
              onChange={(e) =>
                updateData(
                  ["skills", "technical"],
                  e.target.value
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                )
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="JavaScript, Python, React (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Soft Skills
            </label>
            <input
              type="text"
              value={formData.skills.soft.join(", ")}
              onChange={(e) =>
                updateData(
                  ["skills", "soft"],
                  e.target.value
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                )
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Leadership, Communication (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Tools & Technologies
            </label>
            <input
              type="text"
              value={formData.skills.tools.join(", ")}
              onChange={(e) =>
                updateData(
                  ["skills", "tools"],
                  e.target.value
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                )
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Git, Docker, VS Code (comma-separated)"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-neutral-700">
              Languages
            </label>
            <button
              onClick={() =>
                addArrayItem(["skills", "languages"], {
                  name: "",
                  level: "Intermediate",
                })
              }
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              + Add Language
            </button>
          </div>

          {formData.skills.languages.map((lang: any, index: number) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => {
                  const newLangs = [...formData.skills.languages];
                  newLangs[index].name = e.target.value;
                  updateData(["skills", "languages"], newLangs);
                }}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Language name"
              />
              <select
                value={lang.level}
                onChange={(e) => {
                  const newLangs = [...formData.skills.languages];
                  newLangs[index].level = e.target.value;
                  updateData(["skills", "languages"], newLangs);
                }}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Professional">Professional</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              <button
                onClick={() => removeArrayItem(["skills", "languages"], index)}
                className="px-3 text-red-600 hover:text-red-800 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-neutral-900">Projects</h2>
          <button
            onClick={() =>
              addArrayItem(["projects"], {
                name: "",
                description: "",
                technologies: [],
                link: "",
                github: "",
                startDate: "",
                endDate: null,
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            + Add Project
          </button>
        </div>

        {formData.projects.map((project: any, index: number) => (
          <div
            key={index}
            className="p-4 bg-neutral-50 rounded-lg space-y-3 relative"
          >
            <button
              onClick={() => removeArrayItem(["projects"], index)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index].name = e.target.value;
                    updateData(["projects"], newProjects);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Project Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Technologies
                </label>
                <input
                  type="text"
                  value={project.technologies.join(", ")}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index].technologies = e.target.value
                      .split(",")
                      .map((s: string) => s.trim())
                      .filter(Boolean);
                    updateData(["projects"], newProjects);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js (comma-separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Project Link
                </label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index].link = e.target.value;
                    updateData(["projects"], newProjects);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={project.github}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index].github = e.target.value;
                    updateData(["projects"], newProjects);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/user/repo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index].startDate = e.target.value;
                    updateData(["projects"], newProjects);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  value={project.endDate || ""}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index].endDate = e.target.value || null;
                    updateData(["projects"], newProjects);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={project.description}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].description = e.target.value;
                  updateData(["projects"], newProjects);
                }}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the project and your role..."
              />
            </div>
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-neutral-900">
            Certifications
          </h2>
          <button
            onClick={() =>
              addArrayItem(["certifications"], {
                name: "",
                issuer: "",
                date: "",
                expiryDate: null,
                credentialId: "",
                credentialUrl: "",
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            + Add Certification
          </button>
        </div>

        {formData.certifications.map((cert: any, index: number) => (
          <div
            key={index}
            className="p-4 bg-neutral-50 rounded-lg space-y-3 relative"
          >
            <button
              onClick={() => removeArrayItem(["certifications"], index)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Certification Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => {
                    const newCerts = [...formData.certifications];
                    newCerts[index].name = e.target.value;
                    updateData(["certifications"], newCerts);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="AWS Certified Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Issuer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => {
                    const newCerts = [...formData.certifications];
                    newCerts[index].issuer = e.target.value;
                    updateData(["certifications"], newCerts);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Issue Date
                </label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => {
                    const newCerts = [...formData.certifications];
                    newCerts[index].date = e.target.value;
                    updateData(["certifications"], newCerts);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="month"
                  value={cert.expiryDate || ""}
                  onChange={(e) => {
                    const newCerts = [...formData.certifications];
                    newCerts[index].expiryDate = e.target.value || null;
                    updateData(["certifications"], newCerts);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Leave empty if no expiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={cert.credentialId}
                  onChange={(e) => {
                    const newCerts = [...formData.certifications];
                    newCerts[index].credentialId = e.target.value;
                    updateData(["certifications"], newCerts);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="ABC123XYZ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Credential URL
                </label>
                <input
                  type="url"
                  value={cert.credentialUrl}
                  onChange={(e) => {
                    const newCerts = [...formData.certifications];
                    newCerts[index].credentialUrl = e.target.value;
                    updateData(["certifications"], newCerts);
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://verify.example.com/..."
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Extras Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 border-b pb-2">
          Additional Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Interests & Hobbies
          </label>
          <input
            type="text"
            value={formData.extras.interests.join(", ")}
            onChange={(e) =>
              updateData(
                ["extras", "interests"],
                e.target.value
                  .split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean)
              )
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Photography, Hiking, Reading (comma-separated)"
          />
        </div>
      </section>
    </div>
  );
}
