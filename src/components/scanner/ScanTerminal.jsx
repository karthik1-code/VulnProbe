import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Terminal,
  ShieldAlert,
  Activity,
  CheckCircle2,
} from "lucide-react";

function ScanTerminal({
  currentStage,
  progress,
  isScanning,
  scanComplete,

  findings = [],

  technologies = [],

  infrastructure = [],
}) {
  /*
    BASE LOGS
  */

  const logs = [
    "[INFO] Initializing VulnProbe intelligence engine...",

    "[INFO] Establishing secure target connection...",

    "[INFO] Resolving DNS infrastructure...",

    "[INFO] Analyzing SSL/TLS posture...",

    "[INFO] Fingerprinting technologies...",

    "[INFO] Inspecting HTTP methods...",

    "[INFO] Parsing security headers...",

    "[INFO] Evaluating cookie protections...",

    "[INFO] Discovering robots and sitemap intelligence...",

    "[INFO] Correlating infrastructure telemetry...",
  ];

  /*
    FINDING LOGS
    FIXED FOR
    OBJECT FINDINGS
  */

  const findingLogs =
    findings.map(
      (finding) =>
        `[ALERT] ${
          finding?.title ||
          "Unknown Finding"
        } [${
          finding?.severity ||
          "Low"
        }]`
    );

  /*
    TECHNOLOGY LOGS
  */

  const technologyLogs =
    technologies.map(
      (tech) =>
        `[TECH] ${tech} detected`
    );

  /*
    INFRA LOGS
  */

  const infrastructureLogs =
    infrastructure.map(
      (item) =>
        `[INFRA] ${item}`
    );

  /*
    FINAL TERMINAL STREAM
  */

  const terminalLogs = [
    ...logs,

    ...technologyLogs,

    ...infrastructureLogs,

    ...findingLogs,

    ...(scanComplete
      ? [
          "[SUCCESS] Intelligence scan completed successfully.",
        ]
      : []),
  ];

  return (
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
        duration: 0.6,
        delay: 0.2,
      }}
      className="
        relative

        overflow-hidden

        rounded-[28px]

        border
        border-cyan-400/10

        bg-[#07111f]/75

        p-6

        backdrop-blur-2xl

        shadow-[0_0_50px_rgba(0,229,255,0.05)]
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          absolute
          bottom-[-80px]
          left-[-60px]

          h-[220px]
          w-[220px]

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0

          opacity-[0.05]

          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]

          bg-[size:35px_35px]
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
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <Terminal
              size={18}
              className="
                text-cyan-300
              "
            />

            <p
              className="
                text-sm

                tracking-[0.2em]

                text-cyan-300
              "
            >
              LIVE TERMINAL
            </p>
          </div>

          <h2
            className="
              mt-3

              text-2xl
              font-semibold

              text-white
            "
          >
            Intelligence Stream
          </h2>
        </div>

        {/* STATUS */}

        <div
          className={`
            flex
            items-center
            gap-3

            rounded-2xl

            border

            px-4
            py-3

            ${
              scanComplete
                ? `
                  border-emerald-400/20
                  bg-emerald-400/10
                `
                : isScanning
                ? `
                  border-cyan-400/20
                  bg-cyan-400/10
                `
                : `
                  border-slate-700
                  bg-slate-800/40
                `
            }
          `}
        >
          <div
            className={`
              h-3
              w-3

              rounded-full

              ${
                scanComplete
                  ? `
                    bg-emerald-400
                    shadow-[0_0_15px_rgba(74,222,128,0.8)]
                  `
                  : isScanning
                  ? `
                    animate-pulse

                    bg-cyan-300
                    shadow-[0_0_15px_rgba(0,229,255,0.8)]
                  `
                  : `
                    bg-slate-500
                  `
              }
            `}
          />

          <span
            className="
              text-sm
              font-medium

              text-white
            "
          >
            {scanComplete
              ? "Completed"
              : isScanning
              ? "Scanning"
              : "Idle"}
          </span>
        </div>
      </div>

      {/* STAGE */}

      <div
        className="
          relative
          z-10

          mt-8
        "
      >
        <p
          className="
            text-xs

            tracking-[0.2em]

            text-slate-500
          "
        >
          ACTIVE STAGE
        </p>

        <h3
          className="
            mt-3

            text-2xl
            font-semibold

            text-white
          "
        >
          {currentStage}
        </h3>
      </div>

      {/* PROGRESS */}

      <div
        className="
          relative
          z-10

          mt-8
        "
      >
        <div className="flex justify-between">
          <p
            className="
              text-sm

              text-slate-400
            "
          >
            Intelligence Progress
          </p>

          <p
            className="
              text-sm

              text-cyan-300
            "
          >
            {progress}%
          </p>
        </div>

        <div
          className="
            mt-3

            h-3

            overflow-hidden

            rounded-full

            bg-white/10
          "
        >
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              relative

              h-full

              rounded-full

              bg-cyan-400
            "
          >
            <div
              className="
                absolute
                inset-0

                bg-[linear-gradient(
                  120deg,
                  transparent,
                  rgba(255,255,255,0.5),
                  transparent
                )]

                animate-pulse
              "
            />
          </motion.div>
        </div>
      </div>

      {/* TERMINAL */}

      <div
        className="
          relative
          z-10

          mt-8

          overflow-hidden

          rounded-3xl

          border
          border-cyan-400/10

          bg-[#08131f]/90

          p-5
        "
      >
        {/* Scan Line */}

        <motion.div
          animate={{
            y: [0, 320, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-0

            h-[2px]
            w-full

            bg-cyan-400/30

            blur-sm
          "
        />

        {/* Logs */}

        <div
          className="
            relative
            z-10

            max-h-[340px]

            space-y-3

            overflow-y-auto

            pr-2

            font-mono
            text-sm
          "
        >
          <AnimatePresence>
            {terminalLogs
              .slice(
                0,
                Math.max(
                  1,
                  Math.floor(
                    progress / 5
                  )
                )
              )
              .map(
                (
                  log,
                  index
                ) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.04,
                    }}
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >
                    {/* ICON */}

                    {log.includes(
                      "[ALERT]"
                    ) ? (
                      <ShieldAlert
                        size={16}
                        className="
                          mt-[2px]

                          text-yellow-300
                        "
                      />
                    ) : log.includes(
                        "[SUCCESS]"
                      ) ? (
                      <CheckCircle2
                        size={16}
                        className="
                          mt-[2px]

                          text-emerald-300
                        "
                      />
                    ) : (
                      <Activity
                        size={16}
                        className="
                          mt-[2px]

                          text-cyan-300
                        "
                      />
                    )}

                    {/* TEXT */}

                    <p
                      className={`
                        leading-relaxed

                        ${
                          log.includes(
                            "[ALERT]"
                          )
                            ? `
                              text-yellow-300
                            `
                            : log.includes(
                                "[SUCCESS]"
                              )
                            ? `
                              text-emerald-300
                            `
                            : log.includes(
                                "[TECH]"
                              )
                            ? `
                              text-violet-300
                            `
                            : log.includes(
                                "[INFRA]"
                              )
                            ? `
                              text-orange-300
                            `
                            : `
                              text-cyan-200
                            `
                        }
                      `}
                    >
                      {log}
                    </p>
                  </motion.div>
                )
              )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default ScanTerminal;