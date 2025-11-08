import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDFFromElement(
  elementId: string,
  filename: string = "cv.pdf"
) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id '${elementId}' not found`);
      throw new Error(`Element with id '${elementId}' not found`);
    }

    console.log("Starting PDF generation...", { elementId, element });

    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.position = "absolute";
    clonedElement.style.left = "-9999px";
    clonedElement.style.top = "0";
    document.body.appendChild(clonedElement);

    // Replace modern color functions with compatible ones
    const allElements = clonedElement.querySelectorAll("*");
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlEl);

      // Force compute and set colors to RGB
      if (computedStyle.color) {
        htmlEl.style.color = computedStyle.color;
      }
      if (computedStyle.backgroundColor) {
        htmlEl.style.backgroundColor = computedStyle.backgroundColor;
      }
      if (computedStyle.borderColor) {
        htmlEl.style.borderColor = computedStyle.borderColor;
      }
    });

    // Wait for fonts and styles to load
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      foreignObjectRendering: false,
      imageTimeout: 0,
      removeContainer: true,
    });

    // Remove cloned element
    document.body.removeChild(clonedElement);

    console.log("Canvas created:", {
      width: canvas.width,
      height: canvas.height,
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error(
        "Canvas dimensions are invalid. Element might be hidden or empty."
      );
    }

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    console.log("Saving PDF:", filename);
    pdf.save(filename);
    console.log("PDF saved successfully");
  } catch (error) {
    console.error("Error in generatePDFFromElement:", error);
    throw error;
  }
}

export function downloadJSON(data: any, filename: string = "cv.json") {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generateDOCX(cvData: any, filename: string = "cv.docx") {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } =
    await import("docx");

  const sections: any[] = [];

  sections.push(
    new Paragraph({
      text: cvData.personalInfo?.fullName || "Untitled CV",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
    })
  );

  if (cvData.personalInfo) {
    const contactInfo: string[] = [];
    if (cvData.personalInfo.email) contactInfo.push(cvData.personalInfo.email);
    if (cvData.personalInfo.phone) contactInfo.push(cvData.personalInfo.phone);
    if (cvData.personalInfo.location)
      contactInfo.push(cvData.personalInfo.location);

    if (contactInfo.length > 0) {
      sections.push(
        new Paragraph({
          text: contactInfo.join(" | "),
          alignment: AlignmentType.CENTER,
        })
      );
    }

    if (cvData.personalInfo.summary) {
      sections.push(new Paragraph({ text: "" }));
      sections.push(
        new Paragraph({
          text: "Summary",
          heading: HeadingLevel.HEADING_2,
        })
      );
      sections.push(
        new Paragraph({
          text: cvData.personalInfo.summary,
        })
      );
    }
  }

  if (cvData.experience && cvData.experience.length > 0) {
    sections.push(new Paragraph({ text: "" }));
    sections.push(
      new Paragraph({
        text: "Work Experience",
        heading: HeadingLevel.HEADING_2,
      })
    );

    cvData.experience.forEach((exp: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.jobTitle || "",
              bold: true,
            }),
          ],
        })
      );
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.company || "",
              italics: true,
            }),
          ],
        })
      );
      if (exp.startDate) {
        sections.push(
          new Paragraph({
            text: `${exp.startDate} - ${
              exp.current ? "Present" : exp.endDate || ""
            }`,
          })
        );
      }
      if (exp.description) {
        sections.push(
          new Paragraph({
            text: exp.description,
          })
        );
      }
      sections.push(new Paragraph({ text: "" }));
    });
  }

  if (cvData.education && cvData.education.length > 0) {
    sections.push(
      new Paragraph({
        text: "Education",
        heading: HeadingLevel.HEADING_2,
      })
    );

    cvData.education.forEach((edu: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree || "",
              bold: true,
            }),
          ],
        })
      );
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.institution || "",
              italics: true,
            }),
          ],
        })
      );
      if (edu.startDate) {
        sections.push(
          new Paragraph({
            text: `${edu.startDate} - ${edu.endDate || ""}`,
          })
        );
      }
      if (edu.description) {
        sections.push(
          new Paragraph({
            text: edu.description,
          })
        );
      }
      sections.push(new Paragraph({ text: "" }));
    });
  }

  if (cvData.skills && cvData.skills.length > 0) {
    sections.push(
      new Paragraph({
        text: "Skills",
        heading: HeadingLevel.HEADING_2,
      })
    );
    const skillsText = cvData.skills
      .map(
        (skill: any) =>
          `${skill.name}${skill.proficiency ? ` (${skill.proficiency})` : ""}`
      )
      .join(", ");
    sections.push(
      new Paragraph({
        text: skillsText,
      })
    );
  }

  if (cvData.languages && cvData.languages.length > 0) {
    sections.push(new Paragraph({ text: "" }));
    sections.push(
      new Paragraph({
        text: "Languages",
        heading: HeadingLevel.HEADING_2,
      })
    );
    const langsText = cvData.languages
      .map(
        (lang: any) =>
          `${lang.name}${lang.proficiency ? ` (${lang.proficiency})` : ""}`
      )
      .join(", ");
    sections.push(
      new Paragraph({
        text: langsText,
      })
    );
  }

  if (cvData.projects && cvData.projects.length > 0) {
    sections.push(new Paragraph({ text: "" }));
    sections.push(
      new Paragraph({
        text: "Projects",
        heading: HeadingLevel.HEADING_2,
      })
    );

    cvData.projects.forEach((project: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.name || "",
              bold: true,
            }),
          ],
        })
      );
      if (project.url) {
        sections.push(
          new Paragraph({
            text: project.url,
          })
        );
      }
      if (project.description) {
        sections.push(
          new Paragraph({
            text: project.description,
          })
        );
      }
      sections.push(new Paragraph({ text: "" }));
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
