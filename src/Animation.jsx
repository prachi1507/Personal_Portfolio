import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Icon from "./Icons.jsx";

export function MagneticLink({ children, className = "", ...props }) {
  const reduce = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 220, damping: 19 });
  const y = useSpring(targetY, { stiffness: 220, damping: 19 });
  const reset = () => {
    targetX.set(0);
    targetY.set(0);
  };
  const move = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    targetX.set((event.clientX - rect.left - rect.width / 2) * 0.16);
    targetY.set((event.clientY - rect.top - rect.height / 2) * 0.22);
  };
  return (
    <motion.a
      {...props}
      className={`magnetic-link ${className}`}
      style={reduce ? undefined : { x, y }}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
      whileHover={
        reduce
          ? undefined
          : { scale: 1.045, rotate: className.includes("contact-orb") ? 35 : 0 }
      }
      whileTap={reduce ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

export function AnimatedName() {
  const reduce = useReducedMotion();
  return (
    <span className="serif accent hero-name">
      {Array.from("Prachi.").map((letter, index) => (
        <motion.span
          className="name-letter"
          key={index}
          initial={
            reduce
              ? false
              : { y: 45, rotate: 7, opacity: 0 }
          }
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.25 + index * 0.09,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {letter}
        </motion.span>
      ))}
      <svg
        className="name-underline"
        viewBox="0 0 400 27"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M5 15C100 1 237 2 394 10M30 25C132 16 269 13 362 19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.65 }}
          transition={{
            duration: 1.3,
            delay: reduce ? 0 : 0.95,
            ease: "easeInOut",
          }}
        />
      </svg>
    </span>
  );
}

export function TiltPreview({ project, onOpen }) {
  const reduce = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(targetY, { stiffness: 180, damping: 22 });
  const glowX = useMotionValue("50%");
  const glowY = useMotionValue("50%");
  const reset = () => {
    targetX.set(0);
    targetY.set(0);
  };
  const move = (event) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    targetX.set((0.5 - py) * 7);
    targetY.set((px - 0.5) * 7);
    glowX.set(`${px * 100}%`);
    glowY.set(`${py * 100}%`);
  };
  return (
    <motion.button
      className="project-preview-button tilt-preview"
      onClick={onOpen}
      aria-label={`Explore ${project.name}`}
      style={
        reduce
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1100,
              "--glow-x": glowX,
              "--glow-y": glowY,
            }
      }
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={reduce ? undefined : { scale: 0.99 }}
    >
      <project.Preview />
      <span className="preview-glow" aria-hidden="true" />
      <span className="preview-open">
        <Icon size={24} />
      </span>
    </motion.button>
  );
}

export function CountUp({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return undefined;
    }
    if (!visible) return undefined;
    const control = animate(0, value, {
      duration: 1.65,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => setDisplay(Math.round(current)),
    });
    return () => control.stop();
  }, [visible, reduce, value]);
  return (
    <strong ref={ref}>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="count-value" aria-hidden="true">
        {prefix}
        {display}
        <span>{suffix}</span>
      </span>
    </strong>
  );
}

export function CursorGlow() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const targetX = useMotionValue(-500);
  const targetY = useMotionValue(-500);
  const x = useSpring(targetX, { stiffness: 90, damping: 24 });
  const y = useSpring(targetY, { stiffness: 90, damping: 24 });
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches)
      return undefined;
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      targetX.set(event.clientX - 180);
      targetY.set(event.clientY - 180);
      setVisible(true);
    };
    const hide = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [reduce, targetX, targetY]);
  if (reduce) return null;
  return (
    <div className="cursor-glow-layer" aria-hidden="true">
      <motion.div
        className="cursor-glow"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
