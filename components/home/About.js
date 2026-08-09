
function About() {
  return (
    <section
      id="about"
      // Mobile: model is a FIXED full-viewport canvas centered via
      // HERO_TARGET_MOBILE in ScrollStory.js (not in document flow), so
      // "text below the model" is achieved with padding-top that reserves
      // roughly the vertical space the model occupies, rather than actual
      // flex stacking. pt-[46vh] is a first guess tuned against the
      // model's mobile y offset (0.95) — if you adjust one, re-check the
      // other so the text doesn't start under/over the model.
      className="relative flex min-h-screen flex-col items-center justify-start px-[8vw] pt-[46vh] pb-28 text-center md:flex-row md:items-center md:justify-start md:py-28 md:pt-28 md:text-left"
    >
      {/* text lives in the left ~55% on desktop; the right side is
          deliberately left empty — that's where the 3D model docks after
          the hero converge. On mobile the model is centered above instead,
          so this block is centered too. */}
      <div className="max-w-xl lg:max-w-2xl">
        <span className="mb-4 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet">
          ABOUT US
        </span>
        <h2 className="mb-7 font-display text-4xl font-bold tracking-tight text-ivory md:text-5xl">
          Built for brands that refuse
          <br />
          off-the-shelf limitations.
        </h2>
        <p className="mb-5 text-lg leading-relaxed text-ivory/70">
          We don&apos;t just write code, and we don&apos;t just run ads — we bridge the gap
          between engineering and growth.
        </p>
        <p className="text-lg leading-relaxed text-ivory/70">
          From custom enterprise software and scalable web platforms to proprietary AI model
          integration, we build the digital infrastructure your business needs to streamline
          operations. Then, we layer it with data-driven growth marketing to maximize your ROI.
          Whether you are automating complex business workflows or launching a high-volume unified
          commerce ecosystem, we deliver the technical edge and market traction required to
          dominate your industry.
        </p>
      </div>
    </section>
  );
}

export default About;