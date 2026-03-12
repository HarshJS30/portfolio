import { useState, useEffect } from "react";
import "../css/Herocard.css";

export default function HeroCard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d) =>
    d.toLocaleString("en-IN", {
      month: "2-digit", day: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
    });

  const getGreetingChar = (d) => {
    const h = d.getHours();
    if (h < 6) return "夜";
    if (h < 12) return "朝";
    if (h < 18) return "昼";
    return "夕";
  };

  return (
    <div className="hero-card" style={{ animationDelay: "0.1s" }}>
      <div className="hero-card__top">
        <div className="hero-card__profile">
          <div className="hero-card__avatar">
            <div className="hero-card__avatar-inner">H</div>
          </div>
          <div>
            <p className="hero-card__name">Harsh.</p>
          </div>
        </div>
        <span className="hero-card__kanji">{getGreetingChar(time)}</span>
      </div>

      <div className="hero-card__bio">
        <p className="hero-card__headline">
          I build <strong>Websites</strong> .
        </p>
        <p className="hero-card__desc">
          Hello, I'm Harsh, a 21 year old developer based in India.
        </p>
      </div>

      <div className="hero-card__footer">
        <p className="hero-card__joke">"Trying to make my each day count."</p>
        <div className="hero-card__status">
          <span className="hero-card__dot" />
          <div>
            <p className="hero-card__available">Available for work</p>
            <p className="hero-card__time">{formatTime(time)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}