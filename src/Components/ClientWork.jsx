import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "../css/Projects.css";
import img4 from '../assets/cw2.png';
import img5 from '../assets/cw.png';
import img6 from '../assets/cw3.png';
import img7 from '../assets/cw4.png';
import img8 from '../assets/cw5.png';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    name: "Stylver",
    role: "Solo Developer",
    desc: "Designed and developed a modern jewellery brand website focused on conversion and storytelling. Built responsive layouts, optimized media delivery, and integrated email workflows using Resend. Prioritized performance, clean UI, and guiding users toward inquiry-based actions.",
    tags: ["NextJS", "Resend", "Figma"],
    image: img5,
    accent: "#4ade80",
    github: null,
    live: "https://www.stylver.in/",
    year: "2026",
    type: "Client Work",
  },
  {
    id: 2,
    name: "Beads & Bonds",
    role: "Freelance · Full Stack",
    desc: "Developed a portfolio-driven jewellery website to showcase handcrafted collections and generate warmer leads. Focused on strong visual hierarchy, reusable UI components, and smooth navigation while highlighting craftsmanship and brand identity.",
    tags: ["NextJS", "Figma"],
    image: img4,
    accent: "#60a5fa",
    github: null,
    live: "https://beadsandbonds.vercel.app/",
    year: "2026",
    type: "Client Work",
  },
  {
    id: 3,
    name: "QALB",
    role: "Freelance · Full Stack",
    desc: "Developed a modern e-commerce website for a clothing brand, focused on showcasing collections through strong visual hierarchy, seamless product discovery, and a premium shopping experience. Built reusable UI components, intuitive navigation, and responsive layouts while emphasizing brand identity, product presentation, and conversion-driven design.",
    tags: ["NextJS", "Figma"],
    image: img6,
    accent: "#60a5fa",
    github: null,
    live: null,
    year: "2026",
    type: "Client Work",
  },
  {
    id: 4,
    name: "Elinour",
    role: "Freelance · Frontend",
    desc: "Developed a modern e-commerce website for a jewellery brand, focused on showcasing their products through visual hierarchy, with easy UX and a smooth overall user experience that helps generate warmer leads, integrarted it with Whatsapp for direct customer inquiries.",
    tags: ["NextJS", "Figma"],
    image: img7,
    accent: "#60a5fa",
    github: null,
    live: null,
    year: "2026",
    type: "Client Work",
  },
  {
    id: 5,
    name: "The Hypple",
    role: "Freelance · Frontend",
    desc: "Developed a modern website for a marketing brand, focused on showcasing their portfolio and services through clean user flow, along with a clear CTA. Integrated it with calendly to make their appointment booking process seamless.",
    tags: ["NextJS", "Figma","Calendly"],
    image: img8,
    accent: "#60a5fa",
    github: null,
    live: null,
    year: "2026",
    type: "Client Work",
  }
];

function MobileCard({ p, index }) {
  return (
    <div className="mob-card" style={{ "--accent": p.accent, animationDelay: `${index * 0.08}s` }}>
      <div
        className="mob-card-image"
        style={{
          backgroundImage: `url(${p.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mob-card-badges">
          <span className="mob-card-type">{p.type}</span>
          <span className="mob-card-year">{p.year}</span>
        </div>
        <div className="mob-card-tags">
          {p.tags.map((t) => (
            <span key={t} className="mob-card-tag" style={{ borderColor: p.accent, color: p.accent }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mob-card-body">
        <p className="mob-card-role">{p.role}</p>
        <h2 className="mob-card-name">{p.name}</h2>
        <p className="mob-card-desc">{p.desc}</p>
        <div className="mob-card-links">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--live">
              Live ↗
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--gh">
              GitHub ↗
            </a>
          )}
          {!p.live && !p.github && (
            <span className="proj-link proj-link--wip">In Progress</span>
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopScroll() {
  const sectionRef = useRef(null);
  const indexRef = useRef(null);
  const imagesRef = useRef(null);
  const namesRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imagesEl = imagesRef.current;
    const namesEl = namesRef.current;
    const counter = counterRef.current;

    const images = imagesEl.querySelectorAll(".proj-image");
    const titles = namesEl.querySelectorAll(".proj-title");
    const total = PROJECTS.length;
    const pad = (n) => String(n).padStart(2, "0");

    const sectionH = section.offsetHeight;
    const imagesH = imagesEl.scrollHeight;
    const titleHeights = Array.from(titles).map((t) => t.offsetHeight);
    const totalNamesH = titleHeights.reduce((a, b) => a + b, 0);

    const threshold = window.innerHeight / 2;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${sectionH * 1.4 * (total - 1)}`, // ← more scroll room per project
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = Math.min(Math.floor(progress * total) + 1, total);
          counter.textContent = `${pad(rawIndex)} / ${pad(total)}`;

          gsap.set(imagesEl, { y: progress * -(imagesH * 0.6) });

          images.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const active = rect.top < threshold && rect.bottom > threshold;
            gsap.set(img, { opacity: active ? 1 : 0.25, scale: active ? 1 : 0.96 });
          });

          titles.forEach((title, i) => {
            const start = i / total;
            const end = (i + 1) / total;
            const localP = Math.min(Math.max((progress - start) / (end - start), 0), 1);

            // Highlight immediately on enter, dim when fully scrolled past
            const isActive = localP > 0 && localP < 1;
            const isPast = localP >= 1;

            gsap.set(title, {
              y: -(progress * imagesH * 0.6),
              color: isActive ? "#ffffff" : "#2a2a2a",
              opacity: isPast ? 0.35 : isActive ? 1 : 0.2,
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="proj-spotlight" ref={sectionRef}>
      <div className="proj-index" ref={indexRef}>
        <span className="proj-counter" ref={counterRef}>01 / 02</span>
        <div className="proj-index-line" />
      </div>

      <div className="proj-images-wrap">
        <div className="proj-images" ref={imagesRef}>
          {PROJECTS.map((p) => (
            <div key={p.id} className="proj-image">
              <img src={p.image} alt={p.name} className="proj-image-bg" />
            </div>
          ))}
        </div>
      </div>

      <div className="proj-names-wrap">
        <div className="proj-names" ref={namesRef}>
          {PROJECTS.map((p) => (
            <div key={p.id} className="proj-title">
              <p className="proj-title-role">{p.role}</p>
              <h2 className="proj-title-name">{p.name}</h2>
              <p className="proj-title-desc">{p.desc}</p>
              <div className="proj-title-links">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--live">
                    Live Preview ↗
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--gh">
                    GitHub ↗
                  </a>
                )}
                {!p.live && !p.github && (
                  <span className="proj-link proj-link--wip">In Progress</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Works() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="projects-page">
      <div className="proj-intro">
        <p className="proj-intro-label">Latest work</p>
        <h1 className="proj-intro-title">
          Things I've<br />built for Clients.
        </h1>
        <p className="proj-intro-sub">{isMobile ? "Scroll through" : "Scroll to explore"}</p>
        <div className="proj-intro-arrow">↓</div>
      </div>

      {isMobile ? (
        <div className="mob-list">
          {PROJECTS.map((p, i) => (
            <MobileCard key={p.id} p={p} index={i} />
          ))}
        </div>
      ) : (
        <DesktopScroll />
      )}

      <div className="proj-outro">
        <p className="proj-outro-text">More coming soon.</p>
        <button className="proj-back" onClick={() => navigate("/")}>
          ← Back to portfolio
        </button>
      </div>
    </div>
  );
}