import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

import {
  Activity,
} from "lucide-react";

function ThreatLineChart({
  reports = [],
}) {
  /*
    SORT REPORTS
    BY DATE
  */

  const sortedReports =
    [...reports].sort(
      (a, b) =>
        new Date(
          a.createdAt
        ) -
        new Date(
          b.createdAt
        )
    );

  /*
    BUILD REAL
    TREND DATA
  */

  const threatTrendData =
    sortedReports.map(
      (report, index) => {
        /*
          TOTAL FINDINGS
        */

        const findings =
          report.findings ||
          [];

        /*
          CRITICAL
        */

        const critical =
          findings.filter(
            (finding) =>
              finding.severity ===
              "Critical"
          ).length;

        /*
          HIGH
        */

        const high =
          findings.filter(
            (finding) =>
              finding.severity ===
              "High"
          ).length;

        return {
          scan:
            `S${
              index + 1
            }`,

          threats:
            findings.length,

          risk:
            report.riskScore,

          critical,

          high,

          target:
            report.target,
        };
      }
    );

  /*
    TOTAL THREATS
  */

  const totalThreats =
    threatTrendData.reduce(
      (
        total,
        item
      ) =>
        total +
        item.threats,

      0
    );

  /*
    AVG RISK
  */

  const avgRisk =
    threatTrendData.length >
    0
      ? (
          threatTrendData.reduce(
            (
              total,
              item
            ) =>
              total +
              item.risk,

            0
          ) /
          threatTrendData.length
        ).toFixed(1)
      : 0;

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
        duration: 0.55,
        delay: 0.1,
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
          bottom-[-80px]
          right-[-60px]

          h-[220px]
          w-[220px]

          rounded-full

          bg-red-500/10

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
            THREAT ANALYTICS
          </p>

          <h2
            className="
              mt-2

              text-2xl
              font-semibold

              text-white
            "
          >
            Vulnerabilities Over Time
          </h2>
        </div>

        {/* STATS */}

        <div
          className="
            flex
            items-center
            gap-6
          "
        >
          {/* THREATS */}

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
            <p
              className="
                text-xs

                tracking-[0.2em]

                text-red-300
              "
            >
              THREATS
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
                totalThreats
              }
            </h3>
          </div>

          {/* AVG RISK */}

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
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Activity
                size={14}
                className="
                  text-cyan-300
                "
              />

              <p
                className="
                  text-xs

                  tracking-[0.2em]

                  text-cyan-300
                "
              >
                AVG RISK
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
              {avgRisk}
            </h3>
          </div>
        </div>
      </div>

      {/* CHART */}

      <div className="relative z-10 mt-8 h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={
              threatTrendData
            }
          >
            {/* GRADIENT */}

            <defs>
              <linearGradient
                id="threatGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#ff4d4d"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#ff4d4d"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/* GRID */}

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />

            {/* X AXIS */}

            <XAxis
              dataKey="scan"
              tick={{
                fill:
                  "#64748b",

                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y AXIS */}

            <YAxis
              tick={{
                fill:
                  "#64748b",

                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* TOOLTIP */}

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

              formatter={(
                value,
                name
              ) => [
                value,

                name ===
                "threats"
                  ? "Threats"
                  : name,
              ]}

              labelFormatter={(
                label,
                payload
              ) => {
                if (
                  payload &&
                  payload[0]
                ) {
                  return `${label} • ${payload[0].payload.target}`;
                }

                return label;
              }}
            />

            {/* AREA */}

            <Area
              type="monotone"
              dataKey="threats"
              stroke="#ff4d4d"
              strokeWidth={3}
              fill="url(#threatGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default ThreatLineChart;