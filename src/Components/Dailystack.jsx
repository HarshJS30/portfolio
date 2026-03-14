import { useState, useEffect } from "react";
import "../css/Tools.css";

const LASTFM_KEY = "ec87eb6a865c790b76455b8bd2a52452";
const LASTFM_USER = "nottharsh";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "harshjs30";

// ── TOOLS ──────────────────────────────────────────────────────
const tools = [
  {
    label: "VSCode",
    color: "#007ACC",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.983V4.017a1.5 1.5 0 0 0-.85-1.43zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    color: "#fff",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Claude",
    color: "#D4A574",
    icon: (
      <svg viewBox="0 0 100 100" width="22" height="22" fill="currentColor">
        <path d="M65.8 32.4c-3.4-8.1-6.8-16.3-10.3-24.4-.7-1.6-2-2-3.1-1-.6.5-1 1.4-1.3 2.1L40.8 32.4H65.8zM28.5 32.4 17.3 58.3c-.4 1-.4 2 .1 2.8.6.9 1.6 1.4 2.8 1.4h8.6l13.5-30.1H28.5zM72 32.4 58.5 62.5h14.8l8.6.1c1.2 0 2.2-.5 2.8-1.4.5-.8.5-1.8.1-2.8L72 32.4zM56.3 62.5 50 77.2l-6.3-14.7H28.5l13 30.1c.7 1.6 1.9 2.4 3.2 2.4s2.5-.8 3.2-2.4l3.1-7.2 3.1 7.2c.7 1.6 1.9 2.4 3.2 2.4s2.5-.8 3.2-2.4l13-30.1H56.3z"/>
      </svg>
    ),
  },
  {
    label: "Figma",
    color: "#A259FF",
    icon: (
      <svg viewBox="0 0 38 57" width="18" height="18" fill="currentColor">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19z" fill="#FF7262"/>
        <path d="M0 9.5a9.5 9.5 0 0 0 9.5 9.5H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#FF637E"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Postman",
    color: "#FF6C37",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M13.527.099C6.955-.744.949 3.9.099 10.473c-.85 6.572 3.794 12.578 10.366 13.428 6.573.85 12.578-3.794 13.428-10.366C24.744 6.963 20.1.948 13.527.099zm2.844 7.663l-3.316 3.316a1.625 1.625 0 0 1 .04 2.437l.914.913a.75.75 0 1 1-1.06 1.06l-.914-.913a1.625 1.625 0 0 1-2.437-.04l-1.712 1.712a.75.75 0 1 1-1.06-1.06l1.712-1.712a1.625 1.625 0 0 1 .04-2.437L6.864 9.124a.75.75 0 1 1 1.06-1.06l1.714 1.714a1.625 1.625 0 0 1 2.437-.04l3.316-3.316a.75.75 0 1 1 1.06 1.06l-2.08 2.08z" />
      </svg>
    ),
  },
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

const YTMusicIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L16.2 12l-6.516 3.54z" />
  </svg>
);

// ── COMPONENT ──────────────────────────────────────────────────
export default function DailyStack() {
  const [music, setMusic] = useState(FALLBACK_MUSIC);
  const [contributions, setContributions] = useState({});
  const [totalContribs, setTotalContribs] = useState(0);
  const [graphLoading, setGraphLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  // Last.fm
  useEffect(() => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_KEY}&limit=1&format=json`
    )
      .then((r) => r.json())
      .then((data) => {
        const track = data.recenttracks.track[0];
        const img = track.image[3]["#text"] || track.image[2]["#text"] || FALLBACK_MUSIC.cover;
        setMusic({
          title: track.name,
          artist: track.artist["#text"],
          cover: img || FALLBACK_MUSIC.cover,
          url: track.url,
          nowplaying: !!track["@attr"]?.nowplaying,
        });
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
        const cal = data.data.user.contributionsCollection.contributionCalendar;
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

  // Hashnode latest post
  useEffect(() => {
    fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          publication(host: "harshjs.hashnode.dev") {
            posts(first: 1) {
              edges {
                node {
                  title
                  brief
                  url
                  publishedAt
                  readTimeInMinutes
                }
              }
            }
          }
        }`,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        const node = data.data.publication.posts.edges[0]?.node;
        if (node) setBlog(node);
      })
      .catch(() => {});
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
      {/* ── TOP ROW: tools | title | github graph ── */}
      <div className="ds-top-row">
        {/* Tool icons */}
        <div className="ds-tools-col">
          {tools.map((t) => (
            <button
              key={t.label}
              className="ds-tool-btn"
              title={t.label}
              style={{ "--tool-color": t.color }}
            >
              {t.icon}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="ds-title-block">
          <p className="ds-daily">DAILY</p>
          <p className="ds-tool-label">Tool</p>
          <p className="ds-stack">STACK.</p>
          <div className="ds-pill" />
          {blog && (
            <div
              className="ds-blog"
              onClick={() => window.open(blog.url, "_blank")}
              style={{ cursor: "pointer" }}
            >
              <div className="ds-blog-meta">
                <span className="ds-blog-badge">* latest post</span>
                <span className="ds-blog-date">
                  {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="ds-blog-read">{blog.readTimeInMinutes} min read</span>
              </div>
              <p className="ds-blog-title">{blog.title}</p>
              {blog.brief && (
                <p className="ds-blog-desc">{blog.brief}</p>
              )}
            </div>
          )}
        </div>

        {/* GitHub Contribution Graph */}
        <div className="ds-github">
          <div className="ds-github-header">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="#888">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="ds-github-label">{GITHUB_USERNAME}</span>
            {!graphLoading && (
              <span className="ds-github-total">{totalContribs} contributions</span>
            )}
          </div>

          {graphLoading ? (
            <div className="ds-github-loading">loading graph...</div>
          ) : (
            <div className="ds-contrib-grid">
              {weeks.map((week, wi) => (
                <div key={wi} className="ds-contrib-week">
                  {week.map((date) => (
                    <div
                      key={date}
                      className="ds-contrib-day"
                      title={`${date}: ${contributions[date] || 0} contributions`}
                      style={{
                        background: getContributionColor(contributions[date] || 0),
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM ROW: music | SureLM ── */}
      <div className="ds-bottom-row">

        {/* Music card */}
        <button className="ds-music" onClick={handleMusicClick}>
          <div className="ds-music-left">
            <div className="ds-music-platform">
              <YTMusicIcon />
              <span>YT Music</span>
            </div>
            <div className="ds-music-text">
              {music.nowplaying ? (
                <span className="ds-nowplaying">
                  <span className="ds-nowplaying-dot" />
                  now playing
                </span>
              ) : (
                <span className="ds-lastplayed">last played</span>
              )}
              <p className="ds-music-title">{music.title}</p>
              <p className="ds-music-artist">{music.artist}</p>
            </div>
          </div>
          <img src={music.cover} alt={music.title} className="ds-music-cover" />
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
              <span key={tag} className="ds-building-tag">{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}