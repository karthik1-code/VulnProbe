import {
  motion,
} from "framer-motion";

import {
  ShieldAlert,
  Activity,
  Globe,
  Server,
  Cpu,
  Timer,
} from "lucide-react";

function ScannerStats({
  progress,
  isScanning,
  scanComplete,

  findings = [],

  technologies = [],

  infrastructure = [],

  methods = [],

  scanTime = "0ms",

  report = {},
}) {
  /*
    REAL DATA
  */

  const vulnerabilities =
    findings.length;

  const techCount =
    technologies.length;

  const infraCount =
    infrastructure.length;

  const methodCount =
    methods.length;

  const severity =
    report?.severity ||
    "LOW";

  const riskScore =
    report?.riskScore ||
    0;

  /*
    SEVERITY COLOR
  */

  const severityColor =
    severity ===
    "Critical"
      ? "text-red-400"

      : severity ===
        "High"
      ? "text-orange-300"

      : severity ===
        "Medium"
      ? "text-yellow-300"

      : "text-emerald-300";

  /*
    STATS
  */

  const stats = [
    {
      label:
        "FINDINGS",

      value:
        vulnerabilities,

      icon:
        ShieldAlert,

      color:
        "text-red-400",
    },

    {
      label:
        "TECHNOLOGIES",

      value: techCount,

      icon: Cpu,

      color:
        "text-violet-300",
    },

    {
      label:
        "INFRASTRUCTURE",

      value:
        infraCount,

      icon: Server,

      color:
        "text-orange-300",
    },

    {
      label:
        "HTTP METHODS",

      value:
        methodCount,

      icon: Globe,

      color:
        "text-cyan-300",
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.6,
        delay: 0.3,
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
          top-[-60px]
          right-[-40px]

          h-[180px]
          w-[180px]

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

      <div className="relative z-10">
        <p
          className="
            text-sm

            tracking-[0.2em]

            text-cyan-300
          "
        >
          INTELLIGENCE ANALYTICS
        </p>

        <h2
          className="
            mt-2

            text-2xl
            font-semibold

            text-white
          "
        >
          Live Scan Telemetry
        </h2>
      </div>

      {/* STATS */}

      <div
        className="
          relative
          z-10

          mt-8

          grid
          grid-cols-2

          gap-4
        "
      >
        {stats.map(
          (
            stat,
            index
          ) => {
            const Icon =
              stat.icon;

            return (
              <motion.div
                key={
                  stat.label
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
                    index * 0.08,
                }}
                className="
                  rounded-2xl

                  border
                  border-cyan-400/10

                  bg-white/[0.03]

                  p-5

                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <p
                    className="
                      text-[11px]

                      tracking-[0.18em]

                      text-slate-500
                    "
                  >
                    {
                      stat.label
                    }
                  </p>

                  <Icon
                    size={18}
                    className={
                      stat.color
                    }
                  />
                </div>

                <motion.h3
                  key={
                    stat.value
                  }
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className={`
                    mt-4

                    text-3xl
                    font-semibold

                    ${stat.color}
                  `}
                >
                  {stat.value}
                </motion.h3>
              </motion.div>
            );
          }
        )}
      </div>

      {/* STATUS */}

      <div
        className={`
          relative
          z-10

          mt-8

          rounded-2xl

          border

          p-5

          ${
            scanComplete
              ? `
                border-emerald-400/15
                bg-emerald-400/5
              `
              : isScanning
              ? `
                border-cyan-400/15
                bg-cyan-400/5
              `
              : `
                border-slate-700
                bg-slate-800/40
              `
          }
        `}
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <motion.div
              animate={{
                scale: [
                  1,
                  1.2,
                  1,
                ],

                opacity: [
                  0.7,
                  1,
                  0.7,
                ],
              }}
              transition={{
                duration: 1.5,

                repeat:
                  Infinity,
              }}
              className={`
                h-3
                w-3

                rounded-full

                ${
                  scanComplete
                    ? `
                      bg-emerald-400
                    `
                    : isScanning
                    ? `
                      bg-cyan-400
                    `
                    : `
                      bg-slate-500
                    `
                }
              `}
            />

            <div>
              <p
                className="
                  text-xs

                  tracking-[0.15em]

                  text-slate-500
                "
              >
                ENGINE STATUS
              </p>

              <h3
                className="
                  mt-1

                  text-lg
                  font-medium

                  text-white
                "
              >
                {scanComplete
                  ? "Assessment Complete"
                  : isScanning
                  ? "Scanning Active"
                  : "Engine Idle"}
              </h3>
            </div>
          </div>

          {/* Scan Time */}

          <div
            className="
              flex
              items-center
              gap-2

              rounded-xl

              border
              border-cyan-400/10

              bg-cyan-400/[0.04]

              px-4
              py-3
            "
          >
            <Timer
              size={16}
              className="
                text-cyan-300
              "
            />

            <div>
              <p
                className="
                  text-[10px]

                  uppercase

                  tracking-[0.2em]

                  text-slate-500
                "
              >
                Scan Time
              </p>

              <p
                className="
                  text-sm

                  text-cyan-300
                "
              >
                {scanTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RISK PANEL */}

      <div
        className="
          relative
          z-10

          mt-6

          rounded-2xl

          border
          border-red-400/10

          bg-red-500/[0.03]

          p-5
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-xs

                tracking-[0.15em]

                text-slate-500
              "
            >
              THREAT SEVERITY
            </p>

            <h2
              className={`
                mt-3

                text-3xl
                font-bold

                ${severityColor}
              `}
            >
              {severity}
            </h2>
          </div>

          <div
            className="
              text-right
            "
          >
            <p
              className="
                text-xs

                tracking-[0.15em]

                text-slate-500
              "
            >
              RISK SCORE
            </p>

            <h2
              className="
                mt-3

                text-3xl
                font-bold

                text-cyan-300
              "
            >
              {riskScore}
            </h2>
          </div>
        </div>
      </div>

      {/* RADAR */}

      <div
        className="
          relative
          z-10

          mt-8

          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            relative

            flex
            items-center
            justify-center

            h-[170px]
            w-[170px]

            rounded-full

            border
            border-cyan-400/10
          "
        >
          {/* Rotating Ring */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,

              repeat:
                Infinity,

              ease: "linear",
            }}
            className="
              absolute

              h-full
              w-full

              rounded-full

              border-t
              border-cyan-400
            "
          />

          {/* Rings */}

          <div
            className="
              absolute

              h-[120px]
              w-[120px]

              rounded-full

              border
              border-cyan-400/10
            "
          />

          <div
            className="
              absolute

              h-[70px]
              w-[70px]

              rounded-full

              border
              border-cyan-400/10
            "
          />

          {/* Core */}

          <motion.div
            animate={{
              scale: [
                1,
                1.15,
                1,
              ],
            }}
            transition={{
              duration: 2,

              repeat:
                Infinity,
            }}
            className="
              flex
              items-center
              justify-center

              h-14
              w-14

              rounded-full

              bg-cyan-400/10

              border
              border-cyan-400/20

              backdrop-blur-xl
            "
          >
            <Activity
              size={20}
              className="
                text-cyan-300
              "
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ScannerStats;