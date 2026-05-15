import { motion } from "framer-motion";

import {
  X,
  ShieldAlert,
  Server,
  Clock3,
  Cpu,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

function ReportModal({
  report,

  onClose,
}) {
  if (!report) return null;

  /*
    SEVERITY COLORS
  */

  const severityStyles = {
    Critical:
      "border-red-500/20 bg-red-500/10 text-red-300",

    High:
      "border-orange-500/20 bg-orange-500/10 text-orange-300",

    Medium:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-200",

    Low:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/70

        p-6

        backdrop-blur-md
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="
          relative

          max-h-[92vh]
          w-full
          max-w-6xl

          overflow-y-auto

          rounded-[32px]

          border
          border-cyan-400/10

          bg-[#07111f]

          p-8

          shadow-[0_0_60px_rgba(0,229,255,0.08)]
        "
      >
        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            absolute
            right-6
            top-6

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-xl

            border
            border-cyan-400/10

            bg-white/[0.03]

            text-slate-300

            transition-all
            duration-300

            hover:bg-cyan-400/10
          "
        >
          <X size={18} />
        </button>

        {/* HEADER */}

        <div>
          <p
            className="
              text-xs

              tracking-[0.3em]

              text-cyan-300
            "
          >
            THREAT INTELLIGENCE REPORT
          </p>

          <h1
            className="
              mt-4

              break-all

              text-4xl
              font-semibold

              text-white
            "
          >
            {report.target}
          </h1>

          <div
            className="
              mt-5

              flex
              flex-wrap

              gap-3
            "
          >
            <span
              className={`
                rounded-full

                border

                px-4
                py-2

                text-sm

                ${
                  severityStyles[
                    report
                      .severity
                  ]
                }
              `}
            >
              {report.severity}
            </span>

            <span
              className="
                rounded-full

                border
                border-cyan-400/10

                bg-cyan-400/10

                px-4
                py-2

                text-sm

                text-cyan-300
              "
            >
              Risk Score:{" "}
              {report.riskScore}
            </span>

            <span
              className="
                rounded-full

                border
                border-yellow-500/20

                bg-yellow-500/10

                px-4
                py-2

                text-sm

                text-yellow-200
              "
            >
              {report.vulnerabilities}{" "}
              Findings
            </span>
          </div>
        </div>

        {/* GRID */}

        <div
          className="
            mt-10

            grid
            grid-cols-[1.2fr_0.8fr]

            gap-8
          "
        >
          {/* LEFT */}

          <div>
            {/* FINDINGS */}

            <div
              className="
                rounded-[28px]

                border
                border-cyan-400/10

                bg-white/[0.02]

                p-6
              "
            >
              <div className="flex items-center gap-3">
                <ShieldAlert
                  size={22}
                  className="text-cyan-300"
                />

                <h2
                  className="
                    text-xl
                    font-semibold

                    text-white
                  "
                >
                  Security Findings
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                {report.findings
                  ?.length > 0 ? (
                  report.findings.map(
                    (
                      finding,
                      index
                    ) => (
                      <motion.div
                        key={index}
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
                          rounded-3xl

                          border
                          border-cyan-400/10

                          bg-black/20

                          p-5
                        "
                      >
                        {/* TOP */}

                        <div
                          className="
                            flex
                            items-start
                            justify-between

                            gap-4
                          "
                        >
                          <div>
                            <h3
                              className="
                                text-lg
                                font-semibold

                                text-white
                              "
                            >
                              {
                                finding.title
                              }
                            </h3>

                            <p
                              className="
                                mt-2

                                text-sm

                                text-slate-400
                              "
                            >
                              {
                                finding.category
                              }
                            </p>
                          </div>

                          <span
                            className={`
                              rounded-full

                              border

                              px-3
                              py-1

                              text-xs
                              font-medium

                              ${
                                severityStyles[
                                  finding
                                    .severity
                                ]
                              }
                            `}
                          >
                            {
                              finding.severity
                            }
                          </span>
                        </div>

                        {/* IMPACT */}

                        <div className="mt-5">
                          <div className="flex items-center gap-2">
                            <AlertTriangle
                              size={16}
                              className="text-orange-300"
                            />

                            <p
                              className="
                                text-sm
                                font-medium

                                text-orange-200
                              "
                            >
                              Impact
                            </p>
                          </div>

                          <p
                            className="
                              mt-2

                              text-sm

                              leading-relaxed

                              text-slate-300
                            "
                          >
                            {
                              finding.impact
                            }
                          </p>
                        </div>

                        {/* RECOMMENDATION */}

                        <div className="mt-5">
                          <div className="flex items-center gap-2">
                            <ShieldCheck
                              size={16}
                              className="text-emerald-300"
                            />

                            <p
                              className="
                                text-sm
                                font-medium

                                text-emerald-200
                              "
                            >
                              Recommendation
                            </p>
                          </div>

                          <p
                            className="
                              mt-2

                              text-sm

                              leading-relaxed

                              text-slate-300
                            "
                          >
                            {
                              finding.recommendation
                            }
                          </p>
                        </div>
                      </motion.div>
                    )
                  )
                ) : (
                  <p className="text-slate-500">
                    No findings detected.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="space-y-8">
            {/* TECHNOLOGIES */}

            <div
              className="
                rounded-[28px]

                border
                border-cyan-400/10

                bg-white/[0.02]

                p-6
              "
            >
              <div className="flex items-center gap-3">
                <Cpu
                  size={22}
                  className="text-cyan-300"
                />

                <h2
                  className="
                    text-xl
                    font-semibold

                    text-white
                  "
                >
                  Technologies
                </h2>
              </div>

              <div
                className="
                  mt-6

                  flex
                  flex-wrap

                  gap-3
                "
              >
                {report.technologies
                  ?.length > 0 ? (
                  report.technologies.map(
                    (
                      tech,
                      index
                    ) => (
                      <span
                        key={index}
                        className="
                          rounded-full

                          border
                          border-cyan-400/10

                          bg-cyan-400/10

                          px-4
                          py-2

                          text-sm

                          text-cyan-200
                        "
                      >
                        {tech}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-slate-500">
                    No technologies detected.
                  </p>
                )}
              </div>
            </div>

            {/* INFRA */}

            <div
              className="
                rounded-[28px]

                border
                border-cyan-400/10

                bg-white/[0.02]

                p-6
              "
            >
              <div className="flex items-center gap-3">
                <Server
                  size={22}
                  className="text-cyan-300"
                />

                <h2
                  className="
                    text-xl
                    font-semibold

                    text-white
                  "
                >
                  Infrastructure
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {report.infrastructure
                  ?.length > 0 ? (
                  report.infrastructure.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={index}
                        className="
                          rounded-2xl

                          border
                          border-cyan-400/5

                          bg-black/20

                          p-4

                          text-sm

                          text-slate-300
                        "
                      >
                        {item}
                      </div>
                    )
                  )
                ) : (
                  <p className="text-slate-500">
                    No infrastructure data.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-10

            flex
            items-center
            justify-between

            rounded-3xl

            border
            border-cyan-400/10

            bg-white/[0.02]

            p-6
          "
        >
          <div className="flex items-center gap-3">
            <Clock3
              size={18}
              className="text-cyan-300"
            />

            <span className="text-slate-300">
              Scan Time:{" "}
              {report.scanTime}
            </span>
          </div>

          <span className="text-slate-500">
            {new Date(
              report.createdAt
            ).toLocaleString()}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default ReportModal;