import { useRef, useState } from 'react';
import { useNavigation, useLanguage, usePerformance } from '../system';
import { useKeyboardShortcut } from '../keyboard';
import type { PortfolioContent } from '../content/portfolio';
import { Waybar } from './waybar';
import { WidgetsLayer, type WidgetId } from './WidgetsLayer';
import { Sidebar } from './Sidebar';
import { Shortcuts } from './widgets/Shortcuts';
import { Cava } from './widgets/Cava';
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
 *   - right column (`.app-sidebar`): Settings + music Player + Terminal.
 *
 * The workspace body is re-keyed by the active workspace id and the language so
 * switching workspaces (or languages) plays a short entrance transition.
 *
 * The decorative CAVA background is mounted once; its rAF loop is gated by
 * performance mode + the player's playing state (see Cava.tsx).
 */
export function AppShell({
  content,
}: {
  content?: PortfolioContent;
}) {
  const { current, navigate, next, previous } = useNavigation();
  const { t, content: langContent, lang, tWorkspace } = useLanguage();
  const { isAnimationOn } = usePerformance();
  const [openWidgets, setOpenWidgets] = useState<WidgetId[]>([]);
  const subrowRef = useRef<HTMLDivElement>(null);

  const activeContent: PortfolioContent = content ?? langContent;

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
              aria-label={`${current.label} ${t('ariaWorkspace')}`}
            >
              <header className="window-titlebar">
                <span className="window-title">
                  Workspace / {tWorkspace(workspaceTitle)}
                </span>
                <span className="window-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </header>

              <div className="hero-window-body custom-scrollbar">
                <div
                  key={`${current.id}-${lang}`}
                  className="ws-transition"
                  data-lang-switch
                >
                  {current.id === 'about' && (
                    <About
                      name={activeContent.name}
                      role={activeContent.role}
                      about={activeContent.about}
                      t={t}
                    />
                  )}
                  {current.id === 'experience' && (
                    <Experience items={activeContent.experience} />
                  )}
                  {current.id === 'skills' && (
                    <Skills groups={activeContent.skills} />
                  )}
                  {current.id === 'projects' && (
                    <Projects items={activeContent.projects} />
                  )}
                  {current.id === 'education' && (
                    <Education items={activeContent.education} />
                  )}
                  {current.id === 'contact' && (
                    <Contact items={activeContent.contact} />
                  )}
                </div>
              </div>
            </section>

            {/* Shortcuts cheat-sheet strip tucked under the hero window */}
            <div className="shell-subrow" ref={subrowRef}>
              <Shortcuts t={t} />
            </div>
          </div>

          <Sidebar />
        </div>
      </main>

      <footer className="app-statusbar mono">
        <span>
          {tWorkspace(workspaceTitle)} {current.index} — {t('workspaceActive')}
        </span>
        <span className="app-statusbar-right">
          <span className="app-statusbar-item" id="scroll-percent">
            master*
          </span>
        </span>
      </footer>

      <WidgetsLayer open={openWidgets} onClose={(id) => toggleWidget(id)} />

      {/* Decorative CAVA background — mounts once, loop gated by mode+playing.
          It is shown when performance mode is OFF (i.e. heavy animations are
          allowed / no optimization), so it becomes the ambient background
          decoration while the glassmorphism blur is disabled. */}
      {!isAnimationOn() && <Cava />}

      <span className="sr-workspace" role="status" aria-live="polite">
        Workspace: {current.label}
      </span>
    </div>
  );
}

