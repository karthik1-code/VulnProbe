import { motion } from "framer-motion";

import {
  Shield,
  ShieldAlert,
  AlertTriangle,
  Activity,
  Radar,
} from "lucide-react";

function SummaryCards({
  reports = [],

  loading = false,
}) {
  /*
    TOTAL SCANS
  */

  const totalScans =
    reports.length;

  /*
    ALL FINDINGS
  */

  const allFindings =
    reports.flatMap(
      (report) =>
        report.findings || []
    );

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
              total,
              report
            ) =>
              total +
              (report.riskScore ||
                0),

            0
          ) / reports.length
        ).toFixed(1)
      : 0;

  /*
    SUMMARY DATA
  */

  const summaryData = [
    {
      title:
        "TOTAL SCANS",

      value:
        totalScans,

      subtitle:
        "Completed intelligence assessments",

      icon: (
        <Shield
          size={20}
        />
      ),

      color:
        "from-cyan-500/10 to-cyan-400/5",

      border:
        "border-cyan-400/15",

      glow:
        "shadow-[0_0_40px_rgba(0,229,255,0.08)]",

      text:
        "text-cyan-300",
    },

    {
      title:
        "VULNERABILITIES",

      value:
        totalVulnerabilities,

      subtitle:
        "Detected threat findings",

      icon: (
        <ShieldAlert
          size={20}
        />
      ),

      color:
        "from-orange-500/10 to-orange-400/5",

      border:
        "border-orange-400/15",

      glow:
        "shadow-[0_0_40px_rgba(251,146,60,0.08)]",

      text:
        "text-orange-300",
    },

    {
      title:
        "CRITICAL THREATS",

      value:
        criticalCount,

      subtitle:
        "Critical severity detections",

      icon: (
        <AlertTriangle
          size={20}
        />
      ),

      color:
        "from-red-500/10 to-red-400/5",

      border:
        "border-red-400/15",

      glow:
        "shadow-[0_0_40px_rgba(239,68,68,0.08)]",

      text:
        "text-red-300",
    },

    {
      title:
        "AVG RISK SCORE",

      value:
        averageRisk,

      subtitle:
        "Average infrastructure risk",

      icon: (
        <Activity
          size={20}
        />
      ),

      color:
        "from-emerald-500/10 to-emerald-400/5",

      border:
        "border-emerald-400/15",

      glow:
        "shadow-[0_0_40px_rgba(16,185,129,0.08)]",

      text:
        "text-emerald-300",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-5

        gap-5
      "
    >
      {summaryData.map(
        (
          card,
          index
        ) => (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              delay:
                index * 0.08,
            }}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            className={`
              group

              relative

              overflow-hidden

              rounded-[28px]

              border

              bg-gradient-to-br
              ${card.color}

              p-6

              backdrop-blur-2xl

              transition-all
              duration-300

              ${card.border}

              ${card.glow}
            `}
          >
            {/* GLOW */}

            <div
              className="
                absolute
                top-[-40px]
                right-[-40px]

                h-[120px]
                w-[120px]

                rounded-full

                bg-white/5

                blur-3xl
              "
            />

            {/* GRID */}

            <div
              className="
                absolute
                inset-0

                opacity-10

                bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),
                linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]

                bg-[size:32px_32px]
              "
            />

            {/* CONTENT */}

            <div className="relative z-10">
              {/* ICON */}

              <div
                className={`
                  flex
                  items-center
                  justify-center

                  h-12
                  w-12

                  rounded-2xl

                  bg-white/[0.04]

                  ${card.text}
                `}
              >
                {card.icon}
              </div>

              {/* TITLE */}

              <p
                className={`
                  mt-5

                  text-xs

                  tracking-[0.25em]

                  ${card.text}
                `}
              >
                {card.title}
              </p>

              {/* VALUE */}

              <h2
                className="
                  mt-4

                  text-5xl
                  font-semibold

                  text-white
                "
              >
                {loading
                  ? "--"
                  : card.value}
              </h2>

              {/* SUBTITLE */}

              <p
                className="
                  mt-2

                  text-sm

                  text-slate-400
                "
              >
                {
                  card.subtitle
                }
              </p>
            </div>

            {/* SHINE */}

            <div
              className="
                absolute
                inset-0

                translate-x-[-120%]

                bg-[linear-gradient(
                  120deg,
                  transparent,
                  rgba(255,255,255,0.08),
                  transparent
                )]

                transition-transform
                duration-1000

                group-hover:translate-x-[120%]
              "
            />
          </motion.div>
        )
      )}

      {/* LIVE RISK */}

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
          duration: 0.45,
          delay: 0.45,
        }}
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        className="
          group

          relative

          overflow-hidden

          rounded-[28px]

          border
          border-cyan-400/15

          bg-[#07111f]/80

          p-6

          backdrop-blur-2xl

          shadow-[0_0_40px_rgba(0,229,255,0.08)]
        "
      >
        {/* GLOW */}

        <div
          className="
            absolute
            top-[-50px]
            right-[-50px]

            h-[140px]
            w-[140px]

            rounded-full

            bg-cyan-400/10

            blur-3xl
          "
        />

        {/* CONTENT */}

        <div className="relative z-10">
          <p
            className="
              text-xs

              tracking-[0.25em]

              text-slate-400
            "
          >
            LIVE RISK INDEX
          </p>

          <div
            className="
              mt-5

              flex
              items-center
              justify-between
            "
          >
            <div>
              <h2
                className="
                  text-5xl
                  font-semibold

                  text-cyan-300
                "
              >
                {loading
                  ? "--"
                  : averageRisk}
              </h2>

              <p
                className="
                  mt-2

                  text-sm

                  text-cyan-200
                "
              >
                Intelligence Rating
              </p>
            </div>

            {/* RADAR */}

            <div
              className="
                relative

                flex
                items-center
                justify-center

                h-[90px]
                w-[90px]

                rounded-full

                border
                border-cyan-400/20
              "
            >
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

              <Radar
                size={28}
                className="
                  text-cyan-300
                "
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SummaryCards;