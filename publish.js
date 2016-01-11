#!/usr/bin/env node

!function (path) {
  'use strict';

  const
    program = require('commander'),
    babelOptions = {
      modules: 'system',
      moduleIds: true,
      sourceMaps: true
    },
    cleanCSSOptions = {
      sourceMap: true,
      sourceMapInlineSources: true
    },
    jshintOptions = {
      browser: true,
      esnext: false,
      expr: true,
      newcap: false
    },
    basedir = path.dirname(module.filename);

  program
    .version('0.0.1')
    .option('-f, --clean', 'Force a clean build, will also clean build on every watch loop')
    .option('-l, --loop', 'After build, watch for new changes and restart the build')
    .option('-n, --nomin', 'Do not minify CSS, JS and PNG')
    .option('-r, --livereload', 'Enable LiveReload server, implies --loop')
    .option('--nolint', 'Do not run JSHint')
    .parse(process.argv);

  program.loop = program.livereload || program.loop;

  require('publishjs')({
    basedir: basedir,
    cacheKey: {
      md5: require('crypto').createHash('md5').update(require('fs').readFileSync(module.filename)).digest('base64'),
      nomin: !!program.nomin
    },
    clean: program.clean,
    output: path.resolve(basedir, 'publish/'),
    mixins: [
      program.livereload && require('publishjs-livereload')()
    ],
    processors: {
      assemble: require('publishjs-assemble'),
      cleanCSS: program.nomin ? 'noop' : require('./publishjs-clean-css'),
      concatJS: require('./publishjs-concatjs'),
      cssmin: program.nomin ? 'noop' : require('publishjs-cssmin'),
      less: require('publishjs-less'),
      jsx: require('publishjs-jsx'),
      pngout: program.nomin ? 'noop' : require('publishjs-pngout'),
      jshint: require('publishjs-jshint'),
      rename: require('./publishjs-rename'),
      uglify: program.nomin ? 'noop' : require('publishjs-uglify')
    },
    pipes: {
      less: function (pipe, callback) {
        pipe
          .from([
            pipe
              .from('less/'),
            pipe
              .from('widgets/')
              .rename(filename => /\.(le|c)ss$/.test(filename) ? filename : 0)
          ])
          .merge('all.css')
          .less()
          .cleanCSS(cleanCSSOptions)
          .save('css/')
          .run(callback);
      },
      'css.lib': function (pipe, callback) {
        pipe
          .from('css.lib/')
          .save('css/')
          .run(callback);
      },
      fonts: function (pipe, callback) {
        pipe
          .from('fonts/')
          .save('fonts/')
          .run(callback);
      },
      img: function (pipe, callback) {
        pipe
          .from('img/')
          .pngout()
          .save('img/')
          .run(callback);
      },
      'img.min': function (pipe, callback) {
        pipe
          .from('img.min/')
          .save('img/')
          .run(callback);
      },
      js: function (pipe, callback) {
        pipe
          .from([
            pipe
              .from('js/')
              .jsx(babelOptions),
            pipe
              .from('widgets/')
              .rename(filename => {
                if (/\.js$/.test(filename)) {
                  return 'widgets/' + filename.split('/').pop();
                } else {
                  return 0;
                }
              })
              .jsx(babelOptions)
          ])
          .jshint(jshintOptions)
          .concatJS({ filename: 'all.js' })
          .uglify()
          .save('js/')
          .run(callback);
      },
      'js.lib': function (pipe, callback) {
        pipe
          .from(program.nomin ? 'js.lib/' : 'js.lib.min/')
          .merge()
          .save('js/lib.js')
          .run(callback);
      },
      json: function (pipe, callback) {
        pipe
          .from('json/')
          .save('json/')
          .run(callback);
      },
      pages: function (pipe, callback) {
        pipe.from(['index'].map(name => {
          return (
            pipe.from([
              pipe
                .from(`pages/${name}/js/`)
                .jsx(Object.assign({
                  sourceFileName: filename => `../pages/${name}/js/${filename}`
                }, babelOptions))
                .jshint(jshintOptions)
                .concatJS({
                  filename: `${name}.html.js`
                })
                .uglify()
                .save('js/'),
              pipe
                .from([
                  pipe
                    .from('less/constants.less')
                    .merge('1-constants.less'),
                  pipe
                    .from(`pages/${name}/less/`)
                    .merge('2-pages.less')
                ])
                .merge(`${name}.html.css`)
                .less()
                .cleanCSS(cleanCSSOptions)
                .save(`css/`)
              ])
          );
        })).run(callback);
      },
      'pages.html': function (pipe, callback) {
        pipe
          .from('pages/')
          .rename(filename => {
            if (/^__layout\//.test(filename)) {
              return filename;
            } else if (/\.html$/.test(filename)) {
              return filename.split('/').pop();
            } else {
              return false;
            }
          })
          .assemble()
          .jsx(Object.assign({ moduleId: 'main' }, babelOptions))
          .less()
          .cleanCSS(cleanCSSOptions)
          .save('./')
          .run(callback);
      }
    },
    watch: program.loop
  }).build();
}(
  require('path')
);