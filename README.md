# Sukriti Love Universe ❤️

An interactive, responsive single-page web app built with love, featuring custom shayari, sweet chocolate surprises, a virtual teddy hug, interactive balloon popping, lucky envelopes, love coupons, a fortune wheel, playlist support, and a mini heart-catching game.

## 🚀 Easy Deployment Guide

This project is fully structured and optimized to be deployed to any static site hosting service. Below are the easiest ways to publish it online:

### Option 1: Vercel (Recommended - Easiest & Fastest)
1. Install the Vercel CLI: `npm i -g vercel` (or run via `npx vercel` without installing).
2. Open your terminal in this project directory and run:
   ```bash
   vercel
   ```
3. Follow the prompts to log in (or create a free account), name your project, and deploy.
4. Run `vercel --prod` to deploy to production and get a live, shareable URL.

*Alternatively, push this repository to GitHub/GitLab/Bitbucket and import it directly into the [Vercel Dashboard](https://vercel.com).*

---

### Option 2: Netlify (Drag & Drop - No Code Required)
1. Run a build/preview locally to make sure everything works.
2. Go to the [Netlify Drop Page](https://app.netlify.com/drop).
3. Drag and drop this folder (`sukriti/` containing `index.html`, `meri_zindagi.mp3`, etc.) directly into the upload box.
4. Netlify will deploy it instantly and provide a link! You can customize the domain name under site settings.

---

### Option 3: GitHub Pages (Free Hosting directly from your Repo)
1. Push this folder to a GitHub repository.
2. In your repository on GitHub, navigate to **Settings** > **Pages** (under the Code and automation section).
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Set the branch to `main` (or your current branch) and the folder to `/ (root)`.
5. Click **Save**. Within a few minutes, your site will be live at `https://<username>.github.io/<repo-name>/`.

---

## 🎵 Background Music
* The background music is configured to load from `meri_zindagi.mp3`.
* Modern browsers block autoplay by default. The code is optimized to wait for the first click/touch interaction anywhere on the screen before starting the track automatically to ensure compatibility.
