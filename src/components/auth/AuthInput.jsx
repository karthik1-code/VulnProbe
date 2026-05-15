import { motion } from "framer-motion";

function AuthInput({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
}) {
  return (
    <div>
      {/* Label */}

      <label
        className="
          mb-3
          block

          text-sm

          tracking-wide

          text-slate-400
        "
      >
        {label}
      </label>

      {/* Wrapper */}

      <motion.div
        className="
          group

          relative

          overflow-hidden

          rounded-2xl

          border
          border-cyan-400/10

          bg-white/[0.03]

          backdrop-blur-xl

          transition-all
          duration-300

          focus-within:border-cyan-400/25
          focus-within:shadow-[0_0_30px_rgba(0,229,255,0.08)]
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

            group-focus-within:opacity-100
          "
        />

        {/* Content */}

        <div
          className="
            relative
            z-10

            flex
            items-center
          "
        >
          {/* Icon */}

          {icon && (
            <div
              className="
                pl-5

                text-slate-500

                transition-colors
                duration-300

                group-focus-within:text-cyan-300
              "
            >
              {icon}
            </div>
          )}

          {/* Input */}

          <input
            type={type}
            placeholder={
              placeholder
            }
            value={value}
            onChange={onChange}
            className="
              w-full

              bg-transparent

              px-5
              py-4

              text-white

              outline-none

              placeholder:text-slate-600
            "
          />
        </div>
      </motion.div>
    </div>
  );
}

export default AuthInput;