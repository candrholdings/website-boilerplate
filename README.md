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