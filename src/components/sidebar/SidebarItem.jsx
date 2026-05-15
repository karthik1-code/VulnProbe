import { motion } from "framer-motion";

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        x: 5,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        group

        relative

        flex
        items-center
        gap-4

        w-full

        overflow-hidden

        rounded-2xl

        border

        px-5
        py-4

        cursor-pointer

        backdrop-blur-xl

        transition-all
        duration-300

        ${
          active
            ? `
              border-cyan-400/20

              bg-cyan-400/10

              text-cyan-300

              shadow-[0_0_20px_rgba(0,229,255,0.08)]
            `
            : `
              border-transparent

              bg-white/[0.02]

              text-slate-400

              hover:border-cyan-400/10
              hover:bg-white/[0.04]
              hover:text-white
            `
        }
      `}
    >
      {/* Background Glow */}

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

      {/* Left Beam */}

      <div
        className={`
          absolute
          left-0
          top-0

          h-full
          w-[3px]

          rounded-full

          transition-all
          duration-300

          ${
            active
              ? "bg-cyan-400"
              : "bg-transparent group-hover:bg-cyan-400/40"
          }
        `}
      />

      {/* Icon */}

      <div
        className="
          relative
          z-10

          transition-transform
          duration-300

          group-hover:scale-110
        "
      >
        {icon}
      </div>

      {/* Label */}

      <span
        className="
          relative
          z-10

          text-[15px]
          font-medium

          tracking-wide
        "
      >
        {label}
      </span>
    </motion.button>
  );
}

export default SidebarItem;