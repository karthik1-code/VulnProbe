import {
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Download,
  Shield,
  Save,
  Trash2,
  Home,
  Info,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import api from "../services/api";

function Settings() {
  /*
    NAVIGATION
  */

  const navigate =
    useNavigate();

  /*
    AUTH
  */

  const { logout } =
    useAuth();

  /*
    STATES
  */

  const [
    autoExport,
    setAutoExport,
  ] = useState(false);

  /*
    TOGGLE
  */

  const Toggle = ({
    enabled,

    onChange,
  }) => {
    return (
      <button
        onClick={onChange}
        className={`
          relative

          h-7
          w-14

          rounded-full

          transition-all
          duration-300

          ${
            enabled
              ? "bg-cyan-400"
              : "bg-slate-700"
          }
        `}
      >
        <div
          className={`
            absolute
            top-1

            h-5
            w-5

            rounded-full

            bg-white

            transition-all
            duration-300

            ${
              enabled
                ? "left-8"
                : "left-1"
            }
          `}
        />
      </button>
    );
  };

  /*
    DELETE ACCOUNT
  */

  const handleDelete =
    async () => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to permanently delete your account?"
        );

      if (
        !confirmDelete
      ) {
        return;
      }

      try {
        /*
          DELETE USER
        */

        await api.delete(
          "/auth/delete"
        );

        /*
          CLEAR STORAGE
        */

        localStorage.clear();

        /*
          LOGOUT
        */

        logout();

        /*
          REDIRECT
        */

        navigate(
          "/register"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Unable to delete account"
        );
      }
    };

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
            PLATFORM SETTINGS
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
            System
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
              Controls
            </span>
          </h1>

          <p
            className="
              mt-5

              max-w-[760px]

              text-lg

              leading-relaxed

              text-slate-400
            "
          >
            Configure export systems,
            account management, and
            navigation preferences.
          </p>
        </div>

        {/* SETTINGS */}

        <div
          className="
            grid
            grid-cols-2

            gap-8
          "
        >
          {/* AUTO EXPORT */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              relative

              overflow-hidden

              rounded-[30px]

              border
              border-cyan-400/10

              bg-[#07111f]/80

              p-7

              backdrop-blur-2xl
            "
          >
            <div
              className="
                absolute
                top-[-50px]
                right-[-50px]

                h-[160px]
                w-[160px]

                rounded-full

                bg-cyan-400/10

                blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
                  flex
                  items-start
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-2xl

                    bg-cyan-400/10

                    text-cyan-300
                  "
                >
                  <Download
                    size={20}
                  />
                </div>

                <Toggle
                  enabled={
                    autoExport
                  }
                  onChange={() =>
                    setAutoExport(
                      !autoExport
                    )
                  }
                />
              </div>

              <h2
                className="
                  mt-6

                  text-2xl
                  font-semibold

                  text-white
                "
              >
                Automatic PDF Export
              </h2>

              <p
                className="
                  mt-3

                  leading-relaxed

                  text-slate-400
                "
              >
                Automatically export
                vulnerability reports
                after completed scans.
              </p>
            </div>
          </motion.div>

          {/* ABOUT */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            onClick={() =>
              navigate(
                "/about"
              )
            }
            className="
              cursor-pointer

              relative

              overflow-hidden

              rounded-[30px]

              border
              border-cyan-400/10

              bg-[#07111f]/80

              p-7

              backdrop-blur-2xl
            "
          >
            <div
              className="
                absolute
                top-[-50px]
                right-[-50px]

                h-[160px]
                w-[160px]

                rounded-full

                bg-cyan-400/10

                blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
                  flex
                  h-14
                  w-14

                  items-center
                  justify-center

                  rounded-2xl

                  bg-cyan-400/10

                  text-cyan-300
                "
              >
                <Info size={20} />
              </div>

              <h2
                className="
                  mt-6

                  text-2xl
                  font-semibold

                  text-white
                "
              >
                About VulnProbe
              </h2>

              <p
                className="
                  mt-3

                  leading-relaxed

                  text-slate-400
                "
              >
                Learn more about the
                VulnProbe cyber
                intelligence platform.
              </p>
            </div>
          </motion.div>

          {/* HOME */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            onClick={() =>
              navigate("/")
            }
            className="
              cursor-pointer

              relative

              overflow-hidden

              rounded-[30px]

              border
              border-cyan-400/10

              bg-[#07111f]/80

              p-7

              backdrop-blur-2xl
            "
          >
            <div
              className="
                absolute
                top-[-50px]
                right-[-50px]

                h-[160px]
                w-[160px]

                rounded-full

                bg-cyan-400/10

                blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
                  flex
                  h-14
                  w-14

                  items-center
                  justify-center

                  rounded-2xl

                  bg-cyan-400/10

                  text-cyan-300
                "
              >
                <Home size={20} />
              </div>

              <h2
                className="
                  mt-6

                  text-2xl
                  font-semibold

                  text-white
                "
              >
                Go To Home
              </h2>

              <p
                className="
                  mt-3

                  leading-relaxed

                  text-slate-400
                "
              >
                Navigate back to the
                VulnProbe home page.
              </p>
            </div>
          </motion.div>

          {/* DELETE */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            className="
              relative

              overflow-hidden

              rounded-[30px]

              border
              border-red-500/10

              bg-[#07111f]/80

              p-7

              backdrop-blur-2xl
            "
          >
            <div
              className="
                absolute
                top-[-50px]
                right-[-50px]

                h-[160px]
                w-[160px]

                rounded-full

                bg-red-500/10

                blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
                  flex
                  h-14
                  w-14

                  items-center
                  justify-center

                  rounded-2xl

                  bg-red-500/10

                  text-red-300
                "
              >
                <Trash2
                  size={20}
                />
              </div>

              <h2
                className="
                  mt-6

                  text-2xl
                  font-semibold

                  text-white
                "
              >
                Delete Account
              </h2>

              <p
                className="
                  mt-3

                  leading-relaxed

                  text-slate-400
                "
              >
                Permanently remove
                your VulnProbe account
                and all stored session
                information.
              </p>

              <button
                onClick={
                  handleDelete
                }
                className="
                  mt-6

                  rounded-2xl

                  bg-red-500/10

                  px-5
                  py-3

                  text-red-300

                  transition-all
                  duration-300

                  hover:bg-red-500/20
                "
              >
                Delete Profile
              </button>
            </div>
          </motion.div>
        </div>

        {/* SECURITY PANEL */}

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
            delay: 0.5,
          }}
          className="
            relative

            mt-10

            overflow-hidden

            rounded-[32px]

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
              bottom-[-80px]
              right-[-80px]

              h-[240px]
              w-[240px]

              rounded-full

              bg-emerald-400/10

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
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <Shield
                  className="
                    text-cyan-300
                  "
                  size={22}
                />

                <h2
                  className="
                    text-2xl
                    font-semibold

                    text-white
                  "
                >
                  Security Protection
                </h2>
              </div>

              <p
                className="
                  mt-4

                  max-w-[700px]

                  leading-relaxed

                  text-slate-400
                "
              >
                VulnProbe is actively
                protecting your session,
                authentication, and
                vulnerability intelligence
                systems.
              </p>
            </div>

            <button
              className="
                flex
                items-center

                gap-3

                rounded-2xl

                border
                border-cyan-400/20

                bg-cyan-400/10

                px-6
                py-4

                text-cyan-300
              "
            >
              <Save size={18} />

              Save Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Settings;