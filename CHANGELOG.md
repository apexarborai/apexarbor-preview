# Changelog

## [v2026.04.07.1] - 2026-04-07

### Updated
- Replaced multiple instances of "An industry company" with "An industrial investment company" in the site metadata, Hero section, About section, and Footer.
- Replaced "Americas" with "America" in the Global Presence copy and regional label.

### Baseline
- Preserved the previously verified live baseline at commit `2de263e428c25eb5cb6a223112eaff75b1569527`.
- Kept the local backup tag and branch `backup/live-2026-04-07-1539` before this release update.

## [v5.2] - 2026-06-15

### Added
- Complete site redesign: modular CSS architecture (12 files) replacing inline styles
- Hero carousel with 3 slides (video background, particle effects, gradient overlays)
- Stats bar (3 offices, 24/7 ops, 10K+ GPU, 96% utilization)
- Customer logo scroll section
- Platform, Products, Why Us, Global Presence, Contact sections
- CHANGELOG tracking
- JS modules: main.js, modal.js, nav.js

### Changed
- Fonts: Manrope → Inter + Playfair Display
- Design system: centralized design-system.css with CSS custom properties
- Navigation: transparent overlay → solid with backdrop-filter on scroll
- Images: new hero images, updated asset set

### Removed
- Inline monolithic CSS (migrated to modular files)
- Old fonts directory (now using Google Fonts CDN)
