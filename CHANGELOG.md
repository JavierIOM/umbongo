# Changelog

## [2.0.0] - 2026-10-03

### Changed
- Replaced the file-based `_redirects` short link system with a proper TinyURL-style flow: a form on the homepage posts to a Netlify Function (`/api/create`), which generates (or accepts a custom) slug and stores it in Netlify Blobs. A second function (`/:slug`) resolves and 302-redirects on the fly, no commit needed per link.

## [1.0.0] - 2026-10-03

### Added
- Public `images/` folder as a file store, served via raw.githubusercontent.com.
- `umbo.ngo` URL shortener landing page with dark/light theme toggle.
- Netlify `_redirects`-based short link system (add a line, commit, push).
- Favicon and Open Graph image.
