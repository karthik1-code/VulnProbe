import {
  useEffect,
  useState,
} from "react";


import api from "../services/api";

import SummaryCards from "../components/dashboard/SummaryCards";

import SeverityPieChart from "../components/dashboard/SeverityPieChart";

import ThreatLineChart from "../components/dashboard/ThreatLineChart";

import VulnerabilityTable from "../components/dashboard/VulnerabilityTable";

function Dashboard() {
  /*
    STATES
  */

  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /*
    FETCH REPORTS
  */

  useEffect(() => {
    const fetchReports =
      async () => {
        try {
          /*
            TOKEN
          */

          const token =
            localStorage.getItem(
              "token"
            );

          /*
            API
          */

          const response =
            await api.get(
              "/reports",

              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          /*
            STORE
          */

          const reportsData =
            Array.isArray(
              response.data
            )
              ? response.data
              : [];

          setReports(
            reportsData
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchReports();
  }, []);

  /*
    ALL FINDINGS
  */

  const allFindings =
    reports.flatMap(
      (report) =>
        report.findings || []
    );

  /*
    TOTAL SCANS
  */

  const totalScans =
    reports.length;

  /*
    TOTAL VULNERABILITIES
  */

  const totalVulnerabilities =
    allFindings.length;

  /*
    CRITICAL COUNT
  */

  const criticalCount =
    allFindings.filter(
      (finding) =>
        finding.severity ===
        "Critical"
    ).length;

  /*
    AVERAGE RISK
  */

  const averageRisk =
    reports.length > 0
      ? (
          reports.reduce(
            (
              acc,
              report
            ) =>
              acc +
              Number(
                report.riskScore || 0
              ),

            0
          ) / reports.length
        ).toFixed(1)
      : "0";

  return (
    <div
      className="
        relative

        min-h-screen

        overflow-hidden
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          top-[-220px]
          right-[-140px]

          h-[550px]
          w-[550px]

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-240px]
          left-[-140px]

          h-[500px]
          w-[500px]

          rounded-full

          bg-emerald-400/10

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10

          px-12
          py-10
        "
      >
        {/* HEADER */}

        <div className="mb-10">
          <p
            className="
              text-sm

              tracking-[0.25em]

              text-cyan-300
            "
          >
            SECURITY INTELLIGENCE
          </p>

          <h1
            className="
              mt-4

              text-[58px]
              font-semibold

              leading-none

              text-white
            "
          >
            Threat
            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                to-cyan-500

                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Dashboard
            </span>
          </h1>

          <p
            className="
              mt-5

              max-w-[760px]

              text-lg

              leading-relaxed

              text-slate-400
            "
          >
            Monitor vulnerabilities,
            analyze threat severity,
            inspect affected endpoints,
            and track cyber-security
            intelligence in real-time.
          </p>
        </div>

        {/* SUMMARY */}

        <SummaryCards
          reports={reports}
          loading={loading}
        />

        {/* CHARTS */}

        <div
          className="
            mt-8

            grid
            grid-cols-[0.85fr_1.15fr]

            gap-8
          "
        >
          <SeverityPieChart
            reports={reports}
          />

          <ThreatLineChart
            reports={reports}
          />
        </div>

        {/* TABLE */}

        <div className="mt-8">
          <VulnerabilityTable
            reports={reports}

            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;