# ✦ Design Document v2 — For Sukriti
### Theme: Galaxy Night × Liquid Glass × Cosmic Love

> **Total redesign.** Scrapping everything from v1 — no parchment, no wax seals, no envelopes.  
> New direction inspired by 2025 UI trends: **dark glassmorphism** over a **living starfield**, with aurora-colored light bleeds and floating glass cards that feel like windows into space.

---

## 🌌 The Concept

Imagine the sky at 2 AM from a rooftop — stars overhead, the whole world quiet, just the two of you.  
The website *is* that sky. Everything floats in it. Cards are glass portals. The music is ambient and dreamy. Interactions feel soft, like touching water.

**The single job of this page:** Make Sukriti feel like the universe was made for her.

---

## 🎨 Color Palette

| Name | Hex | Role |
|---|---|---|
| **Deep Space** | `#05020F` | Page background — near-black with a hint of violet |
| **Nebula Violet** | `#2D1B69` | Ambient glow orbs behind glass cards |
| **Aurora Rose** | `#FF3CAC` | Primary accent — hearts, glows, highlights |
| **Cosmic Teal** | `#00D4FF` | Secondary accent — star shimmer, borders |
| **Stardust White** | `#F0EEFF` | All text on glass surfaces |
| **Glass Surface** | `rgba(255,255,255,0.06)` | Frosted glass card fill |

> **Why this works:** Aurora Rose + Cosmic Teal is an unusual pairing for romance — most love sites go rose + gold or red + white. This combo feels *otherworldly*, which is exactly how love actually feels. The near-black bg makes both accents glow intensely without looking neon-garish.

---

## 🔤 Typography

### Display — `Cormorant Garamond` (Italic, 700)
- Used for: her name, hero headline, section titles
- Feeling: high fashion, editorial, timeless — but with emotional weight
- Size: 4–6rem on desktop / 2.5rem on mobile

### Body — `DM Sans` (400, 500)
- Used for: letter text, captions, all readable paragraphs
- Feeling: modern, clean, not tech-bro — warm and approachable
- Size: 1rem / 1.125rem

### Accent — `Dancing Script` (700, cursive)
- Used for: "with love ♡", song name, small romantic labels ONLY
- Feeling: real handwriting energy — used very sparingly (2–3 places max)

---

## 🖥️ Layout — Full Page Map

### SECTION 0 — Loading Screen (2 seconds)
```
┌────────────────────────────────────────┐
│                                        │
│         ✦  ✦     ✦    ✦   ✦           │
│                                        │
│              ♡                         │
│         (pulsing heart)                │
│                                        │
│       "Loading something               │
│        for you, Sukriti..."            │
│                                        │
└────────────────────────────────────────┘
```
- Deep space background, stars twinkling in
- Single pulsing heart using CSS `@keyframes scale`
- Text fades in then page transitions with a dissolve

---

### SECTION 1 — Hero / Title Screen
```
┌────────────────────────────────────────┐
│  [starfield bg — 200 animated stars]   │
│                                        │
│  ╔══════════════════════════╗          │
│  ║  [glass card — blurred]  ║          │
│  ║                          ║          │
│  ║   Sukriti                ║  ← 5rem Cormorant Garamond
│  ║   ─────────────────      ║
│  ║   this is yours ♡        ║  ← DM Sans
│  ║                          ║
│  ║   [scroll down ↓]        ║
│  ╚══════════════════════════╝
│                                        │
│  [two aurora orbs: rose + teal blur]   │
└────────────────────────────────────────┘
```
- Glass card: `backdrop-filter: blur(20px)`, thin white border `rgba(255,255,255,0.15)`
- Two large blurred gradient orbs floating slowly behind card (CSS animation)
- Twinkling starfield — 200 stars at random positions, staggered `animation-delay`
- Scroll indicator pulses gently

---

### SECTION 2 — The Letter (Glass Scroll)
```
┌────────────────────────────────────────┐
│                                        │
│   ╔═══════════════════════════════╗    │
│   ║  [wide glass card]            ║    │
│   ║                               ║    │
│   ║  My dearest Sukriti,          ║    │
│   ║                               ║    │
│   ║  [letter text — DM Sans]      ║    │
│   ║  [paragraph 1]                ║    │
│   ║  [paragraph 2]                ║    │
│   ║  [paragraph 3]                ║    │
│   ║                               ║    │
│   ║      — always yours, M  ♡     ║    │
│   ╚═══════════════════════════════╝    │
│                                        │
└────────────────────────────────────────┘
```
- Card slides up on scroll using `IntersectionObserver` + CSS translate
- Letter text has a slow "typewriter-style" reveal on scroll (each paragraph fades in)
- Thin glowing left-border (Aurora Rose `#FF3CAC`) on the card — like a bookmark
- Small floating star particles drift across the section

---

### SECTION 3 — Memory Constellation
```
┌────────────────────────────────────────┐
│  "our little universe"                 │  ← section label, Dancing Script
│                                        │
│   ★ ─────── ★ ─────── ★              │  ← connecting lines like constellation
│   │photo1│  │photo2│  │photo3│        │  ← square glass-framed photo cards
│   └──────┘  └──────┘  └──────┘        │
│              │photo4│                  │
│              └──────┘                  │
│                                        │
│   [click a card → it expands fullscreen with caption]
└────────────────────────────────────────┘
```
- Photos arranged like a star constellation — connected by thin glowing lines (SVG)
- Each photo: square glass frame, subtle rose-glow on hover
- On click: smooth fullscreen expand with caption underneath in Dancing Script
- Lines between photos drawn with SVG `<line>` — twinkling animation on the dots
- Section title fades in: *"our little universe"*

