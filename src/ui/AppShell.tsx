import { useRef, useState } from 'react';
import { useNavigation } from '../system';
import { useKeyboardShortcut } from '../keyboard';
import { portfolioEng, type PortfolioContent } from '../content/portfolio';
import { Waybar } from './waybar';
import { WidgetsLayer, type WidgetId } from './WidgetsLayer';
import { Sidebar } from './Sidebar';
import { Shortcuts } from './widgets/Shortcuts';
import {
  About,
  Experience,
  Skills,
  Projects,
  Education,
  Contact,
} from './workspace';

/**
 * AppShell — composes the Hyprland-style shell:
 *   waybar (top) → tiling grid → bottom status bar.
 *
 * Tiling grid:
 *   - left column (`.shell-main`): the hero window (active workspace) with the
 *     Shortcuts cheat-sheet strip directly beneath it;
 *   - right column (`.app-sidebar`): Settings + Terminal. Moving Shortcuts out
 *     of the sidebar gives the terminal the full vertical run of the column,
 *     so it is the most prominent utility.
 *
 * The workspace body is re-keyed by the active workspace id so switching
 * workspaces plays a short entrance transition (see workspace.css).
 */
export function AppShell({
  content = portfolioEng,
}: {
  content?: PortfolioContent;
}) {
  const { current, navigate, next, previous } = useNavigation();
  const [openWidgets, setOpenWidgets] = useState<WidgetId[]>([]);
  const subrowRef = useRef<HTMLDivElement>(null);

  const toggleWidget = (id: WidgetId) => {
    setOpenWidgets((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  // Shortcuts now live permanently under the hero; Alt+/ brings the strip
  // into view instead of toggling a (now removed) duplicate floating window.
  const revealShortcuts = () => {
    subrowRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  // Keyboard → same canonical actions (navigation + window toggles).
  useKeyboardShortcut({
    NAV_ABOUT: () => navigate('about'),
    NAV_EXPERIENCE: () => navigate('experience'),
    NAV_SKILLS: () => navigate('skills'),
    NAV_PROJECTS: () => navigate('projects'),
    NAV_EDUCATION: () => navigate('education'),
    NAV_CONTACT: () => navigate('contact'),
    NAV_NEXT: next,
    NAV_PREV: previous,
    TOGGLE_TERMINAL: () => toggleWidget('terminal'),
    TOGGLE_HELP: revealShortcuts,
    CLOSE_ALL: () => setOpenWidgets([]),
  });

  const workspaceTitle = current.id === 'about' ? 'about' : current.id;

  return (
    <div className="app-shell">
      <Waybar />

      <main className="app-content" tabIndex={-1}>
        {/* Tiling grid: main column (hero + shortcuts) + sidebar */}
        <div className="shell-grid">
          <div className="shell-main">
            <section
              className="hero-window window"
              aria-label={`${current.label} workspace`}
            >
              <header className="window-titlebar">
                <span className="window-title">
                  Workspace / {workspaceTitle}
                </span>
                <span className="window-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </header>

              <div className="hero-window-body custom-scrollbar">
                <div key={current.id} className="ws-transition">
                  {current.id === 'about' && (
                    <About
                      name={content.name}
                      role={content.role}
                      about={content.about}
                    />
                  )}
                  {current.id === 'experience' && (
                    <Experience items={content.experience} />
                  )}
                  {current.id === 'skills' && (
                    <Skills groups={content.skills} />
                  )}
                  {current.id === 'projects' && (
                    <Projects items={content.projects} />
                  )}
                  {current.id === 'education' && (
                    <Education items={content.education} />
                  )}
                  {current.id === 'contact' && (
                    <Contact items={content.contact} />
                  )}
                </div>
              </div>
            </section>

            {/* Shortcuts cheat-sheet strip tucked under the hero window */}
            <div className="shell-subrow" ref={subrowRef}>
              <Shortcuts />
            </div>
          </div>

          <Sidebar />
        </div>
      </main>

      <footer className="app-statusbar mono">
        <span>Workspace {current.index} — active</span>
        <span className="app-statusbar-right">
          <span className="app-statusbar-item" id="scroll-percent">
            master*
          </span>
        </span>
      </footer>

      <WidgetsLayer open={openWidgets} onClose={(id) => toggleWidget(id)} />

      <span className="sr-workspace" role="status" aria-live="polite">
        Workspace: {current.label}
      </span>
    </div>
  );
}
