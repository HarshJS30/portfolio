import { useState, useEffect} from "react";
import "../css/Tools.css";
import { motion } from "motion/react";
import MediaRemote from "./MediaRemote";
import { VisualStudioCode } from "../icons/VisualStudioCode";
import { GitHub } from "../icons/Github";
import { ClaudeAI } from "../icons/Claude";
import { Figma } from "../icons/Figma";
import { WhatsApp } from "../icons/Whatsapp";
import { Postman } from "../icons/Postman";
import { YoutubeMusic } from "../icons/YouTube";
import { Codex } from "../icons/Codex";

const LASTFM_KEY = "ec87eb6a865c790b76455b8bd2a52452";
const LASTFM_USER = "nottharsh";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "harshjs30";

// ── TOOLS ──────────────────────────────────────────────────────
const tools = [
  {
    label: "VSCode",
    color: "#007ACC",
    icon: VisualStudioCode
  },
  {
    label: "GitHub",
    color: "#000000",
    icon: GitHub
  },
  {
    label: "Claude",
    color: "#D4A574",
    icon: ClaudeAI
  },
  {
    label: "Figma",
    color: "#A259FF",
    icon: Figma
  },
  {
    label: "WhatsApp",
    color: "#25D366",
    icon: WhatsApp
  },
  {
    label: "Postman",
    color: "#FF6C37",
    icon: Postman
  },
  {
    label: "YouTube Music",
    color: "#FF0000",
    icon: YoutubeMusic
  },
  {
    label: "Codex",
    color: "#fff",
    icon: Codex
  }
];

// ── SURELM DATA ────────────────────────────────────────────────
const SURELM = {
  name: "SureLM",
  tagline: "Financial protection for every household",
  desc: "AI-powered insurance platform for rural India — local agents, multilingual, mobile-first.",
  tags: ["Llama 4", "RAG", "Node.js", "NextJS"],
  status: "Building",
};

// ── HELPERS ────────────────────────────────────────────────────
const FALLBACK_MUSIC = {
  title: "Fox on the Run",
  artist: "Sweet",
  cover: "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
  url: null,
  nowplaying: false,
};

function getLast91Days() {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }

  return days;
}

function getContributionColor(count) {
  if (count === 0) return "#161b22";
  if (count <= 2) return "#0e4429";
  if (count <= 5) return "#006d32";
  if (count <= 9) return "#26a641";
  return "#39d353";
}

