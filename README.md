# Prachi's portfolio

A responsive portfolio based on Prachi's resume, built with React, Vite, Motion, and Three.js. Includes a locally rendered interactive 3D sculpture, selected project details, keyboard-accessible skill tabs, experience, contact links, and an updated downloadable resume.

The design uses midnight, lavender, and warm ivory with a personal introduction, iridescent 3D artwork, alternating project showcases, and a dedicated section for approach and craft.

Motion includes a staggered name entrance, a drawn underline, scroll-linked 3D movement, magnetic primary links, pointer-responsive project previews, animated statistics, skill transitions, and a subtle cursor glow. Decorative motion respects reduced-motion preferences, and pointer effects are disabled for touch input.

## Run locally

Requires a current Node.js LTS release compatible with the Vite version in `package.json`.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build and preview

```sh
npm run build
npm run preview
```

The deployable website is generated in `dist/`. For Vercel, select the Vite framework preset, use `npm run build`, and set the output directory to `dist`. No backend or secret environment variables are required.

## Update the content

- `src/App.jsx`: biography, project descriptions, skills, experience, and contact details.
- `src/styles.css`: layout, colours, typography, and responsive behaviour.
- `src/Sculpture.jsx`: interactive hero sculpture. It pauses offscreen and respects reduced-motion preferences; a CSS sculpture remains available when WebGL is unsupported.
- `src/Animation.jsx`: reusable motion components for the introduction, links, project previews, statistics, and cursor glow.
- `src/ProjectPreviews.jsx`: custom interface concepts. The previews contain illustrative data and are labelled accordingly; they are not screenshots of the original applications.
- `src/project-previews.css`: the small interface elements inside those project concepts.
- `public/Prachi_Resume.pdf`: the exact supplied resume used for downloads.
- `resume/Prachi_Resume.html`: an optional printable resume source, updated from the supplied resume text. Running `npm.cmd run build:resume` (requires Google Chrome) regenerates `public/Prachi_Resume.pdf`, so only use it when you intend to replace the supplied PDF. The generator keeps the previous resume in `.artifacts/resume-update/Prachi_Resume.original.pdf`.

Fonts are bundled locally. No stock photography, external image requests, tracking scripts, or form backend is used. Contact actions open an email client or copy the address; no messages are sent automatically. The Skyline website URL and profile links come from the resume. A live URL for the customer support project was not supplied, so its detail panel links to an email enquiry.

## Browser checks

With the development server running and Google Chrome installed:

```sh
npm run test:browser
```

The checks cover responsive widths, project dialogs and focus restoration, keyboard-operated skills, experience disclosures, mobile navigation, email copying, resume downloads, browser errors, and automated WCAG checks. Screenshots and reports are written to the ignored `.artifacts/` directory. Override `PORTFOLIO_URL` to check a production preview.
