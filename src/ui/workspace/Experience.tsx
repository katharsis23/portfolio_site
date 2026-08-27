import type { ExperienceItem } from '../../content/portfolio';

/** Experience — timeline of roles. Semantic list. */
export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section className="ws-section" aria-labelledby="experience-heading">
      <h1 id="experience-heading" className="ws-h1">
        Experience
      </h1>
      <ol className="ws-timeline">
        {items.map((item) => (
          <li key={item.company} className="ws-timeline-item">
            <h2 className="ws-h2">{item.role}</h2>
            <p className="ws-meta">
              <span className="ws-strong">{item.company}</span> · {item.period}
            </p>
            <ul className="ws-list">
              {item.bulletPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
