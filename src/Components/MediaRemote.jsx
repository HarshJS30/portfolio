import { useEffect, useState } from "react";
import { bind } from "cuelume"; // npm install cuelume
import "../css/MediaRemote.css";
import sfe1 from "../assets/webshows/sfe01.png";
import sfe2 from "../assets/webshows/sfe02.png";
import sfe3 from "../assets/webshows/sfe03.png";
import sfe4 from "../assets/webshows/sfe04.png";
import sfe5 from "../assets/webshows/sfe05.png";
import sfe6 from "../assets/webshows/sfe06.png";
import lf1 from "../assets/webshows/leftovers01.png";
import lf2 from "../assets/webshows/leftovers02.png";
import lf3 from "../assets/webshows/leftovers03.png";
import lf4 from "../assets/webshows/leftovers04.png";
import lf5 from "../assets/webshows/leftovers05.png";
import rb1 from "../assets/webshows/robot01.png";
import rb2 from "../assets/webshows/robot02.png";
import rb3 from "../assets/webshows/robot03.png";
import rb4 from "../assets/webshows/robot04.png";
import rb5 from "../assets/webshows/robot05.png";
import sh1 from "../assets/webshows/shield01.png";
import sh2 from "../assets/webshows/shield02.png";
import sh3 from "../assets/webshows/shield03.png";
import sh4 from "../assets/webshows/shield04.png";
import sh5 from "../assets/webshows/shield05.png";
import sh6 from "../assets/webshows/shield06.png";
import sh7 from "../assets/webshows/shield07.png";
import amr1 from "../assets/webshows/americans01.png";
import amr2 from "../assets/webshows/americans02.png";
import amr3 from "../assets/webshows/americans03.png";
import amr4 from "../assets/webshows/americans04.png";
import amr5 from "../assets/webshows/americans05.png";
import dex1 from "../assets/webshows/dexter01.png";
import dex2 from "../assets/webshows/dexter02.png";
import dex3 from "../assets/webshows/dexter03.png";
import dex4 from "../assets/webshows/dexter04.png";
import dex5 from "../assets/webshows/dexter05.png";
import brb1 from "../assets/webshows/brba01.png";
import brb2 from "../assets/webshows/brba02.png";
import brb3 from "../assets/webshows/brba03.jpg";
import brb4 from "../assets/webshows/brba04.jpg";
import bcs1 from "../assets/webshows/bcs01.png";
import bcs2 from "../assets/webshows/bcs02.png";
import bcs3 from "../assets/webshows/bcs03.png";
import bcs4 from "../assets/webshows/bcs04.png";
import bcs5 from "../assets/webshows/bcs05.png";

/* ---------- placeholder clips ----------
   A clip can have one `src` (the legacy shorthand), or a `photos` array.
   Each photo is `{ src, alt? }`; the remote's controls step through the
   photos before moving on to the next clip. */

const DEMO_CLIPS = [
  {
    title: "Six Feet Under, 2001-2005",
    watching: true,
    src: [sfe6,sfe2,sfe1,sfe3,sfe5,sfe4],
  },
  {
    title: "The Leftovers, 2014-2017",
    src: [lf1,lf5,lf2,lf4,lf3],
  },
  {
    title: "Mr. Robot, 2015-2019",
    src: [rb3,rb1,rb2,rb5,rb4],
  },
  {
    title: "The Shield, 2002-2008",
    src: [sh4,sh2,sh3,sh5,sh7,sh6,sh1],
  },
  {
    title: "The Americans, 2013-2018",
    src: [amr1,amr2,amr5,amr3,amr4],
  },
  {
    title: "Dexter, 2006-2013",
    src: [dex2,dex1,dex3,dex5,dex4]
  },
  {
    title: "Breaking Bad, 2008-2013",
    src: [brb1,brb2,brb3,brb4]
  },
  {
    title: "Better Call Saul, 2015-2022",
    src: [bcs1,bcs2,bcs3,bcs4,bcs5]
  }
];

/* How often the next photo comes up while "playing" (slideshow mode). */
const AUTO_ADVANCE_MS = 2000;

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
  const [clipIndex, setClipIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = clips[clipIndex];

  const getPhotos = (clip) => {
    if (clip?.photos?.length) return clip.photos;
    if (Array.isArray(clip?.src)) {
      return clip.src.map((src, index) => ({
        src,
        alt: clip.alt ?? `Frame ${index + 1}`,
      }));
    }
    if (clip?.src) return [{ src: clip.src, alt: clip.alt }];
    return [];
  };

  const photos = getPhotos(current);
  const currentPhoto = photos[photoIndex];
  const photoCount = clips.reduce((total, clip) => total + getPhotos(clip).length, 0);

  const selectPhoto = (nextClipIndex, nextPhotoIndex) => {
    setClipIndex(nextClipIndex);
    setPhotoIndex(nextPhotoIndex);
    onChange?.(clips[nextClipIndex], nextClipIndex, nextPhotoIndex);
  };

  const prev = () => {
    if (photoIndex > 0) return selectPhoto(clipIndex, photoIndex - 1);
    const previousClip = (clipIndex - 1 + clips.length) % clips.length;
    return selectPhoto(previousClip, Math.max(getPhotos(clips[previousClip]).length - 1, 0));
  };

  const next = () => {
    if (photoIndex < photos.length - 1) return selectPhoto(clipIndex, photoIndex + 1);
    return selectPhoto((clipIndex + 1) % clips.length, 0);
  };

  // Wire up cuelume's data-cuelume-* attributes once.
  useEffect(() => {
    if (bound) return;
    bound = true;
    bind();
  }, []);

  // Slideshow autoplay while "playing".
  useEffect(() => {
    if (!playing || photoCount < 2) return undefined;
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, clipIndex, photoIndex, photoCount]);

  return (
    <div
      className="remote"
      role="group"
      aria-label={current ? `Player: ${current.title}` : "Player"}
    >
      <div className="remote__face">
        <div className="remote__screen">
          {currentPhoto ? (
            <img
              className="remote__art"
              key={currentPhoto.src}
              src={currentPhoto.src}
              alt={currentPhoto.alt ?? current.alt ?? ""}
              draggable="false"
            />
          ) : (
            <p className="remote__empty">Load a photo to start</p>
          )}
          <span className="remote__glass" aria-hidden="true" />
          {current?.watching === true && (
            <span className="remote__badge">
              <span className="remote__badge-dot" aria-hidden="true" />
              Currently watching
            </span>
          )}
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
            disabled={photoCount < 2}
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
            disabled={photoCount < 2}
          >
            <ForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
