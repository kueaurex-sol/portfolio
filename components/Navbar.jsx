
"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GooeyNav from "./GooeyNav/GooeyNav";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Services", href: "/services" }
];

function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < 90) {
        setCollapsed(false);
      } else {
        setCollapsed(current > lastScroll);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // close the drawer automatically if the viewport grows past mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ---------- Desktop navbar (lg and up) ---------- */}
      <div className="fixed left-1/2 top-1 z-50 hidden -translate-x-1/2 lg:block">
        <motion.div
          layout
          animate={{ width: collapsed ? 540 : 980 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className="overflow-hidden rounded-full border border-ink/10 bg-void/60 backdrop-blur-md"
        >
          <div className="flex h-16 items-center justify-between px-8">
            <Link href="/">
              <motion.img
                layout
                src="/logo2.png"
                alt="Kueaurex Solutions"
                className="h-7 w-auto flex-shrink-0"
              />
            </Link>

            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  key="nav"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="font-display text-[13px] tracking-wide"
                >
                  <GooeyNav items={NAV_ITEMS} />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="flex items-center gap-3"
            >
              <AnimatePresence>
                {collapsed && (
                  <motion.button
                    key="book"
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-full bg-ink/20 px-5 py-2 font-display text-[13px] tracking-wide text-ivory transition-colors hover:bg-ink/30"
                  >
                    Book a call
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button
                layout
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="rounded-full border border-violet-dim px-5 py-2 font-display text-[13px] tracking-wide text-ivory transition-colors hover:border-violet hover:text-violet"
              >
                Contact us
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ---------- Mobile / tablet top bar (below lg) ---------- */}
      <div className="fixed inset-x-4 top-3 z-50 flex items-center justify-between rounded-full border border-ink/10 bg-void/70 px-5 py-3 backdrop-blur-md lg:hidden">
        <Link href="/">
          <img src="/logo2.png" alt="Kueaurex Solutions" className="h-6 w-auto" />
        </Link>

        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(o => !o)}
          className="relative flex h-9 w-9 flex-col items-center justify-center gap-[6px]"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-[2px] w-6 rounded-full bg-violet"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block h-[2px] w-6 rounded-full bg-violet"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-[2px] w-6 rounded-full bg-violet"
          />
        </button>
      </div>

      {/* ---------- Mobile drawer + backdrop ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[78%] max-w-sm flex-col bg-void px-8 py-8 shadow-2xl lg:hidden"
            >
              <div className="mb-12 flex items-center justify-between">
                <img src="/logo2.png" alt="Kueaurex Solutions" className="h-6 w-auto" />
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center text-2xl text-violet"
                >
                  ×
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block border-b border-ink/10 py-4 font-display text-lg tracking-wide transition-colors ${
                          isActive ? "text-violet" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-auto rounded-full border border-violet-dim px-5 py-3 font-display text-[13px] tracking-wide text-ink transition-colors hover:border-violet hover:text-violet"
              >
                Contact us
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;