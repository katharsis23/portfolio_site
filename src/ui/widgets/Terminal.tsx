import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type FormEvent,
} from 'react';
import { useNavigation } from '../../system';
import { useTheme } from '../../themes';
import { usePerformance } from '../../system';

interface Line {
  id: number;
  content: string;
  kind: 'cmd' | 'out' | 'ok' | 'err' | 'info';
}

interface TerminalProps {
  onFocusSelf?: () => void;
}

const PLACEHOLDER = 'type a command… try "help"';

/**
 * Terminal — an optional Layer-3 interface that maps commands onto the same
 * canonical system actions used by waybar, keyboard and URL navigation.
 *
 * Real form/input semantics: a single text input driven by Enter, not fake
 * clickable divs. Every command has a visible equivalent elsewhere in the UI.
 */
export function Terminal({ onFocusSelf }: TerminalProps) {
  const { navigate, current } = useNavigation();
  const { setTheme, themeSet, currentTheme } = useTheme();
  const { setMode, isAnimationOn } = usePerformance();
  const [value, setValue] = useState('');
  const [lines, setLines] = useState<Line[]>([
    {
      id: 0,
      content: `Welcome pirate! Current room: ${current.id}`,
      kind: 'info',
    },
    { id: 1, content: 'type "help" for available commands', kind: 'info' },
  ]);
  const listRef = useRef<HTMLOListElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [lines]);

  function print(block: Omit<Line, 'id'>[]) {
    setLines((prev) => [
      ...prev,
      ...block.map((l) => ({ ...l, id: nextId.current++ })),
    ]);
  }

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    print([{ content: cmd, kind: 'cmd' }]);

    if (cmd === 'help') {
      print([
        {
          content: 'about, experience, skills, projects, education, contact',
          kind: 'out',
        },
        {
          content:
            'next / prev  |  theme <name>  |  performance on|off  |  fastfetch',
          kind: 'out',
        },
        { content: 'systemctl status  |  clear  |  sudo hire-me', kind: 'out' },
      ]);
      return;
    }
    if (cmd === 'about') return navigate('about');
    if (cmd === 'experience') return navigate('experience');
    if (cmd === 'skills') return navigate('skills');
    if (cmd === 'projects') return navigate('projects');
    if (cmd === 'education') return navigate('education');
    if (cmd === 'contact') return navigate('contact');
    if (cmd === 'next') return;
    if (cmd === 'prev') return;
    if (cmd === 'clear' || cmd === 'cls') {
      setLines([]);
      return;
    }
    // fastfetch: host ASCII + distro / dev-stack summary.
    if (cmd === 'fastfetch') {
      const info = [
        'nixos@hyprland',
        '────────────────────',
        'OS        : NixOS (Linux)',
        'Host      : portable-laptop',
        'WM        : Hyprland',
        'Shell     : fish',
        'Dev stack : Python · FastAPI · TS',
        'Role      : Backend Developer',
        `Theme     : ${currentTheme.name}`,
      ];
      // Measure the real widget width (not the viewport) so the banner never
      // overflows: the terminal can be a narrow sidebar column or a wide sheet.
      print([
        {
          content: fastfetchOutput(info, measureTermCols(listRef.current)),
          kind: 'out',
        },
      ]);
      return;
    }
    // Performance metrics moved into the terminal (sidebar widget removed).
    if (cmd === 'performance' || cmd === 'perf' || cmd === 'performance on') {
      setMode(true);
      print(perfLines(isAnimationOn()));
      return;
    }
    if (cmd === 'performance off') {
      setMode(false);
      print(perfLines(isAnimationOn()));
      return;
    }
    // systemctl status: report the current app state (visual/animation mode).
    if (cmd === 'systemctl status') {
      print(perfLines(isAnimationOn()));
      return;
    }
    if (cmd.startsWith('theme ')) {
      const name = cmd.slice('theme '.length).trim();
      if (themeSet.has(name)) {
        setTheme(name);
        print([{ content: `theme -> ${name}`, kind: 'ok' }]);
      } else {
        print([{ content: `theme not found: ${name}`, kind: 'err' }]);
      }
      return;
    }
    if (cmd === 'sudo hire-me') {
      navigate('contact');
      print([
        {
          content: '[OK] recruitment handshake initiated — see Contact',
          kind: 'ok',
        },
      ]);
      return;
    }
    if (cmd === '') return;
    print([{ content: `command not found: ${cmd}`, kind: 'err' }]);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runCommand(value);
    setValue('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      onFocusSelf?.();
      setValue('');
    }
  }

  return (
    <section
      className="widget window"
      data-widget="terminal"
      aria-label="Terminal"
    >
      <header className="window-titlebar">
        <span className="window-title">term — ~</span>
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </header>
      <ol className="term-lines" ref={listRef}>
        {lines.map((line) => (
          <li key={line.id} className={`term-line term-line--${line.kind}`}>
            {line.kind === 'cmd' ? `➜ ${line.content}` : line.content}
          </li>
        ))}
      </ol>
      <form className="term-form" onSubmit={onSubmit}>
        <label className="term-prompt" htmlFor="term-input">
          ➜
        </label>
        <input
          id="term-input"
          className="term-input"
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder={PLACEHOLDER}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command"
        />
      </form>
    </section>
  );
}

