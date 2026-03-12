import "../css/Techstack.css";

const stack = {
  Frontend: ["React", "Next.js", "Shadcn", "GSAP", "Tailwindcss", "Framer-Motion"],
  Backend: ["Node.js", "Socket.io", "Express.js", "NPM"],
  "Db & Services": ["Cloudflare Workers", "Clerk", "Appwrite", "Supabase", "Prisma ORM", "Postman", "Postgres", "MongoDB", "Pinecone"],
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
              {items.map((item) => (
                <span key={item} className="tech-stack__tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}