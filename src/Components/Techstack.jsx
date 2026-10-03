import "../css/Techstack.css";
import {
  SiClerk,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiRedis,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaCode, FaDatabase, FaLayerGroup, FaShieldHalved } from "react-icons/fa6";

const stack = {
  Frontend: [
    { label: "React", icon: SiReact, color: "#61DAFB" },
    { label: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { label: "Shadcn", icon: SiShadcnui, color: "#FFFFFF" },
    { label: "GSAP", icon: FaCode, color: "#88CE02" },
    { label: "Tailwindcss", icon: SiTailwindcss, color: "#06B6D4" },
    { label: "Framer-Motion", icon: SiFramer, color: "#0055FF" },
  ],
  Backend: [
    { label: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
    { label: "Socket.io", icon: SiSocketdotio, color: "#FFFFFF" },
    { label: "Express.js", icon: SiExpress, color: "#FFFFFF" },
    { label: "Redis + BullMQ", icon: FaLayerGroup, color: "#D82C20" },
    { label: "JWT", icon: FaShieldHalved, color: "#EB5424" },
    { label: "OAuth 2.0 (PKCE)", icon: FaShieldHalved, color: "#EB5424" },
    { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  ],
  "DB & Services": [
    { label: "Clerk", icon: SiClerk, color: "#6C47FF" },
    { label: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
    { label: "Prisma ORM", icon: SiPrisma, color: "#5A67D8" },
    { label: "Postgres", icon: SiPostgresql, color: "#4169E1" },
    { label: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { label: "Pinecone", icon: FaDatabase, color: "#00BCA5" },
    { label: "Redis", icon: SiRedis, color: "#D82C20" },
  ],
  "DevOps & Tools": [
    { label: "Docker", icon: SiDocker, color: "#2496ED" },
    { label: "GitHub Actions (CI/CD)", icon: SiGithubactions, color: "#2088FF" },
    { label: "Git", icon: SiGit, color: "#F05032" },
    { label: "Postman", icon: SiPostman, color: "#FF6C37" },
    { label: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  ],
};

export default function TechStack() {
  return (
    <div className="tech-stack">
      <div className="tech-stack__header">
        <span className="tech-stack__icon">{"{}"}</span>
        <h1 className="tech-stack__title">
          TECH<br />STACK
        </h1>
      </div>
      <div className="tech-stack__categories">
        {Object.entries(stack).map(([cat, items]) => (
          <div key={cat} className="tech-stack__cat">
            <p className="tech-stack__cat-label">{cat}:</p>
            <div className="tech-stack__tags">
              {items.map(({ label, icon: Icon, color }) => (
                <span
                  key={label}
                  className="tech-stack__tag"
                  style={{ "--tech-color": color }}
                >
                  <Icon className="tech-stack__tag-icon" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}