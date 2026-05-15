import { motion } from "framer-motion";

function GlassPanel({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              scale: 1.01,
            }
          : {}
      }
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className={`
        relative
        overflow-hidden

        rounded-[28px]

        border
        border-cyan-400/10

        bg-white/[0.04]

        backdrop-blur-2xl

        shadow-[0_8px_32px_rgba(0,0,0,0.35)]

        before:absolute
        before:inset-0

        before:bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_40%)]

        before:pointer-events-none

        ${className}
      `}
    >
      {/* Cyan Ambient Glow */}

      <div
        className="
          absolute
          -top-20
          right-0

          h-40
          w-40

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      {/* Green Ambient Glow */}

      <div
        className="
          absolute
          bottom-0
          left-0

          h-32
          w-32

          rounded-full

          bg-emerald-400/10

          blur-3xl
        "
      />

      {/* Content */}

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default GlassPanel;