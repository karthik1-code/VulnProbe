import { motion } from "framer-motion";

import {
  ShieldCheck,
  Radar,
  ScanSearch,
  Database,
  Lock,
  Activity,
  ChevronRight,
} from "lucide-react";

function About() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Advanced Vulnerability Intelligence",
      description:
        "VulnProbe continuously analyzes systems to identify critical security weaknesses before attackers can exploit them.",
    },

    {
      icon: Radar,
      title: "Real-Time Threat Visibility",
      description:
        "Monitor infrastructure health with tactical analytics, severity tracking, and operational threat awareness.",
    },

    {
      icon: ScanSearch,
      title: "Automated Security Scanning",
      description:
        "Run intelligent scans that simulate enterprise-grade vulnerability assessment workflows and reporting systems.",
    },

    {
      icon: Database,
      title: "Centralized Reporting System",
      description:
        "Store and manage vulnerability intelligence through a structured reporting environment built for operational visibility.",
    },

    {
      icon: Lock,
      title: "Security-First Architecture",
      description:
        "Built with a cyber-security mindset using scalable architecture, protected routing, and enterprise dashboard patterns.",
    },

    {
      icon: Activity,
      title: "Live Tactical Analytics",
      description:
        "Visualize vulnerability trends, risk distributions, and scan intelligence through premium operational dashboards.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-140px] right-[-120px] h-[340px] w-[340px] rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/3 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-2"
        >
          {/* Left */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 backdrop-blur-xl">
              <ShieldCheck size={16} />
              Cyber Security Intelligence Platform
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-tight text-white">
              Understanding Security Before
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                Threats Become Breaches
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              VulnProbe is a tactical cyber-security vulnerability intelligence
              platform designed to help users identify, analyze, and understand
              potential security risks inside modern digital infrastructure.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500">
              In today’s digital world, even small vulnerabilities can become
              major attack vectors. VulnProbe focuses on operational visibility,
              security awareness, vulnerability tracking, and analytical threat
              reporting to help organizations strengthen their cyber defense
              posture.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="group flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                Explore Intelligence
                <ChevronRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-3 font-semibold text-emerald-300 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-400/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                Security Awareness
              </button>
            </div>
          </div>

          {/* Right Tactical Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-2xl"
          >
            <div className="absolute right-[-60px] top-[-60px] h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="absolute bottom-[-70px] left-[-70px] h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                    Threat Intelligence
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    Operational Security Awareness
                  </h2>
                </div>

                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-300">
                  <ShieldCheck size={28} />
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Why Vulnerability Monitoring Matters
                  </h3>

                  <p className="text-sm leading-7 text-zinc-400">
                    Modern cyber attacks often begin from overlooked security
                    weaknesses. Vulnerability intelligence helps security teams
                    proactively identify and reduce risks before exploitation
                    occurs.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Enterprise Security Visibility
                  </h3>

                  <p className="text-sm leading-7 text-zinc-400">
                    VulnProbe provides centralized operational visibility,
                    helping analysts track severity levels, scan activity, and
                    vulnerability trends through a tactical dashboard
                    environment.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Security Awareness & Prevention
                  </h3>

                  <p className="text-sm leading-7 text-zinc-400">
                    Awareness is one of the strongest defense mechanisms in
                    cyber-security. Understanding threats early dramatically
                    reduces the probability of breaches and infrastructure
                    compromise.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Platform Capabilities
            </p>

            <h2 className="mt-4 text-4xl font-black text-white">
              Built For Tactical Security Operations
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
              VulnProbe combines tactical visualization, vulnerability
              intelligence, and cyber-security awareness into a centralized
              operational environment designed for modern digital protection.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -6,
                  }}
                  className="group relative overflow-hidden rounded-[28px] border border-cyan-500/15 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]"
                >
                  <div className="absolute right-[-30px] top-[-30px] h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl transition-all duration-300 group-hover:bg-cyan-400/20" />

                  <div className="relative z-10">
                    <div className="mb-5 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-cyan-300">
                      <Icon size={26} />
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-4 leading-7 text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Awareness Section */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mt-24 overflow-hidden rounded-[36px] border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-2xl"
        >
          <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute bottom-[-100px] left-[-100px] h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Security Awareness Mission
            </p>

            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white">
              Cyber-Security Is Not Only About Detection —
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {" "}
                It’s About Prevention, Visibility, And Awareness.
              </span>
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-400">
              VulnProbe is designed to promote proactive security practices,
              operational visibility, and tactical threat understanding. By
              helping users recognize vulnerabilities earlier, organizations can
              significantly reduce attack surfaces and strengthen digital
              resilience.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;