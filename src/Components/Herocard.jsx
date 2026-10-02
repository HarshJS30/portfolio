import { useState, useEffect, useRef } from "react";
import { Television, BoxingGlove, SoccerBall } from "@phosphor-icons/react";
import "../css/Herocard.css";
import img from "../assets/collage.png";
import img1 from "../assets/cover.png";
import { highlight } from "@highlighters/core";

export default function HeroCard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d) =>
    d.toLocaleString("en-IN", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const getGreetingChar = (d) => {
    const h = d.getHours();

    if (h < 6) return "夜";
    if (h < 12) return "朝";
    if (h < 18) return "昼";
    return "夕";
  };

  const imageRef = useRef(null);
  const lastMouseX = useRef(0);
  const highlightHostRef = useRef(null);

  const handleMouseEnter = (e) => {
    if (!imageRef.current) return;

    const x = e.clientX;
    const y = e.clientY;

    const deltaX = x - lastMouseX.current;
    lastMouseX.current = x;

    const rotation = Math.max(Math.min(deltaX * 2, 95), -95);

    imageRef.current.style.left = `${x}px`;
    imageRef.current.style.top = `${y}px`;
    imageRef.current.style.setProperty("--tilt", `${rotation}deg`);
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;

    imageRef.current.style.setProperty("--tilt", "0deg");
  };

  useEffect(() => {
    if (!highlightHostRef.current) return;

    const mark = highlight(
      ".key-point",
      {
        markType: "highlight",
        color: "#D8B4FE",
        opacity: 0.4,
        vivid: true,
        tip: { type: "fine", overshoot: 3 },
        ink: { flow: 0.5, streakiness: 0.3 },
      },
      highlightHostRef.current,
    );

    return () => mark.remove();
  }, []);

  return (
    <div className="hero-card" style={{ animationDelay: "0.1s" }}>
      <div className="hero-card__top">
        <div className="hero-card__profile">
          <div className="hero-card__avatar">
            <div className="hero-card__avatar-inner">
              <img src={img1} alt="Harsh" />
            </div>
          </div>

          <div>
            <p className="hero-card__name">Harsh.</p>
          </div>
        </div>

        <span className="hero-card__kanji">
          {getGreetingChar(time)}
        </span>
      </div>

      <div className="hero-card__bio">
        <p className="hero-card__headline">
          I build{" "}
          <strong
            data-cuelume-hover="tick"
            className="hover-trigger"
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Websites

            <span className="hover-image-wrap" ref={imageRef}>
              <img src={img} alt="Websites" />
            </span>
          </strong>{" "}
          .
        </p>

        <p className="hero-card__desc" ref={highlightHostRef}>
          <span className="key-point">
            Hello, I'm Harsh, a 22-year-old developer based in India.
          </span>

          <span className="hero-card__desc-rest">
            {" "}
            I write occasionally, you can find them at{" "}
            <a
              data-cuelume-hover="tick"
              href="https://nottharsh.bearblog.dev/blog/"
              target="_blank"
              rel="noopener noreferrer"
            >
              my blog.
            </a>

            <span className="blog-arrow">↗</span>

            <br />

            Away from the keyboard, I'm usually watching{" "}
            <span className="fav fav--tv">
              TV shows
              <Television
                weight="duotone"
                className="fav__icon"
                aria-hidden="true"
              />
            </span>
            ,{" "}
            <span className="fav fav--ufc">
              UFC
              <BoxingGlove
                weight="duotone"
                className="fav__icon"
                aria-hidden="true"
              />
            </span>{" "}
            or{" "}
            <span className="fav fav--ball">
              football
              <SoccerBall
                weight="duotone"
                className="fav__icon"
                aria-hidden="true"
              />
            </span>
            .
          </span>
        </p>
      </div>

      <div className="hero-card__footer">
        <p className="hero-card__joke">
          "Trying to make my each day count."
        </p>

        <div className="hero-card__status">
          <span className="hero-card__dot" />

          <div>
            <p className="hero-card__available">
              Available for work
            </p>

            <p className="hero-card__time">
              {formatTime(time)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}