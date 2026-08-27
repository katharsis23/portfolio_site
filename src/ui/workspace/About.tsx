import { useNavigation } from '../../system';
import { CV_URL, GitHubWidget } from '../../integrations';

/**
 * About — hero and philosophy. Pure semantic presentation.
 * Colours come from the active theme's CSS tokens; nothing is hardcoded here.
 * The bilingual hero copy comes from the language context `t`.
 */
export function About({
  name,
  role,
  about,
  t,
}: {
  name: string;
  role: string;
  about: string[];
  t: (key: string) => string;
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
          {t('hireMe')}
        </button>
        <a
          className="ws-btn ws-btn--ghost"
          href={CV_URL}
          download="Danylo_CV.pdf"
        >
          {t('downloadCv')}
        </a>
      </div>

      {/* Live GitHub profile + contribution graph. Optional external source;
          isolated so its loading/failure cannot affect the rest of the hero. */}
      <GitHubWidget />

      <div className="ws-hero-cards">
        <article className="ws-card">
          <h3 className="ws-card-title">{t('heroPhilosophyTitle')}</h3>
          <p className="ws-card-copy">{t('heroPhilosophyCopy')}</p>
        </article>
        <article className="ws-card">
          <h3 className="ws-card-title">{t('heroStackTitle')}</h3>
          <p className="ws-card-copy">{t('heroStackCopy')}</p>
        </article>
      </div>
    </section>
  );
}
