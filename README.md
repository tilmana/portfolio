# portfolio

My custom-made portfolio made with sharing in mind, so it's been templated for ease of cloning and deployment for others!

Overview: A terminal-themed developer portfolio built with Next.js and Tailwind CSS. Designed for security engineers, pentesters, and anyone who wants their portfolio to look inspired by the CLI.

**One file to edit. Deploy in minutes. MIT License for anyone's use.**

🔗 **[Portfolio](https://tilmana.me)**

---

## Features

- Terminal window aesthetic throughout — title bars, prompt lines, monospace font
- Typewriter animation in the hero
- Scroll-triggered decrypt animation on section labels and terminal titles
- Custom neon crosshair cursor
- Glowing scan line effect on each section as it enters view
- Falling hex rain background in the hero (fully configurable)
- SSH logout / reconnect animation when clicking the status indicator
- Clickable project and degree cards with detail modals
- Confidential mode for experience entries (cipher animation + redaction bars)
- Dynamic section numbering (disabling a section resequences the numbers)
- Runtime theme switcher — 4 built-in color presets, easily extended
- All visual effects individually toggleable via feature flags
- `sh` panel — floating dev console to toggle features and switch themes live (`[esc]` to close)
- Any section can be hidden from both the page and nav with a single flag
- Staggered scroll-triggered section animations
- Pulsing glow outline on interactive cards (projects, degrees, experience)
- Open Graph image generated at build time using your theme palette
- Copy-to-clipboard on email links in the contact section
- Custom terminal-themed 404 page

## Sections

- **About** — bio paragraphs, location, email, and social links
- **Skills** — tag badge grid grouped by category
- **Projects** — clickable cards with modal (supports image/video media)
- **Experience** — git log style with expand/accordion mode; confidential flag
- **Certifications** — card grid with in-progress support
- **Degrees** — clickable cards with detail modal
- **Contact** — full link list with icons

## Getting started

```bash
git clone https://github.com/tilmana/portfolio
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview.

## Configuration

**`lib/config.ts` is the only file you need to edit.** Every visible string, link, and toggle lives there. Search for `EDIT:` comments to find each field.

### Personal

| Field | Description |
|-------|-------------|
| `name` | Your full name — shown in the hero and footer |
| `initials` | 1–2 characters shown in the browser tab favicon. Leave `""` for the default `>_` symbol |
| `handle` | Short username — used in terminal prompts (`visitor@handle:~`) |
| `title` | Job title shown in the hero and page `<title>` |
| `tagline` | One-line tagline shown under the title |
| `location` | City, State / Country |
| `email` | Contact email — shown in About and Contact sections |
| `status` | `"open"` · `"employed"` · `"freelance"` — sets the nav status badge color and label |
| `heroCommand` | Command shown in the hero terminal prompt line |
| `typewriterLines` | Array of strings typed out one-by-one in the hero block |
| `expandExperience` | `true` — all jobs start expanded. `false` — accordion mode (one open at a time) |

### Meta / SEO

| Field | Description |
|-------|-------------|
| `siteUrl` | Your deployed URL — used for Open Graph tags. Update after deploying. |
| `domain` | Your domain — shown in the SSH logout/reconnect animation |
| `metaDescription` | Short description used in `<meta>` and Open Graph tags |

### Links

Add any key to `config.links` and it renders automatically in About and Contact. Set a value to `""` to hide it.

Built-in icons: `github`, `linkedin`, `twitter`, `blog`, `ctftime`, `tryhackme`, `resume`, `email`. Any other key falls back to a generic arrow icon using the key name as the label.

### Content

Each content array (`about`, `skills`, `experience`, `projects`, `certifications`, `degrees`) is self-documenting in the config file. Add or remove entries freely — the UI adapts.

**Experience — confidential flag:**
```ts
{
  title: "Senior Engineer",
  company: "Acme Corp",   // never shown if confidential: true
  confidential: true,
  bullets: [...],         // replaced with redaction bars if confidential: true
}
```

> The frontend strips confidential data as a display safeguard, but this is not a security measure. Do not put real employer names or sensitive details in this file.

**Projects — severity badge:**
```ts
severity: "critical" | "high" | "medium" | "low" | null
```

**Projects / Degrees — media and long description:**
Clicking a card opens a modal. Set `longDescription` for expanded detail. For projects, set `media` to an image or video URL (`.mp4`/`.webm` auto-detected), or leave it `""` to hide the media area entirely.

### Theme

Pick a color preset with a single string:

```ts
theme: "green"  // "green" | "amber" | "cyan" | "red"
```

All nine color values (primary, accent, dim, edge, surface, base, content, warn, danger) cascade through the entire UI. To create a custom palette, add an entry to the `THEMES` object at the top of `config.ts`:

```ts
export const THEMES = {
  // ...built-ins...
  myTheme: {
    primary: "#ff00ff",
    accent:  "#00ffff",
    // ...
  },
}
```

Then set `theme: "myTheme"`. The favicon updates automatically too.

### Feature flags

```ts
features: {
  customCursor:      true,  // neon crosshair cursor
  decryptAnimation:  true,  // scramble-in animation on scroll
  hexRain:           true,  // falling hex characters in hero background
  scanLine:          true,  // glowing scan line on section enter
  sshLogout:         true,  // SSH logout animation on status click
  navAnimation:      true,  // cd ./section command flash when navigating
  glowOnInteractive: true,  // pulsing glow outline on clickable cards
}
```

All flags are also toggleable at runtime via the `sh` panel (bottom-right corner).

### Hex rain

```ts
hexRain: {
  opacity:   0.30,  // overall canvas visibility (0–1)
  fadeRate:  0.18,  // trail length — lower = longer trails
  charAlpha: 0.85,  // brightness of each character (0–1)
  fontSize:  13,    // size in px — also controls column density
},
```

### UI strings

All visible copy outside of your personal content lives in `config.ui`. Useful for non-English sites or tweaking the terminal flavor:

```ts
ui: {
  online:           "online",
  clickToExpand:    "→ click to expand",
  inProgress:       "in progress",
  experienceHint:   "// click a commit to expand details",
  classifiedBadge:  "CLASSIFIED",
  classifiedBanner: "TOP SECRET // ORCON",
  contactFooter:    "// All systems nominal. Awaiting your transmission.",
  scrollHint:       "scroll to explore ↓",
  sshWelcome:       "Welcome to PortfolioOS v1.0.0",
  sshReconnect:     "to reconnect",
}
```

### Section visibility

```ts
sections: {
  about:          true,
  skills:         true,
  projects:       true,
  experience:     true,
  certifications: true,
  degrees:        true,
  contact:        true,
}
```

Setting any to `false` removes it from both the page and the nav. Section numbers resequence automatically.

### Nav labels

```ts
navLabels: {
  about:          "./about",
  skills:         "./skills",
  projects:       "./projects",
  experience:     "./experience",
  certifications: "./certifications",
  degrees:        "./degrees",
  contact:        "./contact",
}
```

Customize the text for each nav link freely.

## Deployment

The fastest path is [Vercel](https://vercel.com):

1. Push the repo to GitHub
2. Import it at vercel.com/new
3. Deploy — no environment variables needed

Update `siteUrl` in config to your deployed URL for correct Open Graph tags.

## Stack

- [Next.js](https://nextjs.org) — App Router, statically generated
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) via `next/font`

## License

MIT — see [LICENSE](LICENSE).
