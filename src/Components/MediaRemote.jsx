import { useEffect, useRef, useState } from "react";
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
import sp1 from "../assets/webshows/sopranos01.png"
import sp2 from "../assets/webshows/sopranos02.png"
import sp3 from "../assets/webshows/sopranos03.png"
import sp4 from "../assets/webshows/sopranos04.png"
import sp5 from "../assets/webshows/sopranos05.png"
import sp6 from "../assets/webshows/sopranos06.png"

/* ---------- placeholder clips ----------
   A clip can have one `src` (the legacy shorthand), or a `photos` array.
   Each photo is `{ src, alt? }`; the remote's controls step through the
   photos before moving on to the next clip.

   `audio` is optional per clip and points at a YouTube video to use as
   the theme-song source:
     - youtubeId: the video ID (the part after ?v= in a YouTube URL)
     - startTime: seconds into the video to start playback from
     - duration:  how many seconds to play before auto-pausing
                  (omit to let it play until the video's natural end,
                  or until the user pauses / navigates away)              */

const DEMO_CLIPS = [
  {
    title: "Six Feet Under, 2001-2005",
    watching: true,
    src: [sfe6, sfe2, sfe1, sfe3, sfe5, sfe4],
    audio: {
      youtubeId: "YHRvDo8rUoQ",
      startTime: 115, 
      duration: 20,
    },
  },
  {
    title: "The Leftovers, 2014-2017",
    src: [lf1, lf5, lf2, lf4, lf3],
    audio: {
      youtubeId: "ImKY6TZEyrI",
      startTime: 55, 
      duration: 15,
    },
  },
  {
    title: "Mr. Robot, 2015-2019",
    src: [rb3, rb1, rb2, rb5, rb4],
    audio: {
      youtubeId: "Eyjj8BgsBGU",
      startTime: 135, 
      duration: 15,
    },
  },
  {
    title: "The Shield, 2002-2008",
    src: [sh4, sh2, sh3, sh5, sh7, sh6, sh1],
    audio: {
      youtubeId: "kqnoukzrwuI",
      startTime: 5, 
      duration: 25,
    },
  },
  {
    title: "The Americans, 2013-2018",
    src: [amr1, amr2, amr5, amr3, amr4],
    audio: {
      youtubeId: "ujNeHIo7oTE",
      startTime: 170, 
      duration: 15,
    },
  },
  {
    title: "Dexter, 2006-2013",
    src: [dex2, dex1, dex3, dex5, dex4],
    audio: {
      youtubeId: "DWJh0Dny5Ug",
      startTime: 85, 
      duration: 15,
    },
  },
  {
    title: "Sopranos, 1999-2007",
    src: [sp1,sp2,sp3,sp4,sp5,sp6],
    audio: {
      youtubeId: "1k8craCGpgs",
      startTime: 80, 
      duration: 25,
    },
  },
  {
    title: "Breaking Bad, 2008-2013",
    src: [brb1, brb2, brb3, brb4],
    audio: {
      youtubeId: "R95f7VwXqIw",
      startTime: 42, 
      duration: 15,
    },
  },
  {
    title: "Better Call Saul, 2015-2022",
    src: [bcs1, bcs2, bcs3, bcs4, bcs5],
    audio: {
      youtubeId: "92cwKCU8Z5c",
      startTime: 120, 
      duration: 15,
    },
  },
];

/* How often the next photo comes up while "playing" (slideshow mode). */
const AUTO_ADVANCE_MS = 3500;

/* Volume fade timing for the YouTube theme-song audio. */
const FADE_STEP_MS = 50; // how often we nudge the volume
const FADE_IN_MS = 1500; // ramp up from silence at the start
const FADE_OUT_MS = 2500; // ramp down to silence at the end
const TARGET_VOLUME = 70; // full volume once faded in

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

/* ---------- YouTube IFrame API loader ----------
   Loads the external script + resolves once window.YT is ready.
   Cached at module scope so multiple remotes share one load. */
let ytApiPromise = null;

function loadYouTubeApi() {
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return ytApiPromise;
}

/* Ramps a YT.Player's volume from `from` to `to` over `durationMs`,
   stepping every FADE_STEP_MS. Returns the interval id so the caller
   can cancel it early (e.g. if the user pauses mid-fade). */
