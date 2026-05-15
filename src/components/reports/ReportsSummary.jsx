import { motion } from "framer-motion";

function ReportsSummary({
  totalReports = 0,

  totalVulnerabilities = 0,

  criticalReports = 0,

  loading = false,
}) {
  /*
    LAST SCAN TIME
  */

  const lastScan =
    totalReports > 0
      ? "Recent"
      : "None";

  /*
    REAL STATS
  */

  const stats = [
    {
      title:
        "TOTAL REPORTS",

      value:
        totalReports,

      color:
        "from-cyan-500/20 to-cyan-500/5",

      border:
        "border-cyan-500/20",

      text:
        "text-cyan-300",
    },

    {
      title:
        "CRITICAL THREATS",

      value:
        criticalReports,

      color:
        "from-red-500/20 to-red-500/5",

      border:
        "border-red-500/20",

      text:
        "text-red-400",
    },

    {
      title:
        "TOTAL FINDINGS",

      value:
        totalVulnerabilities,

      color:
        "from-emerald-500/20 to-emerald-500/5",

      border:
        "border-emerald-500/20",

      text:
        "text-emerald-300",
    },

    {
      title:
        "LAST SCAN",

      value:
        lastScan,

      subtitle:
        "activity",

      color:
        "from-orange-500/20 to-orange-500/5",

      border:
        "border-orange-500/20",

      text:
        "text-orange-300",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-4

        gap-5
      "
    >
      {stats.map(
        (
          stat,
          index
        ) => (
          <motion.div
            key={stat.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay:
                index * 0.1,
            }}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            className={`
              relative

              overflow-hidden

              rounded-[28px]

              border

              bg-gradient-to-br
              ${stat.color}

              p-6

              backdrop-blur-2xl

              transition-all
              duration-300

              ${stat.border}
            `}
          >
            {/* Glow */}

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

            {/* Content */}

            <div className="relative z-10">
              <p
                className={`
                  text-xs

                  tracking-[0.25em]

                  ${stat.text}
                `}
              >
                {stat.title}
              </p>

              <div className="mt-4 flex items-end gap-2">
                <h2
                  className="
                    text-5xl
                    font-semibold

                    text-white
                  "
                >
                  {loading
                    ? "--"
                    : stat.value}
                </h2>

                {stat.subtitle && (
                  <span
                    className="
                      mb-2

                      text-sm

                      text-slate-400
                    "
                  >
                    {
                      stat.subtitle
                    }
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )
      )}
    </div>
  );
}

export default ReportsSummary;