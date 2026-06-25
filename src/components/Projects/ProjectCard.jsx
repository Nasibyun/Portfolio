import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          y: 80,
          opacity: 0,
          rotateX: 4,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: 0,
        perspective: "1000px",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* Project preview image */}
      {project.image && (
        <div
          style={{
            position: "relative",
            marginBottom: "2rem",
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${project.color}40`,
            boxShadow: `0 10px 30px -10px ${project.color}30`,
          }}
        >
          <img
            src={project.image}
            alt={`${project.title} preview`}
            style={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Project number */}
      <div
        className="font-display"
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          color: project.color,
          marginBottom: "1.5rem",
          textTransform: "uppercase",
        }}
      >
        Project {String(index + 1).padStart(2, "0")}
      </div>

      {/* Title + Subtitle */}
      <h3
        className="font-display"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "0.5rem",
        }}
      >
        {project.title}
      </h3>
      <div
        className="font-heading"
        style={{
          fontSize: "1rem",
          color: project.accentColor,
          fontWeight: 500,
          marginBottom: "1.5rem",
          letterSpacing: "0.02em",
        }}
      >
        {project.subtitle}
      </div>

      {/* Description */}
      <p
        className="font-body"
        style={{
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "var(--color-text-secondary)",
          maxWidth: "600px",
          marginBottom: "2rem",
          fontWeight: 300,
        }}
      >
        {project.description}
      </p>

      {/* Features */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        {project.features.map((feature) => (
          <div
            key={feature}
            className="font-body"
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: project.color,
                flexShrink: 0,
              }}
            />
            {feature}
          </div>
        ))}
      </div>

      {/* Tech stack tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              padding: "0.375rem 0.875rem",
              fontSize: "0.75rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
              letterSpacing: "0.03em",
              color: project.accentColor,
              background: `${project.color}15`,
              border: `1px solid ${project.color}25`,
              borderRadius: "100px",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action links */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="magnetic-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            borderColor: `${project.color}40`,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source Code
          </span>
        </motion.a>

        {project.live && (
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              borderColor: `${project.color}40`,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
