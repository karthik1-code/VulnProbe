    const axios =
  require("axios");

const analyzeSitemap =
  async (target) => {
    const findings = [];

    let riskScore = 0;

    try {
      /*
        FETCH SITEMAP
      */

      const response =
        await axios.get(
          `${target}/sitemap.xml`,

          {
            timeout: 3000,
          }
        );

      /*
        EXISTS
      */

      if (
        response.status === 200
      ) {
        findings.push(
          "Sitemap.xml discovered"
        );
      }

      /*
        ADMIN PATHS
      */

      const content =
        response.data;

      if (
        content.includes(
          "admin"
        )
      ) {
        findings.push(
          "Sitemap may expose admin paths"
        );

        riskScore += 2;
      }
    } catch (error) {
      findings.push(
        "Sitemap.xml not accessible"
      );
    }

    return {
      findings,

      riskScore,
    };
  };

module.exports = {
  analyzeSitemap,
};