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
