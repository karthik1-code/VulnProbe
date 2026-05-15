import {
  motion,
} from "framer-motion";

import {
  ShieldCheck,
  Activity,
  Globe,
  Database,
  Radar,
  Server,
  Lock,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

function ScanProgress({
  progress,
  currentStage,
  scanComplete,

  findings = [],

  technologies = [],
}) {
  /*
    INTELLIGENCE PIPELINE
  */

  const steps = [
    {
      title:
        "Initializing Scan Engine",

      description:
        "Bootstrapping VulnProbe orchestration core.",

      icon: Activity,
    },

    {
      title:
        "Resolving DNS Intelligence",

      description:
        "Analyzing infrastructure and network mapping.",

      icon: Globe,
    },

    {
      title:
        "Inspecting SSL/TLS Posture",

      description:
        "Evaluating transport-layer security policies.",

      icon: Lock,
    },

    {
      title:
        "Fingerprinting Technologies",

      description:
        "Detecting frameworks, servers, and platforms.",

      icon: Radar,
    },

    {
      title:
        "Analyzing HTTP Security",

      description:
        "Inspecting methods, headers, and redirects.",

      icon: ShieldCheck,
    },

    {
      title:
        "Reconnaissance Discovery",

      description:
        "Discovering robots, sitemap, and exposure intelligence.",

      icon: Server,
    },

    {
      title:
        "Correlating Threat Intelligence",

      description:
        "Generating operational threat analytics.",

      icon: Database,
    },
  ];

  /*
    CURRENT STEP
  */

  const currentIndex =
    steps.findIndex(
      (step) =>
        step.title ===
        currentStage
    );

  /*
    COUNTS
  */

  const criticalCount =
    findings.filter(
      (finding) =>
        finding.severity ===
        "Critical"
    ).length;

  const highCount =
    findings.filter(
      (finding) =>
        finding.severity ===
        "High"
    ).length;

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
      {/* GLOW */}

      <div
        className="
          absolute
          bottom-[-100px]
          right-[-60px]

          h-[240px]
          w-[240px]

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      {/* GRID */}

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
          <p
            className="
              text-sm

              tracking-[0.2em]

              text-cyan-300
            "
          >
            EXECUTION PIPELINE
          </p>

          <h2
            className="
              mt-2

              text-2xl
              font-semibold

              text-white
            "
          >
            Intelligence Workflow
          </h2>
        </div>

        {/* LIVE STATS */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          {/* FINDINGS */}

          <div
            className="
              rounded-2xl

              border
              border-cyan-400/10

              bg-cyan-400/10

              px-4
              py-3
            "
          >
            <p
              className="
                text-xs

                tracking-[0.2em]

                text-cyan-300
              "
            >
              FINDINGS
            </p>

            <h3
              className="
                mt-2

                text-2xl
                font-semibold

                text-white
              "
            >
              {
                findings.length
              }
            </h3>
          </div>

          {/* CRITICAL */}

          <div
            className="
              rounded-2xl

              border
              border-red-400/10

              bg-red-500/10

              px-4
              py-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <ShieldAlert
                size={14}
                className="
                  text-red-300
                "
              />

              <p
                className="
                  text-xs

                  tracking-[0.2em]

                  text-red-300
                "
              >
                CRITICAL
              </p>
            </div>

            <h3
              className="
                mt-2

                text-2xl
                font-semibold

                text-white
              "
            >
              {criticalCount}
            </h3>
          </div>

          {/* TECHNOLOGIES */}

          <div
            className="
              rounded-2xl

              border
              border-violet-400/10

              bg-violet-500/10

              px-4
              py-3
            "
          >
            <p
              className="
                text-xs

                tracking-[0.2em]

                text-violet-300
              "
            >
              TECHNOLOGIES
            </p>

            <h3
              className="
                mt-2

                text-2xl
                font-semibold

                text-white
              "
            >
              {
                technologies.length
              }
            </h3>
          </div>
        </div>
      </div>

      {/* STEPS */}

      <div
        className="
          relative
          z-10

          mt-10

          flex
          flex-col
          gap-8
        "
      >
        {steps.map(
          (
            step,
            index
          ) => {
            const Icon =
              step.icon;

            const status =
              index <
              currentIndex
                ? "completed"
                : index ===
                  currentIndex
                ? "active"
                : "pending";

            return (
              <div
                key={
                  step.title
                }
                className="
                  relative

                  flex
                  items-start
                  gap-5
                "
              >
                {/* CONNECTOR */}

                {index !==
                  steps.length -
                    1 && (
                  <div
                    className="
                      absolute
                      left-[18px]
                      top-[42px]

                      h-[72px]
                      w-[2px]

                      bg-cyan-400/10
                    "
                  />
                )}

                {/* NODE */}

                <div
                  className={`
                    relative
                    z-10

                    flex
                    items-center
                    justify-center

                    h-9
                    w-9

                    rounded-full

                    border

                    ${
                      status ===
                      "completed"
                        ? `
                          border-emerald-400/30
                          bg-emerald-400/15
                        `
                        : status ===
                          "active"
                        ? `
                          border-cyan-400/30
                          bg-cyan-400/15
                        `
                        : `
                          border-slate-700
                          bg-slate-800/50
                        `
                    }
                  `}
                >
                  {/* ACTIVE PULSE */}

                  {status ===
                    "active" && (
                    <motion.div
                      animate={{
                        scale: [
                          1,
                          1.6,
                          1,
                        ],

                        opacity: [
                          0.4,
                          1,
                          0.4,
                        ],
                      }}
                      transition={{
                        duration: 1.5,

                        repeat:
                          Infinity,
                      }}
                      className="
                        absolute

                        h-4
                        w-4

                        rounded-full

                        bg-cyan-400
                      "
                    />
                  )}

                  {/* ICON */}

                  {status ===
                  "completed" ? (
                    <CheckCircle2
                      size={16}
                      className="
                        text-emerald-300
                      "
                    />
                  ) : (
                    <Icon
                      size={16}
                      className={`
                        ${
                          status ===
                          "active"
                            ? `
                              text-cyan-300
                            `
                            : `
                              text-slate-500
                            `
                        }
                      `}
                    />
                  )}
                </div>

                {/* CONTENT */}

                <div className="flex-1">
                  <h3
                    className={`
                      text-lg
                      font-medium

                      ${
                        status ===
                        "completed"
                          ? `
                            text-emerald-300
                          `
                          : status ===
                            "active"
                          ? `
                            text-cyan-300
                          `
                          : `
                            text-slate-500
                          `
                      }
                    `}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-2

                      text-sm
                      leading-relaxed

                      text-slate-500
                    "
                  >
                    {
                      step.description
                    }
                  </p>

                  {/* STATUS */}

                  <div
                    className="
                      mt-3

                      inline-flex
                      items-center

                      rounded-full

                      border
                      border-cyan-400/10

                      bg-cyan-400/[0.03]

                      px-3
                      py-1.5
                    "
                  >
                    <p
                      className={`
                        text-[11px]

                        tracking-[0.15em]

                        ${
                          status ===
                          "completed"
                            ? `
                              text-emerald-300
                            `
                            : status ===
                              "active"
                            ? `
                              text-cyan-300
                            `
                            : `
                              text-slate-500
                            `
                        }
                      `}
                    >
                      {status ===
                      "completed"
                        ? "COMPLETED"
                        : status ===
                          "active"
                        ? "PROCESSING"
                        : "PENDING"}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* PROGRESS */}

      <div
        className="
          relative
          z-10

          mt-10
        "
      >
        <div className="flex justify-between">
          <p
            className="
              text-sm

              text-slate-400
            "
          >
            Overall Completion
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

        {/* BAR */}

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

        {/* COMPLETE */}

        {scanComplete && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-5

              rounded-2xl

              border
              border-emerald-400/20

              bg-emerald-400/10

              px-5
              py-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <CheckCircle2
                size={18}
                className="
                  text-emerald-300
                "
              />

              <p
                className="
                  text-sm

                  text-emerald-300
                "
              >
                Intelligence assessment completed successfully with{" "}
                {findings.length} findings detected.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default ScanProgress;