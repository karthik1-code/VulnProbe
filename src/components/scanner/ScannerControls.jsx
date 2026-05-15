import {
  motion,
} from "framer-motion";

import {
  Radar,
  Shield,
  Activity,
} from "lucide-react";

function ScannerControls({
  target,
  setTarget,

  scanType,
  setScanType,

  startScan,

  isScanning,

  scanComplete,
}) {
  /*
    VALID TARGET
  */

  const validTarget =
    target.startsWith(
      "http://"
    ) ||

    target.startsWith(
      "https://"
    );

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
        duration: 0.5,
      }}
      className="
        relative

        overflow-hidden

        rounded-[28px]

        border
        border-cyan-400/10

        bg-[#07111f]/75

        p-6

        backdrop-blur-2xl

        shadow-[0_0_50px_rgba(0,229,255,0.05)]
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          absolute
          top-[-80px]
          right-[-40px]

          h-[180px]
          w-[180px]

          rounded-full

          bg-cyan-400/10

          blur-3xl
        "
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0

          opacity-10

          bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]

          bg-[size:40px_40px]
        "
      />

      {/* Content */}

      <div className="relative z-10">
        {/* Header */}

        <div
          className="
            mb-8

            flex
            items-start
            justify-between
          "
        >
          <div>
            <p
              className="
                text-sm

                tracking-[0.25em]

                text-cyan-300
              "
            >
              VULNPROBE SCANNER
            </p>

            <h1
              className="
                mt-3

                text-[42px]
                font-semibold

                leading-none

                text-white
              "
            >
              Tactical Scan Engine
            </h1>

            <p
              className="
                mt-3

                max-w-2xl

                text-slate-400
              "
            >
              Execute advanced
              reconnaissance and
              intelligence analysis
              against live targets in
              real-time.
            </p>
          </div>

          {/* Status */}

          <div
            className="
              flex
              items-center
              gap-3

              rounded-2xl

              border
              border-cyan-400/10

              bg-cyan-400/5

              px-4
              py-3
            "
          >
            <div
              className={`
                h-3
                w-3

                rounded-full

                ${
                  isScanning
                    ? `
                      animate-pulse
                      bg-cyan-400
                    `
                    : `
                      bg-emerald-400
                    `
                }
              `}
            />

            <div>
              <p
                className="
                  text-xs
                  uppercase

                  tracking-widest

                  text-slate-500
                "
              >
                Engine Status
              </p>

              <p
                className="
                  text-sm

                  text-white
                "
              >
                {isScanning
                  ? "Running Scan"
                  : "Ready"}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}

        <div
          className="
            grid
            grid-cols-[1.5fr_0.9fr_auto]

            gap-5
          "
        >
          {/* URL INPUT */}

          <div>
            <label
              className="
                mb-3
                block

                text-sm

                text-slate-400
              "
            >
              TARGET URL
            </label>

            <div className="relative">
              <Radar
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-cyan-300
                "
              />

              <input
                type="text"
                value={target}
                onChange={(e) =>
                  setTarget(
                    e.target.value
                  )
                }
                placeholder="https://example.com"
                disabled={isScanning}
                className="
                  w-full

                  rounded-2xl

                  border
                  border-cyan-400/10

                  bg-white/[0.03]

                  py-4
                  pl-12
                  pr-5

                  text-white

                  outline-none

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  disabled:opacity-50

                  focus:border-cyan-400/30

                  focus:shadow-[0_0_25px_rgba(0,229,255,0.15)]
                "
              />
            </div>

            {/* Validation */}

            <div
              className="
                mt-3

                flex
                items-center
                gap-2
              "
            >
              <div
                className={`
                  h-2
                  w-2

                  rounded-full

                  ${
                    validTarget
                      ? `
                        bg-emerald-400
                      `
                      : `
                        bg-rose-400
                      `
                  }
                `}
              />

              <p
                className="
                  text-xs

                  text-slate-500
                "
              >
                {validTarget
                  ? "Valid target structure detected"
                  : "Target must begin with http:// or https://"}
              </p>
            </div>
          </div>

          {/* SCAN TYPE */}

          <div>
            <label
              className="
                mb-3
                block

                text-sm

                text-slate-400
              "
            >
              INTELLIGENCE MODE
            </label>

            <div className="relative">
              <Shield
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-cyan-300
                "
              />

              <select
                value={scanType}
                onChange={(e) =>
                  setScanType(
                    e.target.value
                  )
                }
                disabled={isScanning}
                className="
                  w-full

                  appearance-none

                  rounded-2xl

                  border
                  border-cyan-400/10

                  bg-[#0b1625]

                  py-4
                  pl-12
                  pr-5

                  text-white

                  outline-none

                  transition-all
                  duration-300

                  disabled:opacity-50

                  focus:border-cyan-400/30
                "
              >
                <option>
                  Full Intelligence Scan
                </option>

                <option>
                  Quick Recon Scan
                </option>

                <option>
                  Infrastructure Analysis
                </option>

                <option>
                  Header Security Audit
                </option>

                <option>
                  Technology Fingerprinting
                </option>
              </select>
            </div>
          </div>

          {/* BUTTON */}

          <div className="flex items-end">
            <motion.button
              whileHover={{
                scale:
                  !isScanning &&
                  validTarget
                    ? 1.03
                    : 1,
              }}
              whileTap={{
                scale:
                  !isScanning &&
                  validTarget
                    ? 0.97
                    : 1,
              }}
              disabled={
                isScanning ||
                !validTarget
              }
              onClick={startScan}
              className={`
                relative

                flex
                items-center
                gap-3

                overflow-hidden

                rounded-2xl

                px-8
                py-4
                pl-12
                pr-5
                font-medium

                transition-all
                duration-300

                ${
                  scanComplete
                    ? `
                      bg-emerald-400
                      text-black
                    `
                    : isScanning
                    ? `
                      bg-cyan-300/70
                      text-black
                      cursor-not-allowed
                    `
                    : `
                      bg-cyan-400
                      text-black
                      hover:shadow-[0_0_35px_rgba(0,229,255,0.35)]
                    `
                }
              `}
            >
              {/* Shine */}

              {!isScanning && (
                <div
                  className="
                    absolute
                    inset-0

                    bg-[linear-gradient(
                      120deg,
                      transparent,
                      rgba(255,255,255,0.4),
                      transparent
                    )]

                    translate-x-[-120%]

                    hover:translate-x-[120%]

                    transition-transform
                    duration-1000
                  "
                />
              )}

              <Activity
                size={18}
                className="
                  relative
                  z-10
                "
              />

              <span className="relative z-10">
                {scanComplete
                  ? "Scan Complete"
                  : isScanning
                  ? "Executing..."
                  : "Launch Scan"}
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ScannerControls;