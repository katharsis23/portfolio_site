Page: Hyprland Portfolio with Functional Workspaces
> **DO NOT HARDCODE COLOURS AND VARIABLES. But you can use basic concept and layout**
```html
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivera | System Architect Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&amp;family=Plus+Jakarta+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #94e2d5; 
      --surface: #1e1e2e;
      --surface-dim: #181825;
      --surface-bright: #313244;
      --text: #cdd6f4;2
      --text-dim: #bac2de;
      --accent: #f5c2e7;
    }

    * {
      cursor: default;
      scrollbar-width: thin;
      scrollbar-color: var(--surface-bright) transparent;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow: hidden;
      background: #11111b url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564') center/cover no-repeat;
    }

    .mono {
      font-family: 'JetBrains Mono', monospace;
    }

    .waybar-blur {
      backdrop-filter: blur(12px) saturate(180%);
      background: rgba(30, 30, 46, 0.7);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .window-blur {
      backdrop-filter: blur(20px);
      background: rgba(24, 24, 37, 0.8);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .workspace-pill.active {
      background: var(--primary);
      color: #11111b;
      width: 48px;
    }

    .terminal-line::before {
      content: '➜ ';
      color: var(--primary);
    }

    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
    }

    .pulse {
      animation: pulse-dot 2s infinite;
    }

    .workspace-content {
      transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .workspace-content.hidden {
      display: none;
      opacity: 0;
      transform: translateY(10px);
    }

    .workspace-content.active {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .workspace-content {
        transition: none !important;
      }
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: var(--surface-bright);
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div id="root" class="relative w-screen h-screen flex flex-col overflow-hidden">
    
    <!-- Waybar -->
    <header class="waybar-blur w-[98%] mx-auto mt-2 rounded-xl h-10 flex items-center justify-between px-4 z-50 fixed top-0 left-0 right-0 mono text-sm">
      <div class="flex items-center gap-4">
        <!-- Workspaces -->
        <nav class="flex items-center gap-1.5" aria-label="Workspaces">
          <button class="workspace-pill active w-8 h-5 rounded-full bg-white/10 transition-all duration-300 flex items-center justify-center" id="nav-ws-1" onclick="switchWorkspace(1)">1</button>
          <button class="workspace-pill w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center" id="nav-ws-2" onclick="switchWorkspace(2)">2</button>
          <button class="workspace-pill w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center" id="nav-ws-3" onclick="switchWorkspace(3)">3</button>
          <button class="workspace-pill w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center" id="nav-ws-4" onclick="switchWorkspace(4)">4</button>
          <button class="workspace-pill w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center" id="nav-ws-5" onclick="switchWorkspace(5)">5</button>
          <button class="workspace-pill w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center" id="nav-ws-6" onclick="switchWorkspace(6)">6</button>
        </nav>
        <span class="text-white/20 px-2">|</span>
        <div class="flex items-center gap-2 opacity-80">
          <iconify-icon icon="lucide:cpu" class="text-primary"></iconify-icon>
          <span id="cpu-usage">2.4%</span>
          <iconify-icon icon="lucide:layout" class="text-accent ml-2"></iconify-icon>
          <span>Hyprland</span>
        </div>
      </div>

      <div class="flex items-center gap-6">
        <div class="hidden md:flex items-center gap-4 text-white/70">
          <div class="flex items-center gap-1.5">
             <iconify-icon icon="lucide:music-2"></iconify-icon>
             <span class="max-w-[150px] truncate">Aphex Twin - #3</span>
          </div>
          <iconify-icon icon="lucide:volume-2" id="btn-volume"></iconify-icon>
          <iconify-icon icon="lucide:wifi" id="btn-wifi"></iconify-icon>
          <iconify-icon icon="lucide:battery-medium" id="btn-battery"></iconify-icon>
        </div>
        <div class="flex items-center gap-2 font-bold">
          <span id="time">12:00 PM</span>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main id="main-viewport" class="flex-1 pt-14 pb-4 px-6 overflow-hidden relative">
      
      <div class="grid grid-cols-12 gap-6 h-full max-w-7xl mx-auto">
        
        <!-- Primary Content Window -->
        <section class="col-span-12 lg:col-span-8 flex flex-col h-full overflow-hidden">
          <div class="window-blur rounded-2xl border border-white/5 flex flex-col h-full overflow-hidden shadow-2xl relative">
            <!-- Title Bar -->
            <div class="h-10 bg-white/5 border-bottom border-white/5 flex items-center justify-between px-4 select-none">
              <div class="flex items-center gap-2">
                <iconify-icon icon="lucide:monitor" class="text-primary"></iconify-icon>
                <span class="mono text-xs font-semibold opacity-70 tracking-widest uppercase" id="window-title">Workspace / About</span>
              </div>
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                <div class="w-3 h-3 rounded-full bg-green-500/30"></div>
                <div class="w-3 h-3 rounded-full bg-red-500/30"></div>
              </div>
            </div>

            <!-- Workspace Switching Area -->
            <div class="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar relative" id="content-scroller">
              
              <!-- WS 1: ABOUT -->
              <div id="ws-content-1" class="workspace-content active">
                <article class="mb-10">
                  <h1 class="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
                    Alex <span class="text-primary">Rivera</span>
                  </h1>
                  <p class="text-xl text-white/60 max-w-2xl leading-relaxed mb-8">
                    System Architect &amp; Frontend Engineer crafting high-performance user experiences for the Linux-minded professional.
                  </p>
                  <div class="flex gap-4">
                    <button id="cta-hire-me-ws1" onclick="switchWorkspace(6)" class="px-8 py-3 bg-primary text-surface font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
                      Hire Me <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                    </button>
                    <a id="cta-resume-ws1" href="#" class="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                      Download CV
                    </a>
                  </div>
                </article>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 class="text-primary font-bold mb-2">The Philosophy</h3>
                    <p class="text-sm text-white/50">Minimalism is not the absence of features, but the presence of focus. I build systems that feel like an extension of your intent.</p>
                  </div>
                  <div class="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h3 class="text-accent font-bold mb-2">The Stack</h3>
                    <p class="text-sm text-white/50">Deeply rooted in OS primitives, performance optimization, and the modern web's capability to deliver native-feel apps.</p>
                  </div>
                </div>
              </div>

              <!-- WS 2: EXPERIENCE -->
              <div id="ws-content-2" class="workspace-content hidden">
                <h2 class="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
                   <span class="w-10 h-1 bg-primary rounded-full"></span>
                   Professional Experience
                </h2>
                <div class="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                  <div class="relative pl-10">
                    <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-primary flex items-center justify-center">
                      <div class="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <h3 class="text-xl font-bold">Senior OSS Developer</h3>
                    <div class="flex items-center gap-2 text-primary mb-3 text-sm mono">
                      <span>2021 — Present</span>
                      <span class="opacity-30">/</span>
                      <span>Remote</span>
                    </div>
                    <p class="text-white/60">Architecting decentralized infrastructure and contributing to open-source UI toolkits for Wayland-based systems. Specialized in compositor-level performance and Rust-based utility design.</p>
                  </div>
                  <div class="relative pl-10">
                    <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-white/20 flex items-center justify-center">
                      <div class="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                    <h3 class="text-xl font-bold">UI/UX Systems Engineer</h3>
                    <div class="flex items-center gap-2 text-white/40 mb-3 text-sm mono">
                      <span>2018 — 2021</span>
                      <span class="opacity-30">/</span>
                      <span>San Francisco, CA</span>
                    </div>
                    <p class="text-white/60">Developed Design Systems for a leading edge computing startup. Focus on extreme performance (120fps interfaces) and low-latency interaction models across hybrid desktop environments.</p>
                  </div>
                </div>
              </div>

              <!-- WS 3: SKILLS -->
              <div id="ws-content-3" class="workspace-content hidden">
                <h2 class="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
                   <span class="w-10 h-1 bg-accent rounded-full"></span>
                   Technical Arsenal
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 class="mono text-xs font-bold text-white/40 uppercase mb-4 tracking-widest">Core Languages</h3>
                    <div class="space-y-4">
                      <div>
                        <div class="flex justify-between text-sm mono mb-1">
                          <span>Rust / C++</span>
                          <span class="text-primary">95%</span>
                        </div>
                        <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div class="h-full bg-primary w-[95%]"></div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm mono mb-1">
                          <span>TypeScript</span>
                          <span class="text-primary">90%</span>
                        </div>
                        <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div class="h-full bg-primary w-[90%]"></div>
                        </div>
                      </div>
                      <div>
                        <div class="flex justify-between text-sm mono mb-1">
                          <span>Go / Python</span>
                          <span class="text-primary">75%</span>
                        </div>
                        <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div class="h-full bg-primary w-[75%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 class="mono text-xs font-bold text-white/40 uppercase mb-4 tracking-widest">Toolchain & OS</h3>
                    <div class="flex flex-wrap gap-2">
                      <span class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs mono hover:border-accent transition-colors">Hyprland / Sway</span>
                      <span class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs mono hover:border-accent transition-colors">Neovim (LUA)</span>
                      <span class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs mono hover:border-accent transition-colors">Docker / K8s</span>
                      <span class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs mono hover:border-accent transition-colors">Arch Linux / NixOS</span>
                      <span class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs mono hover:border-accent transition-colors">Wayland Protocol</span>
                      <span class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs mono hover:border-accent transition-colors">WebGL / WASM</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- WS 4: PROJECTS -->
              <div id="ws-content-4" class="workspace-content hidden">
                <h2 class="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
                   <span class="w-10 h-1 bg-primary rounded-full"></span>
                   Open Source Projects
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a id="proj-card-1" href="#" class="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all">
                    <div class="flex justify-between items-start mb-6">
                      <iconify-icon icon="lucide:box" class="text-3xl text-primary"></iconify-icon>
                      <div class="flex gap-2">
                        <span class="text-[10px] mono bg-primary/10 text-primary px-2 py-1 rounded">v2.4.0</span>
                      </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Dotfiles.rs</h3>
                    <p class="text-sm text-white/50 mb-6">A blazingly fast dotfiles orchestrator written in Rust with symlink management and live templating engine.</p>
                    <div class="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                       <iconify-icon icon="lucide:github"></iconify-icon>
                       <iconify-icon icon="lucide:star"></iconify-icon>
                       <span class="text-xs mono ml-auto">Rust</span>
                    </div>
                  </a>
                  <a id="proj-card-2" href="#" class="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all">
                    <div class="flex justify-between items-start mb-6">
                      <iconify-icon icon="lucide:layers" class="text-3xl text-accent"></iconify-icon>
                      <div class="flex gap-2">
                        <span class="text-[10px] mono bg-accent/10 text-accent px-2 py-1 rounded">BETA</span>
                      </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-accent transition-colors">Wyland-Grid</h3>
                    <p class="text-sm text-white/50 mb-6">A lightweight layout engine for creating dynamic, physics-based desktop workspaces on the web. Zero dependencies.</p>
                    <div class="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                       <iconify-icon icon="lucide:github"></iconify-icon>
                       <iconify-icon icon="lucide:star"></iconify-icon>
                       <span class="text-xs mono ml-auto">TS / WASM</span>
                    </div>
                  </a>
                </div>
              </div>

              <!-- WS 5: EDUCATION -->
              <div id="ws-content-5" class="workspace-content hidden">
                <h2 class="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
                   <span class="w-10 h-1 bg-accent rounded-full"></span>
                   Education & Certifications
                </h2>
                <div class="space-y-8">
                   <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h3 class="text-xl font-bold">M.S. in Computer Science</h3>
                      <p class="text-accent mono text-sm mb-4">Stanford University / 2016 — 2018</p>
                      <p class="text-sm text-white/50">Specialization in Distributed Systems and Human-Computer Interaction. Research focus on low-latency rendering pipelines for Unix-like environments.</p>
                   </div>
                   <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h3 class="text-xl font-bold">B.S. in Software Engineering</h3>
                      <p class="text-white/40 mono text-sm mb-4">MIT / 2012 — 2016</p>
                      <p class="text-sm text-white/50">Fundamentals of algorithms, data structures, and kernel development. Deep dive into C and systems architecture.</p>
                   </div>
                </div>
              </div>

              <!-- WS 6: CONTACT -->
              <div id="ws-content-6" class="workspace-content hidden">
                <h2 class="text-3xl font-bold mb-10 flex items-center gap-3 text-white">
                   <span class="w-10 h-1 bg-primary rounded-full"></span>
                   Initiate Contact
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div>
                      <p class="text-white/60 mb-8">Interested in collaborating on high-performance systems or just want to discuss the latest Wayland protocols? Drop a line.</p>
                      <div class="space-y-4">
                         <a id="contact-email" href="mailto:alex@rivera.dev" class="flex items-center gap-4 text-white hover:text-primary transition-colors">
                            <iconify-icon icon="lucide:mail" class="text-xl text-primary"></iconify-icon>
                            <span class="mono">alex@rivera.dev</span>
                         </a>
                         <a id="contact-github" href="#" class="flex items-center gap-4 text-white hover:text-primary transition-colors">
                            <iconify-icon icon="lucide:github" class="text-xl text-primary"></iconify-icon>
                            <span class="mono">github.com/rivera-arch</span>
                         </a>
                         <a id="contact-twitter" href="#" class="flex items-center gap-4 text-white hover:text-primary transition-colors">
                            <iconify-icon icon="lucide:twitter" class="text-xl text-primary"></iconify-icon>
                            <span class="mono">@rivera_sys</span>
                         </a>
                      </div>
                   </div>
                   <form class="space-y-4" onsubmit="event.preventDefault()">
                      <input type="text" placeholder="Name / Organization" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 mono text-sm outline-none focus:border-primary transition-colors text-white">
                      <input type="email" placeholder="Email" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 mono text-sm outline-none focus:border-primary transition-colors text-white">
                      <textarea placeholder="Message..." rows="4" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 mono text-sm outline-none focus:border-primary transition-colors text-white resize-none"></textarea>
                      <button id="form-submit-btn" class="w-full py-3 bg-primary text-surface font-bold rounded-lg hover:brightness-110 transition-all uppercase tracking-widest text-xs">Send Transmission</button>
                   </form>
                </div>
              </div>

            </div>

            <!-- Bottom Indicator -->
            <div class="h-8 bg-white/5 px-4 flex items-center justify-between text-[10px] mono text-white/40 uppercase tracking-widest">
              <div id="active-workspace-indicator">Workspace 1 — active</div>
              <div class="flex gap-4">
                <span id="scroll-percent">scroll: 0%</span>
                <span class="text-primary">master*</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Utility Stack -->
        <aside class="hidden lg:flex lg:col-span-4 flex-col gap-6">
          
          <!-- Terminal Window -->
          <div class="window-blur rounded-2xl border border-white/5 flex flex-col h-[400px] overflow-hidden shadow-xl">
            <div class="h-9 bg-black/40 flex items-center justify-between px-3 select-none">
              <div class="flex items-center gap-2">
                <iconify-icon icon="lucide:terminal" class="text-accent"></iconify-icon>
                <span class="mono text-[10px] font-bold opacity-60 uppercase">Foot Terminal — rivera@arch</span>
              </div>
            </div>
            <div class="flex-1 p-4 mono text-[13px] leading-relaxed overflow-y-auto bg-black/40 custom-scrollbar" id="terminal-window">
              <div class="text-white/60 mb-2">rivera@arch ~ $ fastfetch</div>
              <div class="flex gap-4 mb-4">
                <div class="text-primary font-bold">
                  ###########<br>###########<br>###########<br>###########<br>###########
                </div>
                <div class="text-white/80">
                  <span class="text-primary font-bold">Alex Rivera</span><br>
                  <span class="opacity-60">OS:</span> RiveraOS 2.0<br>
                  <span class="opacity-60">Shell:</span> zsh 5.9<br>
                  <span class="opacity-60">Uptime:</span> 3 Years exp<br>
                </div>
              </div>
              <div class="terminal-line text-white/80">help</div>
              <div class="pl-4 text-white/40 mb-2">
                Available: about, experience, skills, projects, education, contact, fastfetch, sudo hire-me
              </div>
              <div class="flex gap-2 items-center">
                <span class="text-primary">rivera@arch ~ $</span>
                <input type="text" id="terminal-input" class="bg-transparent border-none outline-none text-white w-full" placeholder="type command..." autofocus="">
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="window-blur rounded-2xl border border-white/5 p-4 flex flex-col gap-4">
             <div class="flex items-center justify-between">
                <span class="mono text-[10px] font-bold opacity-50 uppercase">Performance Metrics</span>
                <span class="pulse w-2 h-2 rounded-full bg-green-500"></span>
             </div>
             <div class="grid grid-cols-2 gap-2">
                <div class="bg-white/5 p-3 rounded-lg border border-white/5">
                   <div class="text-[10px] mono opacity-40 mb-1 uppercase">FPS</div>
                   <div class="text-xl font-bold mono">144</div>
                </div>
                <div class="bg-white/5 p-3 rounded-lg border border-white/5">
                   <div class="text-[10px] mono opacity-40 mb-1 uppercase">Memory</div>
                   <div class="text-xl font-bold mono">42mb</div>
                </div>
             </div>
             <!-- Audio Visualizer Mock -->
             <div class="flex items-end gap-1 h-12 px-2 overflow-hidden">
                <div class="flex-1 bg-primary/40 rounded-t-sm h-[20%]"></div>
                <div class="flex-1 bg-primary/40 rounded-t-sm h-[40%]"></div>
                <div class="flex-1 bg-primary/60 rounded-t-sm h-[70%]"></div>
                <div class="flex-1 bg-primary/80 rounded-t-sm h-[50%]"></div>
                <div class="flex-1 bg-primary/100 rounded-t-sm h-[90%]"></div>
                <div class="flex-1 bg-primary/80 rounded-t-sm h-[60%]"></div>
                <div class="flex-1 bg-primary/60 rounded-t-sm h-[80%]"></div>
                <div class="flex-1 bg-primary/40 rounded-t-sm h-[30%]"></div>
                <div class="flex-1 bg-primary/30 rounded-t-sm h-[10%]"></div>
             </div>
          </div>

          <!-- Help / Hints -->
          <div class="mt-auto p-4 bg-primary/10 rounded-xl border border-primary/20">
             <div class="flex items-center gap-2 mb-2 text-primary">
                <iconify-icon icon="lucide:help-circle"></iconify-icon>
                <span class="text-xs font-bold">Shortcuts</span>
             </div>
             <div class="grid gap-2 text-[10px] mono opacity-80">
                <div class="flex justify-between"><span>Switch Workspaces</span><span>Alt + 1-6</span></div>
                <div class="flex justify-between"><span>Terminal Focus</span><span>Ctrl + Alt + T</span></div>
             </div>
          </div>
        </aside>
      </div>

      <!-- Mobile Nav -->
      <div class="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 window-blur border border-white/10 px-6 py-3 rounded-full flex gap-8 z-50">
        <button id="mob-ws-1" onclick="switchWorkspace(1)" class="text-primary"><iconify-icon icon="lucide:user" class="text-xl"></iconify-icon></button>
        <button id="mob-ws-2" onclick="switchWorkspace(2)" class="text-white/40"><iconify-icon icon="lucide:briefcase" class="text-xl"></iconify-icon></button>
        <button id="mob-ws-4" onclick="switchWorkspace(4)" class="text-white/40"><iconify-icon icon="lucide:code-2" class="text-xl"></iconify-icon></button>
        <button id="mob-ws-6" onclick="switchWorkspace(6)" class="text-white/40"><iconify-icon icon="lucide:mail" class="text-xl"></iconify-icon></button>
      </div>

    </main>

  </div>

  <script>
    const workspaceNames = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

    function switchWorkspace(id) {
      // Update Pills
      document.querySelectorAll('.workspace-pill').forEach(btn => {
        btn.classList.remove('active', 'w-8', 'bg-white/10');
        btn.classList.add('w-5', 'bg-white/10');
      });
      const activePill = document.getElementById(`nav-ws-${id}`);
      if(activePill) {
        activePill.classList.add('active', 'w-8');
        activePill.classList.remove('w-5');
      }

      // Update Content
      document.querySelectorAll('.workspace-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
      });
      const activeContent = document.getElementById(`ws-content-${id}`);
      if(activeContent) {
        activeContent.classList.remove('hidden');
        setTimeout(() => activeContent.classList.add('active'), 10);
      }

      // Update UI Text
      document.getElementById('window-title').textContent = `Workspace / ${workspaceNames[id-1]}`;
      document.getElementById('active-workspace-indicator').textContent = `Workspace ${id} — active`;
      
      // Scroll to top of content area
      document.getElementById('content-scroller').scrollTop = 0;

      // Update Mobile Nav
      document.querySelectorAll('[id^="mob-ws-"]').forEach(btn => btn.classList.replace('text-primary', 'text-white/40'));
      const mobActive = document.getElementById(`mob-ws-${id}`);
      if(mobActive) mobActive.classList.replace('text-white/40', 'text-primary');
    }

    // Terminal Logic
    const terminalInput = document.getElementById('terminal-input');
    const terminalContainer = document.getElementById('terminal-window');

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.toLowerCase().trim();
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line text-white/80';
        outputLine.textContent = cmd;
        
        const response = document.createElement('div');
        response.className = 'pl-4 text-white/40 mb-2';

        switch(cmd) {
          case 'about': switchWorkspace(1); response.textContent = 'Navigating to workspace 1...'; break;
          case 'experience': switchWorkspace(2); response.textContent = 'Navigating to workspace 2...'; break;
          case 'skills': switchWorkspace(3); response.textContent = 'Navigating to workspace 3...'; break;
          case 'projects': switchWorkspace(4); response.textContent = 'Navigating to workspace 4...'; break;
          case 'education': switchWorkspace(5); response.textContent = 'Navigating to workspace 5...'; break;
          case 'contact': switchWorkspace(6); response.textContent = 'Navigating to workspace 6...'; break;
          case 'fastfetch': 
            response.innerHTML = `<span class="text-primary">System:</span> AlexOS v2<br><span class="text-primary">Kernel:</span> Portfolio-Switch-1.0`;
            break;
          case 'sudo hire-me': 
            response.className = 'pl-4 text-primary font-bold mb-2';
            response.textContent = '[SUCCESS] Recruitment handshake protocol initiated.'; 
            switchWorkspace(6);
            break;
          case 'help': response.textContent = 'Available: about, experience, skills, projects, education, contact, fastfetch, sudo hire-me'; break;
          case '': break;
          default: response.textContent = `zsh: command not found: ${cmd}`; break;
        }

        terminalContainer.insertBefore(outputLine, terminalInput.parentElement);
        terminalContainer.insertBefore(response, terminalInput.parentElement);
        terminalInput.value = '';
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
      }
    });

    // Keyboard Shortcuts (Alt + 1-6)
    window.addEventListener('keydown', (e) => {
       if(e.altKey && e.key >= '1' && e.key <= '6') {
          e.preventDefault();
          switchWorkspace(parseInt(e.key));
       }
       if(e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') {
          e.preventDefault();
          terminalInput.focus();
       }
    });

    // Scroll listener for the bottom indicator
    document.getElementById('content-scroller').addEventListener('scroll', (e) => {
      const element = e.target;
      const percent = Math.round((element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100);
      document.getElementById('scroll-percent').textContent = `scroll: ${isNaN(percent) ? 0 : percent}%`;
    });

    // Initial Time Update
    function updateTime() {
      const now = new Date();
      document.getElementById('time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateTime, 1000);
    updateTime();

    // CPU Mock
    setInterval(() => {
      const usage = (Math.random() * 5 + 1).toFixed(1);
      document.getElementById('cpu-usage').textContent = `${usage}%`;
    }, 3000);
  </script>
</body>
</html>
```

Please reference this design and implement it into our codebase; Try to understand the structure, which part of our codebase is relevant and implement
