import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { motion } from "framer-motion";

import {
  ShieldAlert,
} from "lucide-react";

function SeverityPieChart({
  reports = [],
}) {
  /*
    REAL FINDING COUNTS
  */

  const severityCounts = {
    Critical: 0,

    High: 0,

    Medium: 0,

    Low: 0,
  };

  /*
    COUNT FINDINGS
    INSTEAD OF REPORTS
  */

  reports.forEach(
    (report) => {
      (
        report.findings || []
      ).forEach(
        (finding) => {
          if (
            severityCounts[
              finding
                .severity
            ] !== undefined
          ) {
            severityCounts[
              finding
                .severity
            ] += 1;
          }
        }
      );
    }
  );

  /*
    TOTAL FINDINGS
  */

  const totalFindings =
    Object.values(
      severityCounts
    ).reduce(
      (
        total,
        value
      ) => total + value,

      0
    );

  /*
    CHART DATA
  */

  const chartData = [
    {
      name: "Critical",

      value:
        severityCounts
          .Critical,

      color: "#ef4444",
    },

    {
      name: "High",

      value:
        severityCounts.High,

      color: "#f97316",
    },

    {
      name: "Medium",

      value:
        severityCounts
          .Medium,

      color: "#eab308",
    },

    {
      name: "Low",

      value:
        severityCounts.Low,

      color: "#00e5ff",
    },
  ];

  /*
    REMOVE EMPTY
  */

  const filteredData =
    chartData.filter(
      (item) =>
        item.value > 0
    );

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
        duration: 0.5,
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
          top-[-60px]
          right-[-60px]

          h-[180px]
          w-[180px]

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
            THREAT DISTRIBUTION
          </p>

          <h2
            className="
              mt-2

              text-2xl
              font-semibold

              text-white
            "
          >
            Vulnerabilities by Severity
          </h2>
        </div>

        {/* TOTAL */}

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

      {/* CHART */}

      <div
        className="
          relative
          z-10

          mt-8

          flex
          items-center
          justify-between

          gap-6
        "
      >
        {/* PIE */}

        <div className="h-[220px] w-[220px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={
                  filteredData
                }
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                stroke="transparent"
              >
                {filteredData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        entry.color
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip
                contentStyle={{
                  background:
                    "rgba(10,15,25,0.95)",

                  border:
                    "1px solid rgba(0,229,255,0.15)",

                  borderRadius:
                    "14px",

                  color:
                    "white",

                  backdropFilter:
                    "blur(14px)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND */}

        <div className="space-y-5">
          {chartData.map(
            (item) => (
              <div
                key={item.name}
                className="
                  flex
                  items-center
                  gap-4
                "
              >
                {/* DOT */}

                <div
                  className="
                    h-4
                    w-4

                    rounded-full
                  "
                  style={{
                    background:
                      item.color,
                  }}
                />

                {/* TEXT */}

                <div>
                  <p
                    className="
                      text-sm

                      text-slate-300
                    "
                  >
                    {item.name}
                  </p>

                  <p
                    className="
                      mt-1

                      text-xs

                      text-slate-500
                    "
                  >
                    {item.value}{" "}
                    findings
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default SeverityPieChart;