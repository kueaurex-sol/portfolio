function Footer() {
  return (
    <footer id="footer" className="relative px-[8vw] py-24 h-[92vh] overflow-hidden">
      <h2 className="mb-16 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ivory md:text-4xl">
        Let&apos;s build your next experiential project together.
      </h2>

      <div className="grid grid-cols-2 gap-8 pt-10 text-sm md:grid-cols-4">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[2px] text-ivory/40 border-b-2 border-dotted">GO DEEPER</p>
          <ul className="space-y-2 text-ivory/70">
            <li>Projects</li>
            {/* <li>Clients</li> */}
            {/* <li>Awards</li> */}
            <li>Services</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[2px] text-ivory/40 border-b-2 border-dotted">ELSEWHERE</p>
          <ul className="space-y-2 text-ivory/70">
            {/* <li>About</li> */}
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>X</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[2px] text-ivory/40 border-b-2 border-dotted">CONTACT</p>
          <p className="text-ivory/70">kueaurexsol@gmail.com</p>
        </div>
      </div>
<div className="border-t border-dotted mt-12 text-ivory">
  HYDERABAD,India
</div>
      <div className="mt-20 flex items-center justify-center absolute -bottom-8 ">
        <span className="font-black text-9xl tracking-[2px] text-ivory">
          KU<span className="text-violet">E</span>AURE<span className="text-violet">X</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;