"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter = ({ end, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      let startValue = 0;
      const stepTime = Math.abs(Math.floor((duration * 1000) / end));
      
      const timer = setInterval(() => {
        startValue += 1;
        setCount(startValue);
        if (startValue >= end) {
          clearInterval(timer);
          setCount(end);
        }
      }, stepTime === 0 ? 1 : stepTime); // Safeguard against 0 ms

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </motion.span>
  );
};
