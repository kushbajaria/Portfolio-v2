import React, { useEffect, useState } from "react";

export default function Typewriter({ phrases = [], speed = 80, pause = 1500 }) {
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
    <div className="text-lg md:text-xl text-gray-200">
      <span className="font-semibold text-cyan-300">{phrases[index % phrases.length].substring(0, subIndex)}</span>
      <span className="opacity-90">&nbsp;|</span>
    </div>
  );
}
