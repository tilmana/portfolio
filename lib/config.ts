// ============================================================
//  CLI PORTFOLIO — CONFIGURATION
//  ─────────────────────────────────────────────────────────
//  This is the ONLY file you need to edit.
//  Search for "EDIT:" comments to find every field.
//  After editing, run `npm run dev` to preview locally,
//  then push to GitHub and Vercel auto-deploys.
// ============================================================

// ── THEME PRESETS ────────────────────────────────────────
// Used by config.theme below. You can add your own entries here.
export const THEMES = {
  green: {
    primary:  "#39ff14",  // Main accent — prompts, highlights, active elements
    accent:   "#00d9ff",  // Secondary accent — links, labels, field names
    dim:      "#3a6a3a",  // Muted text — hints, secondary labels, dim borders
    edge:     "#1a3a1a",  // Card borders and dividers
    surface:  "#0d2e0d",  // Subtle background — cards, hover states
    base:     "#050a05",  // Page background
    content:  "#d4d4d4",  // Body text
    warn:     "#ffd700",  // In-progress status, HEAD badge, gold indicators
    danger:   "#ff4444",  // Classified entries, error states
  },
  amber: {
    primary:  "#ffb000",
    accent:   "#ff8c00",
    dim:      "#6a4e1a",
    edge:     "#3a2800",
    surface:  "#1e1600",
    base:     "#0a0800",
    content:  "#d4c9a8",
    warn:     "#ff6600",
    danger:   "#ff2222",
  },
  cyan: {
    primary:  "#00e5ff",
    accent:   "#7b61ff",
    dim:      "#1a4a5a",
    edge:     "#0d2a3a",
    surface:  "#071820",
    base:     "#020c12",
    content:  "#c8d8e0",
    warn:     "#ffd700",
    danger:   "#ff4444",
  },
  red: {
    primary:  "#ff3333",
    accent:   "#ff8800",
    dim:      "#994444",
    edge:     "#4a1414",
    surface:  "#1a0404",
    base:     "#0a0202",
    content:  "#d4c4c4",
    warn:     "#ffd700",
    danger:   "#ff0055",
  },
} as const;

export type ThemeName = keyof typeof THEMES;

