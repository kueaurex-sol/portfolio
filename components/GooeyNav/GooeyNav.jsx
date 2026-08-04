
// // "use client";

// // import { useRef, useEffect } from 'react';
// // import { usePathname } from 'next/navigation';
// // import Link from 'next/link';
// // import './GooeyNav.css';

// // const GooeyNav = ({
// //   items,
// //   animationTime = 600,
// //   particleCount = 15,
// //   particleDistances = [90, 10],
// //   particleR = 100,
// //   timeVariance = 300,
// //   colors = [1, 2, 3, 1, 2, 3, 1, 4]
// // }) => {
// //   const containerRef = useRef(null);
// //   const navRef = useRef(null);
// //   const filterRef = useRef(null);
// //   const pathname = usePathname();
// //   const activeIndex = items.findIndex(item => item.href === pathname);

// //   const noise = (n = 1) => n / 2 - Math.random() * n;

// //   const getXY = (distance, pointIndex, totalPoints) => {
// //     const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
// //     return [distance * Math.cos(angle), distance * Math.sin(angle)];
// //   };

// //   const createParticle = (i, t, d, r) => {
// //     let rotate = noise(r / 10);
// //     return {
// //       start: getXY(d[0], particleCount - i, particleCount),
// //       end: getXY(d[1] + noise(7), particleCount - i, particleCount),
// //       time: t,
// //       scale: 1 + noise(0.2),
// //       color: colors[Math.floor(Math.random() * colors.length)],
// //       rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
// //     };
// //   };

// //   const makeParticles = element => {
// //     const d = particleDistances;
// //     const r = particleR;
// //     const bubbleTime = animationTime * 2 + timeVariance;
// //     element.style.setProperty('--time', `${bubbleTime}ms`);

// //     for (let i = 0; i < particleCount; i++) {
// //       const t = animationTime * 2 + noise(timeVariance * 2);
// //       const p = createParticle(i, t, d, r);
// //       element.classList.remove('active');

// //       setTimeout(() => {
// //         const particle = document.createElement('span');
// //         const point = document.createElement('span');
// //         particle.classList.add('particle');
// //         particle.style.setProperty('--start-x', `${p.start[0]}px`);
// //         particle.style.setProperty('--start-y', `${p.start[1]}px`);
// //         particle.style.setProperty('--end-x', `${p.end[0]}px`);
// //         particle.style.setProperty('--end-y', `${p.end[1]}px`);
// //         particle.style.setProperty('--time', `${p.time}ms`);
// //         particle.style.setProperty('--scale', `${p.scale}`);
// //         particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
// //         particle.style.setProperty('--rotate', `${p.rotate}deg`);

// //         point.classList.add('point');
// //         particle.appendChild(point);
// //         element.appendChild(particle);
// //         requestAnimationFrame(() => {
// //           element.classList.add('active');
// //         });
// //         setTimeout(() => {
// //           try {
// //             element.removeChild(particle);
// //           } catch {
// //             // Do nothing
// //           }
// //         }, t);
// //       }, 30);
// //     }
// //   };

// //   const buildTextMask = (anchorEl, label, w, h) => {
// //     const cs = window.getComputedStyle(anchorEl);
// //     const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
// //       <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
// //         font-family="${cs.fontFamily.replace(/"/g, "'")}"
// //         font-size="${cs.fontSize}"
// //         font-weight="${cs.fontWeight}"
// //         letter-spacing="${cs.letterSpacing}"
// //         fill="white">${label}</text></svg>`;
// //     return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
// //   };

// //   const updateEffectPosition = (liEl, anchorEl, label) => {
// //     if (!containerRef.current || !filterRef.current || !anchorEl) return;
// //     const containerRect = containerRef.current.getBoundingClientRect();
// //     const pos = liEl.getBoundingClientRect();

// //     Object.assign(filterRef.current.style, {
// //       left: `${pos.x - containerRect.x}px`,
// //       top: `${pos.y - containerRect.y}px`,
// //       width: `${pos.width}px`,
// //       height: `${pos.height}px`
// //     });

// //     filterRef.current.style.setProperty(
// //       '--gooey-mask',
// //       buildTextMask(anchorEl, label, pos.width, pos.height)
// //     );
// //   };

// //   const handleClick = (e, index) => {
// //     const anchorEl = e.currentTarget;
// //     const liEl = anchorEl.closest('li');
// //     if (!liEl || activeIndex === index) return;

// //     updateEffectPosition(liEl, anchorEl, items[index].label);

// //     if (filterRef.current) {
// //       filterRef.current.querySelectorAll('.particle').forEach(p => filterRef.current.removeChild(p));
// //       makeParticles(filterRef.current);
// //     }
// //   };

// //   const handleKeyDown = (e, index) => {
// //     if (e.key === 'Enter' || e.key === ' ') {
// //       e.preventDefault();
// //       handleClick(e, index);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!navRef.current || !containerRef.current || activeIndex < 0) return;
// //     const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
// //     const activeAnchor = activeLi?.querySelector('a');
// //     if (activeLi && activeAnchor) updateEffectPosition(activeLi, activeAnchor, items[activeIndex].label);

