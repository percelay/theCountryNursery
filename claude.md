# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Source Material & Content Structure
- **Ingest Source Copy:** Read all provided source material (TXT, PDF, or prompt text).
- **Structure the Content:** Logically organize the provided text into clear hierarchical sections (e.g., Hero, About, Services, Testimonials). 
- **Verbiage Rules:** Use the exact language from the source material. You may slightly change the verbiage **only where absolutely necessary** to fit the UI layout or improve flow. Do not invent content, rewrite core messaging, or add fluff. Preserve the tone and authority of the original text.
- **Mandatory Section:** You must **ALWAYS** add a Contact Form section to the website, regardless of whether it was explicitly in the source material.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color accurately. Swap in placeholder content (images via `https://placehold.co/`, generic copy) or use the processed Source Material. Do not add structural elements not present in the reference.
- If no reference image: design from scratch with high craft using the design guardrails below.
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Brand Assets & Theme
- Always check the `brand_assets/` folder before designing. If logos or color palettes exist, use those exact values.
- **Global Default Aesthetic (If no brand assets exist):** Default to a clean, modern, professional aesthetic. You have creative freedom to choose an appropriate color palette and typographic scale, provided the design maintains high contrast, legibility, and a cohesive look.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool to analyze the image directly.
- Check: spacing/padding, font size/weight/line-height, colors, alignment, border-radius, shadows, image sizing.

## Output Defaults
- Single `index.html` file, all styles inline, unless the user explicitly requests a specific framework (e.g., Next.js/React).
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Design Guardrails
- **Interactive states:** Every clickable element needs clear hover, focus-visible, and active states. Tasteful transitions are encouraged.
- **Images & Legibility:** Ensure any text overlaid on images is completely legible. Use gradient overlays, scrims, or text shadows as necessary. Hero sections should feature a full photo with a legible text overlay.
- **Spacing & Depth:** Use consistent spacing tokens and a logical shadow/z-index hierarchy to create a structured layout. 
- **Typography:** Ensure a strong typographic hierarchy. Aim for readable line heights (e.g., generous line-height on body text, tighter tracking on large headings).

## Hard Rules
- Always include a Contact Form.
- Do not rewrite or summarize the source messaging; use exact language and tweak only for UI fit.
- Do not add sections, features, or content not in the reference or source material (except the Contact Form).
- Do not stop after one screenshot pass when working from a reference.