import { useState } from 'react';
import { useNavigation } from '../system';
import { useKeyboardShortcut } from '../keyboard';
import { portfolioEng, type PortfolioContent } from '../content/portfolio';
import { Waybar } from './waybar';
import { WidgetsLayer, type WidgetId } from './WidgetsLayer';
import { Sidebar } from './Sidebar';
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
 *   waybar (top) → tiling grid (hero window + sidebar) → bottom status bar.
 *
 * The hero window wraps the active workspace in a terminal-style title bar
 * ("Workspace / About") with window controls; the sidebar stacks the utility
 * windows (terminal, performance, shortcuts) per the tiling layout concept.
 *
 * This is the portfolio layer: the content on its own is fully usable without
 * the terminal decoration. The Waybar is the visible navigation; widgets are
 * optional floating utility windows, each with a visible open control.
 */
export function AppShell({
  content = portfolioEng,
}: {
  content?: PortfolioContent;
}) {
  const { current, navigate, next, previous } = useNavigation();
  const [openWidgets, setOpenWidgets] = useState<WidgetId[]>([]);

  const toggleWidget = (id: WidgetId) => {
    setOpenWidgets((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
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
    TOGGLE_HELP: () => toggleWidget('shortcuts'),
    CLOSE_ALL: () => setOpenWidgets([]),
  });

  const workspaceTitle = current.id === 'about' ? 'about' : current.id;

  return (
    <div className="app-shell">
      <Waybar onToggleWidget={toggleWidget} />

      <main className="app-content" tabIndex={-1}>
        {/* Tiling grid: hero window (left) + sidebar (right) */}
        <div className="shell-grid">
          <section
            className="hero-window window"
            aria-label={`${current.label} workspace`}
          >
            <header className="window-titlebar">
              <span className="window-title">Workspace / {workspaceTitle}</span>
              <span className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </header>

            <div className="hero-window-body custom-scrollbar">
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
              {current.id === 'skills' && <Skills groups={content.skills} />}
              {current.id === 'projects' && (
                <Projects items={content.projects} />
              )}
              {current.id === 'education' && (
                <Education items={content.education} />
              )}
              {current.id === 'contact' && <Contact items={content.contact} />}
            </div>
          </section>

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
