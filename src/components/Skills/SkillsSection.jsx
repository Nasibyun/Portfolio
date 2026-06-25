import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

// Map skill names to their Devicon icon classes
const SKILL_ICONS = {
  "C++": "devicon-cplusplus-plain colored",
  "C": "devicon-c-plain colored",
  "Python": "devicon-python-plain colored",
  "JavaScript": "devicon-javascript-plain colored",
  "HTML": "devicon-html5-plain colored",
  "CSS": "devicon-css3-plain colored",
  "React": "devicon-react-original colored",
  "Next.js": "devicon-nextjs-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-original colored",
  "FastAPI": "devicon-fastapi-plain colored",
  "TensorFlow": "devicon-tensorflow-original colored",
  "MySQL": "devicon-mysql-plain colored",
  "MongoDB": "devicon-mongodb-plain colored",
  "Git": "devicon-git-plain colored",
  "GitHub": "devicon-github-original colored",
  "VS Code": "devicon-vscode-plain colored",
  "Linux": "devicon-linux-plain colored",
  "Vercel": "devicon-vercel-original colored",
  "Docker": "devicon-docker-plain colored",
  "Node.js": "devicon-nodejs-plain colored",
};

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const groupRefs = useRef([]);

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

      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Stagger each skill group
      groupRefs.current.forEach((groupEl, idx) => {
        if (!groupEl) return;
        const tags = groupEl.querySelectorAll(".skill-tag");

        gsap.fromTo(
          groupEl.querySelector(".group-title"),
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: groupEl,
              start: "top 85%",
            },
          }
        );

        gsap.fromTo(
          tags,
          { y: 20, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: groupEl,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = Object.entries(skills);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 2,
        padding: "var(--section-padding) 0",
      }}
    >
      <div className="section-container">
        <div ref={labelRef} className="section-label" style={{ opacity: 0 }}>
          Expertise
        </div>
        <h2
          ref={titleRef}
          className="section-title"
          style={{ marginBottom: "4rem", opacity: 0 }}
        >
          Skills & <span className="gradient-text font-cursive">Technologies</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
          }}
        >
          {categories.map(([category, items], idx) => (
            <div
              key={category}
              ref={(el) => (groupRefs.current[idx] = el)}
              style={{ marginBottom: "1rem" }}
            >
              <div
                className="group-title font-heading"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(124, 58, 237, 0.1)",
                  opacity: 0,
                }}
              >
                {category}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.625rem",
                }}
              >
                {items.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {SKILL_ICONS[skill] && (
                      <i
                        className={SKILL_ICONS[skill]}
                        style={{
                          fontSize: "1.1rem",
                          marginRight: "0.5rem",
                          opacity: 0.9,
                        }}
                      />
                    )}
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
