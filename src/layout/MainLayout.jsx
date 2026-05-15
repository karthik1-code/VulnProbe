import { useState } from "react";

import { motion } from "framer-motion";

import Sidebar from "../components/sidebar/Sidebar";

function MainLayout({ children }) {
  const [open, setOpen] =
    useState(true);

  return (
    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[#030712]
      "
    >
      {/* Sidebar */}

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      {/* Main Content */}

      <motion.main
        animate={{
          marginLeft: open ? 320 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="
          relative

          min-h-screen

          transition-all
        "
      >
        {children}
      </motion.main>
    </div>
  );
}

export default MainLayout;