# ProfessionalWebsite

Tony Peonio's personal site: **Blueprints to Proteins**. It's plain HTML, CSS, and JavaScript, with no build step and no dependencies.

Live: https://tonypeonio.us/

## Files

| File | What it holds |
|---|---|
| `index.html` | All page content. Each chapter is a `<section>` marked with a `<!-- NAME ===== -->` comment. |
| `assets/css/style.css` | Design tokens (Mines, Oregon, and Rosetta Commons colors) at the top, then layout, sections, and dark mode. |
| `assets/js/main.js` | Optional enhancements: scroll reveals, nav highlighting, the pole-vault progress bar, and the mobile menu. |
| `assets/img/` | Favicon and the social preview image (`og-image.png`, 1200×630). |
| `404.html` | The not-found page. It uses absolute `/ProfessionalWebsite/` paths. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |
| `sitemap.xml` | For Google Search Console. Update `lastmod` when content changes. |

## Editing content

- **Add a project:** copy one `<article class="project reveal">` block inside `#projects`. Use a `tag`, an `h3`, one problem line, and one `result` line. Add `<span class="status">In progress</span>` if it isn't finished.
- **Margin notes** (the dotted-underline pop-ups) look like `<button class="note" type="button" data-note="Note text">underlined words</button>`.
- **Colors** live in `:root` at the top of `style.css`.
- **After editing CSS or JS,** bump the `?v=` number on the `style.css` and `main.js` links in `index.html` so returning visitors get the new files.
- **Timeline:** add or edit `<li>` items in `#timeline`. Add `planned-item` to the class for anything not finished yet.
- Keep the REU section at the level of what was presented publicly at RosettaCon 2026 until the lab clears more detail.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy (GitHub Pages)

1. Push to `main`.
2. In the repo, go to **Settings → Pages → Build and deployment**. Set **Source** to *Deploy from a branch*, and choose **Branch** `main` and folder `/ (root)`.
3. The site publishes at https://tonypeonio.us/ within a minute or two.

The custom domain is set by the `CNAME` file. DNS for `tonypeonio.us` has A/AAAA records at the apex pointing to GitHub Pages, plus a `www` CNAME to `tonypeonio.github.io`. The old https://tonypeonio.github.io/ProfessionalWebsite/ address redirects to the custom domain.

The canonical URL, `og:url`, `og:image`, JSON-LD, and `sitemap.xml` all use `https://tonypeonio.us/`, and `404.html` uses root-relative paths. If the domain ever changes, update those.
