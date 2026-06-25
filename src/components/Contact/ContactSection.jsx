import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal, socials } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const socialIcons = {
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  leetcode: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  ),
};

export default function ContactSection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Big title chars
      const chars = titleRef.current?.querySelectorAll(".cta-char");
      if (chars) {
        gsap.fromTo(
          chars,
          { y: 80, opacity: 0, rotateX: -60 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          }
        );
      }

      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ctaText = "Let's Build";
  const ctaChars = ctaText.split("");

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 2,
        padding: "var(--section-padding) 0",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="section-container">
        <div ref={labelRef} className="section-label" style={{ opacity: 0 }}>
          Contact
        </div>

        {/* Giant CTA */}
        <h2
          ref={titleRef}
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 6vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "3rem",
            perspective: "600px",
            maxWidth: "900px",
          }}
        >
          {ctaChars.map((char, i) => (
            <span
              key={i}
              className="cta-char"
              style={{
                display: char === " " ? "inline" : "inline-block",
                willChange: "transform",
                opacity: 0,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <br />
          <span
            className="font-cursive gradient-text"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
              fontWeight: 500,
            }}
          >
            Something Amazing
          </span>
        </h2>

        {/* Contact Info */}
        <div
          ref={contentRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            maxWidth: "500px",
            opacity: 0,
          }}
        >
          {/* Email */}
          <motion.a
            href={`mailto:${personal.email}`}
            className="font-heading"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontWeight: 400,
              color: "var(--color-text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              width: "fit-content",
            }}
            whileHover={{
              color: "#a855f7",
              x: 5,
              transition: { duration: 0.3 },
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {personal.email}
          </motion.a>

          {/* Phone */}
          <motion.a
            href={`tel:${personal.phone}`}
            className="font-heading"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontWeight: 400,
              color: "var(--color-text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              width: "fit-content",
            }}
            whileHover={{
              color: "#a855f7",
              x: 5,
              transition: { duration: 0.3 },
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {personal.phone}
          </motion.a>

          {/* Location */}
          <div
            className="font-heading"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontWeight: 400,
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {personal.location}
          </div>

          {/* Social Links */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                  background: "rgba(10, 10, 26, 0.5)",
                  transition: "all 0.3s ease",
                }}
                whileHover={{
                  scale: 1.1,
                  borderColor: "rgba(124, 58, 237, 0.5)",
                  color: "#a855f7",
                  boxShadow: "0 0 25px rgba(124, 58, 237, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {socialIcons[social.icon]}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="section-container"
        style={{
          marginTop: "auto",
          paddingTop: "4rem",
          paddingBottom: "2rem",
          opacity: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(124, 58, 237, 0.08)",
          }}
        >
          <span
            className="font-heading"
            style={{
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.03em",
            }}
          >
            © {new Date().getFullYear()} Nasib
          </span>
          <span
            className="cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center"
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Designed & Built with passion
          </span>
        </div>
      </div>
    </section>
  );
}
