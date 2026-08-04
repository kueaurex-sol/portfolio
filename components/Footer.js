import RotatingText from "./RotatingText";
function Footer() {
  return (
    <footer
      id="footer"
      className="relative px-[8vw] py-24 h-[92vh] overflow-hidden"
    >
      <h2 className=" mb-16 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ivory md:text-4xl">
       <span className="flex gap-2"> Let&apos;s build your next   <RotatingText
          texts={["Experiential", "Branding", "Digital"]}
          mainClassName="px-2 sm:px-2 md:px-3  text-[#a716d6] overflow-hidden py-0.5  justify-center"
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
        /> </span>
      
        project together.
      </h2>

      <div className="grid grid-cols-2 gap-8 pt-10 text-sm md:grid-cols-4">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[2px] text-ivory/40 border-b-2 border-dotted">
            GO DEEPER
          </p>
          <ul className="space-y-2 text-ivory/70">
            <li>Projects</li>
            <li>Services</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[2px] text-ivory/40 border-b-2 border-dotted">
            ELSEWHERE
          </p>
          <ul className="space-y-2 text-ivory/70">
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>X</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[2px] text-ivory/40 border-b-2 border-dotted">
            CONTACT
          </p>
          <p className="text-ivory/70">kueaurexsol@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-dotted mt-12 text-ivory">
        HYDERABAD,India
      </div>
      <div className="mt-20 flex items-center justify-center absolute -bottom-8 ">
        <span className="font-black text-9xl tracking-[2px] text-ivory">
          KU<span className="text-violet">E</span>AURE
          <span className="text-violet">X</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
