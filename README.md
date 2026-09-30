# ProfessionalWebsite

Tony Peonio's personal site: **Blueprints to Proteins**. It's plain HTML, CSS, and JavaScript, with no build step and no dependencies.

Live: https://tonypeonio.github.io/ProfessionalWebsite/

## Files

| File | What it holds |
|---|---|
| `index.html` | All page content. Each chapter is a `<section>` marked with a `<!-- NAME ===== -->` comment. |
| `assets/css/style.css` | Design tokens (Mines, Oregon, and Rosetta Commons colors) at the top, then layout, sections, and dark mode. |
| `assets/js/main.js` | Optional enhancements: scroll reveals, nav highlighting, the pole-vault progress bar, and the mobile menu. |
| `assets/img/` | Favicon and the social preview image (`og-image.png`, 1200×630). |
| `404.html` | The not-found page. It uses absolute `/ProfessionalWebsite/` paths. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. |

## Editing content

- **Add a project:** copy one `<article class="project reveal">` block inside `#projects`. Use a `tag`, an `h3`, one problem line, and one `result` line. Add `<span class="status">In progress</span>` if it isn't finished.
- **Margin notes** (the dotted-underline pop-ups) look like `<button class="note" type="button" data-note="Note text">underlined words</button>`.
- **Colors** live in `:root` at the top of `style.css`.
- Keep the REU section at the level of what was presented publicly at RosettaCon 2026 until the lab clears more detail.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy (GitHub Pages)

1. Push to `main`.
2. In the repo, go to **Settings → Pages → Build and deployment**. Set **Source** to *Deploy from a branch*, and choose **Branch** `main` and folder `/ (root)`.
3. The site publishes at https://tonypeonio.github.io/ProfessionalWebsite/ within a minute or two.

All paths in `index.html` are relative, so the site also works on a custom domain later. If you add one, update the `og:url` and `og:image` meta tags and the absolute paths in `404.html`.
