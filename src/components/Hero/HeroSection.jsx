import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { personal } from "../../data/portfolio";

const VIDEOS = ["/encryption.webm"];

// Floating code snippets that fade in/out
const CODE_FRAGMENTS = [
  { code: "const ai = await model.predict(input);", top: "15%", left: "8%" },
  { code: "async function optimize() {", top: "75%", left: "4%" },
  { code: "return tensor.reshape([1, -1]);", top: "35%", right: "4%" },
  { code: "graph.addEdge(node, weight);", bottom: "11%", left: "15%" },
  { code: "dp[i] = Math.max(dp[i-1], val);", top: "55%", right: "8%" },
  { code: "await fetch('/api/inference');", bottom: "30%", right: "3%" },
];

const TECH_ICONS = [
  { icon: "devicon-cplusplus-plain", top: "23%", right: "40%", delay: 1.5 },
  { icon: "devicon-python-plain", bottom: "14%", right: "16%", delay: 1.9 },
  { icon: "devicon-javascript-plain", bottom: "13%", right: "38%", delay: 2.3 },
  { icon: "devicon-react-plain", bottom: "50%", right: "11%", delay: 1.4 },
  { icon: "devicon-mysql-plain", bottom: "22%", right: "42%", delay: 2.7 },
  { icon: "devicon-git-plain", bottom: "9%", right: "22%", delay: 1.6 },
  { icon: "devicon-html5-plain", bottom: "9%", right: "10%", delay: 2.1 },
  { icon: "devicon-tailwindcss-original", bottom: "22%", right: "10%", delay: 2.5 },
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const portraitRef = useRef(null);
  const portraitGlowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const hudRing1Ref = useRef(null);
  const hudRing2Ref = useRef(null);
  const hudRing3Ref = useRef(null);
  const codeLayerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  // ---------- VIDEO LOOP ----------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => setCurrentVideo((p) => (p + 1) % VIDEOS.length);
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = VIDEOS[currentVideo];
    video.load();
    video.play().catch(() => { });
  }, [currentVideo]);

  // ---------- CURSOR-REACTIVE PARTICLES ----------
  const initParticles = useCallback(() => {
    const particles = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        baseX: Math.random() * window.innerWidth,
        baseY: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "124, 58, 237" : "59, 130, 246",
      });
    }
    particlesRef.current = particles;
  }, []);

  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const mx = mouseRef.current.x * w;
    const my = mouseRef.current.y * h;

    particlesRef.current.forEach((p) => {
      // Drift
      p.baseX += p.speedX;
      p.baseY += p.speedY;
      if (p.baseX < 0 || p.baseX > w) p.speedX *= -1;
      if (p.baseY < 0 || p.baseY > h) p.speedY *= -1;

      // Mouse attraction
      const dx = mx - p.baseX;
      const dy = my - p.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 250;
      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 30;
        p.x = p.baseX + (dx / dist) * force;
        p.y = p.baseY + (dy / dist) * force;
      } else {
        p.x = p.baseX;
        p.y = p.baseY;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();
    });

    // Draw connection lines between nearby particles
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const a = particlesRef.current[i];
        const b = particlesRef.current[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    rafRef.current = requestAnimationFrame(animateParticles);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    initParticles();
    rafRef.current = requestAnimationFrame(animateParticles);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initParticles, animateParticles]);

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  // ---------- GSAP ANIMATIONS ----------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Volumetric glow behind portrait
      tl.fromTo(
        portraitGlowRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "expo.out" }
      );

      // Portrait emerges from darkness
      tl.fromTo(
        portraitRef.current,
        { scale: 1.15, opacity: 0, filter: "blur(12px) brightness(0.3)" },
        { scale: 1, opacity: 1, filter: "blur(0px) brightness(1)", duration: 2.2, ease: "expo.out" },
        "-=2.2"
      );

      // HUD rings spin in
      [hudRing1Ref, hudRing2Ref, hudRing3Ref].forEach((ref, i) => {
        if (!ref.current) return;
        tl.fromTo(
          ref.current,
          { scale: 0.6, opacity: 0, rotation: -90 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.8, ease: "expo.out" },
          `-=${1.8 - i * 0.15}`
        );
      });

      // Background text
      tl.fromTo(
        bgTextRef.current,
        { scale: 1.3, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 0.03, filter: "blur(0px)", duration: 1.8, ease: "expo.out" },
        "-=2.0"
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1.5"
      );

      // Title chars stagger
      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        tl.fromTo(
          titleChars,
          { y: 70, opacity: 0, rotateX: -45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.03, ease: "back.out(1.7)" },
          "-=0.9"
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      // CTA
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
      }

      // Code fragments stagger in
      if (codeLayerRef.current) {
        const frags = codeLayerRef.current.querySelectorAll(".hero-code-fragment");
        tl.fromTo(
          frags,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.6"
        );
      }

      // Tech icons stagger in
      const techIcons = sectionRef.current?.querySelectorAll(".tech-icon");
      if (techIcons) {
        tl.fromTo(
          techIcons,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.5)" },
          "-=0.6"
        );
      }

      // ---------- SCROLL PARALLAX ----------
      gsap.to(bgTextRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(portraitRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(hudRing1Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(hudRing2Ref.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameChars = personal.firstName.split("");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section"
      onMouseMove={handleMouseMove}
    >
      {/* Video Background */}
      <div className="hero-video-bg">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          src={VIDEOS[0]}
        />
      </div>

      {/* Cursor-reactive particle canvas */}
      <canvas ref={canvasRef} className="hero-particles-canvas" />

      {/* Horizontal scanline */}
      <div className="hero-scanline" />

      {/* Background giant text */}
      <div ref={bgTextRef} className="hero-bg-text" style={{ opacity: 0 }}>
        {personal.fullName}
      </div>

      {/* Floating code fragments */}
      <div ref={codeLayerRef} className="hero-code-layer">
        {CODE_FRAGMENTS.map((frag, i) => (
          <div
            key={i}
            className="hero-code-fragment"
            style={{
              top: frag.top,
              left: frag.left,
              right: frag.right,
              bottom: frag.bottom,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            <span className="hero-code-line-num">{String(i + 1).padStart(2, "0")}</span>
            <code>{frag.code}</code>
          </div>
        ))}
      </div>

      {/* Floating Tech Icons */}
      <div className="hero-tech-icons">
        {TECH_ICONS.map((tech, i) => (
          <div
            key={`tech-${i}`}
            className="tech-icon"
            style={{
              top: tech.top,
              left: tech.left,
              right: tech.right,
              bottom: tech.bottom,
              animationDelay: `${tech.delay}s`,
            }}
          >

            <i className={tech.icon} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="hero-content-wrapper">
        {/* Left — Text Side */}
        <div className="hero-text-side">
          <div
            ref={taglineRef}
            className="font-cursive"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: "var(--color-violet-light)",
              letterSpacing: "0.02em",
              opacity: 0,
            }}
          >
            {personal.tagline}
          </div>

          <h1
            ref={titleRef}
            className="font-display"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
              perspective: "600px",
            }}
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                className="char"
                style={{ display: "inline-block", willChange: "transform" }}
                whileHover={{
                  y: -8,
                  color: "#a855f7",
                  textShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                  transition: { duration: 0.2 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <div
            ref={subtitleRef}
            className="font-heading"
            style={{
              fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)",
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-text-secondary)",
              opacity: 0,
            }}
          >
            {personal.title}
          </div>

          <motion.a
            ref={ctaRef}
            href="#projects"
            className="magnetic-btn"
            style={{ marginTop: "1rem", width: "fit-content", opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="font-cursive" style={{ fontSize: "1rem" }}>Explore</span>
              My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </motion.a>
        </div>

        {/* Right — Cinematic Portrait Zone */}
        <div className="hero-portrait-zone">
          {/* Volumetric light behind portrait */}
          <div ref={portraitGlowRef} className="hero-volumetric-light" style={{ opacity: 0 }} />

          {/* HUD Rings */}
          <svg ref={hudRing1Ref} className="hero-hud-ring hero-hud-ring--1" viewBox="0 0 500 500" style={{ opacity: 0 }}>
            <circle cx="250" cy="250" r="220" />
            <circle cx="250" cy="250" r="218" strokeDasharray="8 12" />
            {/* Tick marks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const r1 = 210;
              const r2 = i % 3 === 0 ? 200 : 205;
              return (
                <line
                  key={i}
                  x1={250 + r1 * Math.cos(angle)}
                  y1={250 + r1 * Math.sin(angle)}
                  x2={250 + r2 * Math.cos(angle)}
                  y2={250 + r2 * Math.sin(angle)}
                  stroke="rgba(124, 58, 237, 0.3)"
                  strokeWidth={i % 3 === 0 ? 1.5 : 0.5}
                />
              );
            })}
          </svg>

          <svg ref={hudRing2Ref} className="hero-hud-ring hero-hud-ring--2" viewBox="0 0 500 500" style={{ opacity: 0 }}>
            <circle cx="250" cy="250" r="180" strokeDasharray="4 20" />
            <circle cx="250" cy="250" r="175" strokeDasharray="40 60" />
          </svg>

          <svg ref={hudRing3Ref} className="hero-hud-ring hero-hud-ring--3" viewBox="0 0 500 500" style={{ opacity: 0 }}>
            <circle cx="250" cy="250" r="240" strokeDasharray="2 8" />
          </svg>

          {/* The portrait itself */}
          <div ref={portraitRef} className="hero-portrait" style={{ opacity: 0 }}>
            <img
              src={personal.portrait}
              alt={`${personal.name}`}
              loading="eager"
              fetchPriority="high"
            />
            {/* Rim lighting overlays */}
            <div className="hero-portrait-rim hero-portrait-rim--left" />
            <div className="hero-portrait-rim hero-portrait-rim--right" />
          </div>
        </div>
      </div>
    </section>
  );
}