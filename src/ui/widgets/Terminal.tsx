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
  const { setTheme, themeSet } = useTheme();
  const { setMode } = usePerformance();
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
            'next / prev  |  theme <name>  |  performance on|off  |  sudo hire-me',
          kind: 'out',
        },
      ]);
      return;
    }
    if (cmd === 'about') return navigate('about');
    if (cmd === 'experience') return navigate('experience');
    if (cmd === 'skills') return navigate('skills');
    if (cmd === 'projects') return navigate('projects');
    if (cmd === 'education') return navigate('education');
    if (cmd === 'contact') return navigate('contact');
    if (cmd === 'next') return; // TODO: expose next/prev via terminal if desired
    if (cmd === 'prev') return;
    if (cmd === 'perf' || cmd === 'performance on') {
      setMode(true);
      print([{ content: 'performance mode: on', kind: 'ok' }]);
      return;
    }
    if (cmd === 'performance off') {
      setMode(false);
      print([{ content: 'performance mode: off', kind: 'ok' }]);
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
