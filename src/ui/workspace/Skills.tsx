import type { SkillGroup } from '../../content/portfolio';

/** Skills — grouped technical skills. Semantic definition-ish list. */
export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section className="ws-section" aria-labelledby="skills-heading">
      <h1 id="skills-heading" className="ws-h1">
        Skills
      </h1>
      <div className="ws-skills">
        {groups.map((group) => (
          <article key={group.title} className="ws-skill-group">
            <h2 className="ws-h2">{group.title}</h2>
            <ul className="ws-taglist">
              {group.items.map((item) => (
                <li key={item} className="ws-tag">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
