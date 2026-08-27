import { useNavigation } from '../../system';

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
  const { navigate } = useNavigation();

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

      <div className="ws-hero-actions">
        <button
          type="button"
          className="ws-btn ws-btn--primary"
          onClick={() => navigate('contact')}
        >
          Hire Me
        </button>
        <a className="ws-btn ws-btn--ghost" href="#/contact">
          Download CV
        </a>
      </div>

      <div className="ws-hero-cards">
        <article className="ws-card">
          <h3 className="ws-card-title">The Philosophy</h3>
          <p className="ws-card-copy">
            Minimalism is not the absence of features, but the presence of
            focus. I build systems that feel like an extension of intent.
          </p>
        </article>
        <article className="ws-card">
          <h3 className="ws-card-title">The Stack</h3>
          <p className="ws-card-copy">
            Deeply rooted in Python, distributed services, and modern the web's
            ability to deliver native-feel products with clean, measurable
            performance.
          </p>
        </article>
      </div>
    </section>
  );
}
