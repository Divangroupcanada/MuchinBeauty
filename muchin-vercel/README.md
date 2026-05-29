# Muchin Beauty Clinic — Vercel Deploy

**Ready to upload. 60 seconds to live.**

---

## 🚀 How to Deploy (3 Steps)

### Option A — Drag & Drop (Easiest)
1. Go to **https://vercel.com/new**
2. Drag this entire folder onto the page
3. Click **Deploy**

Site goes live in ~30 seconds at a `*.vercel.app` URL.

### Option B — Vercel CLI
```bash
npm i -g vercel
cd muchin-vercel
vercel --prod
```

### Option C — GitHub Connect
1. Push this folder to a GitHub repo
2. On vercel.com → New Project → Import repo
3. Auto-deploys on every push

---

## 🌐 Connect muchin.ca Domain

After deploy:
1. Vercel dashboard → Settings → Domains
2. Add `muchin.ca` and `www.muchin.ca`
3. Vercel shows you 2 DNS records to set
4. Update those at your domain registrar
5. SSL auto-provisions in ~5 minutes

---

## 📁 What's In This Folder

| File | What It Does |
|------|-------------|
| `index.html` | The homepage (luxury black + gold) |
| `vercel.json` | Security headers, caching, redirects |
| `robots.txt` | SEO crawler instructions |
| `README.md` | This guide |

---

## 🖼️ About the Photos

Photos currently load from `static.wixstatic.com` (Wix CDN).
- ✅ They display perfectly in the browser
- ✅ Fast loading (Wix's CDN is global)
- ⚠️ Long-term: we should own them on our CDN

When we kick off the full $7,900 rebuild, the build pipeline will:
1. Download all 51 photos from Wix
2. Convert to AVIF/WebP for faster loading
3. Host on Vercel's edge CDN

For NOW — current setup is production-ready and looks beautiful.

---

## ✅ Pre-flight Checklist

Before going live on `muchin.ca`:
- [ ] Test on desktop browser
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Verify booking links open SimplyBook correctly
- [ ] Verify YouTube video plays
- [ ] Verify phone number is tappable on mobile
- [ ] Verify Instagram link works
- [ ] Check Google PageSpeed (target: 95+)

---

© 2026 Muchin Inc. · Proudly designed by **Divan Group**
