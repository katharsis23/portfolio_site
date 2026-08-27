/**
 * Structured portfolio content.
 *
 * Content is data, kept separate from presentation. The semantic UI layer
 * reads from here and never hardcodes copy. Source of truth lives in the
 * bilingual `.txt` files (portfolio_eng.txt / portfolio_ukr.txt); this module
 * is the typed, ready-to-render projection of that content.
 */

export interface SkillGroup {
  readonly title: string;
  readonly items: string[];
}

export interface ExperienceItem {
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly bulletPoints: string[];
}

export interface Project {
  readonly name: string;
  readonly tagline: string;
  readonly stack: string[];
  readonly description: string;
  readonly links?: { label: string; url: string }[];
}

export interface EducationItem {
  readonly degree: string;
  readonly institution: string;
  readonly period: string;
  readonly focus: string;
}

export interface PortfolioContent {
  readonly name: string;
  readonly role: string;
  readonly about: string[];
  readonly skills: SkillGroup[];
  readonly experience: ExperienceItem[];
  readonly projects: Project[];
  readonly education: EducationItem[];
  readonly contact: { label: string; value: string; href?: string }[];
}

export const portfolioEng: PortfolioContent = {
  name: 'Danylo (Katharsis)',
  role: 'Python Backend Developer',
  about: [
    'Results-oriented Python Backend Developer with a strong foundation in Computer Science and hands-on experience building scalable, production-ready systems. Specialized in crafting high-performance, secure RESTful APIs with FastAPI and Django (DRF), designing optimized relational database schemas (PostgreSQL, MySQL), and containerizing applications with Docker.',
    'Beyond core backend architecture, I possess cross-platform mobile development skills in Flutter (Dart), enabling me to bridge the gap between backend services and client-side integration seamlessly.',
  ],
  skills: [
    {
      title: 'Backend Development',
      items: [
        'Python',
        'FastAPI',
        'Django',
        'Django REST Framework',
        'SQLAlchemy',
        'Pydantic',
        'Uvicorn',
        'REST API Design',
      ],
    },
    {
      title: 'Databases & Caching',
      items: ['PostgreSQL', 'MySQL', 'Redis', 'Database Optimization'],
    },
    {
      title: 'DevOps & Infrastructure',
      items: [
        'Docker',
        'Git',
        'GitHub Actions',
        'Linux (Bash)',
        'CI/CD basics',
      ],
    },
    {
      title: 'Mobile & Frontend',
      items: ['Dart', 'Flutter', 'JavaScript', 'Cross-Platform UI Development'],
    },
    {
      title: 'Testing & Quality',
      items: [
        'Pytest',
        'Unit Testing',
        'Legacy Code Refactoring',
        'Code Coverage',
      ],
    },
  ],
  experience: [
    {
      role: 'Backend Developer',
      company: 'Appexoft',
      period: 'December 2025 – February 2026',
      bulletPoints: [
        'Engineered production features and refactored core backend legacy code for a commercial Padel sports platform.',
        'Significantly improved system reliability by increasing unit and integration test coverage with Pytest.',
        'Optimized database queries and API response times, ensuring smooth execution across production workloads.',
      ],
    },
    {
      role: 'Flutter / Frontend Developer',
      company: 'Molofaktura Startup',
      period: 'July 2024 – September 2024',
      bulletPoints: [
        'Co-developed the interactive cross-platform UI for "School42," a gamified educational platform.',
        'Successfully secured funding for the product after winning the prestigious Molofaktura 2024 startup grant.',
        'Integrated mobile frontend interfaces with backend REST APIs.',
      ],
    },
  ],
  projects: [
    {
      name: 'Padel Sports Platform',
      tagline: 'Commercial Project',
      stack: [
        'Python',
        'Django DRF',
        'FastAPI',
        'PostgreSQL',
        'Pytest',
        'Docker',
      ],
      description:
        'Refactored core legacy architectural components, optimizing DB queries and API response times for production workloads. Implemented new backend modules for real-time sports court booking and automated player scheduling.',
    },
    {
      name: 'LeoRent',
      tagline: 'AI-Powered Real Estate Platform',
      stack: [
        'Python',
        'FastAPI',
        'PostgreSQL',
        'SQLAlchemy',
        'AI Integration',
        'REST API',
        'Docker',
      ],
      description:
        'Engineered a backend ecosystem for a property rental platform featuring an integrated AI assistant to automate property search and listing matches. Built scalable RESTful API endpoints for managing listings, user inquiries, and dynamic filtering.',
    },
    {
      name: 'Zettelkasten Note & Task Ecosystem',
      tagline: 'Cross-platform, local-first note-taking engine',
      stack: [
        'Python',
        'FastAPI',
        'SQLite/PostgreSQL',
        'Flutter',
        'Dart',
        'REST API',
      ],
      description:
        'Designed a cross-platform, local-first note-taking and task management engine following the Zettelkasten methodology. Implemented data synchronization algorithms for seamless cross-device state management and offline-first persistence with cloud backup.',
    },
    {
      name: 'Notes AI Manager',
      tagline: 'Local LLM Integration',
      stack: [
        'Python',
        'Ollama API',
        'Local LLMs',
        'Markdown Parser',
        'Graph Generation',
      ],
      description:
        'Built an automated note processing system leveraging local Ollama LLM models to parse, summarize, and auto-generate structured .md study guides. Implemented a dynamic knowledge-graph generator for interactive visual mind-maps across notes.',
    },
    {
      name: 'sddm_dots',
      tagline: 'System & Environment Configs',
      stack: ['Linux', 'QML', 'Shell Scripting', 'Custom Unix Configuration'],
      description:
        'Designed a custom animated theme and dotfiles configuration for the SDDM (Simple Desktop Display Manager). Demonstrates advanced Linux CLI fluency, system-level customization, and UI scripting skills.',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science (Specialty 122)',
      institution: 'Lviv Polytechnic National University',
      period: 'September 2023 – Present',
      focus:
        'Deep focus on Software Engineering, Data Structures, Systems Architecture, and Database Design.',
    },
  ],
  contact: [
    {
      label: 'Email',
      value: 'danylolv2006@gmail.com',
      href: 'mailto:danylolv2006@gmail.com',
    },
    {
      label: 'GitHub',
      value: 'github.com/katharsis23',
      href: 'https://github.com/katharsis23',
    },
  ],
};

export const portfolioUkr: PortfolioContent = portfolioEng;
