"use client";

import { useEffect, useRef, useState } from "react";

function buildTimeOptions() {
  const options = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const label = new Date(2000, 0, 1, h, m).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });
      options.push({ value, label });
    }
  }
  return options;
}

const OPTIONS = buildTimeOptions();

/** Same rationale as DatePicker: native <input type="time"> can't be
 * themed past its icon button, so this is a plain listbox instead. */
export default function TimePicker({ value, onChange, min, placeholder = "Select a time" }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const listRef = useRef(null);

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

  useEffect(() => {
    if (open && listRef.current) {
      const target =
        listRef.current.querySelector('[data-selected="true"]') ||
        listRef.current.querySelector('[data-enabled="true"]');
      target?.scrollIntoView({ block: "center" });
    }
  }, [open]);

  const selectedLabel = OPTIONS.find((o) => o.value === value)?.label;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-ink/10 bg-void px-4 py-3 text-left text-sm outline-none transition-colors focus:border-violet"
      >
        <span className={value ? "text-ivory" : "text-ivory/30"}>{selectedLabel || placeholder}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-violet">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          aria-label="Choose a time"
          className="absolute z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border border-ink/10 bg-void p-2 shadow-xl shadow-ink/10"
        >
          {OPTIONS.map((opt) => {
            const disabled = min ? opt.value < min : false;
            const selected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={disabled}
                data-selected={selected}
                data-enabled={!disabled}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selected
                    ? "bg-violet text-white"
                    : disabled
                    ? "cursor-not-allowed text-ivory/20"
                    : "text-ivory/80 hover:bg-plum"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}