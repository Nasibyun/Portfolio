import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const eduRef = useRef(null);
  const availRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(
        labelRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Title
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Text words reveal
      const words = textRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      }

      // Education card
      gsap.fromTo(
        eduRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: eduRef.current,
            start: "top 85%",
          },
        }
      );

      // Availability
      gsap.fromTo(
        availRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: availRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split about text into words for scroll-driven reveal
  const aboutWords = personal.about.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 2,
        padding: "var(--section-padding) 0",
      }}
    >
      <div className="section-container">
        <div ref={labelRef} className="section-label" style={{ opacity: 0 }}>
          About
        </div>
        <h2
          ref={titleRef}
          className="section-title"
          style={{ marginBottom: "3rem", opacity: 0 }}
        >
          Who I <span className="gradient-text font-cursive">Am</span>
        </h2>

        {/* About text with word-by-word reveal */}
        <div
          ref={textRef}
          className="font-body"
          style={{
            fontFamily: "lato",
            fontSize: "clamp(1.1rem, 2.1vw, 1.3rem)",
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: "900px",
            color: "var(--color-text-primary)",
          }}
        >
          {aboutWords.map((word, i) => (
            <span
              key={i}
              className="word"
              style={{
                display: "inline-block",
                marginRight: "0.35em",
                willChange: "opacity",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Education card */}
        <div
          ref={eduRef}
          className="glow-border"
          style={{
            marginTop: "4rem",
            padding: "clamp(2rem, 5vw, 3rem)",
            borderRadius: "1.5rem",
            maxWidth: "900px",
            background: "linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(10,10,26,0.5))",
            border: "1px solid rgba(124, 58, 237, 0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(124, 58, 237, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-violet-light)",
              border: "1px solid rgba(124, 58, 237, 0.2)"
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <div
              className="font-heading"
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-violet-light)",
                fontWeight: 600,
              }}
            >
              Education
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem" }}>
            <div>
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "#fff",
                }}
              >
                {personal.education.institution}
              </div>
              <div
                className="font-heading"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                  color: "var(--color-text-secondary)",
                  fontWeight: 400,
                }}
              >
                {personal.education.degree} in {personal.education.field}
              </div>
            </div>

            <div style={{
              padding: "0.5rem 1.25rem",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "100px",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              border: "1px solid rgba(255,255,255,0.08)",
              whiteSpace: "nowrap"
            }}>
              {personal.education.graduation}
            </div>
          </div>
        </div>

        {/* Availability badge */}
        <div
          ref={availRef}
          style={{
            marginTop: "2rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "100px",
            background: "rgba(124, 58, 237, 0.08)",
            border: "1px solid rgba(124, 58, 237, 0.15)",
            opacity: 0,
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            className="font-cursive"
            style={{
              fontSize: "0.9rem",
              letterSpacing: "0.02em",
              color: "var(--color-text-secondary)",
            }}
          >
            {personal.availability}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}
