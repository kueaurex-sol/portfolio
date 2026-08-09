"use client";

import { useEffect, useRef, useState } from "react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function isoFor(year, month, day) {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function buildMonthGrid(year, month) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, iso: isoFor(year, month, d) });
  while (cells.length < 42) cells.push(null);
  return cells;
}

function formatDisplay(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Fully custom date picker — deliberately NOT <input type="date">. Native
 * date pickers only expose their icon button to CSS
 * (::-webkit-calendar-picker-indicator); the popup calendar itself — the
 * selected-day highlight included — ignores accent-color, color-scheme,
 * and everything else, so it can't actually be put on-theme. Building the
 * dropdown ourselves is the only way to fully theme it.
 */
export default function DatePicker({ value, onChange, min, placeholder = "Select a date" }) {
  const [open, setOpen] = useState(false);
  const seed = value || min || new Date().toISOString().slice(0, 10);
  const [seedYear, seedMonth] = seed.split("-").map(Number);
  const [viewYear, setViewYear] = useState(seedYear);
  const [viewMonth, setViewMonth] = useState(seedMonth - 1);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const cells = buildMonthGrid(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-ink/10 bg-void px-4 py-3 text-left text-sm outline-none transition-colors focus:border-violet"
      >
        <span className={value ? "text-ivory" : "text-ivory/30"}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-violet">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose a date"
          className="absolute z-30 mt-2 w-72 rounded-2xl border border-ink/10 bg-void p-4 shadow-xl shadow-ink/10"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrevMonth}
              aria-label="Previous month"
              className="rounded-lg p-1.5 text-ivory/50 transition-colors hover:bg-plum hover:text-ivory"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className="text-sm font-medium text-ivory">{monthLabel}</span>
            <button
              type="button"
              onClick={goNextMonth}
              aria-label="Next month"
              className="rounded-lg p-1.5 text-ivory/50 transition-colors hover:bg-plum hover:text-ivory"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-ivory/35">
            {WEEKDAYS.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((cell, i) => {
              if (!cell) return <span key={i} />;
              const disabled = min ? cell.iso < min : false;
              const selected = cell.iso === value;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() => {
                    onChange(cell.iso);
                    setOpen(false);
                  }}
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                    selected
                      ? "bg-violet text-white"
                      : disabled
                      ? "cursor-not-allowed text-ivory/20"
                      : "text-ivory/80 hover:bg-plum"
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3 text-xs">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="text-ivory/40 hover:text-ivory"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const t = new Date();
                const iso = isoFor(t.getFullYear(), t.getMonth(), t.getDate());
                if (!min || iso >= min) {
                  onChange(iso);
                  setOpen(false);
                }
              }}
              className="font-medium text-violet hover:underline"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}