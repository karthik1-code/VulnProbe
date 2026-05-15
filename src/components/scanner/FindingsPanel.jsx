import {
  motion,
} from "framer-motion";

import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
} from "lucide-react";

function FindingsPanel({
  findings = [],
}) {
  /*
    SEVERITY CONFIG
  */

  const getSeverity =
    (severity) => {
      switch (
        severity
      ) {
        case "Critical":
          return {
            label:
              "Critical",

            color:
              "text-red-400",

            border:
              "border-red-400/20",

            bg:
              "bg-red-500/[0.04]",

            icon:
              ShieldAlert,
          };

        case "High":
          return {
            label:
              "High",

            color:
              "text-orange-300",

            border:
              "border-orange-300/20",

            bg:
              "bg-orange-400/[0.04]",

            icon:
              AlertTriangle,
          };

        case "Medium":
          return {
            label:
              "Medium",

            color:
              "text-yellow-300",

            border:
              "border-yellow-300/20",

            bg:
              "bg-yellow-400/[0.04]",

            icon:
              Info,
          };

        default:
          return {
            label:
              "Low",

            color:
              "text-cyan-300",

            border:
              "border-cyan-400/20",

            bg:
              "bg-cyan-400/[0.04]",

            icon:
              ShieldCheck,
          };
      }
    };

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
      {/* Glow */}

      <div
        className="
          absolute
          top-[-100px]
          left-[-60px]

          h-[240px]
          w-[240px]

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      {/* HEADER */}

      <div className="relative z-10">
        <p
          className="
            text-sm

            tracking-[0.2em]

            text-cyan-300
          "
        >
          THREAT FINDINGS
        </p>

        <h2
          className="
            mt-2

            text-2xl
            font-semibold

            text-white
          "
        >
          Intelligence Findings
        </h2>
      </div>

      {/* EMPTY */}

      {findings.length ===
        0 && (
        <div
          className="
            relative
            z-10

            mt-10

            rounded-2xl

            border
            border-slate-700

            bg-slate-800/40

            p-8

            text-center
          "
        >
          <ShieldCheck
            size={32}
            className="
              mx-auto

              text-emerald-300
            "
          />

          <p
            className="
              mt-4

              text-slate-400
            "
          >
            No intelligence findings
            available yet.
          </p>
        </div>
      )}

      {/* FINDINGS */}

      <div
        className="
          relative
          z-10

          mt-8

          space-y-5
        "
      >
        {findings.map(
          (
            finding,
            index
          ) => {
            const severity =
              getSeverity(
                finding.severity
              );

            const Icon =
              severity.icon;

            return (
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
                    index * 0.05,
                }}
                className={`
                  rounded-2xl

                  border

                  p-5

                  backdrop-blur-xl

                  ${severity.border}

                  ${severity.bg}
                `}
              >
                {/* TOP */}

                <div
                  className="
                    flex
                    items-start
                    justify-between

                    gap-5
                  "
                >
                  {/* LEFT */}

                  <div
                    className="
                      flex
                      items-start
                      gap-4
                    "
                  >
                    <div
                      className={`
                        rounded-xl

                        border

                        p-3

                        ${severity.border}

                        ${severity.bg}
                      `}
                    >
                      <Icon
                        size={18}
                        className={
                          severity.color
                        }
                      />
                    </div>

                    <div>
                      <h3
                        className="
                          text-lg
                          font-medium

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

                          text-slate-500
                        "
                      >
                        {
                          finding.category
                        }
                      </p>
                    </div>
                  </div>

                  {/* BADGE */}

                  <div
                    className={`
                      rounded-full

                      border

                      px-3
                      py-1.5

                      text-xs

                      tracking-[0.15em]

                      ${severity.border}

                      ${severity.color}
                    `}
                  >
                    {
                      severity.label
                    }
                  </div>
                </div>

                {/* IMPACT */}

                <div
                  className="
                    mt-5

                    rounded-xl

                    border
                    border-white/5

                    bg-black/20

                    p-4
                  "
                >
                  <p
                    className="
                      text-xs

                      tracking-[0.15em]

                      text-slate-500
                    "
                  >
                    IMPACT
                  </p>

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

                <div
                  className="
                    mt-4

                    rounded-xl

                    border
                    border-white/5

                    bg-black/20

                    p-4
                  "
                >
                  <p
                    className="
                      text-xs

                      tracking-[0.15em]

                      text-slate-500
                    "
                  >
                    RECOMMENDATION
                  </p>

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
            );
          }
        )}
      </div>
    </motion.div>
  );
}

export default FindingsPanel;