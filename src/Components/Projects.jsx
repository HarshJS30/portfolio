import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/Projects.css";
import img1 from '../assets/pr1.png';
import img2 from '../assets/pr3.png';
import img3 from '../assets/pr5.png';
import img4 from '../assets/pr7.png';
import img5 from '../assets/pr9.png';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    name: "SureLM",
    role: "CO-Founder · Full Stack",
    desc: "AI-powered insurance platform for rural India. Local agents, multilingual LLM policy recommendations, mobile-first claims processing.",
    tags: ["Llama 4", "RAG", "Node.js", "Next.js", "CRM"],
    image: img5,
    accent: "#4ade80",
    github: null,
    live: null,
    year: "2025",
    type: "Startup",
  },
  {
    id: 2,
    name: "Dashboard",
    role: "Freelance · Full Stack",
    desc: "Government personnel management system for quick access to departmental staff information. Built for a paying client with real-world data requirements.",
    tags: ["NextJS","Google Sheets"],
    image: img4,
    accent: "#60a5fa",
    github: null,
    live: "https://dashboard-livid-two-18.vercel.app/",
    year: "2024",
    type: "Client Work",
  },
  {
    id: 3,
    name: "GrindBook",
    role: "Solo · Full Stack",
    desc: "DSA revision tracker where users log questions, URLs, and key learnings for effective pattern recognition and spaced repetition.",
    tags: ["React", "Node.js", "MongoDB", "Auth"],
    image: img1,
    accent: "#a78bfa",
    github: "https://github.com/harshjs30/grindbook",
    live: "https://grindbook.vercel.app/",
    year: "2024",
    type: "Personal Project",
  },
  {
    id: 4,
    name: "OneDSA",
    role: "Solo · Frontend",
    desc: "One curated DSA challenge per day from a hand-picked list of 100 questions. Tags, difficulty levels, and direct problem links — no fluff.",
    tags: ["NextJS", "Tailwind"],
    image: img3,
    accent: "#facc15",
    github: "https://github.com/harshjs30/onedsa",
    live: "https://onedsa.vercel.app/",
    year: "2025",
    type: "Personal Project",
  },
  {
    id: 5,
    name: "Anon",
    role: "Solo · Full Stack",
    desc: "Instant anonymous chat rooms. No sign up, no friction — create a room, share the code, start talking. Real-time with WebSockets.",
    tags: ["React", "Node.js", "Socket.io", "Express.js"],
    image: img2,
    accent: "#34d399",
    github: "https://github.com/harshjs30",
    live: "https://anon-mu-one.vercel.app/",
    year: "2025",
    type: "Personal Project",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const indexRef = useRef(null);
  const imagesRef = useRef(null);
  const namesRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
  const section = sectionRef.current;
  const indexEl = indexRef.current;
  const imagesEl = imagesRef.current;
  const namesEl = namesRef.current;
  const counter = counterRef.current;

  const images = imagesEl.querySelectorAll(".proj-image");
  const titles = namesEl.querySelectorAll(".proj-title");
  const total = PROJECTS.length;
  const pad = (n) => String(n).padStart(2, "0");

  const sectionH = section.offsetHeight;
  const style = getComputedStyle(section);
  const pt = parseFloat(style.paddingTop);
  const pb = parseFloat(style.paddingBottom);

  const indexH = indexEl.offsetHeight;
  const imagesH = imagesEl.offsetHeight;

  const indexTravel = sectionH - pt - pb - indexH;
  const imagesTravel = -(imagesH - (sectionH - pt - pb));

  const threshold = window.innerHeight / 2;

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${sectionH * (total - 1)}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Move index + images
        gsap.set(indexEl, { y: progress * indexTravel });
        gsap.set(imagesEl, { y: progress * imagesTravel });

        // Find which image is actually in the center of the viewport RIGHT NOW
        let activeIndex = 0;
        let closestDist = Infinity;

        images.forEach((img, i) => {
          const rect = img.getBoundingClientRect();
          const imgCenter = rect.top + rect.height / 2;
          const dist = Math.abs(imgCenter - threshold);

          const isInView = rect.top < threshold && rect.bottom > threshold;
          gsap.set(img, {
            opacity: isInView ? 1 : 0.15,
            scale: isInView ? 1 : 0.96,
          });

          if (dist < closestDist) {
            closestDist = dist;
            activeIndex = i;
          }
        });

        // Counter synced to active image
        counter.textContent = `${pad(activeIndex + 1)} / ${pad(total)}`;

        // Titles swap exactly when image crosses center
        titles.forEach((title, i) => {
          if (i === activeIndex) {
            gsap.set(title, { opacity: 1, y: 0, pointerEvents: "auto" });
          } else if (i < activeIndex) {
            gsap.set(title, { opacity: 0, y: -40, pointerEvents: "none" });
          } else {
            gsap.set(title, { opacity: 0, y: 40, pointerEvents: "none" });
          }
        });
      },
    });
  }, section);

  return () => ctx.revert();
}, []);

  return (
    <div className="projects-page">
      {/* Intro */}
      <div className="proj-intro">
        <p className="proj-intro-label">selected work</p>
        <h1 className="proj-intro-title">Things I've<br />actually built.</h1>
        <p className="proj-intro-sub">Scroll to explore</p>
        <div className="proj-intro-arrow">↓</div>
      </div>

      {/* Pinned spotlight */}
      <section className="proj-spotlight" ref={sectionRef}>
        {/* Left: index counter */}
        <div className="proj-index" ref={indexRef}>
          <span className="proj-counter" ref={counterRef}>01 / 05</span>
          <div className="proj-index-line" />
        </div>

        {/* Center: images stack */}
        <div className="proj-images-wrap">
          <div className="proj-images" ref={imagesRef}>
            {PROJECTS.map((p) => (
              <div key={p.id} className="proj-image" style={{ "--accent": p.accent }}>
                {/* Gradient placeholder — swap with <img> when you have screenshots */}
                <img src={p.image} alt={p.name} className="proj-image-bg" />
                <div className="proj-image-overlay">
                  <span className="proj-image-type">{p.type}</span>
                  <span className="proj-image-year">{p.year}</span>
                </div>
                <div className="proj-image-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="proj-image-tag" style={{ borderColor: p.accent, color: p.accent }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: titles + desc */}
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

      {/* Outro */}
      <div className="proj-outro">
        <p className="proj-outro-text">More coming soon.</p>
        <a href="/" className="proj-back">← Back to portfolio</a>
      </div>
    </div>
  );
}