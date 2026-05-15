import { motion } from "framer-motion";

import {
  Home,
  Search,
  LayoutDashboard,
  FileText,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import SidebarItem from "./SidebarItem";

import ProfileMenu from "./ProfileMenu";

import logo from "../../assets/logo1.png";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      {/* Toggle Button */}

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => setOpen(!open)}
        className="
          fixed
          top-6
          left-6

          z-[100]

          flex
          items-center
          justify-center

          h-11
          w-11

          rounded-xl

          border
          border-cyan-400/10

          bg-[#081120]/80

          backdrop-blur-xl

          text-cyan-300

          shadow-[0_0_20px_rgba(0,229,255,0.08)]
        "
      >
        {open ? (
          <ChevronLeft size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </motion.button>

      {/* Sidebar */}

      <motion.aside
        animate={{
          x: open ? 0 : -320,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="
          fixed
          left-0
          top-0

          z-50

          h-screen
          w-[320px]

          overflow-hidden

          border-r
          border-cyan-400/10

          bg-[#060b16]/85

          backdrop-blur-2xl

          flex
          flex-col

          px-6
          py-7
        "
      >
        {/* Top Glow */}

        <div
          className="
            absolute
            top-[-120px]
            left-[-60px]

            h-[260px]
            w-[260px]

            rounded-full

            bg-cyan-400/10

            blur-3xl
          "
        />

        {/* Bottom Glow */}

        <div
          className="
            absolute
            bottom-[-120px]
            right-[-60px]

            h-[240px]
            w-[240px]

            rounded-full

            bg-emerald-400/10

            blur-3xl
          "
        />

        {/* Glass Reflection */}

        <div
          className="
            absolute
            inset-0

            bg-[linear-gradient(
              120deg,
              rgba(255,255,255,0.04),
              transparent_40%
            )]

            pointer-events-none
          "
        />

        {/* Content */}

        <div className="relative z-10 flex flex-col h-full">
          {/* Brand */}

          <div
            className="
              mt-12
              mb-10

              flex
              items-center

              gap-1
            "
          >
            {/* Logo */}

            <div
              className="
                h-20
                w-20

                flex
                items-center
                justify-center

                shrink-0
              "
            >
              <img
                src={logo}
                alt="logo"
                className="
                  h-16
                  w-16

                  scale-[1.9]

                  object-contain

                  drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]
                "
              />
            </div>

            {/* Text */}

            <div>
              <h1
                className="
                  text-[34px]
                  font-semibold

                  leading-none

                  bg-gradient-to-r
                  from-cyan-200
                  to-cyan-500

                  bg-clip-text
                  text-transparent
                "
              >
                VulnProbe
              </h1>

              <p
                className="
                  mt-1

                  text-[13px]

                  text-slate-500
                "
              >
                Threat Intelligence System
              </p>
            </div>
          </div>

          {/* Navigation + Bottom */}

          <div className="flex flex-col h-full">
            {/* Navigation */}

            <div className="flex flex-col gap-2">
              <SidebarItem
                icon={<Home size={20} />}
                label="Home"
                active={location.pathname === "/"}
                onClick={() => navigate("/")}
              />

              <SidebarItem
                icon={<Search size={20} />}
                label="Scanner"
                active={
                  location.pathname ===
                  "/scanner"
                }
                onClick={() =>
                  navigate("/scanner")
                }
              />

              <SidebarItem
                icon={
                  <LayoutDashboard size={20} />
                }
                label="Dashboard"
                active={
                  location.pathname ===
                  "/dashboard"
                }
                onClick={() =>
                  navigate("/dashboard")
                }
              />

              <SidebarItem
                icon={<FileText size={20} />}
                label="Reports"
                active={
                  location.pathname ===
                  "/reports"
                }
                onClick={() =>
                  navigate("/reports")
                }
              />

              <SidebarItem
                icon={<Shield size={20} />}
                label="About"
                active={
                  location.pathname ===
                  "/about"
                }
                onClick={() =>
                  navigate("/about")
                }
              />
            </div>

            {/* Bottom Profile */}

            <div className="mt-auto pt-8">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;