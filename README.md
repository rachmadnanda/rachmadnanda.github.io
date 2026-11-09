# rachmadnanda.github.io

Personal site for **Rachmad Febriananda** — applied computer science student at Politeknik Negeri Malang.

Hand-written HTML, CSS, and a small amount of JavaScript. No framework, no build step, no dependencies.

## Structure

```
index.html              all content
assets/css/style.css    styles, including light and dark themes
assets/js/main.js       theme toggle, mobile nav, scroll reveal, active section
assets/img/favicon.svg  favicon
```

## Run locally

Any static server works:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Editing content

Everything lives in `index.html`, in reading order: hero, work, experience,
skills, certifications, contact. Sections are marked with `<!-- -->` free
semantic blocks, so search for the heading text (for example `Selected Work`)
to jump straight to the part you want.

- **Projects** — each `<article class="work">` is one row. The `.work__index`
  number is manual, so renumber when you reorder.
- **Certifications** — each `<details class="cert">` is one issuer. Add titles
  inside its `.cert__list`, and update the `.cert__count` on the summary row.
- **Colors** — the palette is defined once as custom properties at the top of
  `style.css`, under `:root` (light) and `html[data-theme="dark"]` (dark).

## Deploy

This repo is served as a GitHub Pages **user site**, so the repository must be
named `rachmadnanda.github.io`.

1. Push to `main`.
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. The site goes live at <https://rachmadnanda.github.io>.

If the repository is still named `AboutMe`, rename it first, then update the
remote:

```bash
git remote set-url origin https://github.com/rachmadnanda/rachmadnanda.github.io.git
```

## Notes

- Typography: Inter for text, JetBrains Mono for labels and metadata, loaded
  from Google Fonts with `display=swap`.
- Dark mode follows `prefers-color-scheme` until the visitor uses the toggle,
  which stores the choice in `localStorage`.
- Motion is disabled under `prefers-reduced-motion: reduce`.
- A print stylesheet collapses the certification lists so the page prints
  reasonably as a CV.
