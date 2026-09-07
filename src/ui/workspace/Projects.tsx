import type { Project } from '../../content/portfolio';

/** Projects — list of open source / commercial work. */
export function Projects({ items }: { items: Project[] }) {
  return (
    <section className="ws-section" aria-labelledby="projects-heading">
      <h1 id="projects-heading" className="ws-h1">
        Projects
      </h1>
      <div className="ws-projects">
        {items.map((project) => (
          <article key={project.name} className="ws-project">
            <header className="ws-project-header">
              <h2 className="ws-h2">{project.name}</h2>
              <span className="ws-meta">{project.tagline}</span>
            </header>
            <p className="ws-paragraph">{project.description}</p>
            {project.links && project.links.length > 0 && (
              <ul className="ws-project-links" aria-label="Links">
                {project.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="ws-project-link"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <ul className="ws-taglist" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li key={tech} className="ws-tag">
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
