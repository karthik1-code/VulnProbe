/*
  HEADER ENGINE
*/

const analyzeHeaders =
  (headers = {}) => {
    const findings = [];

    let riskScore = 0;

    /*
      CSP
    */

    if (
      !headers[
        "content-security-policy"
      ]
    ) {
      findings.push({
        title:
          "Missing Content Security Policy",

        severity:
          "Medium",

        category:
          "Security Headers",

        impact:
          "Application may become vulnerable to XSS attacks.",

        recommendation:
          "Implement strict CSP headers.",

        status:
          "Detected",
      });

      riskScore += 2;
    }

    /*
      X FRAME
    */

    if (
      !headers[
        "x-frame-options"
      ]
    ) {
      findings.push({
        title:
          "Missing X-Frame-Options",

        severity:
          "Medium",

        category:
          "Clickjacking Protection",

        impact:
          "Application may be embedded into malicious iframes.",

        recommendation:
          "Set X-Frame-Options header.",

        status:
          "Detected",
      });

      riskScore += 2;
    }

    /*
      CONTENT TYPE
    */

    if (
      !headers[
        "x-content-type-options"
      ]
    ) {
      findings.push({
        title:
          "Missing X-Content-Type-Options",

        severity:
          "Low",

        category:
          "MIME Security",

        impact:
          "MIME sniffing attacks may become possible.",

        recommendation:
          "Use nosniff header.",

        status:
          "Detected",
      });

      riskScore += 1;
    }

    return {
      findings,

      riskScore,
    };
  };

module.exports = {
  analyzeHeaders,
};