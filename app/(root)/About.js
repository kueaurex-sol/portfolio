// function About() {
//   return (
//     <section id="about" className="relative flex min-h-screen items-center px-[8vw] py-28">
//       <div className="max-w-3xl">
//         <span className="mb-4 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet">
//           ABOUT US
//         </span>
//         <h2 className="mb-7 font-display text-4xl font-bold tracking-tight text-ivory md:text-5xl">
//           Built for brands that refuse
//           <br />
//           off-the-shelf limitations.
//         </h2>
//         <p className="mb-5 text-lg leading-relaxed text-ivory/70">
//           We don&apos;t just write code, and we don&apos;t just run ads — we bridge the gap
//           between engineering and growth.
//         </p>
//         <p className="text-lg leading-relaxed text-ivory/70">
//           From custom enterprise software and scalable web platforms to proprietary AI model
//           integration, we build the digital infrastructure your business needs to streamline
//           operations. Then, we layer it with data-driven growth marketing to maximize your ROI.
//           Whether you are automating complex business workflows or launching a high-volume unified
//           commerce ecosystem, we deliver the technical edge and market traction required to
//           dominate your industry.
//         </p>
//       </div>
//     </section>
//   );
// }

// export default About;
function About() {
  return (
    <section id="about" className="relative flex min-h-screen items-center px-[8vw] py-28">
      {/* text lives in the left ~55%; the right side is deliberately left
          empty — that's where the 3D model docks after the hero converge */}
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