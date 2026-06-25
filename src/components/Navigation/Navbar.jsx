import { useState, useEffect, useRef } from "react";
import { navItems } from "../../data/portfolio";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Show/hide on scroll direction
      if (currentY > lastScrollY.current && currentY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;

      // Background change after scrolling
      setScrolled(currentY > 50);

      // Detect active section
      const sections = navItems.map((item) =>
        document.querySelector(item.href)
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(navItems[i].href.replace("#", ""));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`floating-nav ${hidden ? "hidden" : ""}`}
      style={{
        opacity: scrolled ? 1 : 0.7,
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.href}
          className={`nav-item ${
            activeSection === item.href.replace("#", "") ? "active" : ""
          }`}
          onClick={(e) => handleClick(e, item.href)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
