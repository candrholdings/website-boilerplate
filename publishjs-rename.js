!function (path, util) {
    'use strict';

    module.exports = function (inputs, outputs, args, callback) {
        if (arguments.length === 3) {
            callback = arguments[2];
            args = null;
        }

        var handler = args || function (filename) { return filename; },
            that = this;

        inputs.deleted.forEach(function (filename) {
            outputs[filename] = null;
        });

        inputs = inputs.all;

        var numFileRenamed = 0;

        Object.keys(inputs).forEach(filename => {
            var newFilename = handler(filename);

            if (newFilename) {
                numFileRenamed++;
                outputs[newFilename] = inputs[filename];
            }
        });

        that.log(`Renamed ${numFileRenamed} file(s)`);

        callback(null, outputs);
    };
}(
    require('path'),
    require('publishjs').util
);