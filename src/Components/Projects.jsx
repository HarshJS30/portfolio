import "../css/Projects.css";
import img1 from "../assets/pr1.png";
import img2 from "../assets/pr3.png";
import img3 from "../assets/pr5.png";
import img4 from "../assets/pr7.png";
import img5 from "../assets/pr9.png";
import WorkGallery from "./WorkGallery";

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
    tags: ["React", "Node.js", "Express.js", "MongoDB"],
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
    github: "https://github.com/harshjs30",
    live: "https://grindbook.vercel.app/",
    year: "2024",
    type: "Personal Project",
  },
  {
    id: 4,
    name: "OneDSA",
    role: "Solo · Frontend",
    desc: "One curated DSA challenge per day from a hand-picked list of 100 questions. Tags, difficulty levels, and direct problem links — no fluff.",
    tags: ["React", "Tailwind", "GSAP"],
    image: img3,
    accent: "#facc15",
    github: "https://github.com/harshjs30",
    live: "https://onedsa.vercel.app/",
    year: "2024",
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
    year: "2024",
    type: "Personal Project",
  },
];

export default function Projects() {
  return (
    <WorkGallery
      projects={PROJECTS}
      label="Selected work"
      title={<>Things I've<br />actually built.</>}
      subtitle="A few things I've made, from experiments to products."
    />
  );
}
