---
layout: page
title: CHANGELOG
description: List of changes
robots: noindex
permalink: /changelog/
---
<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `_redirects`, particularly `/contact/` -> `https://contact.kernvalley.us`

## [v1.0.8] - 2020-12-13

### Added
- Implement ads via `<ad-block>`, along with all related changes
- `<button is="app-list">`
- Theme handling via `cookieStore`

### Changed
- Update to Leaflet [1.7.1](https://leafletjs.com/2020/09/04/leaflet-1.7.1.html)
- Move install button to `<nav>`
- Use component via `_includes/` for `<weather-current>`

### Removed
- Git stored copy of SVG sprites (`icons.svg`)

## [v1.0.7] - 2020-09-06

### Added
- Google Analytics
- Track external link clicks with GA

### Changed
- Misc. config and template updates
- Update components/`_includes/`
- Improve preloading

### Fixed
- Disable bash linting for issue with `.rvmrc`

## [v1.0.6] - 2020-08-08

### Changed
- Dynanmically load polyfill.io & Google Anayltics
- Update various components / templates / `_includes/`

## [v1.0.5] - 2020-07-18

### Updated
- Icons now work as "maskable"
- Import footer with `<github-user>` for branding
- Update [`.editorconfig`](https://editorconfig.org/) file with indent style and width

## [v1.0.4] - 2020-07-15

### Updated
- Components now use external stylesheets
- Enable project-wide linting
- Block `unsafe-inline` styles in CSP

### [v1.0.3] - 2020-06-29

### Added
- Dependabot now watches Git submodules

## [v1.0.2] - 2020-06-28

### Fixed
- Set `og:image` correctly [#15](https://github.com/kernvalley/news.kernvalley.us/ussues/16)

## [v1.0.1] - 2020-06-25

### Added
- Dependabot config
- Changelog
## [v1.0.0] - 2020-06-20
Initial Version Release
<!-- markdownlint-restore -->