// //     const resizeObserver = new ResizeObserver(() => {
// //       const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
// //       const currentAnchor = currentActiveLi?.querySelector('a');
// //       if (currentActiveLi && currentAnchor) updateEffectPosition(currentActiveLi, currentAnchor, items[activeIndex].label);
// //     });

// //     resizeObserver.observe(containerRef.current);
// //     return () => resizeObserver.disconnect();
// //   }, [activeIndex, pathname]);

// //   return (
// //     <div className="gooey-nav-container" ref={containerRef}>
// //       <nav>
// //         <ul ref={navRef}>
// //           {items.map((item, index) => (
// //             <li key={index} className={activeIndex === index ? 'active' : ''}>
// //               <Link href={item.href} onClick={e => handleClick(e, index)} onKeyDown={e => handleKeyDown(e, index)}>
// //                 {item.label}
// //               </Link>
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>
// //       <span className="effect filter" ref={filterRef} />
// //     </div>
// //   );
// // };

// // export default GooeyNav;
// "use client";

// import { useRef, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import './GooeyNav.css';

// const GooeyNav = ({ items }) => {
//   const containerRef = useRef(null);
//   const navRef = useRef(null);
//   const pulseRef = useRef(null);
//   const pathname = usePathname();
//   const activeIndex = items.findIndex(item => item.href === pathname);

//   const updatePulsePosition = liEl => {
//     if (!containerRef.current || !pulseRef.current) return;
//     const containerRect = containerRef.current.getBoundingClientRect();
//     const pos = liEl.getBoundingClientRect();

//     Object.assign(pulseRef.current.style, {
//       left: `${pos.x - containerRect.x}px`,
//       top: `${pos.y - containerRect.y}px`,
//       width: `${pos.width}px`,
//       height: `${pos.height}px`
//     });
//   };

//   const handleClick = (e, index) => {
//     const liEl = e.currentTarget.closest('li');
//     if (!liEl || activeIndex === index) return;

//     updatePulsePosition(liEl);

//     if (pulseRef.current) {
//       pulseRef.current.classList.remove('pulse-active');
//       void pulseRef.current.offsetWidth; // force reflow so the animation can restart
//       pulseRef.current.classList.add('pulse-active');
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       handleClick(e, index);
//     }
//   };

//   useEffect(() => {
//     if (!navRef.current || !containerRef.current || activeIndex < 0) return;
//     const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
//     if (activeLi) updatePulsePosition(activeLi);

//     const resizeObserver = new ResizeObserver(() => {
//       const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
//       if (currentActiveLi) updatePulsePosition(currentActiveLi);
//     });

//     resizeObserver.observe(containerRef.current);
//     return () => resizeObserver.disconnect();
//   }, [activeIndex]);

//   return (
//     <div className="gooey-nav-container" ref={containerRef}>
//       <nav>
//         <ul ref={navRef}>
//           {items.map((item, index) => (
//             <li key={index} className={activeIndex === index ? 'active' : ''}>
//               <Link href={item.href} onClick={e => handleClick(e, index)} onKeyDown={e => handleKeyDown(e, index)}>
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <span className="nav-pulse" ref={pulseRef} />
//     </div>
//   );
// };

// export default GooeyNav;

"use client";

import { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './GooeyNav.css';

const GooeyNav = ({ items }) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const pulseRef = useRef(null);
  const pathname = usePathname();
  const activeIndex = items.findIndex(item => item.href === pathname);
  const [pulseKey, setPulseKey] = useState(0);
  const [pulseRect, setPulseRect] = useState(null);

  const getRect = liEl => {
    if (!containerRef.current) return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = liEl.getBoundingClientRect();
    return {
      left: pos.x - containerRect.x,
      top: pos.y - containerRect.y,
      width: pos.width,
      height: pos.height
    };
  };

  const handleClick = (e, index) => {
    const liEl = e.currentTarget.closest('li');
    if (!liEl || activeIndex === index) return;

    setPulseRect(getRect(liEl));
    setPulseKey(k => k + 1); // new key -> React mounts a fresh <span>, guaranteeing the animation replays
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e, index);
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current || activeIndex < 0) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    if (activeLi) setPulseRect(getRect(activeLi));

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) setPulseRect(getRect(currentActiveLi));
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={index} className={activeIndex === index ? 'active' : ''}>
              <Link href={item.href} onClick={e => handleClick(e, index)} onKeyDown={e => handleKeyDown(e, index)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {pulseRect && (
        <span
          key={pulseKey}
          className="nav-pulse pulse-active"
          style={{
            left: pulseRect.left,
            top: pulseRect.top,
            width: pulseRect.width,
            height: pulseRect.height
          }}
        />
      )}
    </div>
  );
};

export default GooeyNav;