import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { motion } from "framer-motion";

import {
  Shield,
  Activity,
  Globe,
  Mail,
  LogOut,
} from "lucide-react";

import {
  useAuth,
} from "../context/AuthContext";

function Profile() {
  /*
    AUTH
  */

  const {
    user,

    logout,
  } = useAuth();

  /*
    REPORTS
  */

  const [reports, setReports] =
    useState([]);

  /*
    FETCH REPORTS
  */

  useEffect(() => {
    const fetchReports =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axios.get(
              "http://localhost:5000/api/reports",

              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setReports(
            response.data
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchReports();
  }, []);

  /*
    INITIAL
  */

  const initial =
    user?.name?.charAt(0) ||
    "U";

  /*
    DYNAMIC STATS
  */

  const totalScans =
    reports.length;

  const threatsDetected =
    reports.reduce(
      (total, report) =>
        total +
        (report.vulnerabilities ||
          0),

      0
    );

  const uniqueTargets =
    new Set(
      reports.map(
        (report) =>
          report.target
      )
    ).size;

  /*
    STATS
  */

  const stats = [
    {
      icon:
        <Shield size={18} />,

      label:
        "TOTAL SCANS",

      value:
        totalScans,
    },

    {
      icon:
        <Activity size={18} />,

      label:
        "THREATS DETECTED",

      value:
        threatsDetected,
    },

    {
      icon:
        <Globe size={18} />,

      label:
        "TARGETS ANALYZED",

      value:
        uniqueTargets,
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
      {/* GLOW */}

      <div
        className="
          absolute
          top-[-220px]
          right-[-140px]

          h-[550px]
          w-[550px]

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-240px]
          left-[-140px]

          h-[500px]
          w-[500px]

          rounded-full

          bg-emerald-400/10

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10

          px-12
          py-10
        "
      >
        {/* HEADER */}

        <div className="mb-10">
          <p
            className="
              text-sm

              tracking-[0.25em]

              text-cyan-300
            "
          >
            USER PROFILE
          </p>

          <h1
            className="
              mt-4

              text-[58px]
              font-semibold

              leading-none

              text-white
            "
          >
            Security
            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                to-cyan-500

                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Identity
            </span>
          </h1>
        </div>

        {/* PROFILE CARD */}

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
            relative

            overflow-hidden

            rounded-[36px]

            border
            border-cyan-400/10

            bg-[#07111f]/80

            p-8

            backdrop-blur-2xl
          "
        >
          <div
            className="
              absolute
              top-[-80px]
              right-[-60px]

              h-[220px]
              w-[220px]

              rounded-full

              bg-cyan-400/10

              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10

              flex
              items-center
              justify-between
            "
          >
            {/* LEFT */}

            <div
              className="
                flex
                items-center
                gap-8
              "
            >
              {/* AVATAR */}

              <div
                className="
                  flex
                  items-center
                  justify-center

                  h-32
                  w-32

                  rounded-[32px]

                  border
                  border-cyan-400/20

                  bg-cyan-400/10

                  text-5xl
                  font-semibold

                  text-cyan-300
                "
              >
                {initial}
              </div>

              {/* INFO */}

              <div>
                <h2
                  className="
                    text-4xl
                    font-semibold

                    text-white
                  "
                >
                  {user?.name ||
                    "User"}
                </h2>

                <div
                  className="
                    mt-4

                    flex
                    items-center
                    gap-3

                    text-slate-400
                  "
                >
                  <Mail
                    size={16}
                  />

                  <span>
                    {user?.email}
                  </span>
                </div>

                <div
                  className="
                    mt-5

                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      h-3
                      w-3

                      rounded-full

                      bg-emerald-400
                    "
                  />

                  <span
                    className="
                      text-sm

                      text-emerald-300
                    "
                  >
                    Secure Session
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* LOGOUT */}

            <button
              onClick={logout}
              className="
                flex
                items-center
                gap-3

                rounded-2xl

                border
                border-red-500/20

                bg-red-500/10

                px-5
                py-4

                text-red-300
              "
            >
              <LogOut
                size={18}
              />

              Logout
            </button>
          </div>
        </motion.div>

        {/* STATS */}

        <div
          className="
            mt-8

            grid
            grid-cols-3

            gap-6
          "
        >
          {stats.map(
            (
              item,
              index
            ) => (
              <motion.div
                key={item.label}
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
                className="
                  relative

                  overflow-hidden

                  rounded-[28px]

                  border
                  border-cyan-400/10

                  bg-[#07111f]/80

                  p-6
                "
              >
                <div
                  className="
                    absolute
                    top-[-40px]
                    right-[-40px]

                    h-[120px]
                    w-[120px]

                    rounded-full

                    bg-cyan-400/10

                    blur-3xl
                  "
                />

                <div className="relative z-10">
                  <div
                    className="
                      flex
                      items-center
                      justify-center

                      h-12
                      w-12

                      rounded-2xl

                      bg-cyan-400/10

                      text-cyan-300
                    "
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="
                      mt-5

                      text-4xl
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

                      tracking-[0.15em]

                      text-slate-500
                    "
                  >
                    {item.label}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;