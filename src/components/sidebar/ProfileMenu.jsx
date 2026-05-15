import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

import {
  ChevronUp,
  LogOut,
  User,
  Settings,
} from "lucide-react";

function ProfileMenu() {
  const [open, setOpen] =
    useState(false);

  const navigate = useNavigate();

  /*
    GLOBAL AUTH STATE
  */

  const {
    user,
    logout,
  } = useAuth();

  return (
    <div className="relative">
      {/* Main Profile Button */}

      <motion.button
        whileTap={{
          scale: 0.98,
        }}
        onClick={() =>
          setOpen(!open)
        }
        className="
          group
          relative

          flex
          items-center
          justify-between

          w-full

          overflow-hidden

          rounded-2xl

          border
          border-cyan-400/10

          bg-white/[0.03]

          px-4
          py-4

          backdrop-blur-xl

          transition-all
          duration-300

          hover:border-cyan-400/20
          hover:bg-cyan-400/10
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            inset-0

            opacity-0

            bg-cyan-400/5

            blur-xl

            transition-opacity
            duration-300

            group-hover:opacity-100
          "
        />

        {/* Left */}

        <div
          className="
            relative
            z-10

            flex
            items-center
            gap-3
          "
        >
          {/* Avatar */}

          <div
            className="
              flex
              items-center
              justify-center

              h-11
              w-11

              rounded-xl

              bg-cyan-400/10

              text-cyan-300

              shadow-[0_0_20px_rgba(0,229,255,0.15)]
            "
          >
            <User size={18} />
          </div>

          {/* User Info */}

          <div className="text-left">
            <h3
              className="
                text-sm
                font-medium

                text-white
              "
            >
              {user?.name ||
                "Guest User"}
            </h3>

            <p
              className="
                mt-1

                text-xs

                text-slate-500
              "
            >
              {user?.email ||
                "guest@vulnprobe.ai"}
            </p>
          </div>
        </div>

        {/* Arrow */}

        <motion.div
          animate={{
            rotate: open
              ? 180
              : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            relative
            z-10

            text-slate-400
          "
        >
          <ChevronUp size={18} />
        </motion.div>
      </motion.button>

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              absolute
              bottom-[calc(100%+14px)]
              left-0

              w-full

              overflow-hidden

              rounded-2xl

              border
              border-cyan-400/10

              bg-[#08111d]/90

              p-2

              backdrop-blur-2xl

              shadow-[0_0_40px_rgba(0,229,255,0.08)]
            "
          >
            {/* Top Info */}

            <div
              className="
                rounded-xl

                border
                border-cyan-400/10

                bg-white/[0.03]

                px-4
                py-3
              "
            >
              <p
                className="
                  text-sm
                  font-medium

                  text-white
                "
              >
                {user?.name ||
                  "Guest User"}
              </p>

              <p
                className="
                  mt-1

                  text-xs

                  text-slate-500
                "
              >
                {user?.email ||
                  "guest@vulnprobe.ai"}
              </p>
            </div>

            {/* Menu */}

            <div
              className="
                mt-2

                flex
                flex-col

                gap-1
              "
            >
              {/* Profile */}

              <button
                onClick={() => {
                  navigate(
                    "/profile"
                  );

                  setOpen(false);
                }}
                className="
                  flex
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  text-slate-300

                  transition-all
                  duration-300

                  hover:bg-white/[0.04]
                  hover:text-cyan-300
                "
              >
                <User size={16} />

                <span className="text-sm">
                  Profile
                </span>
              </button>

              {/* Settings */}

              <button
                onClick={() => {
                  navigate(
                    "/settings"
                  );

                  setOpen(false);
                }}
                className="
                  flex
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  text-slate-300

                  transition-all
                  duration-300

                  hover:bg-white/[0.04]
                  hover:text-cyan-300
                "
              >
                <Settings
                  size={16}
                />

                <span className="text-sm">
                  Settings
                </span>
              </button>

              {/* Sign Out */}

              <button
                onClick={() => {
                  logout();

                  navigate(
                    "/login"
                  );

                  setOpen(false);
                }}
                className="
                  flex
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  text-red-300

                  transition-all
                  duration-300

                  hover:bg-red-500/10
                "
              >
                <LogOut size={16} />

                <span className="text-sm">
                  Sign Out
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileMenu;