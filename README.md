# BRAINROTVERSE™

> *A digital playground for people whose algorithms have given up on them.*

**BRAINROTVERSE™** is a responsive neo-brutalist Y2K zine-inspired web application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Explore chaotic meme feeds, test your Aura, customize 3D sticker-layered creatures in the Lab, generate memes on an HTML5 Canvas, survive the timed Brainrot Challenge, and track everything in your persistent Profile.

---

## Features

- **Home Hub**: Sunburst yellow & hot-pink collage layout featuring iconic 3D mascots (*Tralalero Tralala*, *Capybara Boss*, *Drip Duck*, *Frog King*, *Cool Banana*, *Bread Cat*), a clickable Trending Ticker bar, Creature of the Day spotlight, and responsive layout across mobile, tablet, and desktop.
- **The Feed**: Searchable and filterable meme stream (`FOR YOU`, `CREATURES`, `CHAOS`, `MEMES`, `TRENDING`) with interactive likes synced to your Profile and a comment drawer/modal.
- **Creature Lab**: Mix and match 3D cartoon mascots with transparent 3D PNG accessories (*Wings*, *Crown*, *Dunks*, *Top Hat*, *Shades*, *Gold Chain*). Drag stickers directly on the stage, adjust size, tilt, and layer order (`Behind` / `Front`), and export a composited 640×640 PNG via HTML5 Canvas.
- **Meme Factory**: Live HTML5 `<canvas>` meme generator with mascot templates, auto-scaling Impact-style top/bottom captions, background burst swatches, and one-click PNG download.
- **Aura Check**: 5-question interactive personality quiz with progress tracking and an Aura diagnosis saved directly to your Profile.
- **Brainrot Challenge**: 10-question arcade trivia mode with a live 15-second countdown timer per question, streak bonuses, and high-score persistence.
- **Your Profile**: `localStorage`-backed stats (`Likes`, `Creatures`, `Quizzes`, `Best Score`), editable username, mascot avatar switcher, unlockable achievements, and Saved Creatures collection.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Lucide React
- **Graphics & Compositing**: HTML5 Canvas 2D & Pointer Events sticker editor
- **Build Tooling**: Vite 8

---

## Getting Started

### Prerequisites

- **Node.js** 20+ (or **Bun**)
- **npm** 10+

### Local Development

```bash
# Install dependencies
npm install

# Start the development server on http://localhost:3000
npm run dev
```

### Build & Type-Check

```bash
# TypeScript check
npm run lint

# Production build (outputs to dist/)
npm run build
```

---

## Deploying to Vercel

This project builds as a static Vite SPA (`dist/`):

- **Framework Preset**: Vite
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

*(Note: Ensure `esbuild` stays aligned with Vite 8's peer range `^0.27.0 || ^0.28.0` so `npm install` resolves cleanly without peer conflicts.)*

---

## Project Structure

```text
├── index.html                  # Fonts & OpenGraph metadata
├── metadata.json               # App name & description
├── package.json                # Dependencies & build scripts
├── public/assets/
│   ├── accessories/            # Transparent 3D PNG sticker accessories
│   └── mascots/                # Transparent 3D mascot cutouts
└── src/
    ├── App.tsx                 # Page routing & localStorage state
    ├── index.css               # Neo-brutalist utilities, halftones & fonts
    ├── types.ts                # Shared TypeScript interfaces
    ├── data/brainrotData.ts    # Feed posts, quiz questions, templates & anchors
    └── components/
        ├── Navbar.tsx          # Responsive nav bar & mobile drawer
        ├── Footer.tsx          # Site footer
        ├── HomePage.tsx        # Hero, ticker, feature cards & spotlight
        ├── FeedPage.tsx        # Searchable meme grid & comments modal
        ├── AuraCheckPage.tsx   # 5-step Aura quiz & diagnosis
        ├── CreatureLabPage.tsx # Interactive sticker lab & PNG exporter
        ├── CreatureRender.tsx  # Draggable accessory layer renderer & canvas baker
        ├── MemeFactoryPage.tsx # HTML5 Canvas meme generator
        ├── ChallengePage.tsx   # Timed 10-question arcade trivia
        └── ProfilePage.tsx     # Stats, achievements & creature collection
```

---

## License

Built for fun. Stay cooked.
