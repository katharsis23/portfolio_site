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
      label: 'Linkedin',
      value: 'www.linkedin.com/in/danylo-herchakivskyi-41555140a',
      href: 'http://www.linkedin.com/in/danylo-herchakivskyi-41555140a',
    },
    {
      label: 'GitHub',
      value: 'github.com/katharsis23',
      href: 'https://github.com/katharsis23',
    },
  ],
};

export const portfolioUkr: PortfolioContent = {
  name: 'Данило (Katharsis)',
  role: 'Python Backend Розробник',
  about: [
    'Результативний Python Backend Розробник із міцною теоретичною базою в Computer Science та практичним досвідом побудови масштабованих, готових до продакшену систем. Спеціалізуюся на розробці високопродуктивних і безпечних RESTful API на FastAPI та Django (DRF), оптимізації реляційних баз даних (PostgreSQL, MySQL) та контейнеризації додатків за допомогою Docker.',
    'Окрім розробки бекенд-архітектури, маю практичний досвід кросплатформенної мобільної розробки на Flutter (Dart), що дозволяє мені безшовно інтегрувати бекенд-сервіси з клієнтською частиною.',
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
      period: 'Грудень 2025 – Лютий 2026',
      bulletPoints: [
        'Розробляв продакшен-фічі та рефакторив легасі-код бекенду для комерційної спортивної платформи (Padel).',
        'Значно підвищив надійність системи завдяки збільшенню покриття коду юніт- та інтеграційними тестами за допомогою Pytest.',
        'Оптимізував запити до бази даних та час відповіді API, забезпечивши стабільну роботу під продакшен-навантаженням.',
      ],
    },
    {
      role: 'Flutter / Frontend Developer',
      company: 'Molofaktura Startup',
      period: 'Липень 2024 – Вересень 2024',
      bulletPoints: [
        'Брав участь у розробці кросплатформеного UI для інтерактивної освітньої платформи "School42".',
        'Допоміг проєкту залучити фінансування завдяки перемозі в грантовому конкурсі Molofaktura 2024.',
        'Інтегрував мобільний інтерфейс із бекенд REST API.',
      ],
    },
  ],
  projects: [
    {
      name: 'Padel Sports Platform',
      tagline: 'Комерційний проєкт',
      stack: [
        'Python',
        'Django DRF',
        'FastAPI',
        'PostgreSQL',
        'Pytest',
        'Docker',
      ],
      description:
        'Провів рефакторинг ключових легасі-компонентів, оптимізував DB-запити та швидкість роботи API для продакшену. Реалізував нові бекенд-модулі для бронювання кортів у реальному часі та автоматичного розкладу ігор.',
    },
    {
      name: 'LeoRent',
      tagline: 'AI-Платформа для оренди нерухомості',
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
        'Спроектував бекенд-екосистему для платформи оренди нерухомості з інтегрованим AI-асистентом для автоматизації пошуку та підбору житла. Побудував масштабовані RESTful API ендпоінти для управління оголошеннями, запитами користувачів та динамічної фільтрації.',
    },
    {
      name: 'Zettelkasten Note & Task Ecosystem',
      tagline: 'Кросплатформена локально-перша система нотаток',
      stack: [
        'Python',
        'FastAPI',
        'SQLite/PostgreSQL',
        'Flutter',
        'Dart',
        'REST API',
      ],
      description:
        'Спроектував кросплатформений рушій для нотаток і задач за методом Zettelkasten за принципом "local-first, cloud-second". Реалізував алгоритми синхронізації даних для безшовного управління станом між пристроями та офлайн-персистентністю з хмарним бекапом.',
    },
    {
      name: 'Notes AI Manager',
      tagline: 'Інтеграція локальних LLM',
      stack: [
        'Python',
        'Ollama API',
        'Local LLMs',
        'Markdown Parser',
        'Graph Generation',
      ],
      description:
        'Створив автоматизовану систему обробки нотаток на базі локальних моделей Ollama для аналізу, узагальнення та автогенерації структурованих .md конспектів. Реалізував динамічний генератор графа знань для інтерактивних візуальних mind-maps.',
    },
    {
      name: 'sddm_dots',
      tagline: 'Конфігурації системи та середовища',
      stack: ['Linux', 'QML', 'Shell Scripting', 'Custom Unix Configuration'],
      description:
        'Створив кастомну анімовану тему та конфігурацію dotfiles для дисплейного менеджера SDDM. Проєкт демонструє впевнене володіння Linux CLI, системним кастомізуванням та UI-скриптами.',
    },
  ],
  education: [
    {
      degree: "Бакалавр: Комп'ютерні науки (Спеціальність 122)",
      institution: 'Національний університет «Львівська політехніка»',
      period: 'Вересень 2023 – дотепер',
      focus:
        'Глибокий фокус на інженерії програмного забезпечення, структурах даних, архітектурі систем та проектуванні баз даних.',
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
