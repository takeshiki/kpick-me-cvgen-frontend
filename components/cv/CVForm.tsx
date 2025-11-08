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
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black pb-3 border-b-2 border-black/10">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Full Name <span className="text-black">*</span>
            </label>
            <input
              type="text"
              value={formData.personalInfo.fullName}
              onChange={(e) =>
                updateData(["personalInfo", "fullName"], e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Email <span className="text-black">*</span>
            </label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) =>
                updateData(["personalInfo", "email"], e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) =>
                updateData(["personalInfo", "phone"], e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.personalInfo.location}
              onChange={(e) =>
                updateData(["personalInfo", "location"], e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="New York, USA"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-bold text-black mb-2">
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
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              GitHub
            </label>
            <input
              type="url"
              value={formData.personalInfo.links.github}
              onChange={(e) =>
                updateData(["personalInfo", "links", "github"], e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="https://github.com/johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
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
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="https://johndoe.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">
              Website
            </label>
            <input
              type="url"
              value={formData.personalInfo.links.website}
              onChange={(e) =>
                updateData(["personalInfo", "links", "website"], e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black pb-3 border-b-2 border-black/10">
          Professional Summary
        </h2>
        <div>
          <label className="block text-sm font-bold text-black mb-2">
            Summary
          </label>
          <textarea
            value={formData.summary}
            onChange={(e) => updateData(["summary"], e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
            placeholder="A brief professional summary highlighting your key skills and experience..."
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b-2 border-black/10">
          <h2 className="text-2xl font-bold text-black">Work Experience</h2>
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
            className="px-6 py-2 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black transition-colors text-sm"
          >
            + Add Experience
          </button>
        </div>

        {formData.experience.map((exp: any, index: number) => (
          <div
            key={index}
            className="p-6 bg-white border-2 border-black space-y-4 relative"
          >
            <button
              onClick={() => removeArrayItem(["experience"], index)}
              className="absolute top-4 right-4 text-black hover:text-black font-bold text-xl"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Company <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].company = e.target.value;
                    updateData(["experience"], newExp);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Position <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].position = e.target.value;
                    updateData(["experience"], newExp);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Start Date <span className="text-black">*</span>
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[index].startDate = e.target.value;
                    updateData(["experience"], newExp);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium disabled:bg-neutral-100"
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
                  <span className="text-sm font-bold text-black">
                    Current Position
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-black">Education</h2>
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
            className="px-4 py-2 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black transition-colors text-sm"
          >
            + Add Education
          </button>
        </div>

        {formData.education.map((edu: any, index: number) => (
          <div
            key={index}
            className="p-6 bg-white border-2 border-black space-y-4 relative"
          >
            <button
              onClick={() => removeArrayItem(["education"], index)}
              className="absolute top-2 right-2 text-black hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Institution <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].institution = e.target.value;
                    updateData(["education"], newEdu);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Degree <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].degree = e.target.value;
                    updateData(["education"], newEdu);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="Computer Science, Business, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Start Date <span className="text-black">*</span>
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[index].startDate = e.target.value;
                    updateData(["education"], newEdu);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="Leave empty if current"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
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
                className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                placeholder="Notable achievements, coursework, GPA, etc."
              />
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black pb-3 border-b-2 border-black/10">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
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
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="JavaScript, Python, React (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
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
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="Leadership, Communication (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
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
              className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
              placeholder="Git, Docker, VS Code (comma-separated)"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-bold text-black">
              Languages
            </label>
            <button
              onClick={() =>
                addArrayItem(["skills", "languages"], {
                  name: "",
                  level: "Intermediate",
                })
              }
              className="px-4 py-2 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black transition-colors text-sm"
            >
              + Add Language
            </button>
          </div>

          {formData.skills.languages.map((lang: any, index: number) => (
            <div key={index} className="flex gap-0 mb-2 border-2 border-black">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => {
                  const newLangs = [...formData.skills.languages];
                  newLangs[index].name = e.target.value;
                  updateData(["skills", "languages"], newLangs);
                }}
                className="flex-1 px-4 py-3 border-r-2 border-black focus:ring-0 focus:outline-none bg-white text-black font-medium"
                placeholder="Language name"
              />
              <select
                value={lang.level}
                onChange={(e) => {
                  const newLangs = [...formData.skills.languages];
                  newLangs[index].level = e.target.value;
                  updateData(["skills", "languages"], newLangs);
                }}
                className="px-4 py-3 border-r-2 border-black focus:ring-0 focus:outline-none bg-white text-black font-medium"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Professional">Professional</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              <button
                onClick={() => removeArrayItem(["skills", "languages"], index)}
                className="px-4 text-black hover:bg-black hover:text-white text-xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-black">Projects</h2>
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
            className="px-4 py-2 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black transition-colors text-sm"
          >
            + Add Project
          </button>
        </div>

        {formData.projects.map((project: any, index: number) => (
          <div
            key={index}
            className="p-6 bg-white border-2 border-black space-y-4 relative"
          >
            <button
              onClick={() => removeArrayItem(["projects"], index)}
              className="absolute top-2 right-2 text-black hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Project Name <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[index].name = e.target.value;
                    updateData(["projects"], newProjects);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="Project Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="React, Node.js (comma-separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="https://github.com/user/repo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Description <span className="text-black">*</span>
              </label>
              <textarea
                value={project.description}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].description = e.target.value;
                  updateData(["projects"], newProjects);
                }}
                rows={3}
                className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                placeholder="Describe the project and your role..."
              />
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-black">Certifications</h2>
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
            className="px-4 py-2 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black transition-colors text-sm"
          >
            + Add Certification
          </button>
        </div>

        {formData.certifications.map((cert: any, index: number) => (
          <div
            key={index}
            className="p-6 bg-white border-2 border-black space-y-4 relative"
          >
            <button
              onClick={() => removeArrayItem(["certifications"], index)}
              className="absolute top-2 right-2 text-black hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Certification Name <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => {
                    const newCerts = [...formData.certifications];
                    newCerts[index].name = e.target.value;
                    updateData(["certifications"], newCerts);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="AWS Certified Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Issuer <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => {
                    const newCerts = [...formData.certifications];
                    newCerts[index].issuer = e.target.value;
                    updateData(["certifications"], newCerts);
                  }}
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="Leave empty if no expiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="ABC123XYZ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
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
                  className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
                  placeholder="https://verify.example.com/..."
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black pb-3 border-b-2 border-black/10">
          Additional Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
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
            className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:border-black bg-white text-black font-medium"
            placeholder="Photography, Hiking, Reading (comma-separated)"
          />
        </div>
      </section>
    </div>
  );
}