export const config = {
  // ── PERSONAL ────────────────────────────────────────────
  // EDIT: Your full name
  name: "Arthur Tilman",

  // EDIT: 1–2 character initials shown in the browser tab favicon.
  // Leave empty ("") to use the default >_ terminal symbol.
  initials: "AT",

  // EDIT: Short handle — used in prompts like  visitor@[handle]:~
  handle: "tilmana",

  // EDIT: Job title shown in hero and meta tags
  title: "Cybersecurity - Penetration Tester",

  // EDIT: Short tagline shown under your title in the hero
  tagline: "Professionally breaking things to improve their security",

  // EDIT: City, State / Country
  location: "Mason, OH",

  // EDIT: Contact email
  email: "arthur.mumble709@passmail.net",

  // EDIT: Your availability
  //   "open"      → green  ● Open to opportunities
  //   "employed"  → yellow ● Currently employed
  //   "freelance" → cyan   ● Available for freelance
  status: "employed" as "open" | "employed" | "freelance",

  // EDIT: Lines typed out in the hero terminal block.
  // Freeform — doesn't have to match name/location above. Use whatever reads well.
  // Each string is one line. Use \u00a0 for aligned spacing if you like.
  typewriterLines: [
    "name     : Arthur Tilman",
    "role     : Penetration Tester / Ethical Hacker",
    "location : Mason, OH",
  ],

  // EDIT: If true, all experience entries start fully expanded.
  // Set to false to use accordion mode (one open at a time).
  expandExperience: true,

  // EDIT: Command shown in the hero terminal prompt.
  heroCommand: "whoami --verbose",

  // ── META / SEO ───────────────────────────────────────────
  // EDIT: Your deployed URL — used for Open Graph tags (social share previews).
  // Update this after deploying so link previews show the correct URL.
  siteUrl: "https://tilmana.dev",

  // EDIT: Your domain — shown in the SSH session text (logout/reconnect animation)
  domain: "tilmana.dev",

  // EDIT: Short description used in the page <meta> description and Open Graph tags.
  metaDescription:
    "Penetration tester/ethical hacker. I break things (with permission) and help teams build more resilient systems.",

  // ── SOCIAL LINKS ────────────────────────────────────────
  // EDIT: Set any link to "" to hide it. Add any key you want — it renders automatically
  // in the About and Contact sections.
  // Keys with built-in icons: github, linkedin, twitter, blog, ctftime, tryhackme, resume, email
  // Any other key will render with a generic arrow icon and the key name as the label.
  links: {
    github:    "https://github.com/tilmana",
    linkedin:  "https://linkedin.com/in/arthur-tilman",
    tryhackme: "https://tryhackme.com/p/tilmana",
    email:     "mailto:arthur.mumble709@passmail.net",
    resume:    "",   // EDIT: set to a PDF or Google Drive URL to show a CV link
  },

  // ── ABOUT ───────────────────────────────────────────────
  // EDIT: Your bio paragraphs. Each string is a separate paragraph.
  about: [
    "Offensive security professional with experience across the full spectrum of penetration testing — web applications, APIs, external and internal networks, wireless, mobile, physical engagements, and social engineering. Has delivered 80+ full-scale assessments for clients ranging from Fortune 100 and Fortune 500 companies to organizations in regulated industries.",
    "Focused on quality and efficiency: built internal automation tooling, improved testing workflows, and authored methodology documentation at multiple organizations. Comfortable owning engagements end-to-end — from scoping and kick-off through reporting, presentations, and remediation follow-up. Primary interest lies in web application and API security, where the complexity of modern web attack surfaces keeps the work challenging and the findings impactful.",
    "Active on CTF platforms including DEFCON, TryHackMe, VirtualHackingLabs, and OffSec Proving Grounds with 200+ machines compromised. Hold a Master's in Cybersecurity and Information Assurance from WGU alongside certifications including OSCP, OSWE, and a broad CompTIA stack.",
  ],

  // ── SKILLS ──────────────────────────────────────────────
  // EDIT: Skills grouped by category. Just add or remove names.
  skills: [
    {
      category: "Offensive Security",
      items: [
        "Web Application Testing",
        "API Testing",
        "Internal and External Network Testing",
        "Active Directory Testing",
        "Mobile Application Testing",
        "Phishing & Vishing",
        "Physical Engagements & Social Engineering"
      ],
    },
    {
      category: "Tools & Frameworks",
      items: [
        "Burp Suite & Extensions",
        "Metasploit",
        "Responder / Ntlmrelayx / mitm6 / CME / BloodHound",
        "aircrack-ng / Kismet",
        "Frida / Corellium / Android Studio",
        "ffuf",
        "Hashcat, JTR",
        "Nessus, Nikto, Nmap",
        "Wireshark, tcpdump",
        "AI Tooling - Prompting, MCPs, Hooks, etc",
        "Intuition from Past Experience!",
        "and more..."
      ],
    },
    {
      category: "Languages & Scripting",
      items: [
        "Python",
        "Bash",
        "Java",
        "JavaScript",
        "C / C++",
      ],
    },
  ],

  // ── EXPERIENCE ──────────────────────────────────────────
  // EDIT: Work history, newest first.
  //
  // confidential: true — hides company name and bullet points on the site.
  // ⚠ WARNING: Do NOT put real employer names or job details in confidential
  //   blocks. The frontend strips them as a safeguard, but treat this field
  //   as a display flag only — not a security measure. Keep sensitive info
  //   out of this file entirely.
  experience: [
    {
      title: "CONFIDENTIAL",
      company: "CONFIDENTIAL",
      period: "2025 – Present",
      location: "Remote",
      type: "Full-time",
      confidential: true,
      bullets: [
        "",
      ],
    },
    {
      title: "Red Team Consultant",
      company: "OnDefend (Independent Security Inspector/ISI for TikTok U.S.)",
      period: "2025 – 2025",
      location: "Remote",
      type: "Full-time",
      confidential: false,
      bullets: [
        "Conducted external network penetration testing as part of a structured pod team engagement",
        "Authored internal methodology documentation and onboarding material for new pod members",
        "Built and maintained a multi-sheet testing tracker to organize targets, divide workload, and communicate project status to the PM",
        "Developed Python scripts to ingest raw target lists and categorize by record validity and internal address resolution, eliminating accidental scanning of internal hosts",
        "Deployed and configured a Nessus instance and custom scanning policy to ensure full testing coverage",
      ],
    },
    {
      title: "Senior Offensive Security Specialist",
      company: "Cyber Defense Labs (now OakTruss Group)",
      period: "2023 – 2024",
      location: "Remote",
      type: "Full-time",
      confidential: false,
      bullets: [
        "Delivered web application and API penetration tests end-to-end, including scoping, testing, reporting, and client presentations",
        "Provided pentesting across web, API, mobile, external and internal networks, physical, and social engineering engagements for clients including Fortune 100 companies",
        "Collaborated with the Advisory team to deliver full-scope cybersecurity services and continuously improve client security posture",
        "Built automation scripts that eliminated hours of repetitive weekly tasks and reduced human error in internal workflows",
        "Upgraded core testing workflow to raise the quality and consistency of client deliverables",
      ],
    },
    {
      title: "Offensive Security Consultant",
      company: "Depth Security (subsidiary of Konica Minolta)",
      period: "2022 – 2023",
      location: "Remote",
      type: "Full-time",
      confidential: false,
      bullets: [
        "Performed 60+ full-scale penetration tests across external and internal networks, wireless, web applications, and APIs for clients including Fortune 500 companies",
        "Delivered detailed report packages covering identified findings, risk ratings, and actionable remediation guidance",
        "Managed full engagement lifecycle — kick-off calls, status updates, close-out presentations, and follow-up remediation assessments",
        "Authored internal documentation to standardize and improve team processes",
        "Onboarded new consultants by leading live engagement walkthroughs covering methodology, workflow, and client communication",
      ],
    },
    {
      title: "User",
      company: "CTF Platforms (DEFCON, TryHackMe, VirtualHackingLabs, OffSec Proving Grounds, and more)",
      period: "2020 - Present",
      location: "Remote",
      type: "Full-time",
      confidential: false,
      bullets: [
        "Compromised 200+ machines across platforms including DEFCON, TryHackMe, VirtualHackingLabs, and OffSec Proving Grounds",
        "Applied a broad range of exploitation techniques including SQL injection, file inclusion, code injection, privilege escalation, kernel exploitation, prompt injection, and service-specific exploits",
      ],
    },
  ],

  // ── PROJECTS ────────────────────────────────────────────
  // EDIT: Notable projects, tools, research, or CVEs.
  // Set url to "" to hide the external link.
  // longDescription: shown in the expanded modal — add more technical detail here.
  // media: URL to a screenshot or video (mp4/webm auto-detected). Set to "" to
  //        show a placeholder frame instead.
  projects: [
    {
      name: "Wraith",
      description:
        "A modular browser hook C2 framework inspired by BeEF — built for authorized security research and education.",
      longDescription:
        "Wraith is a full-stack browser hook framework with a Fastify C2 server, a ~4 KB IIFE agent bundle, and a React 18 admin dashboard. It features a pluggable module system with auto-discovery, real-time WebSocket session management, SQLite persistence, and polymorphic payload obfuscation. Official modules include mouse/click tracking with heatmap replay, keystroke capture with live keyboard visualization, device enumeration with permission prompting, WebRTC IP leak detection, browser fingerprinting, and idle/tab tracking. Modules are standalone repos that drop into the framework with zero code changes.",
      tags: ["TypeScript", "React", "Fastify", "WebSocket", "SQLite", "esbuild"],
      url: "https://github.com/tilmana/wraith",
      // EDIT: severity is optional — use for CVEs or bug bounty findings
      // Options: "critical" | "high" | "medium" | "low" | null
      severity: null,
      // EDIT: set to an image/video URL, or "" to show a placeholder
      media: "https://github.com/user-attachments/assets/a8dc21c6-b370-40bd-8e00-7c6d6a970d7a",
    },
    {
      name: "TBD ",
      description:
        "TBD",
      longDescription:
        "TBD",
      tags: [],
      url: "",
      severity: null,
      media: "",
    },
    {
      name: "TBD  ",
      description:
        "TBD",
      longDescription:
        "TBD",
      tags: [],
      url: "",
      severity: null,
      media: "",
    },
    {
      name: "TBD   ",
      description:
        "TBD",
      longDescription:
        "TBD",
      tags: [],
      url: "",
      severity: null,
      media: "",
    },
    {
      name: "TBD    ",
      description:
        "TBD",
      longDescription:
        "TBD",
      tags: [],
      url: "",
      severity: null,
      media: "",
    },
    {
      name: "TBD     ",
      description:
        "TBD",
      longDescription:
        "TBD",
      tags: [],
      url: "",
      severity: null,
      media: "",
    },
  ],

  // ── CERTIFICATIONS ──────────────────────────────────────
  // EDIT: Leave year as "" to show "(in progress)"
  certifications: [
    {
      name: "OSCP",
      full: "Offensive Security Certified Professional",
      year: "2021",
      org: "Offensive Security",
    },
    {
      name: "OSWE",
      full: "Offensive Security Web Expert",
      year: "2023",
      org: "Offensive Security",
    },
    {
      name: "CySA+",
      full: "Offensive Security Certified Professional",
      year: "2020",
      org: "OffSec",
    },
    {
      name: "Security+",
      full: "CompTIA Security+",
      year: "2020",
      org: "CompTIA",
    },
    {
      name: "Linux+",
      full: "CompTIA Linux+",
      year: "2020",
      org: "CompTIA",
    },
    {
      name: "Project+",
      full: "CompTIA Project+",
      year: "2022",
      org: "CompTIA",
    },
    {
      name: "Network+",
      full: "CompTIA Network+",
      year: "2020",
      org: "CompTIA",
    },
    {
      name: "A+",
      full: "CompTIA A+",
      year: "2019",
      org: "CompTIA",
    },
    {
      name: "ITIL 4",
      full: "ITIL Version 4",
      year: "2022",
      org: "Information Technology Infrastructure Library",
    },
  ],

  // ── DEGREES ─────────────────────────────────────────────
  // EDIT: Your formal education. Leave year as "" if in progress.
  // "focus" is optional — use it for a major, concentration, or thesis topic.
  degrees: [
    {
      degree:          "Master's Degree",
      institution:     "Western Governor's University",
      year:            "2024",
      focus:           "Cybersecurity and Information Assurance",
      // EDIT: Shown in the expanded modal. Add relevant coursework, thesis,
      //       honors, activities, or anything else worth highlighting.
      longDescription: "Engineered cloud solutions and configurations to meet industry compliance and business requirements. Developed high-level security documentation containing gap analyses and remediation guidance. Produced deliverables on securing a merged organization across two distinct networks. Completed testing regarding secure software design and related development methodologies. Designed a comprehensive capstone project revolving around full lifecycle web application security implementation and maintenance.",
    },
    {
      degree:          "Bachelor's Degree",
      institution:     "Western Governor's University",
      year:            "2022",
      focus:           "Computer Science",
      // EDIT: Shown in the expanded modal. Add relevant coursework, thesis,
      //       honors, activities, or anything else worth highlighting.
      longDescription: "Completed projects in Python, Java, C++, and SQL. Coursework spanned Software QA, AI, Machine Learning, Business in IT, Computer Architecture, Operating Systems, the Software Engineering process, and Web Development.",
    },
    // EDIT: Add more entries as needed, e.g.:
    // {
    //   degree:          "M.S. Cybersecurity",
    //   institution:     "Some University",
    //   year:            "",
    //   focus:           "Offensive Security",
    //   longDescription: "...",
    // },
  ],

  // ── THEME ───────────────────────────────────────────────
  // EDIT: Pick a color theme. Options: "green" | "amber" | "cyan" | "red"
  // Palettes are defined in the THEMES object at the top of this file.
  // To create your own, add a new entry there and use its key here.
  theme: "amber" as ThemeName,

  // ── FEATURES ────────────────────────────────────────────
  // EDIT: Toggle visual features on/off. Set any to false to disable.
  // Note: the "as boolean" casts are required because the config uses "as const"
  // for type safety — without them TypeScript infers the literal type "true"
  // instead of "boolean", which would make the flag non-togglable.
  features: {
    // Custom neon crosshair cursor (replaces the OS default cursor)
    customCursor:     true  as boolean,
    // Decrypt animation — labels and terminal titles scramble in on scroll
    decryptAnimation: true  as boolean,
    // Falling hex characters in the hero background
    hexRain:          true  as boolean,
    // Glowing scan line sweeping each terminal window as it enters view
    scanLine:         true  as boolean,
    // SSH logout/reconnect sequence triggered by clicking "online" in the nav
    sshLogout:        true  as boolean,
    // Terminal command flash when clicking a nav link (cd ./section)
    navAnimation:     true  as boolean,
    // Subtle glow outline on clickable cards (projects, degrees, experience)
    glowOnInteractive: true as boolean,
  },

  // ── SECTIONS ────────────────────────────────────────────
  // EDIT: Set any section to false to remove it from both the page and the nav.
  sections: {
    about:          true  as boolean,
    skills:         true  as boolean,
    projects:       true  as boolean,
    experience:     true  as boolean,
    certifications: true  as boolean,
    degrees:        true  as boolean,
    contact:        true  as boolean,
  },

  // ── UI STRINGS ──────────────────────────────────────────
  // EDIT: All visible UI copy outside of your personal content.
  // Useful for non-English sites or tweaking the terminal flavor.
  ui: {
    online:           "online",
    clickToExpand:    "→ click to expand",
    inProgress:       "in progress",
    experienceHint:   "// click a commit to expand details",
    classifiedBadge:  "CLASSIFIED",
    classifiedBanner: "TOP SECRET // ORCON",
    contactFooter:    "// All systems nominal. Awaiting your transmission.",
    scrollHint:       "scroll to explore ↓",
    sshWelcome:       "Welcome to TilmanOS v2.3.1",
    sshReconnect:     "to reconnect",
  },

  // ── HEX RAIN ────────────────────────────────────────────
  // EDIT: Controls the matrix-style falling hex characters in the hero.
  hexRain: {
    // Overall canvas opacity (0–1). Higher = more prominent.
    opacity:       0.30,
    // How quickly older characters fade out (0–1). Lower = longer trails.
    fadeRate:      0.18,
    // Brightness of active characters (0–1).
    charAlpha:     0.85,
    // Font size in px — also controls column density.
    fontSize:      13,
  },

  // ── NAV LABELS ──────────────────────────────────────────
  // EDIT: Customize the text for each nav link.
  navLabels: {
    about:          "./about",
    skills:         "./skills",
    projects:       "./projects",
    experience:     "./experience",
    certifications: "./certifications",
    degrees:        "./degrees",
    contact:        "./contact",
  },
} as const;

export type Config = typeof config;

// Section order used for computing display numbers.
// Numbers recompute automatically when sections are toggled in config.sections.
const SECTION_ORDER = [
  "about", "skills", "projects", "experience", "certifications", "degrees", "contact",
] as const;

export function getSectionNumber(key: (typeof SECTION_ORDER)[number]): string {
  let num = 0;
  for (const k of SECTION_ORDER) {
    if (config.sections[k]) num++;
    if (k === key) break;
  }
  return String(num).padStart(2, "0");
}
