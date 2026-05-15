import jsPDF from "jspdf";
import logo from "../assets/logo1.png";

/*
  EXPORT REPORT PDF
*/

const exportReportPDF = async (report) => {
  try {

    /*
      SAFE DATA
    */

    const findings =
      Array.isArray(report?.findings)
        ? report.findings
        : [];

    const technologies =
      Array.isArray(report?.technologies)
        ? report.technologies
        : [];

    /*
      PDF
    */

    const pdf =
      new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

    /*
      PAGE
    */

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    /*
      COLORS
    */

    const cyan =
      [0, 229, 255];

    const white =
      [255, 255, 255];

    const slate =
      [148, 163, 184];

    /*
      BACKGROUND
    */

    pdf.setFillColor(
      7,
      17,
      31
    );

    pdf.rect(
      0,
      0,
      pageWidth,
      pageHeight,
      "F"
    );

    /*
      LOGO
    */
    const logoWidth =72;
    const logoHeight =58;
    pdf.addImage(
      logo,
      "PNG",
      38,
      24,
      logoWidth,
      logoHeight
    );

    /*
      TITLE
    */

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(22);

    pdf.setTextColor(
      ...white
    );

    pdf.text(
      "VulnProbe Security Report",
      100,
      48
    );

    /*
      SUBTITLE
    */

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(9);

    pdf.setTextColor(
      ...slate
    );

    pdf.text(
      "Advanced Threat Intelligence & Vulnerability Analysis",
      100,
      66
    );

    /*
      DIVIDER
    */

    pdf.setDrawColor(
      ...cyan
    );

    pdf.line(
      35,
      92,
      pageWidth - 35,
      92
    );

    /*
      HEADER SECTION
    */

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(15);

    pdf.setTextColor(
      ...white
    );

    pdf.text(
      "Threat Intelligence Overview",
      35,
      128
    );

    /*
      INFO
    */

    const info = [
      [
        "Target",
        report.target,
      ],

      [
        "Severity",
        report.severity,
      ],

      [
        "Risk Score",
        String(
          report.riskScore
        ),
      ],

      [
        "Vulnerabilities",
        String(
          report.vulnerabilities
        ),
      ],

      [
        "Status",
        report.status,
      ],

      [
        "Generated",
        new Date(
          report.createdAt
        ).toLocaleString(),
      ],
    ];

    let y = 160;

    info.forEach(
      ([label, value]) => {

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(10);

        pdf.setTextColor(
          ...cyan
        );

        pdf.text(
          `${label}:`,
          40,
          y
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setTextColor(
          ...white
        );

        const split =
          pdf.splitTextToSize(
            value || "N/A",
            280
          );

        pdf.setFontSize(10);

        pdf.text(
          split,
          150,
          y
        );

        y +=
          split.length * 14 +
          10;
      }
    );

    /*
      FINDINGS HEADER
    */

    y += 18;

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(16);

    pdf.setTextColor(
      ...white
    );

    pdf.text(
      "Security Findings",
      35,
      y
    );

    y += 28;

    /*
      FINDINGS
    */

    if (
      findings.length > 0
    ) {

      findings.forEach(
        (finding) => {

          const title =
            finding.title ||
            "Finding";

          const severity =
            finding.severity ||
            "Low";

          const category =
            finding.category ||
            "General";

          const impactText =
            `Impact: ${
              finding.impact ||
              "N/A"
            }`;

          const recommendationText =
            `Recommendation: ${
              finding.recommendation ||
              "N/A"
            }`;

          /*
            TEXT SPLIT
          */

          const impact =
            pdf.splitTextToSize(
              impactText,
              450
            );

          const recommendation =
            pdf.splitTextToSize(
              recommendationText,
              450
            );

          const lineHeight = 11;

          const contentHeight =
            65 +
            (
              impact.length *
              lineHeight
            ) +
            (
              recommendation.length *
              lineHeight
            );

          /*
            PAGE BREAK
          */

          if (
            y + contentHeight >
            720
          ) {

            pdf.addPage();

            pdf.setFillColor(
              7,
              17,
              31
            );

            pdf.rect(
              0,
              0,
              pageWidth,
              pageHeight,
              "F"
            );

            y = 55;
          }

          /*
            TITLE
          */

          pdf.setFont(
            "helvetica",
            "bold"
          );

          pdf.setFontSize(12);

          pdf.setTextColor(
            ...white
          );

          pdf.text(
            title,
            40,
            y
          );

          /*
            SEVERITY
          */

          pdf.setFontSize(9);

          if (
            severity ===
            "Critical"
          ) {

            pdf.setTextColor(
              255,
              90,
              90
            );

          } else if (
            severity ===
            "High"
          ) {

            pdf.setTextColor(
              255,
              140,
              0
            );

          } else if (
            severity ===
            "Medium"
          ) {

            pdf.setTextColor(
              255,
              220,
              90
            );

          } else {

            pdf.setTextColor(
              ...cyan
            );
          }

          pdf.text(
            severity,
            455,
            y
          );

          /*
            CATEGORY
          */

          y += 16;

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(8);

          pdf.setTextColor(
            ...cyan
          );

          pdf.text(
            category,
            40,
            y
          );

          /*
            IMPACT
          */

          y += 18;

          pdf.setFontSize(9);

          pdf.setTextColor(
            ...white
          );

          pdf.text(
            impact,
            40,
            y
          );

          /*
            RECOMMENDATION
          */

          y +=
            (
              impact.length *
              lineHeight
            ) + 12;

          pdf.setTextColor(
            120,
            255,
            180
          );

          pdf.text(
            recommendation,
            40,
            y
          );

          /*
            DIVIDER
          */

          y +=
            (
              recommendation.length *
              lineHeight
            ) + 18;

          pdf.setDrawColor(
            35,
            55,
            75
          );

          pdf.line(
            35,
            y,
            pageWidth - 35,
            y
          );

          /*
            NEXT
          */

          y += 20;
        }
      );

    } else {

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(10);

      pdf.setTextColor(
        ...slate
      );

      pdf.text(
        "No findings detected.",
        40,
        y
      );

      y += 30;
    }

    /*
      TECHNOLOGIES
    */

    y += 10;

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(15);

    pdf.setTextColor(
      ...white
    );

    pdf.text(
      "Detected Technologies",
      35,
      y
    );

    y += 26;

    if (
      technologies.length > 0
    ) {

      technologies.forEach(
        (tech) => {

          pdf.setFillColor(
            0,
            229,
            255
          );

          pdf.circle(
            45,
            y - 3,
            1.5,
            "F"
          );

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(9);

          pdf.setTextColor(
            ...white
          );

          pdf.text(
            tech,
            58,
            y
          );

          y += 18;
        }
      );

    } else {

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(10);

      pdf.setTextColor(
        ...slate
      );

      pdf.text(
        "No technologies detected.",
        40,
        y
      );
    }

    /*
      FOOTER
    */

    pdf.setDrawColor(
      ...cyan
    );

    pdf.line(
      35,
      760,
      pageWidth - 35,
      760
    );

    pdf.setFontSize(8);

    pdf.setTextColor(
      ...slate
    );

    pdf.text(
      "Generated by VulnProbe Cyber Intelligence Platform",
      35,
      780
    );

    pdf.text(
      "Confidential Security Intelligence Report",
      pageWidth - 190,
      780
    );

    /*
      SAVE
    */

    pdf.save(
      `vulnprobe-${report._id}.pdf`
    );

  } catch (error) {

    console.log(error);
  }
};

export default exportReportPDF;