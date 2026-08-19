

import RotatingText from "./RotatingText";
import Link from "next/link";

function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden px-[6vw] py-16 sm:px-[7vw] sm:py-20 md:h-[92vh] md:px-[8vw] md:py-24"
    >
      <h2 className="mb-10 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-ivory sm:text-3xl sm:leading-tight md:mb-16 md:text-4xl">
        <span className="lg:flex lg:flex-wrap md:flex md:flex-wrap items-center gap-2">
          Let&apos;s build your next
          <br className="lg:hidden md:hidden block"/>
          <RotatingText
            texts={["Experiential", "Branding", "Digital"]}
            mainClassName=" text-[#a716d6] overflow-hidden py-0.5 "
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
            splitBy="characters"
            auto
            loop
          />
        </span>
        project together.
      </h2>

      <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-6 text-sm sm:grid-cols-3 sm:gap-8 sm:pt-8 md:grid-cols-4 md:pt-10">
        <div>
          <p className="mb-3 border-b-2 border-dotted font-mono text-[11px] tracking-[2px] text-ivory/40">
            GO DEEPER
          </p>
          <ul className="space-y-2 text-ivory/70">
            <Link href={"/case-studies"}>
            <li>Projects</li>
            </Link>
            <Link href={"/services"}> <li>Services</li>
            </Link>
           
          </ul>
        </div>
        <div>
          <p className="mb-3 border-b-2 border-dotted font-mono text-[11px] tracking-[2px] text-ivory/40">
            ELSEWHERE
          </p>
          <ul className="space-y-2 text-ivory/70">
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>X</li>
          </ul>
        </div>
        {/* col-span-2 on the smallest screens only — with 3 groups in a
            2-col grid this one would otherwise land alone in the left
            column with a lopsided gap where a 4th item never was. */}
        <div className="col-span-2 sm:col-span-1">
          <p className="mb-3 border-b-2 border-dotted font-mono text-[11px] tracking-[2px] text-ivory/40">
            CONTACT
          </p>
          <p className="text-ivory/70">kueaurexsol@gmail.com</p>
        </div>
      </div>

      <div className="mt-10 border-t border-dotted pt-4 text-sm text-ivory sm:mt-12 sm:text-base md:mt-12">
        HYDERABAD, India
      </div>

      {/* mobile + tablet: the wordmark sits in normal document flow,
          sized off the viewport width (with a clamp so it can't run away
          on an unusually wide tablet) instead of the fixed text-9xl the
          desktop version bleeds off the bottom edge with. */}
      <div className="mt-14 flex items-center justify-center md:hidden">
        <span className="text-[clamp(2.75rem,14vw,6rem)] font-black leading-none tracking-wide text-ivory">
          KU<span className="text-violet">E</span>AURE
          <span className="text-violet">X</span>
        </span>
      </div>

      {/* desktop: original oversized bleed, unchanged — relies on the
          fixed md:h-[92vh] above to have room for it. */}
      <div className="absolute -bottom-8 right-60 hidden w-full items-center justify-center md:flex">
        <span className="font-black text-9xl tracking-[2px] text-ivory">
          KU<span className="text-violet">E</span>AURE
          <span className="text-violet">X</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;