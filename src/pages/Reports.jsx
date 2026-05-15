import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import ReportsSummary from "../components/reports/ReportsSummary";

import ReportsTable from "../components/reports/ReportsTable";

function Reports() {
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
            REQUEST
          */

          const response =
            await axios.get(
              "http://localhost:5000/api/reports",

              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setReports(
            response.data
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
    TOTALS
  */

  const totalReports =
    reports.length;

  const totalVulnerabilities =
    reports.reduce(
      (acc, report) =>
        acc +
        report.vulnerabilities,

      0
    );

  const criticalReports =
    reports.filter(
      (report) =>
        report.severity ===
        "Critical"
    ).length;

  return (
    <div
      className="
        relative

        min-h-screen

        overflow-hidden
      "
    >
      {/* Ambient Glow */}

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

      {/* Content */}

      <div
        className="
          relative
          z-10

          px-12
          py-10
        "
      >
        {/* Header */}

        <div className="mb-10">
          <p
            className="
              text-sm

              tracking-[0.25em]

              text-cyan-300
            "
          >
            SECURITY REPORTS
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
            Report
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
              Archive
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
            Store, inspect, export,
            and manage vulnerability
            scan reports across all
            analyzed targets.
          </p>
        </div>

        {/* SUMMARY */}

        <ReportsSummary
          totalReports={
            totalReports
          }

          totalVulnerabilities={
            totalVulnerabilities
          }

          criticalReports={
            criticalReports
          }

          loading={loading}
        />

        {/* TABLE */}

        <div className="mt-8">
          <ReportsTable
            reports={reports}

            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;