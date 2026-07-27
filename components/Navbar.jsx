"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < 90) {
        setCollapsed(false);
      } else {
        if (current > lastScroll) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div className="fixed left-1/2 top-1 z-50 -translate-x-1/2">
      <motion.div
        layout
        animate={{
          width: collapsed ? 540 : 980,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
        }}
        className="overflow-hidden rounded-full border border-ink/10 bg-void/60 backdrop-blur-md"
      >
        <div className="flex h-16 items-center justify-between px-8">
          {/* Logo */}
          <motion.img
            layout
            src="/logo2.png"
            alt="Kueaurex Solutions"
            className="h-7 w-auto flex-shrink-0"
          />

          {/* Navigation */}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.ul
                key="nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-9 font-display text-[13px] tracking-wide text-ivory/85"
              >
                <li className="cursor-pointer transition-colors hover:text-ivory">
                  Home
                </li>

                <li className="cursor-pointer transition-colors hover:text-ivory">
                  About us
                </li>

                <li className="cursor-pointer transition-colors hover:text-ivory">
                  Case Studies
                </li>
<Link href={'/services'}>
  <li className="cursor-pointer transition-colors hover:text-ivory">
                  Services
                </li>
</Link>
              
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Right Side */}
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 22,
            }}
            className="flex items-center gap-3"
          >
            <AnimatePresence>
              {collapsed && (
                <motion.button
                  key="book"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    x: 20,
                  }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full bg-ink/20 px-5 py-2 font-display text-[13px] tracking-wide text-ivory transition-colors hover:bg-ink/30"
                >
                  Book a call
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              layout
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              className="rounded-full border border-violet-dim px-5 py-2 font-display text-[13px] tracking-wide text-ivory transition-colors hover:border-violet hover:text-violet"
            >
              Contact us
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;