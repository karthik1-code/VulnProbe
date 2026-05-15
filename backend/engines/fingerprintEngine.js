const analyzeFingerprint =
  (
    headers,
    html
  ) => {
    const technologies =
      [];

    /*
      SERVER HEADER
    */

    const server =
      headers.server || "";

    const poweredBy =
      headers[
        "x-powered-by"
      ] || "";

    /*
      NGINX
    */

    if (
      server
        .toLowerCase()
        .includes("nginx")
    ) {
      technologies.push(
        "Nginx"
      );
    }

    /*
      APACHE
    */

    if (
      server
        .toLowerCase()
        .includes("apache")
    ) {
      technologies.push(
        "Apache"
      );
    }

    /*
      CLOUDFLARE
    */

    if (
      server
        .toLowerCase()
        .includes(
          "cloudflare"
        )
    ) {
      technologies.push(
        "Cloudflare"
      );
    }

    /*
      EXPRESS
    */

    if (
      poweredBy
        .toLowerCase()
        .includes("express")
    ) {
      technologies.push(
        "Express.js"
      );
    }

    /*
      PHP
    */

    if (
      poweredBy
        .toLowerCase()
        .includes("php")
    ) {
      technologies.push(
        "PHP"
      );
    }

    /*
      REACT
    */

    if (
      html
        .toLowerCase()
        .includes("_react")
    ) {
      technologies.push(
        "React"
      );
    }

    /*
      NEXT JS
    */

    if (
      html
        .toLowerCase()
        .includes("_next")
    ) {
      technologies.push(
        "Next.js"
      );
    }

    /*
      WORDPRESS
    */

    if (
      html
        .toLowerCase()
        .includes(
          "wp-content"
        )
    ) {
      technologies.push(
        "WordPress"
      );
    }

    /*
      VUE
    */

    if (
      html
        .toLowerCase()
        .includes("vue")
    ) {
      technologies.push(
        "Vue.js"
      );
    }

    /*
      ANGULAR
    */

    if (
      html
        .toLowerCase()
        .includes("ng-version")
    ) {
      technologies.push(
        "Angular"
      );
    }

    /*
      REMOVE DUPLICATES
    */

    return [
      ...new Set(
        technologies
      ),
    ];
  };

module.exports = {
  analyzeFingerprint,
};