// ── COMPONENT ──────────────────────────────────────────────────
export default function DailyStack() {
  const [music, setMusic] = useState(FALLBACK_MUSIC);
  const [contributions, setContributions] = useState({});
  const [totalContribs, setTotalContribs] = useState(0);
  const [graphLoading, setGraphLoading] = useState(true);
  const [message, setMessage] = useState("");
  // local play/pause state for the device UI — does not control real
  // audio, Last.fm only tells us what's currently scrobbling, it doesn't
  // give us transport control. Pressing play just toggles the pulse/visuals.
  const [playing, setPlaying] = useState(false);

  // Last.fm doesn't expose playback position, so this is "time since we
  // detected the track playing," not the real song position. Ticks from
  // 00:00 while nowplaying is true.
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [playing]);

  const fmtTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // Last.fm
  useEffect(() => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_KEY}&limit=1&format=json`
    )
      .then((r) => r.json())
      .then((data) => {
        const track = data.recenttracks.track[0];
        const img =
          track.image[3]["#text"] ||
          track.image[2]["#text"] ||
          FALLBACK_MUSIC.cover;

        const nowplaying = !!track["@attr"]?.nowplaying;

        setMusic({
          title: track.name,
          artist: track.artist["#text"],
          cover: img || FALLBACK_MUSIC.cover,
          url: track.url,
          nowplaying,
        });
        setPlaying(nowplaying);
      })
      .catch(() => {});
  }, []);

  // GitHub contributions via GraphQL
  useEffect(() => {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - 90);

    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection(
              from: "${from.toISOString()}"
              to: "${today.toISOString()}"
            ) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        const cal =
          data.data.user.contributionsCollection.contributionCalendar;

        const map = {};

        cal.weeks.forEach((week) => {
          week.contributionDays.forEach((day) => {
            map[day.date] = day.contributionCount;
          });
        });

        setContributions(map);
        setTotalContribs(cal.totalContributions);
        setGraphLoading(false);
      })
      .catch(() => setGraphLoading(false));
  }, []);

  const handleMusicClick = () => {
    const query = encodeURIComponent(`${music.title} ${music.artist}`);
    window.open(`https://music.youtube.com/search?q=${query}`, "_blank");
  };

  const days = getLast91Days();
  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="ds-wrap">
      <div className="ds-top-row">

        {/* Tool icons */}
        <div className="ds-tools-col">
          {tools.map((t) => {
            const Icon = t.icon;

            return (
              <button
                key={t.label}
                className="ds-tool-btn"
                title={t.label}
                style={{ "--tool-color": t.color }}
              >
                <Icon />
              </button>
            );
          })}
        </div>

        {/* Title */}
        <div className="ds-title-block">
          <p className="ds-daily">DAILY</p>
          <p className="ds-tool-label">Tool</p>
          <p className="ds-stack">STACK.</p>
          <div className="ds-pill" />
          <MediaRemote />
        </div>

        {/* GitHub + Contact */}
        <div className="ds-github-column">

          {/* GitHub Contribution Graph */}
          <div className="ds-github">
            <div className="ds-github-header">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#888">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>

              <span className="ds-github-label">
                {GITHUB_USERNAME}
              </span>

              {!graphLoading && (
                <span className="ds-github-total">
                  {totalContribs} contributions
                </span>
              )}
            </div>

            {graphLoading ? (
              <div className="ds-github-loading">
                loading graph...
              </div>
            ) : (
              <div className="ds-contrib-grid">
                {weeks.map((week, wi) => (
                  <div key={wi} className="ds-contrib-week">
                    {week.map((date) => (
                      <div
                        key={date}
                        className="ds-contrib-day"
                        title={`${date}: ${
                          contributions[date] || 0
                        } contributions`}
                        style={{
                          background: getContributionColor(
                            contributions[date] || 0
                          ),
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <form
            method="post"
            action="https://formsubmit.co/nott.harsh30@gmail.com"
            className="ds-contact-form"
          >
            <div className={`floating-field ${message ? 'has-value' : ''}`}>
              <label htmlFor="message">Send me a message</label>
              <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>

            <button type="submit">Send message</button>
          </form>

        </div>
      </div>

      {/* ── BOTTOM ROW: player | SureLM ── */}
      <div className="ds-bottom-row">

        {/* Retro device player — whole card is one button, opens YT Music */}
        <button className="ds-player" onClick={handleMusicClick}>
          <div className="ds-player-screen-frame">
            <div className="ds-player-screen">
              <img
                src={music.cover}
                alt={music.title}
                className="ds-player-cover"
              />

              <div className="ds-player-text">
                <div className="ds-player-toprow">
                  {music.nowplaying ? (
                    <span className="ds-player-status">
                      <motion.span
                        className="ds-player-status-dot"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      PLAYING
                    </span>
                  ) : (
                    <span className="ds-player-status is-last">LAST PLAYED</span>
                  )}

                  {music.nowplaying && (
                    <span className="ds-player-time">{fmtTime(elapsed)}</span>
                  )}
                </div>

                <p className="ds-player-title">{music.title}</p>
                <p className="ds-player-artist">{music.artist}</p>
              </div>
            </div>
          </div>

          <motion.span
            className="ds-player-play"
            initial={false}
            animate={{ scale: playing ? 0.94 : 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {playing ? "❚❚" : "▶"}
          </motion.span>
        </button>

        {/* SureLM — Currently Building */}
        <div className="ds-building">
          <div className="ds-building-header">
            <span className="ds-building-badge">
              <span className="ds-building-dot" />
              currently building
            </span>
          </div>

          <p className="ds-building-name">{SURELM.name}</p>
          <p className="ds-building-desc">{SURELM.desc}</p>

          <div className="ds-building-tags">
            {SURELM.tags.map((tag) => (
              <span key={tag} className="ds-building-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
