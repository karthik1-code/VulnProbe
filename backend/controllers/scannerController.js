const axios =
  require("axios");

const Report =
  require("../models/Report");

const {
  analyzeSSL,
} = require(
  "../engines/sslEngine"
);

const {
  analyzeFingerprint,
} = require(
  "../engines/fingerprintEngine"
);

/*
  RUN SCAN
*/

const runScan =
  async (req, res) => {
    try {
      /*
        START TIME
      */

      const startTime =
        Date.now();

      /*
        TARGET
      */

      const { target } =
        req.body;

      /*
        VALIDATION
      */

      if (!target) {
        return res
          .status(400)
          .json({
            message:
              "Target URL required",
          });
      }

      /*
        FETCH TARGET
      */

      const response =
        await axios.get(
          target,

          {
            timeout: 8000,
          }
        );

      /*
        HEADERS + HTML
      */

      const headers =
        response.headers;

      const html =
        response.data;

      /*
        MASTER DATA
      */

      const findings = [];

      const methods = [];

      const infrastructure =
        [];

      const redirects = [];

      let riskScore = 0;

      /*
        METHODS
      */

      methods.push(
        "Passive Reconnaissance"
      );

      methods.push(
        "Security Header Analysis"
      );

      methods.push(
        "SSL Inspection"
      );

      methods.push(
        "Technology Fingerprinting"
      );

      /*
        SSL ANALYSIS
      */

      const sslAnalysis =
        analyzeSSL(
          target,
          headers
        );

      /*
        SSL FINDINGS
      */

      if (
        sslAnalysis.findings
          ?.length > 0
      ) {
        sslAnalysis.findings.forEach(
          (
            finding
          ) => {
            findings.push({
              title:
                finding,

              severity:
                "Medium",

              category:
                "SSL Security",

              impact:
                "Weak SSL/TLS posture may expose encrypted traffic to interception risks.",

              recommendation:
                "Upgrade SSL/TLS configuration and use secure certificates.",

              status:
                "Detected",
            });
          }
        );
      }

      riskScore +=
        sslAnalysis.riskScore;

      /*
        TECHNOLOGIES
      */

      const technologies =
        analyzeFingerprint(
          headers,
          html
        ) || [];

      /*
        INFRASTRUCTURE
      */

      if (
        headers.server
      ) {
        infrastructure.push(
          `Server: ${headers.server}`
        );
      }

      if (
        headers[
          "x-powered-by"
        ]
      ) {
        infrastructure.push(
          `Powered By: ${
            headers[
              "x-powered-by"
            ]
          }`
        );
      }

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
            "Application may be vulnerable to Cross-Site Scripting (XSS) attacks.",

          recommendation:
            "Implement strict Content-Security-Policy directives.",

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
            "Attackers may embed the application inside malicious iframes.",

          recommendation:
            "Set X-Frame-Options to DENY or SAMEORIGIN.",

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
            "Browser MIME-sniffing attacks may become possible.",

          recommendation:
            "Set X-Content-Type-Options to nosniff.",

          status:
            "Detected",
        });

        riskScore += 1.5;
      }

      /*
        REFERRER
      */

      if (
        !headers[
          "referrer-policy"
        ]
      ) {
        findings.push({
          title:
            "Missing Referrer Policy",

          severity:
            "Low",

          category:
            "Privacy Protection",

          impact:
            "Sensitive referral information may leak externally.",

          recommendation:
            "Define a strict Referrer-Policy header.",

          status:
            "Detected",
        });

        riskScore += 1.5;
      }

      /*
        HTTPS
      */

      if (
        target.startsWith(
          "http://"
        )
      ) {
        findings.push({
          title:
            "Target Does Not Use HTTPS",

          severity:
            "High",

          category:
            "Transport Security",

          impact:
            "Traffic may be intercepted or modified during transmission.",

          recommendation:
            "Force HTTPS with valid TLS configuration.",

          status:
            "Detected",
        });

        riskScore += 2;
      }

      /*
        REDIRECTS
      */

      if (
        response.request?.res
          ?.responseUrl &&
        response.request.res
          .responseUrl !==
          target
      ) {
        redirects.push(
          response.request.res
            .responseUrl
        );
      }

      /*
        FALLBACK
      */

      if (
        findings.length === 0
      ) {
        findings.push({
          title:
            "No Major Passive Vulnerabilities Detected",

          severity:
            "Low",

          category:
            "Passive Reconnaissance",

          impact:
            "No major passive vulnerabilities were identified during this scan.",

          recommendation:
            "Continue periodic monitoring and active security testing.",

          status:
            "Secure",
        });
      }

      /*
        FINAL SEVERITY
      */

      let severity =
        "Low";

      if (riskScore >= 8) {
        severity =
          "Critical";
      } else if (
        riskScore >= 6
      ) {
        severity =
          "High";
      } else if (
        riskScore >= 4
      ) {
        severity =
          "Medium";
      }

      /*
        STATUS
      */

      let status =
        "Resolved";

      if (
        severity ===
        "Critical"
      ) {
        status =
          "Pending";
      } else if (
        severity ===
        "High"
      ) {
        status =
          "Monitoring";
      }

      /*
        TOTAL VULNS
      */

      const vulnerabilities =
        findings.length;

      /*
        SCAN TIME
      */

      const endTime =
        Date.now();

      const scanTime = `${
        endTime - startTime
      }ms`;

      /*
        CREATE REPORT
      */

      const report =
        await Report.create({
          user:
            req.user._id,

          target,

          severity,

          riskScore,

          vulnerabilities,

          status,

          findings,

          technologies,

          methods,

          infrastructure,

          redirects,

          scanTime,
        });

      /*
        KEEP ONLY 5
      */

      const userReports =
        await Report.find({
          user:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      if (
        userReports.length > 5
      ) {
        const oldReports =
          userReports.slice(5);

        for (const report of oldReports) {
          await Report.findByIdAndDelete(
            report._id
          );
        }
      }

      /*
        RESPONSE
      */

      res.status(201).json({
        message:
          "Advanced intelligence scan completed",

        report,

        findings,

        technologies,

        methods,

        infrastructure,

        redirects,

        scanTime,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Unable to scan target",
      });
    }
  };

/*
  GET REPORTS
*/

const getReports =
  async (req, res) => {
    try {
      const reports =
        await Report.find({
          user:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json(reports);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  runScan,

  getReports,
};