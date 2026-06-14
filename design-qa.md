**Findings**
- [P2] Source visual target unavailable for formal design-qa comparison
  Location: landing page, `/`.
  Evidence: source visual truth path is not provided; rendered implementation screenshots were captured at `/Users/mathieuchambaud/Documents/Perso-Projects/d-chambaud/.qa-screenshots/landing-desktop.png` and `/Users/mathieuchambaud/Documents/Perso-Projects/d-chambaud/.qa-screenshots/landing-mobile-390.png`.
  Impact: the Product Design design-qa workflow cannot perform the required side-by-side fidelity comparison against a Figma frame, screenshot, mockup, or other visual source.
  Fix: provide a source visual target if exact visual fidelity must be certified. The implementation itself was reviewed against the user's stated requirements for heading hierarchy, text contrast, SEO, image ratios, and mobile layout.

**Open Questions**
- No source mockup was supplied. I treated the existing landing page plus the user's requested corrections as the implementation target.

**Implementation Checklist**
- Replaced section eyebrow labels with semantic `h2` headings.
- Changed the large section catchphrases from `h2` to `h3` so the page keeps one `h1` and a cleaner hierarchy.
- Increased contrast and weight for subdued body copy, metadata labels, CTA links, testimonial metadata, pricing details, and form helper text.
- Added mobile-specific heading sizing and image-ratio safeguards in image-heavy sections.
- Removed the footer link to `/mentions-legales`.
- Corrected `robots.ts` sitemap URL to `https://david-chambaud.fr/sitemap.xml`.
- Shortened the homepage metadata title and description for on-page SEO.
- Aligned visible stats with the existing "since 2008" positioning.

**Follow-up Polish**
- If a Figma frame or approved screenshot is provided, rerun design-qa as a true visual comparison and classify any remaining typography, spacing, image-crop, and color-token differences.

source visual truth path: not provided
implementation screenshot path: `/Users/mathieuchambaud/Documents/Perso-Projects/d-chambaud/.qa-screenshots/landing-desktop.png`, `/Users/mathieuchambaud/Documents/Perso-Projects/d-chambaud/.qa-screenshots/landing-mobile-390.png`
viewport: desktop 1440x1400 full page; mobile 390x1200 full page; additional section screenshots in `/Users/mathieuchambaud/Documents/Perso-Projects/d-chambaud/.qa-screenshots/`
state: public landing page, initial/default state, local dev server `http://localhost:3000`
full-view comparison evidence: implementation screenshots captured; no source visual target available for side-by-side comparison
focused region comparison evidence: not applicable because the blocker is the missing source visual target; mobile section screenshots were reviewed manually for heading scale, text visibility, image ratios, and overflow
patches made since the previous QA pass: semantic heading hierarchy, contrast upgrades, mobile heading/image safeguards, footer link removal, SEO metadata/robots corrections, stats copy alignment
final result: blocked
