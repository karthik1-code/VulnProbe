const analyzeAnomalies =
  (
    headers,
    responseTime
  ) => {
    const findings = [];

    let riskScore = 0;

    /*
      SLOW RESPONSE
    */

    if (
      responseTime > 4000
    ) {
      findings.push(
        "Slow server response detected"
      );

      riskScore += 1.5;
    }

    /*
      SERVER HEADER EXPOSURE
    */

    if (
      headers.server
    ) {
      findings.push(
        `Server header exposed: ${headers.server}`
      );

      riskScore += 1;
    }

    /*
      POWERED BY EXPOSURE
    */

    if (
      headers[
        "x-powered-by"
      ]
    ) {
      findings.push(
        `X-Powered-By exposed: ${headers["x-powered-by"]}`
      );

      riskScore += 1;
    }

    return {
      findings,

      riskScore,
    };
  };

module.exports = {
  analyzeAnomalies,
};