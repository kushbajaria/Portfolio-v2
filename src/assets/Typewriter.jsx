import React, { useEffect, useState } from "react";

export default function Typewriter({ phrases = [], speed = 80, pause = 1500, className = "text-lg md:text-xl text-gray-200", showCursor = true }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;

    const current = phrases[index % phrases.length];
    let timeout = null;

    if (deleting) {
      timeout = setTimeout(() => {
        setSubIndex((s) => s - 1);
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setSubIndex((s) => s + 1);
      }, speed);
    }

    if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, phrases, speed, pause]);

  return (
    <div className={className}>
      <span className="font-semibold">{phrases[index % phrases.length].substring(0, subIndex)}</span>
      {showCursor && <span className="ml-1 opacity-80 animate-pulse">|</span>}
    </div>
  );
}