function fadeVolume(player, { from, to, durationMs, onComplete }) {
  const steps = Math.max(Math.round(durationMs / FADE_STEP_MS), 1);
  const stepAmount = (to - from) / steps;
  let currentStep = 0;

  player.setVolume(from);

  const intervalId = setInterval(() => {
    currentStep += 1;
    const nextVolume = from + stepAmount * currentStep;
    player.setVolume(Math.max(0, Math.min(100, Math.round(nextVolume))));

    if (currentStep >= steps) {
      clearInterval(intervalId);
      onComplete?.();
    }
  }, FADE_STEP_MS);

  return intervalId;
}

export default function MediaRemote({ clips = DEMO_CLIPS, onChange }) {
  const [clipIndex, setClipIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = clips[clipIndex];

  const ytMountRef = useRef(null); // hidden div YT.Player attaches to
  const ytPlayerRef = useRef(null); // the YT.Player instance
  const ytReadyRef = useRef(false);
  const stopTimerRef = useRef(null);
  const fadeInStartTimerRef = useRef(null);
  const fadeOutStartTimerRef = useRef(null);
  const fadeIntervalRef = useRef(null);

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

  // Create the (hidden) YT.Player instance once on mount.
  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !ytMountRef.current || ytPlayerRef.current) return;
      ytPlayerRef.current = new YT.Player(ytMountRef.current, {
        height: "1",
        width: "1",
        playerVars: { controls: 0, disablekb: 1, modestbranding: 1 },
        events: {
          onReady: () => {
            ytReadyRef.current = true;
          },
        },
      });
    });

    return () => {
      cancelled = true;
      ytPlayerRef.current?.destroy?.();
      ytPlayerRef.current = null;
      ytReadyRef.current = false;
    };
  }, []);

  // Drive the YouTube player off `playing` + `clipIndex`, with a
  // volume fade-in at the start and fade-out right before it stops.
  useEffect(() => {
    const track = current?.audio;

    const clearAllTimers = () => {
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      if (fadeInStartTimerRef.current) clearTimeout(fadeInStartTimerRef.current);
      if (fadeOutStartTimerRef.current) clearTimeout(fadeOutStartTimerRef.current);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      stopTimerRef.current = null;
      fadeInStartTimerRef.current = null;
      fadeOutStartTimerRef.current = null;
      fadeIntervalRef.current = null;
    };

    clearAllTimers();

    const player = ytPlayerRef.current;
    if (!player || !ytReadyRef.current) return undefined;

    if (!track) {
      player.pauseVideo?.();
      return undefined;
    }

    if (playing) {
      // loadVideoById seeks + plays in one call, so it also covers
      // "switched clips while already playing".
      player.loadVideoById({
        videoId: track.youtubeId,
        startSeconds: track.startTime ?? 0,
      });
      player.setVolume(0); // silent until the fade-in kicks in

      const totalMs = track.duration ? track.duration * 1000 : null;
      // Keep the fades from overlapping/outrunning very short clips.
      const fadeInMs = totalMs ? Math.min(FADE_IN_MS, totalMs / 2) : FADE_IN_MS;
      const fadeOutMs = totalMs ? Math.min(FADE_OUT_MS, totalMs / 2) : FADE_OUT_MS;

      // Small head start so the video has actually begun playing
      // before we start ramping the volume up.
      fadeInStartTimerRef.current = setTimeout(() => {
        fadeIntervalRef.current = fadeVolume(player, {
          from: 0,
          to: TARGET_VOLUME,
          durationMs: fadeInMs,
        });
      }, 150);

      if (totalMs) {
        fadeOutStartTimerRef.current = setTimeout(() => {
          fadeIntervalRef.current = fadeVolume(player, {
            from: TARGET_VOLUME,
            to: 0,
            durationMs: fadeOutMs,
          });
        }, Math.max(totalMs - fadeOutMs, 0));

        stopTimerRef.current = setTimeout(() => {
          player.pauseVideo?.();
          player.setVolume(TARGET_VOLUME); // reset so the next play starts clean
        }, totalMs);
      }
    } else {
      player.pauseVideo?.();
      player.setVolume(TARGET_VOLUME); // reset for the next play
    }

    return clearAllTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, clipIndex]);

  return (
    <div
      className="remote"
      role="group"
      aria-label={current ? `Player: ${current.title}` : "Player"}
    >
      {/* Hidden YouTube player — only used as an audio source. */}
      <div ref={ytMountRef} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }} />

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