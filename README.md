# For My Jaanu ❤️ — Romantic Apology Website

A deeply personal, romantic, and emotionally touching apology website built for **Jaanu**. Designed with soft blush pinks, warm cream parchment, dusty rose, and lavender tones, featuring smooth animations, floating hearts, delicate petals, interactive polaroid scrapbook memories, heartfelt promises, and a gentle soothing background melody.

---

## 🌟 Highlights & Features

1. **Opening Surprise Screen**:
   - Floating hearts and soft glowing aura.
   - A realistic sealed vintage envelope with a pulsing wax seal.
   - "Hey, my Jaanu ❤️", "Can I have a little moment of your time?", and "Open this, please 🥺".
   - Smooth unsealing animation with heart confetti leading to the main experience.

2. **The Apology — From My Heart**:
   - Beautiful stationery letter with elegant serif and handwritten typography.
   - Sincere, vulnerable, and accountable message addressing her feelings, patience, and love.

3. **Things I Never Want You To Forget**:
   - Interactive animated reminder cards with thoughtful reflections:
     - *You are important to me.*
     - *Your feelings are never too much.*
     - *You deserve patience and understanding.*
     - *You deserve to feel loved, not confused.*
     - *Distance will never make you less special to me.*
     - *I want to keep choosing you, every single day.*

4. **Our Little World 🌷**:
   - **Polaroid-style photo frames** with washi tape, gentle tilt angles, captions, dates, and locations.
   - Interactive zoom lightbox on tap.
   - Built-in photo customizer (upload your own photos directly from your device or swap image links in `config.ts`).
   - **Chapters of Us**: Interactive milestone timeline across the distance.

5. **A Promise To You**:
   - Section titled: *"I don’t want to just promise. I want to show you."*
   - Interactive cards detailing the 5 core commitments with actionable daily pledges.

6. **Interactive Love Section**:
   - *"Do you know how special you are to me?"* → *"Tell me ❤️"* reveals *"More than these little words could ever explain."*
   - *"Send me a virtual hug 🫂"* → Triggers an immersive full-screen heartbeat hug experience with floating hearts and comforting message.
   - Adoration note jar with gentle reasons why you cherish her.

7. **Final Letter & Safe Reply Space**:
   - Handwritten-style parchment letter concluding with *"Forever your person"*.
   - A gentle reply box where Jaanu can select or type how she's feeling and easily copy it or send it to you on WhatsApp.

8. **Ambient Romantic Melody**:
   - Subtle background music with a floating play/pause controller in the corner.
   - **Never autoplays** (respects her peace and mobile browser rules).
   - Built-in Web Audio API acoustic piano synthesizer (works 100% offline with zero external audio file required).
   - Also supports custom MP3 songs via `src/content/config.ts`.

---

## 🛠️ How to Customize in 60 Seconds

All text, photos, quotes, and memories are controlled from one central file:
📁 **[`src/content/config.ts`](./src/content/config.ts)**

### 1. Replacing Photos:
In `src/content/config.ts`, find the `scrapbookSection.polaroids` array:
```ts
{
  id: 1,
  caption: "Your smile that turns every bad day into magic ✨",
  date: "Our Favorite Day",
  location: "Our Spot",
  imageUrl: "https://your-image-url.com/photo.jpg", // Or put a local photo in /public folder e.g. "/photo1.jpg"
  rotation: "-rotate-2",
  tapeColor: "blush",
}
```
*Tip: You can also click the "Personalize Photos" button right in the website to upload and preview images immediately in your browser!*

### 2. Adding Your Own Song (Optional):
Drop your mp3 file into the `/public` folder (e.g. `public/our-song.mp3`), then in `src/content/config.ts`:
```ts
audio: {
  enabled: true,
  title: "Our Favorite Song",
  artist: "For Jaanu",
  audioUrl: "/our-song.mp3",
}
```
*(If left empty, the built-in gentle piano music synthesizer will play automatically when toggled!)*

---

## 🚀 Running & Deploying

### Run Locally:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build Production Bundle:
```bash
npm run build
```
The ready-to-host static files are in the `dist/` directory.

### Free 1-Click Online Deployment (to send her a link on her phone):
- **Vercel**: Import this project or drag-and-drop the `dist` folder at [vercel.com](https://vercel.com).
- **Netlify**: Drag and drop the `dist` folder at [app.netlify.com/drop](https://app.netlify.com/drop) for an instant live URL.
- **GitHub Pages**: Push this repo and enable Pages from the repository settings.