---

### SECTION 4 — A Song For You
```
┌────────────────────────────────────────┐
│                                        │
│     ♪  ─────────────────────  ♪       │
│                                        │
│   ╔═══════════════════════════════╗    │
│   ║  [album-art-sized glass card]  ║   │
│   ║                               ║    │
│   ║   ♫  [Song Name]              ║    │
│   ║      [Artist]                 ║    │
│   ║                               ║    │
│   ║   ◁  ⏸  ▷          🔈       ║    │
│   ║   ════●══════════════         ║    │
│   ╚═══════════════════════════════╝    │
│                                        │
│   "This song plays in my head          │
│    every time I think of you."         │
└────────────────────────────────────────┘
```
- Centered glass player card with Aurora Rose glow when playing
- Progress bar: thin line with a teal-glowing dot scrubber
- Album art area: if no art, shows an animated equalizer visualization (CSS bars)
- Quote beneath the card in DM Sans italic — personal, not generic

---

### SECTION 5 — Closing + Countdown
```
┌────────────────────────────────────────┐
│                                        │
│         ✦                              │
│                                        │
│   we've been us for                    │
│   ┌─────┐  ┌─────┐  ┌─────┐          │
│   │ 365 │  │ 12  │  │  4  │          │
│   │days │  │ hrs │  │ min │          │
│   └─────┘  └─────┘  └─────┘          │
│                                        │
│          and counting ♡                │
│                                        │
│    [ Write to me 💌 ]                  │  ← WhatsApp / message CTA button
└────────────────────────────────────────┘
```
- Live countdown from a relationship start date (you set it in the code — one variable)
- Each number in its own glass chip — updates every second
- CTA button: glass with Aurora Rose glow on hover, links to WhatsApp or email
- Stars slowly drift as a parallax layer on scroll

---

### FLOATING MUSIC PLAYER (Fixed Bottom Bar)
```
┌────────────────────────────────────────┐
│  ♫  [song name]    ━━━●━━━    ♡  🔈  │
└────────────────────────────────────────┘
```
- Fixed to bottom, `backdrop-filter: blur(24px)`, barely-there glass strip
- Heart pulses to a CSS animation when song is playing
- Auto-plays on first user interaction (respects browser policy)

---

## ✨ The Signature Element

**The starfield is alive and responds to mouse movement.**

When Sukriti moves her cursor across the page, the stars subtly shift in parallax — closer stars move faster, distant ones slower. It's a 3-layer depth effect using `mousemove` event tracking. The whole page breathes. This is not something any template does — it turns the background from a backdrop into a *world*.

On mobile: stars shift on `deviceorientation` (phone tilt) — same magic, different input.

---

## 🎬 Animation Plan

| Moment | Animation |
|---|---|
| Page load | Stars fade in one by one (staggered, 2s total) |
| Hero card | Float upward with `transform: translateY` on mount |
| Scroll to letter | Card slides up, text fades in paragraph by paragraph |
| Photo hover | Card scales 1.04, rose glow spreads |
| Photo click | Expand to fullscreen with smooth `clip-path` reveal |
| Countdown numbers | Flip animation when digit changes (CSS 3D rotateX) |
| Music playing | Bottom bar heart pulses; equalizer bars animate |
| Cursor move | Stars parallax shift (3 layers, ~5px max displacement) |

All animations: `prefers-reduced-motion: reduce` respected. No autoplay video. No jank.

---

## 🧱 Tech Stack

| Layer | Choice |
|---|---|
| HTML | Semantic HTML5, single file |
| CSS | Custom properties + `backdrop-filter` + `@keyframes` |
| JS | Vanilla — starfield, parallax, countdown, audio |
| Fonts | Google Fonts: Cormorant Garamond, DM Sans, Dancing Script |
| Audio | HTML5 `<audio>` tag, your MP3 |
| Photos | `<img>` tags — you swap in your own files |

**Output:** One `index.html` file. Drop your song and photos in the same folder. Open in browser. Share via GitHub Pages (free).

---

## 📁 Assets You Provide

| File | What it is |
|---|---|
| `song.mp3` | The song that's yours (see suggestion below) |
| `photo1.jpg` → `photo4.jpg` | 4 photos — square crops work best (1:1) |
| `START_DATE` | Your relationship start date (1 line in the JS) |

**Song suggestion:** *Tum Hi Ho* (Arijit Singh) — but honestly, the one that played when something important happened. That one.

---

## 📝 Letter Placeholder — You Fill This In

```
My dearest Sukriti,

I built this whole page because some feelings are too big
for a text message. You make the ordinary feel like it
means something.

Distance is just a number. You're not far — you're just
not here yet.

[Write what's actually true here. Don't be clever.
Just say it. She'll love it more than any design ever could.]

— Always yours, Manuj ♡
```

---

## 🌐 Hosting (2 minutes, free)

1. Create a GitHub account → New repo → name it `sukriti`
2. Upload `index.html` + all assets
3. Settings → Pages → Deploy from `main` branch → `/root`
4. Get link like: `https://yourusername.github.io/sukriti`
5. Send her that link.

---

## 💡 Phase 2 Ideas (if you want to go further)

- **Secret page** — URL like `/sukriti-only` with a different message
- **Scroll-triggered shooting star** — appears randomly every 30 seconds
- **Guestbook reply** — she types something, you see it (localStorage)
- **Seasonal variants** — aurora colors shift based on month

---

*v2 — completely reimagined. Galaxy beats parchment, every time.*
