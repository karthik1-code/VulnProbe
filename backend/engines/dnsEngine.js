const dns =
  require("dns").promises;

const {
  URL,
} = require("url");

/*
  ANALYZE DNS
*/

const analyzeDNS =
  async (target) => {
    const findings = [];

    let riskScore = 0;

    const infrastructure =
      [];

    try {
      /*
        PARSE HOSTNAME
      */

      const hostname =
        new URL(
          target
        ).hostname;

      /*
        RESOLVE IP
      */

      const result =
        await dns.lookup(
          hostname
        );

      const ip =
        result.address;

      infrastructure.push(
        `Resolved IP: ${ip}`
      );

      /*
        LOCALHOST CHECK
      */

      if (
        ip.startsWith(
          "127."
        ) ||

        ip ===
          "0.0.0.0"
      ) {
        findings.push(
          "Target resolves to localhost/internal address"
        );

        riskScore += 3;
      }

      /*
        CLOUDFLARE
      */

      if (
        hostname.includes(
          "cloudflare"
        )
      ) {
        infrastructure.push(
          "Cloudflare CDN detected"
        );
      }

      /*
        AWS
      */

      if (
        hostname.includes(
          "amazonaws"
        )
      ) {
        infrastructure.push(
          "AWS infrastructure detected"
        );
      }

      /*
        AZURE
      */

      if (
        hostname.includes(
          "azure"
        )
      ) {
        infrastructure.push(
          "Microsoft Azure infrastructure detected"
        );
      }

      /*
        VERCEL
      */

      if (
        hostname.includes(
          "vercel"
        )
      ) {
        infrastructure.push(
          "Vercel hosting detected"
        );
      }
    } catch (error) {
      findings.push(
        "Unable to resolve DNS information"
      );

      riskScore += 1;
    }

    return {
      findings,

      riskScore,

      infrastructure,
    };
  };

module.exports = {
  analyzeDNS,
};