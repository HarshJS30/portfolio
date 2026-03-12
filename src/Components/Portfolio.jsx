// src/Components/Portfolio.jsx
import Tools from "./Dailystack";
import HeroCard from "./Herocard";
import LinksPanel from "./Linkspanel";
import TechStack from "./Techstack";
import "../App.css";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <div className="portfolio__grid">
        <div className="portfolio__col portfolio__col--tech">
          <TechStack />
        </div>
        <div className="portfolio__col portfolio__col--center">
          <HeroCard />
          <Tools />
        </div>
        <div className="portfolio__col portfolio__col--links">
          <LinksPanel />
        </div>
      </div>
    </div>
  );
}