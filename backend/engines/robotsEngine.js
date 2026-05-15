const axios =
  require("axios");

const analyzeRobots =
  async (target) => {
    const findings = [];

    let riskScore = 0;

    try {
      /*
        ROBOTS URL
      */

      const robotsUrl =
        `${target}/robots.txt`;

      /*
        FETCH ROBOTS
      */

      const response =
        await axios.get(
          robotsUrl,

          {
            timeout: 3000,
          }
        );

      const content =
        response.data;

      /*
        ADMIN PATHS
      */

      if (
        content.includes(
          "admin"
        )
      ) {
        findings.push(
          "robots.txt exposes admin-related paths"
        );

        riskScore += 2;
      }

      /*
        DISALLOWED PATHS
      */

      if (
        content.includes(
          "Disallow"
        )
      ) {
        findings.push(
          "robots.txt contains disallowed sensitive paths"
        );

        riskScore += 1.5;
      }

      /*
        SITEMAP
      */

      if (
        content.includes(
          "Sitemap"
        )
      ) {
        findings.push(
          "Sitemap reference discovered"
        );
      }
    } catch (error) {
      findings.push(
        "robots.txt not accessible"
      );
    }

    return {
      findings,

      riskScore,
    };
  };

module.exports = {
  analyzeRobots,
};