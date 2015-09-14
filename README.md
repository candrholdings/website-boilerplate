# C&R Website Boilerplate

A simple to-do list site which demonstrate latest web technologies and make it easy to create new website projects.

## Technologies

* [jQuery](https://jquery.com/)
* [React](https://facebook.github.io/react/)
* [Immutable](http://facebook.github.io/immutable-js/)
* [Reflux](https://github.com/reflux/refluxjs)
* [Bootstrap](https://getbootstrap.com)
* [PublishJS](https://github.com/candrholdings/publishjs)
* [`window.fetch` polyfill](https://github.com/github/fetch)

## Custom libraries
* Reflux mixins
  * `StateFrom`, link Reflux store properties to React component state
  * `StoreProperty`, create store properties quickly
    * `_list`, private accessor
	* `getList`, public getter
	* `setList`, private setter

## How to use
* Download this repository as ZIP and extract
* Run `npm install`
* Run `node publish -nlr`
  * -n, don't uglify (a.k.a. nomin)
  * -l, keep watch loop
  * -r, enable LiveReload
* Host a web server with root on `/publish`
  * We recommend [detour-proxy](https://npmjs.org/detour-proxy) if you have web APIs