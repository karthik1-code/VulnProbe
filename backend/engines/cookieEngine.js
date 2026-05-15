const analyzeCookies =
  (headers) => {
    const findings = [];

    let riskScore = 0;

    /*
      GET COOKIES
    */

    const cookies =
      headers[
        "set-cookie"
      ] || [];

    /*
      NO COOKIES
    */

    if (
      cookies.length === 0
    ) {
      return {
        findings,
        riskScore,
      };
    }

    /*
      ANALYZE COOKIES
    */

    cookies.forEach(
      (cookie) => {
        /*
          SECURE FLAG
        */

        if (
          !cookie.includes(
            "Secure"
          )
        ) {
          findings.push(
            "Cookie missing Secure flag"
          );

          riskScore += 2;
        }

        /*
          HTTPONLY
        */

        if (
          !cookie.includes(
            "HttpOnly"
          )
        ) {
          findings.push(
            "Cookie missing HttpOnly flag"
          );

          riskScore += 2;
        }

        /*
          SAMESITE
        */

        if (
          !cookie.includes(
            "SameSite"
          )
        ) {
          findings.push(
            "Cookie missing SameSite policy"
          );

          riskScore += 1.5;
        }
      }
    );

    return {
      findings,
      riskScore,
    };
  };

module.exports = {
  analyzeCookies,
};