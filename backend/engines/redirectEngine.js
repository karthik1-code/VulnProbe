const axios =
  require("axios");

/*
  ANALYZE REDIRECTS
*/

const analyzeRedirects =
  async (target) => {
    const findings = [];

    let riskScore = 0;

    const redirects = [];

    try {
      /*
        REQUEST
      */

      const response =
        await axios.get(
          target,

          {
            maxRedirects: 5,

            validateStatus:
              () => true,

            timeout: 5000,
          }
        );

      /*
        FINAL URL
      */

      const finalUrl =
        response.request
          ?.res
          ?.responseUrl;

      /*
        REDIRECT DETECTED
      */

      if (
        finalUrl &&
        finalUrl !== target
      ) {
        redirects.push(
          `${target} → ${finalUrl}`
        );

        findings.push(
          "Redirect chain detected"
        );
      }

      /*
        HTTP TO HTTPS
      */

      if (
        target.startsWith(
          "http://"
        ) &&

        finalUrl?.startsWith(
          "https://"
        )
      ) {
        findings.push(
          "HTTP upgraded to HTTPS"
        );
      }

      /*
        STILL HTTP
      */

      if (
        finalUrl?.startsWith(
          "http://"
        )
      ) {
        findings.push(
          "Final destination still uses HTTP"
        );

        riskScore += 2;
      }
    } catch (error) {
      findings.push(
        "Unable to analyze redirects"
      );
    }

    return {
      findings,

      riskScore,

      redirects,
    };
  };

module.exports = {
  analyzeRedirects,
};