const axios =
  require("axios");

const analyzeSecurityTxt =
  async (target) => {
    const findings = [];

    let riskScore = 0;

    try {
      /*
        SECURITY.TXT
      */

      const response =
        await axios.get(
          `${target}/.well-known/security.txt`,

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
          "security.txt file detected"
        );
      }
    } catch (error) {
      findings.push(
        "security.txt not found"
      );

      riskScore += 1;
    }

    return {
      findings,

      riskScore,
    };
  };

module.exports = {
  analyzeSecurityTxt,
};