/** NixOS ASCII art shown by the `fastfetch` command. */
const NIXOS_ASCII_COMPACT = [
  '        ___   __            ',
  '  /¯\\    \\  \\ /  ;          ',
  '  \\  \\    \\  v  /           ',
  ' /¯¯¯   ¯¯¯¯\\\\   /  /\\      ',
  '’————————————·\\  \\ /  ;     ',
  '     /¯¯;      \\ //  /_     ',
  '____/  /        ‘/     \\    ',
  '\\      /,        /  /¯¯¯¯   ',
  ' ¯¯/  // \\      /__/        ',
  '  .  / \\  \\·————————————.   ',
  '   \\/  /   \\\\_____   ___/   ',
  '      /  ,  \\     \\  \\      ',
  '      \\_/ \\__\\     \\_/      ',
];

/**
 * Approximate how many monospace columns fit in the terminal's rendered body.
 * Uses the actual `term-lines` width, so a narrow sidebar terminal correctly
 * selects the stacked layout while a wide floating sheet gets two columns.
 */
function measureTermCols(el: HTMLElement | null): number {
  if (!el || el.clientWidth === 0) {
    return 72; // sane fallback before layout is measured
  }
  // ~0.6em advance per monospace glyph at the 0.8rem terminal font size.
  const size = parseFloat(getComputedStyle(el).fontSize) || 12.8;
  const pxPerCol = size * 0.6;
  return Math.max(20, Math.floor(el.clientWidth / pxPerCol));
}

/**
 * Compose the fastfetch read-out from the ASCII banner and the host info.
 * Renders side-by-side when the terminal is wide enough, stacked vertically
 * on narrower terminals, so the artwork never wraps or clips.
 */
function fastfetchOutput(info: string[], cols: number): string {
  const ASCII_WIDTH = 30;
  const MIN_TWO_COL = 62;

  if (cols >= MIN_TWO_COL) {
    const rows = Math.max(NIXOS_ASCII_COMPACT.length, info.length);
    const merged: string[] = [];
    for (let i = 0; i < rows; i++) {
      const art = (NIXOS_ASCII_COMPACT[i] ?? '').padEnd(ASCII_WIDTH, ' ');
      merged.push(art + (info[i] ?? ''));
    }
    return merged.join('\n');
  }

  return [...NIXOS_ASCII_COMPACT, '', ...info].join('\n');
}

/**
 * Build the lines reported by `perf` / `performance on|off` / `systemctl`, the
 * visual-status read-out that used to live in the PerformanceMetrics sidebar
 * widget (now folded into the terminal, docs/CONCEPT.md §12).
 */
function perfLines(animationOn: boolean): Omit<Line, 'id'>[] {
  const mode = animationOn ? 'on' : 'off';
  return [
    { content: 'performance / systemctl status', kind: 'info' },
    { content: '   visuals mode  : ' + mode, kind: 'ok' },
    { content: '   FPS           : ' + (animationOn ? 120 : 60), kind: 'out' },
    { content: '   active modules: 6', kind: 'out' },
  ];
}
