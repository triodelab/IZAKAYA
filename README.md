# Izakaya Oslo redesign

Next.js App Router website, with self-hosted Bodoni Moda, a red sun motif, responsive editorial layout, Norwegian/English switching with saved preference, native accessible FAQ disclosures, an in-page menu viewer, an embedded Google Maps dialog, and links to the venue's social accounts.

## Run

```sh
npm install
npm run dev
```

`npm run build` creates the production build in `.next/`; `npm start` serves it. Development and production use port 5174. `npm run typecheck` checks TypeScript. This project has not replaced or deployed to izakayaoslo.com.

## Sources and photography

Venue details and menu URLs: https://izakayaoslo.com/

Instagram blocked direct access and indexed searches did not expose usable originals. The current photos are temporary actual-venue images from the VisitOSLO Izakaya listing, **not Instagram imports**:
https://www.visitoslo.com/no/servering/izakaya

- `public/images/izakaya-plate.jpg`: gyoza, image ID 3El1i3HlLZiQcEsBVBzU1LBK5jI
- `public/images/izakaya-bar.jpg`: interior, image ID 3El1huIAoFF6vsqBcCwvvjCRqZI

Replace those two files with approved Instagram originals before public launch. Public availability does not establish image reuse permission. Unused food image retained as an optional alternative.

## Design and verification

Image Gen concepts: `design/hero-concept.png`, `design/details-concept.png`. Generated with the built-in tool, briefing the ALTA reference's large high-contrast serif, asymmetric photography, generous white space, Japanese red sun, understated humour, and native text/links. These are working concepts, not user-approved final designs.

Browser plugin was unavailable; verified using local Playwright Chromium at 1536×1024 (concept native size), 390×844, and intermediate widths. Screenshots were visually inspected alongside the supplied reference and generated concepts.

Comparison ledger:

- Palette: true white, near-black type, flat red sun; no photo overlays or gradients.
- Typography: self-hosted high-contrast Bodoni wordmark and headings; mono navigation and practical details. Wordmark widened after screenshot review.
- Layout: retained asymmetric opening, oversized identity, open whitespace, rectangular photos, fine underline links, and unboxed FAQs.
- Copy: hero/nav/CTAs retain briefed concept copy. Intentional additions: image captions, fuller location paragraph, take-away and lost-property/event FAQs, Instagram line, footer links. These preserve information from the existing site and the requested playful tone.
- Photography: intentional substitution of actual-venue VisitOSLO images for illustrative concept photography. Instagram originals remain outstanding.
- Responsive: mobile stacks content, retains the full navigation and language controls, and adjusts heading sizes; no horizontal overflow at checked widths.

Functional checks: title and meaningful page content, no runtime errors, images loaded, FAQ opens, EN updates content, reload preserves EN, NO restores Norwegian. Local production build passes. External social account contents and PDF contents were not browser-verified. No reservation form was added because the venue explicitly does not take reservations.

## In-page viewers

Food and drink buttons, including the header navigation, open a full-screen native dialog inspired by the Chez Colin menu viewer. It supports menu tabs, previous/next switching, keyboard tab navigation, zoom/pan, Escape dismissal, focus restoration, and background scroll locking. Food contains one page; drinks contains both original pages. Menus are JPEG previews rendered from the current venue PDFs, not embedded PDF viewers, and remain in their original Norwegian when interface language changes.

Sources retrieved 28 October 2026:

- https://izakayaoslo.com/meny/mat.pdf → `public/images/menus/food-1.jpg`
- https://izakayaoslo.com/meny/drikke.pdf → `public/images/menus/drinks-1.jpg`, `drinks-2.jpg`
- https://izakayaoslo.com/izalogo.png → original logo reused unchanged in viewer and footer.

To update menus, re-render all source pages with `pdftoppm -jpeg -r 140 -jpegopt quality=90` and update the page lists in `src/components/viewers.tsx` if the page count changes.

All location controls open the same on-page Google Maps dialog, with an optional external directions link. The iframe is created only when the map is first opened. The about section uses `min-height: 100svh` so it fills the viewport and can expand when content or accessibility settings need more room.

Latest QA: Playwright Chromium (Browser plugin unavailable), desktop 1417×942 and mobile 390×844; no page errors, no horizontal overflow (also checked at 768px). Verified menu opening from nav and both hero buttons, both drink pages, zoom state, previous/next wrapping, keyboard menu switching, EN labels, close/Escape and focus restoration. Embedded map loaded the correct venue and was visually inspected. About height measured exactly 942px on desktop and 844px on mobile. Screenshots inspected for menu, mobile menu, map, mobile about, and original-logo footer. Fixed display typography intercepting header clicks by placing header controls above the masthead. Production build passes.

## Next.js and platform polish

Migrated to Next.js 16 App Router with TypeScript and React 19. `src/app/layout.tsx` owns metadata, viewport settings, and shared styles. `src/components/site.tsx`, `language.tsx`, and `viewers.tsx` own the UI, persisted language, and native dialog controls respectively. The homepage is prerendered; no backend or extra service is needed.

The four requested design skills informed these changes: hover effects now require a fine hover-capable pointer; coarse-pointer controls have 44px touch targets; controls use touch-action manipulation and disable control-label selection; safe-area padding protects page and viewer chrome; theme-color stays white to match the intentionally light design in both OS schemes; reading text stays selectable; reduced-motion and keyboard paths avoid movement. The document keeps normal page overscroll; nested menu scrolling remains contained. No glass, spring library, parallax, or ornamental motion was added.

Physical-device verification is still needed for iOS/Android tap latency, sticky hover, notches, URL-bar resizing, and rubber-banding. Desktop resizing is not hardware validation.
