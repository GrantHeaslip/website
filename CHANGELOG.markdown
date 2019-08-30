# website changelog

## 1.1.0-rc.1 [2019-08-30]

### Additions

* Added basic dark mode support via the [`prefers-color-scheme` media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) and [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

### Changes

* Ported to TypeScript and added typings.
* Rewrote views using server-rendered React components.
* Moved all CSS into components using [Linaria](https://github.com/callstack/linaria).
* Replaced Gulp build script with Webpack.
* Switched to Yarn for package management.
* Updated packages.

### Fixes

* 404 pages now have a “404 — Grant Heaslip” document title. Previously they had the same title as the homepage.

## 1.0.5 [2018-07-26]

### Changes
* Changed email address to g@hslp.ca (was grant@heaslip.me).
* Changed URL to https://g.hslp.ca/ (was https://grant.heaslip.me/).

## 1.0.4 [2018-07-15]

### Changes
* Updated dependencies.

## 1.0.3 [2018-04-16]

Contrived release to test deployment.

## 1.0.2 [2018-04-16]

### Changes
* Increased specified Node.js version from ~9.3.0 to ~9.11.1.

## 1.0.1 [2018-04-15]

### Improvements
* Requests to `*/index.html` now redirect to `*/` ([#1](https://github.com/GrantHeaslip/website/issues/1)).

### Changes
* Updated packages.

### Fixes
* Requests for non-existent static files now return an error view rather than a raw JSON error object.

## 1.0.0 [2018-01-09]

First release.
