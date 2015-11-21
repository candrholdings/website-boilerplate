# C&R Website Boilerplate

A simple to-do list site which demonstrate latest web technologies and make it easy to create new website projects.

## Libaries included

Before using this repository, please read and accept licenses of corresponding libraries.

* [jQuery](https://jquery.com/)
* [React](https://facebook.github.io/react/)
* [Immutable](http://facebook.github.io/immutable-js/)
* [Redux](https://github.com/rackt/redux)
* [Reselect](https://github.com/rackt/reselect)
* [Bootstrap](https://getbootstrap.com)
* [SystemJS](https://github.com/systemjs/systemjs/)
* [PublishJS](https://github.com/candrholdings/publishjs)
* [Q](https://github.com/kriskowal/q)
* [`window.fetch` polyfill](https://github.com/github/fetch)

## How to use
* Download this repository as ZIP and extract
* Run `npm install`
* Run `node publish -nlr`
  * `-n`, don't uglify (a.k.a. nomin)
  * `-l`, keep watch loop
  * `-r`, enable LiveReload
* Host a web server with root on `/publish`
  * We recommend [detour-proxy](https://npmjs.org/detour-proxy) if you have web APIs
  
## Folder structure
* `/css.lib` keeps all pre-compiled CSS from libaries (e.g. Bootstrap)
* `/fonts` keeps all the fonts
  * Simply copy to `/fonts`, will not translate formats
* `/img` keeps all images prior crushing
* `/img.min` keeps all crushed images
  * This is for reducing time to crush images by doing it manually, prefer to keep original images at `/img.original`
* `/js` keeps all JavaScript code, modularized in SystemJS fashion with path support
  * This will be merged into `/js/all.js`
* `/js.lib` and `/js.lib.min` keeps all JavaScript code from libraries (e.g. jQuery)
  * This will be merged into `/js/lib/js`
  * If `--nomin` is specified, will use `/js.lib`, otherwise, `/js.lib.min`
* `/json` keeps all static JSON files
* `/less` keeps all system-wide LESS stylesheets
  * This will be merged into `/css/all.css`
  * `/less/constants.less` should keep LESS variables only
* `/pages` keeps all LESS, JavaScript, and HTML related to a single page
  * This should only hold resources related to a single page, not across all pages
  * LESS will be merged into `/css/index.html.css`
  * JavaScript will be merged into `/js/index.html.js`
  * HTML will be "assembled" and compiled to `/index.html`
    * Each page should only have one JavaScript code block, it will be modularized with name `main`
  * Subdirectory is not supported
* `/widgets` keeps all LESS and JavaScript related to widgets
  * One JavaScript file per widget 
  * JavaScript will be merged into `/js/all.js`, and modularized as `widgets/name`
  * LESS will be merged into `/css/all.css`
  
## Files to be loaded from browser

PublishJS is designed to output minimal set of files for every page.

Currently, per-page CSS/JS requires separate network calls. We should consider inlining them into HTML page.

### Stylesheets
* `/css/lib.css` contains all stylesheets from libraries, e.g. Bootstrap
* `/css/all.css` contains site-wide stylesheets
* `/css/index.html.css` contains stylesheet only for the current page

### JavaScript code
* `/js/lib.js` contains all JavaScript libraries, e.g. jQuery
* `/js/all.js` contains site-wide JavaScript code
  * Redux models, utilities, widgets, etc
* `/js/index.html.js` contains JavaScript code only for the current page
