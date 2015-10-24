#!/usr/bin/env node

!function (path) {
    'use strict';

    var program = require('commander'),
        jshintOptions = {
            browser: true,
            esnext: false,
            expr: true,
            newcap: false
        };

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
        basedir: path.dirname(module.filename),
        cacheKey: {
            md5: require('crypto').createHash('md5').update(require('fs').readFileSync(module.filename)).digest('base64'),
            nomin: !!program.nomin
        },
        clean: program.clean,
        output: 'publish/',
        mixins: [
            program.livereload && require('publishjs-livereload')()
        ],
        processors: {
            assemble: require('publishjs-assemble'),
            cssmin: program.nomin ? 'noop' : require('publishjs-cssmin'),
            less: require('publishjs-less'),
            jsx: require('publishjs-jsx'),
            pngout: program.nomin ? 'noop' : require('publishjs-pngout'),
            jshint: require('publishjs-jshint'),
            uglify: program.nomin ? 'noop' : require('publishjs-uglify')
        },
        pipes: {
            less: function (pipe, callback) {
                pipe.from('less/')
                    .merge()
                    .less()
                    .cssmin()
                    .save('css/all.css')
                    .run(callback);
            },
            'less.pages': function (pipe, callback) {
                pipe.from('less.pages/')
                    .less()
                    .cssmin()
                    .save('css/')
                    .run(callback);
            },
            'css.lib': function (pipe, callback) {
                pipe.from('css.lib/')
                    .save('css/')
                    .run(callback);
            },
            fonts: function (pipe, callback) {
                pipe.from('fonts/')
                    .save('fonts/')
                    .run(callback);
            },
            html: function (pipe, callback) {
                pipe.from('html/')
                    .assemble()
                    .jsx({ blacklist: ['strict'], modules: 'umd' })
                    .jshint(jshintOptions)
                    .save('./')
                    .run(callback);
            },
            img: function (pipe, callback) {
                pipe.from('img/')
                    .pngout()
                    .save('img/')
                    .run(callback);
            },
            'img.min': function (pipe, callback) {
                pipe.from('img.min/')
                    .save('img/')
                    .run(callback);
            },
            js: function (pipe, callback) {
                pipe.from([
                        // pipe.from('js.redux')
                        //     .jsx({ modules: 'umd', loose: 'all', stage: 0 })
                        //     .merge('1-redux.js'),
                        // pipe.from('js.react-redux')
                        //     .jsx({ modules: 'umd', loose: 'all', stage: 0 })
                        //     .merge('2-react-redux.js')
                        //     .save('2-react-redux.js'),
                        // pipe.from('js.redux-devtools')
                        //     .jsx({ modules: 'umd', loose: 'all', stage: 0 })
                        //     .merge('3-redux-devtools.js'),
                        // pipe.from('js.redux-devtools-dock-monitor')
                        //     .jsx({ modules: 'umd', loose: 'all', stage: 0 })
                        //     .merge('4-redux-devtools-dock-monitor.js'),
                        // pipe.from('js.redux-devtools-log-monitor')
                        //     .jsx({ modules: 'umd', loose: 'all', stage: 0 })
                        //     .merge('5-redux-devtools-log-monitor.js'),
                        pipe.from('js/')
                            .jsx({ blacklist: ['strict'], modules: 'umd' })
                            // .jshint(jshintOptions)
                            .merge('9-others.js')
                    ])
                    .merge()
                    .uglify()
                    .save('js/all.js')
                    .run(callback);
            },
            'js.lib': function (pipe, callback) {
                pipe.from(program.nomin ? 'js.lib/' : 'js.lib.min/')
                    .merge('lib.js')
                    .save('js/lib.js')
                    .run(callback);
            },
            json: function (pipe, callback) {
                pipe.from('json/')
                    .save('json/')
                    .run(callback);
            }
        },
        watch: program.loop
    }).build();
}(
    require('path')
);