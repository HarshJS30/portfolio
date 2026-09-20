import { useEffect, useState } from "react";
import { bind } from "cuelume"; // npm install cuelume
import "../css/MediaRemote.css";

/* ---------- placeholder clips ----------
   Swap `src` for your own image URLs / imports. Keep the shape
   { src, alt, title } and everything else keeps working. */

const svg = (markup) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200' preserveAspectRatio='xMidYMid slice'>${markup}</svg>`
  )}`;

const DEMO_CLIPS = [
  {
    title: "Harbour Bridge, 6:42pm",
    alt: "Steel arch bridge against a dusk sky",
    watching: true, // only this clip shows the "Currently watching" tag
    src: svg(`
      <defs><linearGradient id='a' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stop-color='#93a6b1'/><stop offset='.52' stop-color='#dcc5a4'/>
        <stop offset='1' stop-color='#a8794f'/></linearGradient></defs>
      <rect width='320' height='200' fill='url(#a)'/>
      <circle cx='232' cy='142' r='20' fill='#f0d9b4' opacity='.55'/>
      <path d='M-12 176 Q158 44 332 176' fill='none' stroke='#2b2f32' stroke-width='13'/>
      <path d='M-12 150 H332' stroke='#2b2f32' stroke-width='7'/>
      <g stroke='#2b2f32' stroke-width='3'>
        <path d='M42 150V131M88 150V108M134 150V92M180 150V92M226 150V108M272 150V131'/>
      </g>
      <rect y='176' width='320' height='24' fill='#23272a'/>`),
  },
  {
    title: "Rooftop, 11:08pm",
    alt: "City blocks lit up at night",
    src: svg(`
      <defs><linearGradient id='b' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stop-color='#111a2b'/><stop offset='1' stop-color='#33405c'/>
      </linearGradient></defs>
      <rect width='320' height='200' fill='url(#b)'/>
      <g fill='#e8e2cf' opacity='.75'>
        <circle cx='48' cy='36' r='1.4'/><circle cx='112' cy='22' r='1'/>
        <circle cx='196' cy='44' r='1.2'/><circle cx='268' cy='28' r='1'/>
      </g>
      <g fill='#161d2c'>
        <rect x='6' y='118' width='58' height='82'/><rect x='74' y='90' width='46' height='110'/>
        <rect x='128' y='128' width='62' height='72'/><rect x='198' y='72' width='50' height='128'/>
        <rect x='256' y='110' width='58' height='90'/>
      </g>
      <g fill='#f4c877' opacity='.85'>
        <rect x='84' y='102' width='6' height='8'/><rect x='98' y='120' width='6' height='8'/>
        <rect x='208' y='86' width='6' height='8'/><rect x='226' y='110' width='6' height='8'/>
        <rect x='20' y='134' width='6' height='8'/><rect x='272' y='128' width='6' height='8'/>
      </g>`),
  },
  {
    title: "Coast road, 7:15am",
    alt: "Rolling hills at sunrise",
    src: svg(`
      <defs><linearGradient id='c' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stop-color='#f3d7bd'/><stop offset='1' stop-color='#e3a97f'/>
      </linearGradient></defs>
      <rect width='320' height='200' fill='url(#c)'/>
      <circle cx='96' cy='86' r='26' fill='#fbeede' opacity='.9'/>
      <path d='M0 142 Q78 104 152 140 T320 128 V200 H0Z' fill='#7d6a5c' opacity='.65'/>
      <path d='M0 168 Q96 132 186 166 T320 156 V200 H0Z' fill='#4a3f39'/>`),
  },
];

/* How often the next photo comes up while "playing" (slideshow mode). */
const AUTO_ADVANCE_MS = 3500;

/* ---------- icons ---------- */

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M8 5.2 18.4 12 8 18.8Z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M9.2 5.4v13.2M14.8 5.4v13.2" />
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20.4 6.2 12.6 12l7.8 5.8Z" />
    <path d="M11.4 6.2 3.6 12l7.8 5.8Z" />
  </svg>
);

const ForwardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M3.6 6.2 11.4 12l-7.8 5.8Z" />
    <path d="M12.6 6.2 20.4 12l-7.8 5.8Z" />
  </svg>
);

/* Click sound: real cuelume press/release cues via data attributes
   below. bind() only needs to run once, however many remotes are
   on the page, so it's gated at module scope. */
let bound = false;

export default function MediaRemote({ clips = DEMO_CLIPS, onChange }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = clips[index];

  const goTo = (to) => {
    setIndex(to);
    onChange?.(clips[to], to);
  };

  const prev = () => goTo((index - 1 + clips.length) % clips.length);
  const next = () => goTo((index + 1) % clips.length);

  // Wire up cuelume's data-cuelume-* attributes once.
  useEffect(() => {
    if (bound) return;
    bound = true;
    bind();
  }, []);

  // Slideshow autoplay while "playing".
  useEffect(() => {
    if (!playing || clips.length < 2) return undefined;
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, clips.length]);

  return (
    <div
      className="remote"
      role="group"
      aria-label={current ? `Player: ${current.title}` : "Player"}
    >
      <div className="remote__face">
        <div className="remote__screen">
          {current ? (
            <img
              className="remote__art"
              key={current.src}
              src={current.src}
              alt={current.alt ?? ""}
              draggable="false"
            />
          ) : (
            <p className="remote__empty">Load a photo to start</p>
          )}
          <span className="remote__glass" aria-hidden="true" />
          <span className="remote__badge">
            <span className="remote__badge-dot" aria-hidden="true" />
            Currently watching
          </span>
        </div>

        <div className="remote__plate">
          <p className="remote__title" title={current?.title}>
            {current?.title ?? "No photo"}
          </p>
        </div>

        <div className="remote__keys">
          <button
            type="button"
            className="key"
            onClick={prev}
            data-cuelume-press
            data-cuelume-release
            aria-label="Previous photo"
            disabled={clips.length < 2}
          >
            <BackIcon />
          </button>
          <button
            type="button"
            className={`key${playing ? " key--lit" : ""}`}
            onClick={() => setPlaying((p) => !p)}
            data-cuelume-press
            data-cuelume-release
            aria-pressed={playing}
            aria-label={playing ? "Pause" : "Play"}
            disabled={!current}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className="key"
            onClick={next}
            data-cuelume-press
            data-cuelume-release
            aria-label="Next photo"
            disabled={clips.length < 2}
          >
            <ForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
}