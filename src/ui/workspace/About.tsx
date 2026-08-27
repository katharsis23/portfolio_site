/**
 * About — hero and philosophy. Pure semantic presentation.
 * Colours come from the active theme's CSS tokens; nothing is hardcoded here.
 */
export function About({
  name,
  role,
  about,
}: {
  name: string;
  role: string;
  about: string[];
}) {
  return (
    <section className="ws-section" aria-labelledby="about-heading">
      <p className="ws-eyebrow" role="doc-subtitle" aria-hidden="true">
        Hi, my name is
      </p>
      <h1 id="about-heading" className="ws-hero">
        {name}
      </h1>
      <p className="ws-role">{role}</p>
      <div className="ws-copy">
      {about.map((paragraph, i) => (
          <p key={i} className="ws-paragraph">
          {paragraph}
        </p>
      ))}
      </div>
    </section>
  );
}

