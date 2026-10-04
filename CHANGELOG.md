# Changelog

## [2.3.0] - 2026-10-04

### Added
- Themed 404 page (`404.html`) for unmatched static routes, and matching "short link not found" / "short link expired" pages from the redirect function. All three auto-redirect to `/` after 10 seconds, with a live countdown and a manual link as a fallback.

## [2.2.0] - 2026-10-04

### Added
- Short links now auto-expire after 14 days. Checked lazily on redirect (no cron job); an expired link is deleted on first visit after expiry and returns 404. Noted on the homepage.

## [2.1.1] - 2026-10-04

### Fixed
- Short links could 404 immediately after creation. Netlify Blobs defaults to eventual consistency, so a redirect lookup could hit an edge node that hadn't seen the write yet. Both functions now use `consistency: "strong"` on the blob store.

## [2.1.0] - 2026-10-03

### Changed
- Reworked the site to a tropical "umbongo" brand: gradient background, fruit garnish, "they drink it in the congo" tagline, new favicon/OG image to match. Shortener form and function logic unchanged.

## [2.0.0] - 2026-10-03

### Changed
- Replaced the file-based `_redirects` short link system with a proper TinyURL-style flow: a form on the homepage posts to a Netlify Function (`/api/create`), which generates (or accepts a custom) slug and stores it in Netlify Blobs. A second function (`/:slug`) resolves and 302-redirects on the fly, no commit needed per link.

## [1.0.0] - 2026-10-03

### Added
- Public `images/` folder as a file store, served via raw.githubusercontent.com.
- `umbo.ngo` URL shortener landing page with dark/light theme toggle.
- Netlify `_redirects`-based short link system (add a line, commit, push).
- Favicon and Open Graph image.
