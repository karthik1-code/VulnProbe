import { motion } from "framer-motion";

import {
  Shield,
  Radar,
  Activity,
  ShieldAlert,
  Globe,
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo1.png";

function Home() {
  /*
    NAVIGATION
  */

  const navigate =
    useNavigate();

  /*
    FEATURES
  */

  const features = [
    {
      title:
        "Threat Intelligence",

      description:
        "Real-time cyber intelligence correlation and tactical vulnerability analysis.",

      icon: Radar,
    },

    {
      title:
        "Infrastructure Mapping",

      description:
        "Fingerprint technologies, analyze servers, DNS, SSL and exposed services.",

      icon: Globe,
    },

    {
      title:
        "Advanced Detection",

      description:
        "Identify insecure headers, weak transport security and exposed endpoints.",

      icon:
        ShieldAlert,
    },
  ];

  return (
    <div
      className="
        relative

        min-h-screen

        overflow-hidden
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          absolute
          top-[-200px]
          right-[-120px]

          h-[500px]
          w-[500px]

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-220px]
          left-[-120px]

          h-[450px]
          w-[450px]

          rounded-full

          bg-emerald-400/10

          blur-3xl
        "
      />

      {/* GRID */}

      <div
        className="
          absolute
          inset-0

          opacity-[0.04]

          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]

          bg-[size:40px_40px]
        "
      />

      {/* MAIN */}

      <div
        className="
          relative
          z-10

          px-12
          py-10
        "
      >
        {/* HERO */}

        <div
          className="
            grid
            grid-cols-2

            items-center

            gap-12

            min-h-screen
          "
        >
          {/* LEFT */}

          <div>
            {/* BADGE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                inline-flex

                items-center
                gap-3

                rounded-full

                border
                border-cyan-400/20

                bg-cyan-400/10

                px-5
                py-2.5

                text-sm
                text-cyan-300

                backdrop-blur-xl
              "
            >
              <Shield size={16} />

              Advanced Vulnerability Scanner
            </motion.div>

            {/* HEADING */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className="
                mt-8

                text-[82px]
                font-semibold

                leading-[0.92]
                tracking-tight

                text-white
              "
            >
              Detect.
              <br />

              Analyze.
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-cyan-300
                  to-cyan-500

                  bg-clip-text
                  text-transparent
                "
              >
                Secure.
              </span>
            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="
                mt-8

                max-w-[650px]

                text-lg
                leading-relaxed

                text-slate-400
              "
            >
              VulnProbe delivers
              real-time cyber-security
              intelligence with advanced
              reconnaissance, threat
              detection, infrastructure
              analysis, and vulnerability
              correlation.
            </motion.p>

            {/* BUTTONS */}

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
                delay: 0.3,
              }}
              className="
                mt-10

                flex
                items-center
                gap-5
              "
            >
              {/* START */}

              <button
                onClick={() =>
                  navigate(
                    "/scanner"
                  )
                }
                className="
                  group

                  flex
                  items-center
                  gap-3

                  rounded-2xl

                  bg-cyan-400

                  px-8
                  py-4

                  font-medium
                  text-black

                  transition-all
                  duration-300

                  hover:scale-[1.03]

                  hover:shadow-[0_0_35px_rgba(0,229,255,0.35)]
                "
              >
                Start Scanning

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </button>

              {/* SECONDARY */}

              <button
                className="
                  rounded-2xl

                  border
                  border-cyan-400/15

                  bg-white/[0.03]

                  px-8
                  py-4

                  text-cyan-300

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:bg-cyan-400/10
                "
              >
                Threat Analytics
              </button>
            </motion.div>

            {/* STATS */}

            <div
              className="
                mt-16

                flex
                items-center
                gap-10
              "
            >
              {[
                {
                  value: "99.9%",

                  label:
                    "Detection Accuracy",
                },

                {
                  value: "24/7",

                  label:
                    "Threat Monitoring",
                },

                {
                  value: "Real-Time",

                  label:
                    "Intelligence Engine",
                },
              ].map((item) => (
                <div
                  key={item.label}
                >
                  <h3
                    className="
                      text-3xl
                      font-semibold

                      text-white
                    "
                  >
                    {item.value}
                  </h3>

                  <p
                    className="
                      mt-2

                      text-sm

                      text-slate-500
                    "
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              relative

              flex
              items-center
              justify-center

              h-[720px]
            "
          >
            {/* OUTER GLOW */}

            <div
              className="
                absolute

                h-[520px]
                w-[520px]

                rounded-full

                bg-cyan-400/10

                blur-3xl
              "
            />

            {/* PANEL */}

            <div
              className="
                relative

                h-[620px]
                w-[680px]

                overflow-hidden

                rounded-[36px]

                border
                border-cyan-400/10

                bg-[#07111f]/75

                backdrop-blur-2xl

                shadow-[0_0_60px_rgba(0,229,255,0.08)]
              "
            >
              {/* GRID */}

              <div
                className="
                  absolute
                  inset-0

                  opacity-20

                  bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),
                  linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]

                  bg-[size:42px_42px]
                "
              />

              {/* RADAR */}

              <div
                className="
                  relative
                  z-10

                  flex
                  items-center
                  justify-center

                  pt-14
                "
              >
                <div
                  className="
                    relative

                    flex
                    items-center
                    justify-center

                    h-[320px]
                    w-[320px]

                    rounded-full

                    border
                    border-cyan-400/15
                  "
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
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

                  <div
                    className="
                      absolute

                      h-[240px]
                      w-[240px]

                      rounded-full

                      border
                      border-cyan-400/10
                    "
                  />

                  <div
                    className="
                      absolute

                      h-[180px]
                      w-[180px]

                      rounded-full

                      border
                      border-cyan-400/10
                    "
                  />

                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="
                      absolute

                      h-[160px]
                      w-[160px]

                      rounded-full

                      bg-cyan-400/10

                      blur-2xl
                    "
                  />

                  <motion.img
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    src={logo}
                    alt="logo"
                    className="
                      relative
                      z-10

                      h-32
                      w-32

                      object-contain

                      drop-shadow-[0_0_35px_rgba(0,229,255,0.35)]
                    "
                  />
                </div>
              </div>

              {/* BOTTOM */}

              <div
                className="
                  relative
                  z-10

                  grid
                  grid-cols-3

                  gap-5

                  px-8
                  pt-12
                "
              >
                {features.map(
                  (
                    feature
                  ) => {
                    const Icon =
                      feature.icon;

                    return (
                      <motion.div
                        whileHover={{
                          y: -5,
                        }}
                        key={
                          feature.title
                        }
                        className="
                          rounded-3xl

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
                            justify-center

                            h-12
                            w-12

                            rounded-2xl

                            bg-cyan-400/10
                          "
                        >
                          <Icon
                            size={22}
                            className="
                              text-cyan-300
                            "
                          />
                        </div>

                        <h3
                          className="
                            mt-5

                            text-lg
                            font-medium

                            text-white
                          "
                        >
                          {
                            feature.title
                          }
                        </h3>

                        <p
                          className="
                            mt-3

                            text-sm
                            leading-relaxed

                            text-slate-500
                          "
                        >
                          {
                            feature.description
                          }
                        </p>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;