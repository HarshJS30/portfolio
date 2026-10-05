import "../css/Projects.css";
import img4 from "../assets/cw2.png";
import img5 from "../assets/cw.png";
import img6 from "../assets/cw3.png";
import img7 from "../assets/cw4.png";
import img8 from "../assets/cw5.png";
import WorkGallery from "./WorkGallery";

const CLIENT_PROJECTS = [
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
    desc: "Developed a modern e-commerce website for a jewellery brand, focused on showcasing their products through visual hierarchy, with easy UX and a smooth overall user experience that helps generate warmer leads, integrated it with WhatsApp for direct customer inquiries.",
    tags: ["NextJS", "Figma"],
    image: img7,
    accent: "#60a5fa",
    github: null,
    live: "https://elinour-in.vercel.app/",
    year: "2026",
    type: "Client Work",
  },
  {
    id: 5,
    name: "The Hypple",
    role: "Freelance · Frontend",
    desc: "Developed a modern website for a marketing brand, focused on showcasing their portfolio and services through clean user flow, along with a clear CTA. Integrated it with Calendly to make their appointment booking process seamless.",
    tags: ["NextJS", "Figma", "Calendly"],
    image: img8,
    accent: "#60a5fa",
    github: null,
    live: null,
    year: "2026",
    type: "Client Work",
  },
];

export default function Works() {
  return (
    <WorkGallery
      projects={CLIENT_PROJECTS}
      label="Client work"
      title={<>Made for<br />good people.</>}
      subtitle="A selection of websites I've designed and built for clients."
    />
  );
}
