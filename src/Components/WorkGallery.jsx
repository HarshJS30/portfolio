import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/WorkGallery.css";

function ProjectActions({ project, onPointerEnter, onPointerLeave, onFocus }) {
  return (
    <div
      className="work-gallery__actions"
      role="group"
      aria-label={`${project.name} links`}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      onFocusCapture={onFocus}
    >
      {project.live ? (
        <a
          className="work-gallery__button work-gallery__button--live"
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} live site (opens in a new tab)`}
        >
          Live site <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="work-gallery__availability">Live site coming soon</span>
      )}
      {project.github ? (
        <a
          className="work-gallery__button work-gallery__button--github"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} source on GitHub (opens in a new tab)`}
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="work-gallery__availability">Source private</span>
      )}
    </div>
  );
}

function ProjectMeta({ project }) {
  return (
    <div className="work-gallery__meta">
      <span>{project.role}</span>
      <span>{project.type}</span>
      <span>{project.year}</span>
    </div>
  );
}

function ProjectTitle({ project }) {
  if (!project.live) return project.name;

  return (
    <a
      className="work-gallery__stretched-link"
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name} live site (opens in a new tab)`}
    >
      {project.name}
    </a>
  );
}

function ProjectDescription({ project }) {
  return (
    <p className="work-gallery__description">
      {project.desc}
    </p>
  );
}

function ProjectTags({ project }) {
  return (
    <ul className="work-gallery__tags" aria-label={`${project.name} technologies`}>
      {project.tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function ProjectRow({
  project,
  index,
  active,
  onEnter,
  onMove,
  onLeave,
  onFocus,
  onBlur,
  onActionsEnter,
  onActionsLeave,
  onActionsFocus,
}) {
  return (
    <article
      className={`work-gallery__row${active ? " is-active" : ""}${project.live ? " is-clickable" : ""}`}
      style={{ "--row-index": index }}
      tabIndex={project.live ? undefined : 0}
      onMouseEnter={(event) => onEnter(event, project)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onFocusCapture={(event) => onFocus(event, project)}
      onBlurCapture={onBlur}
    >
      <h2 className="work-gallery__name">
        <ProjectTitle project={project} />
        <span className="work-gallery__sr-only">
          {`, ${project.role}, ${project.type}, ${project.year}`}
        </span>
      </h2>
      <div className="work-gallery__row-content">
        <ProjectDescription project={project} />
      </div>
      <time className="work-gallery__year" dateTime={project.year}>{project.year}</time>
      <ProjectActions
        project={project}
        onPointerEnter={() => onActionsEnter()}
        onPointerLeave={(event) => onActionsLeave(event, project)}
        onFocus={onActionsFocus}
      />
    </article>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className="work-gallery__mobile-card" style={{ "--project-accent": project.accent }}>
      <div className="work-gallery__mobile-image-wrap">
        <img
          className="work-gallery__mobile-image"
          src={project.image}
          alt={`${project.name} website screenshot`}
          loading={index > 1 ? "lazy" : "eager"}
        />
        <span className="work-gallery__mobile-type">{project.type}</span>
      </div>
      <div className="work-gallery__mobile-content">
        <ProjectMeta project={project} />
        <h2 className="work-gallery__name">
          <ProjectTitle project={project} />
        </h2>
        <ProjectDescription project={project} />
        <ProjectTags project={project} />
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

export default function WorkGallery({ projects, label, title, subtitle }) {
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const pointerPositionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  const placePreview = useCallback((x, y) => {
    const preview = previewRef.current;
    if (!preview) return;

    const bounds = preview.getBoundingClientRect();
    const left = Math.max(12, Math.min(x - bounds.width - 26, window.innerWidth - bounds.width - 12));
    const top = Math.max(12, Math.min(y + 22, window.innerHeight - bounds.height - 12));

    preview.style.left = `${left}px`;
    preview.style.top = `${top}px`;
  }, []);

  const showPreview = (event, project) => {
    pointerPositionRef.current = { x: event.clientX, y: event.clientY };
    setActiveProject(project);
  };

  const focusPreview = (event, project) => {
    if (event.target === event.relatedTarget) return;
    if (event.target.closest(".work-gallery__actions")) {
      setActiveProject(null);
      pointerPositionRef.current = null;
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerPositionRef.current = {
      x: Math.min(bounds.right + 24, window.innerWidth - 300),
      y: bounds.top + bounds.height / 2,
    };
    setActiveProject(project);
  };

  const movePreview = (event) => {
    pointerPositionRef.current = { x: event.clientX, y: event.clientY };
    placePreview(event.clientX, event.clientY);
  };

  const hidePreview = (event) => {
    if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) return;
    setActiveProject(null);
    pointerPositionRef.current = null;
  };

  const hidePreviewForActions = () => {
    setActiveProject(null);
    pointerPositionRef.current = null;
  };

  const resumePreviewFromActions = (event, project) => {
    const row = event.currentTarget.closest(".work-gallery__row");
    if (row?.contains(event.relatedTarget)) showPreview(event, project);
  };

  const leaveRow = (event) => {
    if (!event.currentTarget.contains(document.activeElement)) hidePreview(event);
  };

  useEffect(() => {
    if (activeProject && pointerPositionRef.current) {
      const { x, y } = pointerPositionRef.current;
      placePreview(x, y);
    }
  }, [activeProject, placePreview]);

  return (
    <main className={`projects-page work-gallery${activeProject ? " is-previewing" : ""}`}>
      <header className="work-gallery__intro">
        <p className="work-gallery__label">{label}</p>
        <h1 className="work-gallery__title">{title}</h1>
        <p className="work-gallery__subtitle">{subtitle}</p>
      </header>

      <section className="work-gallery__list" aria-label={label}>
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            active={activeProject?.id === project.id}
            onEnter={showPreview}
            onMove={movePreview}
            onLeave={leaveRow}
            onFocus={focusPreview}
            onBlur={hidePreview}
            onActionsEnter={hidePreviewForActions}
            onActionsLeave={resumePreviewFromActions}
            onActionsFocus={hidePreviewForActions}
          />
        ))}
      </section>

      <section className="work-gallery__mobile-list" aria-label={label}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>

      {activeProject && (
        <div
          className="work-gallery__preview"
          ref={previewRef}
          aria-hidden="true"
          style={{ "--project-accent": activeProject.accent }}
        >
          <img src={activeProject.image} alt="" />
          <span>{activeProject.name}</span>
        </div>
      )}

      <footer className="work-gallery__footer">
        <p>More good things are on the way.</p>
        <button type="button" onClick={() => navigate("/")}>
          ← Back to portfolio
        </button>
      </footer>
    </main>
  );
}
