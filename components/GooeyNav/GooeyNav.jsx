

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