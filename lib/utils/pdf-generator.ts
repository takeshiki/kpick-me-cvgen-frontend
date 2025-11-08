import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDFFromElement(elementId: string, filename: string = 'cv.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}

export function downloadJSON(data: any, filename: string = 'cv.json') {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generateDOCX(cvData: any, filename: string = 'cv.docx') {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import('docx');

  const sections: any[] = [];

  sections.push(
    new Paragraph({
      text: cvData.personalInfo?.fullName || 'Untitled CV',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
    })
  );

  if (cvData.personalInfo) {
    const contactInfo: string[] = [];
    if (cvData.personalInfo.email) contactInfo.push(cvData.personalInfo.email);
    if (cvData.personalInfo.phone) contactInfo.push(cvData.personalInfo.phone);
    if (cvData.personalInfo.location) contactInfo.push(cvData.personalInfo.location);

    if (contactInfo.length > 0) {
      sections.push(
        new Paragraph({
          text: contactInfo.join(' | '),
          alignment: AlignmentType.CENTER,
        })
      );
    }

    if (cvData.personalInfo.summary) {
      sections.push(new Paragraph({ text: '' }));
      sections.push(
        new Paragraph({
          text: 'Summary',
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
    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: 'Work Experience',
        heading: HeadingLevel.HEADING_2,
      })
    );

    cvData.experience.forEach((exp: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.jobTitle || '',
              bold: true,
            }),
          ],
        })
      );
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.company || '',
              italics: true,
            }),
          ],
        })
      );
      if (exp.startDate) {
        sections.push(
          new Paragraph({
            text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''}`,
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
      sections.push(new Paragraph({ text: '' }));
    });
  }

  if (cvData.education && cvData.education.length > 0) {
    sections.push(
      new Paragraph({
        text: 'Education',
        heading: HeadingLevel.HEADING_2,
      })
    );

    cvData.education.forEach((edu: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree || '',
              bold: true,
            }),
          ],
        })
      );
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.institution || '',
              italics: true,
            }),
          ],
        })
      );
      if (edu.startDate) {
        sections.push(
          new Paragraph({
            text: `${edu.startDate} - ${edu.endDate || ''}`,
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
      sections.push(new Paragraph({ text: '' }));
    });
  }

  if (cvData.skills && cvData.skills.length > 0) {
    sections.push(
      new Paragraph({
        text: 'Skills',
        heading: HeadingLevel.HEADING_2,
      })
    );
    const skillsText = cvData.skills
      .map((skill: any) => `${skill.name}${skill.proficiency ? ` (${skill.proficiency})` : ''}`)
      .join(', ');
    sections.push(
      new Paragraph({
        text: skillsText,
      })
    );
  }

  if (cvData.languages && cvData.languages.length > 0) {
    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: 'Languages',
        heading: HeadingLevel.HEADING_2,
      })
    );
    const langsText = cvData.languages
      .map((lang: any) => `${lang.name}${lang.proficiency ? ` (${lang.proficiency})` : ''}`)
      .join(', ');
    sections.push(
      new Paragraph({
        text: langsText,
      })
    );
  }

  if (cvData.projects && cvData.projects.length > 0) {
    sections.push(new Paragraph({ text: '' }));
    sections.push(
      new Paragraph({
        text: 'Projects',
        heading: HeadingLevel.HEADING_2,
      })
    );

    cvData.projects.forEach((project: any) => {
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: project.name || '',
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
      sections.push(new Paragraph({ text: '' }));
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
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

