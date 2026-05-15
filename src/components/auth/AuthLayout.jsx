import { motion } from "framer-motion";

import logo from "../../assets/logo1.png";

function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        relative

        flex
        min-h-screen

        items-center
        justify-center

        overflow-hidden

        bg-[#030712]

        px-6
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          absolute
          top-[-220px]
          right-[-120px]

          h-[520px]
          w-[520px]

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

          h-[480px]
          w-[480px]

          rounded-full

          bg-emerald-400/10

          blur-3xl
        "
      />

      {/* Grid Overlay */}

      <div
        className="
          absolute
          inset-0

          opacity-[0.04]

          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]

          bg-[size:42px_42px]
        "
      />

      {/* Main Card */}

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

          w-full
          max-w-[520px]

          overflow-hidden

          rounded-[36px]

          border
          border-cyan-400/10

          bg-[#07111f]/80

          p-8

          backdrop-blur-2xl

          shadow-[0_0_60px_rgba(0,229,255,0.08)]
        "
      >
        {/* Card Glow */}

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

        {/* Reflection */}

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

        <div className="relative z-10">
          {/* Logo */}

          <div className="flex justify-center">
            <img
              src={logo}
              alt="logo"
              className="
                h-20
                w-20

                object-contain

                drop-shadow-[0_0_30px_rgba(0,229,255,0.35)]
              "
            />
          </div>

          {/* Heading */}

          <div className="mt-6 text-center">
            <h1
              className="
                text-4xl
                font-semibold

                text-white
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-3

                leading-relaxed

                text-slate-400
              "
            >
              {subtitle}
            </p>
          </div>

          {/* Form Content */}

          <div className="mt-8">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;