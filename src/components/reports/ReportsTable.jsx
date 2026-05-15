import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import exportReportPDF from "../../utils/exportReportPDF";

import ReportModal from "./ReportModal";

import {
  Eye,
  Download,
  ShieldAlert,
} from "lucide-react";

function ReportsTable({
  reports = [],

  loading = false,
}) {
  /*
    MODAL STATE
  */

  const [
    selectedReport,
    setSelectedReport,
  ] = useState(null);

  /*
    SEVERITY STYLES
  */

  const riskStyles = {
    Critical:
      "text-red-400 bg-red-500/10 border-red-500/20",

    High:
      "text-orange-400 bg-orange-500/10 border-orange-500/20",

    Medium:
      "text-yellow-300 bg-yellow-500/10 border-yellow-500/20",

    Low:
      "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
  };

  /*
    STATUS STYLES
  */

  const statusStyles = {
    Resolved: {
      dot:
        "bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]",

      text:
        "text-emerald-300",
    },

    Pending: {
      dot:
        "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]",

      text:
        "text-red-300",
    },

    Monitoring: {
      dot:
        "bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.9)]",

      text:
        "text-yellow-200",
    },
  };

  /*
    TOTAL FINDINGS
  */

  const totalFindings =
    reports.reduce(
      (
        total,
        report
      ) =>
        total +
        (report.findings
          ?.length || 0),

      0
    );

  return (
    <>
      {/* MODAL */}

      {selectedReport && (
        <ReportModal
          report={
            selectedReport
          }
          onClose={() =>
            setSelectedReport(
              null
            )
          }
        />
      )}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        className="
          relative

          overflow-hidden

          rounded-[30px]

          border
          border-cyan-400/10

          bg-[#07111f]/80

          p-6

          backdrop-blur-2xl

          shadow-[0_0_40px_rgba(0,229,255,0.06)]
        "
      >
        {/* GLOW */}

        <div
          className="
            absolute
            bottom-[-120px]
            right-[-80px]

            h-[240px]
            w-[240px]

            rounded-full

            bg-cyan-400/10

            blur-3xl
          "
        />

        {/* HEADER */}

        <div
          className="
            relative
            z-10

            flex
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-xs

                tracking-[0.25em]

                text-cyan-300
              "
            >
              REPORT ARCHIVE
            </p>

            <h2
              className="
                mt-2

                text-2xl
                font-semibold

                text-white
              "
            >
              Generated Reports
            </h2>
          </div>

          {/* FINDING COUNT */}

          <div
            className="
              flex
              items-center
              gap-3

              rounded-2xl

              border
              border-cyan-400/10

              bg-cyan-400/10

              px-4
              py-3
            "
          >
            <ShieldAlert
              size={18}
              className="
                text-cyan-300
              "
            />

            <span
              className="
                text-sm

                text-cyan-200
              "
            >
              {totalFindings}{" "}
              Findings
            </span>
          </div>
        </div>

        {/* TABLE */}

        <div
          className="
            relative
            z-10

            mt-8

            overflow-x-auto

            rounded-2xl

            border
            border-cyan-400/10
          "
        >
          <table className="w-full min-w-[1250px]">
            {/* HEAD */}

            <thead
              className="
                bg-white/[0.03]

                text-left
              "
            >
              <tr>
                {[
                  "TARGET",

                  "SEVERITY",

                  "RISK SCORE",

                  "FINDINGS",

                  "TOP FINDING",

                  "GENERATED",

                  "STATUS",

                  "ACTIONS",
                ].map((item) => (
                  <th
                    key={item}
                    className="
                      px-6
                      py-4

                      text-xs
                      font-medium

                      tracking-[0.15em]

                      text-slate-500
                    "
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="
                      px-6
                      py-10

                      text-center

                      text-slate-500
                    "
                  >
                    Loading reports...
                  </td>
                </tr>
              ) : reports.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="
                      px-6
                      py-10

                      text-center

                      text-slate-500
                    "
                  >
                    No reports found.
                  </td>
                </tr>
              ) : (
                reports.map(
                  (
                    report,
                    index
                  ) => {
                    /*
                      TOP FINDING
                    */

                    const topFinding =
                      report
                        .findings?.[0];

                    return (
                      <motion.tr
                        key={
                          report._id
                        }
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay:
                            index *
                            0.05,
                        }}
                        className="
                          border-t
                          border-cyan-400/5

                          transition-all
                          duration-300

                          hover:bg-white/[0.02]
                        "
                      >
                        {/* TARGET */}

                        <td
                          className="
                            max-w-[300px]

                            px-6
                            py-5

                            font-medium

                            text-white
                          "
                        >
                          <p
                            className="
                              break-all

                              leading-relaxed
                            "
                          >
                            {
                              report.target
                            }
                          </p>
                        </td>

                        {/* SEVERITY */}

                        <td className="px-6 py-5">
                          <span
                            className={`
                              rounded-full

                              border

                              px-3
                              py-1

                              text-xs
                              font-medium

                              ${
                                riskStyles[
                                  report
                                    .severity
                                ]
                              }
                            `}
                          >
                            {
                              report.severity
                            }
                          </span>
                        </td>

                        {/* RISK */}

                        <td
                          className="
                            px-6
                            py-5

                            text-cyan-300
                          "
                        >
                          {
                            report.riskScore
                          }
                        </td>

                        {/* FINDINGS */}

                        <td
                          className="
                            px-6
                            py-5

                            text-slate-300
                          "
                        >
                          {
                            report.findings
                              ?.length
                          }
                        </td>

                        {/* TOP FINDING */}

                        <td
                          className="
                            max-w-[320px]

                            px-6
                            py-5
                          "
                        >
                          {topFinding ? (
                            <div>
                              <p
                                className="
                                  text-sm
                                  font-medium

                                  text-white
                                "
                              >
                                {
                                  topFinding.title
                                }
                              </p>

                              <p
                                className="
                                  mt-1

                                  text-xs

                                  text-slate-500
                                "
                              >
                                {
                                  topFinding.category
                                }
                              </p>
                            </div>
                          ) : (
                            <p
                              className="
                                text-slate-500
                              "
                            >
                              No findings
                            </p>
                          )}
                        </td>

                        {/* GENERATED */}

                        <td
                          className="
                            px-6
                            py-5

                            text-slate-400
                          "
                        >
                          {new Date(
                            report.createdAt
                          ).toLocaleString()}
                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">
                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >
                            <div
                              className={`
                                h-2.5
                                w-2.5

                                rounded-full

                                ${
                                  statusStyles[
                                    report
                                      .status
                                  ]
                                    ?.dot
                                }
                              `}
                            />

                            <span
                              className={`
                                text-sm

                                ${
                                  statusStyles[
                                    report
                                      .status
                                  ]
                                    ?.text
                                }
                              `}
                            >
                              {
                                report.status
                              }
                            </span>
                          </div>
                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-5">
                          <div
                            className="
                              flex
                              items-center

                              gap-3

                              min-w-[120px]
                            "
                          >
                            {/* VIEW */}

                            <button
                              onClick={() =>
                                setSelectedReport(
                                  report
                                )
                              }
                              className="
                                flex
                                h-11
                                w-11

                                items-center
                                justify-center

                                rounded-xl

                                border
                                border-cyan-400/10

                                bg-white/[0.03]

                                text-cyan-300

                                transition-all
                                duration-300

                                hover:bg-cyan-400/10
                              "
                            >
                              <Eye
                                size={18}
                              />
                            </button>

                            {/* PDF */}

                            <button
                              onClick={() =>
                                exportReportPDF(
                                  report
                                )
                              }
                              className="
                                flex
                                h-11
                                w-11

                                items-center
                                justify-center

                                rounded-xl

                                border
                                border-cyan-400/10

                                bg-white/[0.03]

                                text-cyan-300

                                transition-all
                                duration-300

                                hover:bg-cyan-400/10
                              "
                            >
                              <Download
                                size={18}
                              />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}

export default ReportsTable;