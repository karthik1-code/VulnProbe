const axios =
  require("axios");

/*
  ANALYZE HTTP METHODS
*/

const analyzeMethods =
  async (target) => {
    const findings = [];

    let riskScore = 0;

    const methods = [];

    try {
      /*
        OPTIONS REQUEST
      */

      const response =
        await axios.options(
          target,

          {
            timeout: 3000,
          }
        );

      /*
        ALLOW HEADER
      */

      const allow =
        response.headers.allow ||
        "";

      /*
        METHOD LIST
      */

      const allowedMethods =
        allow
          .split(",")

          .map((method) =>
            method.trim()
          );

      methods.push(
        ...allowedMethods
      );

      /*
        TRACE
      */

      if (
        allowedMethods.includes(
          "TRACE"
        )
      ) {
        findings.push(
          "TRACE method enabled"
        );

        riskScore += 3;
      }

      /*
        PUT
      */

      if (
        allowedMethods.includes(
          "PUT"
        )
      ) {
        findings.push(
          "PUT method enabled"
        );

        riskScore += 2;
      }

      /*
        DELETE
      */

      if (
        allowedMethods.includes(
          "DELETE"
        )
      ) {
        findings.push(
          "DELETE method enabled"
        );

        riskScore += 2;
      }

      /*
        OPTIONS
      */

      if (
        allowedMethods.includes(
          "OPTIONS"
        )
      ) {
        findings.push(
          "OPTIONS method exposed"
        );
      }
    } catch (error) {
      findings.push(
        "Unable to analyze HTTP methods"
      );
    }

    return {
      findings,

      riskScore,

      methods,
    };
  };

module.exports = {
  analyzeMethods,
};