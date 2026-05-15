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

const {
  analyzeHeaders,
} = require(
  "../engines/headerEngine"
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
            timeout: 10000,

            maxRedirects: 5,

            validateStatus:
              () => true,
          }
        );

      /*
        HEADERS + HTML
      */

      const headers =
        response.headers || {};

      const html =
        response.data || "";

      /*
        STORAGE
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
        "SSL Inspection"
      );

      methods.push(
        "Technology Fingerprinting"
      );

      methods.push(
        "Header Security Analysis"
      );

      methods.push(
        "Reconnaissance Discovery"
      );

      /*
        SSL ANALYSIS
      */

      const sslAnalysis =
        analyzeSSL(
          target,
          headers
        );

      if (
        sslAnalysis?.findings
          ?.length > 0
      ) {
        sslAnalysis.findings.forEach(
          (
            finding
          ) => {
            findings.push({
              title:
                typeof finding ===
                "string"
                  ? finding
                  : finding.title,

              severity:
                finding.severity ||
                "Medium",

              category:
                finding.category ||
                "SSL Security",

              impact:
                finding.impact ||
                "Weak SSL/TLS posture may expose encrypted traffic.",

              recommendation:
                finding.recommendation ||
                "Upgrade SSL/TLS configuration.",

              status:
                finding.status ||
                "Detected",
            });
          }
        );
      }

      riskScore +=
        sslAnalysis?.riskScore ||
        0;

      /*
        HEADER ANALYSIS
      */

      const headerAnalysis =
        analyzeHeaders(
          headers
        );

      findings.push(
        ...(
          headerAnalysis?.findings ||
          []
        )
      );

      riskScore +=
        headerAnalysis?.riskScore ||
        0;

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
        HTTPS CHECK
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
            "Traffic may be intercepted during transmission.",

          recommendation:
            "Force HTTPS with strong TLS configuration.",

          status:
            "Detected",
        });

        riskScore += 3;
      }

      /*
        ROBOTS.TXT
      */

      try {
        const robots =
          await axios.get(
            `${target}/robots.txt`
          );

        if (
          robots.status ===
          200
        ) {
          infrastructure.push(
            "robots.txt detected"
          );

          findings.push({
            title:
              "robots.txt Exposed",

            severity:
              "Low",

            category:
              "Reconnaissance",

            impact:
              "Attackers may gather intelligence from robots.txt.",

            recommendation:
              "Avoid exposing sensitive paths.",

            status:
              "Detected",
          });

          riskScore += 1;
        }
      } catch {}

      /*
        SITEMAP
      */

      try {
        const sitemap =
          await axios.get(
            `${target}/sitemap.xml`
          );

        if (
          sitemap.status ===
          200
        ) {
          infrastructure.push(
            "sitemap.xml detected"
          );

          findings.push({
            title:
              "Public Sitemap Detected",

            severity:
              "Low",

            category:
              "Reconnaissance",

            impact:
              "Public sitemaps may expose internal structure.",

            recommendation:
              "Review sitemap exposure carefully.",

            status:
              "Detected",
          });

          riskScore += 1;
        }
      } catch {}

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
        EMPTY FINDINGS
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
            "No major passive vulnerabilities were identified.",

          recommendation:
            "Continue periodic monitoring.",

          status:
            "Secure",
        });
      }

      /*
        FINAL SEVERITY
      */

      let severity =
        "Low";

      if (riskScore >= 12) {
        severity =
          "Critical";
      } else if (
        riskScore >= 8
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
        KEEP ONLY 5 REPORTS
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

        riskScore,

        severity,

        vulnerabilities,

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