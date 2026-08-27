import type { EducationItem } from '../../content/portfolio';

/** Education — academic background. */
export function Education({ items }: { items: EducationItem[] }) {
  return (
    <section className="ws-section" aria-labelledby="education-heading">
      <h1 id="education-heading" className="ws-h1">
        Education
      </h1>
      <div className="ws-education">
        {items.map((item) => (
          <article key={item.degree} className="ws-edu-card">
            <h2 className="ws-h2">{item.degree}</h2>
            <p className="ws-meta">
              <span className="ws-strong">{item.institution}</span> · {item.period}
            </p>
            <p className="ws-paragraph">{item.focus}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
