const analyzeSSL =
  (target, headers) => {
    const findings = [];

    let riskScore = 0;

    /*
      HTTPS CHECK
    */

    if (
      target.startsWith(
        "http://"
      )
    ) {
      findings.push(
        "Target does not use HTTPS encryption"
      );

      riskScore += 3;
    }

    /*
      HSTS CHECK
    */

    if (
      !headers[
        "strict-transport-security"
      ]
    ) {
      findings.push(
        "Missing Strict-Transport-Security header"
      );

      riskScore += 2;
    }

    /*
      HTTPS SUCCESS
    */

    if (
      target.startsWith(
        "https://"
      )
    ) {
      findings.push(
        "HTTPS encryption detected"
      );
    }

    return {
      findings,

      riskScore,
    };
  };

module.exports = {
  analyzeSSL,
};