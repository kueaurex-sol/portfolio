
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import GradientText from "@/components/GradientText";

const FAQS = [
  {
    n: "01",
    q: "How do you guarantee that a complex project won't suffer from \"scope creep\" or budget overruns?",
    a: "We mitigate this risk entirely during Phase 1 (Scoping & Strategy). Before any development contract is signed, we deliver a granular Technical Specification Document that defines exactly what is \"in scope\" and \"out of scope.\"",
  },
  {
    n: "02",
    q: "We have complex legacy software. Can you integrate newer AI models and modern apps without breaking our existing systems?",
    a: "Absolutely. We specialize in ecosystem-wide integration — our architects build secure, middle-tier APIs and custom web hooks that extract data from your legacy databases and feed them safely into modern applications or custom AI models, so your day-to-day business continuity stays uninterrupted.",
  },
  { n: "03", q: "PLACEHOLDER — replace with your real question here.", a: "PLACEHOLDER — replace with your real answer here." },
  { n: "04", q: "PLACEHOLDER — replace with your real question here.", a: "PLACEHOLDER — replace with your real answer here." },
  { n: "05", q: "PLACEHOLDER — replace with your real question here.", a: "PLACEHOLDER — replace with your real answer here." },
];

function FaqItem({ item }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const root = el.closest("[data-faq-scroll]");
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting), // toggles both ways, replays every pass
      { root, threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex gap-6 border-b border-ivory/10 py-10 transition-all duration-700 ease-out first:pt-0 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
      }`}
    >
      <span className="font-display lg:text-3xl md:text-3xl text-lg font-bold text-violet/60">{item.n}</span>
      <div>
        <p className="mb-3 font-display lg:text-3xl md:text-3xl text-lg font-medium text-ivory ">{item.q}</p>
        <p className="lg:text-sm md:text-sm text-xs leading-relaxed text-ivory/60 ">
          <span className="text-violet/80">The Answer: </span>
          {item.a}
        </p>
      </div>
    </div>
  );
}

function Faq() {
  const wrapperRef = useRef(null);
  const paneRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const pane = paneRef.current;
    if (!wrapper || !pane) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduce);
    if (reduce) return; // reduced-motion users get a plain native-scroll pane instead

    // Size the extra scroll distance off what the pane actually overflows
    // by — however many FAQs are in the array, however tall each renders —
    // instead of a hardcoded guess like the old `items.length * 60%`.
    const setWrapperHeight = () => {
      const overflow = Math.max(0, pane.scrollHeight - pane.clientHeight);
      wrapper.style.height = `calc(100vh + ${overflow}px)`;
    };

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      // Recomputed from the wrapper's actual position every time, not
      // accumulated — so no matter how fast you scroll, the pane always
      // lands exactly where that scroll position says it should.
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      pane.scrollTop = progress * (pane.scrollHeight - pane.clientHeight);
    };

    setWrapperHeight();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setWrapperHeight);
    document.fonts?.ready?.then(() => {
      setWrapperHeight();
      onScroll();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setWrapperHeight);
    };
  }, []);

  return (
    <section ref={wrapperRef} id="faq" className="relative bg-void" style={{ height: "100vh" }}>
      <div className="sticky top-0 flex h-screen overflow-hidden">
        <div className="flex w-[28vw] md:min-w-[130px] lg:min-w-[130px] shrink-0 items-center justify-center border-r border-ivory/10">
          <GradientText
            colors={["#A716D6", "#D9A6F5", "#7C11A3"]}
            animationSpeed={7}
            showBorder={false}
            className="-rotate-90 whitespace-nowrap font-display md:text-6xl text-3xl font-bold tracking-tight lg:text-8xl"
          >
            FAQ
          </GradientText>
        </div>

        <div
          ref={paneRef}
          data-faq-scroll
          className={`relative h-screen flex-1 lg:px-[6vw] lg:py-[8vh] md:px-[6vw] md:py-[8vh] px-[3vw] py-[4vh] ${
            reduceMotion ? "overflow-y-auto" : "overflow-hidden"
          }`}
        >
          <div className="mx-auto max-w-2xl">
            {FAQS.map((item) => (
              <FaqItem key={item.n} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;