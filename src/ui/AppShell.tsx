import { useNavigation, WORKSPACES } from '../system';
import { portfolioEng, type PortfolioContent } from '../content/portfolio';
import { About, Experience, Skills, Projects, Education, Contact } from './workspace';

/**
 * AppShell — semantic portfolio presentation.
 *
 * Renders the currently active workspace's content. This is the portfolio
 * layer: fully usable without the Hyprland/terminal decoration. Colours come
 * from theme CSS tokens via classes in workspace.css.
 */
export function AppShell({ content = portfolioEng }: { content?: PortfolioContent }) {
  const { current } = useNavigation();

  return (
    <main className="app-shell">
      <nav aria-label="Workspaces" className="app-workspace-nav">
        {WORKSPACES.map((ws) => (
          <a
            key={ws.id}
            href={`#/${ws.id}`}
            aria-current={current.id === ws.id ? 'page' : undefined}
            className={current.id === ws.id ? 'ws-nav-link is-active' : 'ws-nav-link'}
          >
            <span className="ws-nav-index">{ws.index}</span>
            {ws.label}
          </a>
        ))}
      </nav>

      <div className="app-content">
        {current.id === 'about' && <About name={content.name} role={content.role} about={content.about} />}
        {current.id === 'experience' && <Experience items={content.experience} />}
        {current.id === 'skills' && <Skills groups={content.skills} />}
        {current.id === 'projects' && <Projects items={content.projects} />}
        {current.id === 'education' && <Education items={content.education} />}
        {current.id === 'contact' && <Contact items={content.contact} />}
      </div>
    </main>
  );
}
