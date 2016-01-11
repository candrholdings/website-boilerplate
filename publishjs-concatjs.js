!function (path, SourceMap, util) {
  'use strict';

  const
    SourceMapConsumer = SourceMap.SourceMapConsumer,
    SourceMapGenerator = SourceMap.SourceMapGenerator,
    SourceNode = SourceMap.SourceNode;

  const
    DEFAULT_OUTPUT_FILENAME = 'concatenated',
    SOURCE_MAP_SUFFIX = '.map';

  module.exports = function (inputs, outputs, args, callback) {
    if (arguments.length === 3) {
      callback = arguments[2];
      args = null;
    }

    args || (args = {});

    if (!args.sourceMappingURL) {
      args.sourceMappingURL = function (filename) {
        return filename;
      };
    } else if (typeof args.sourceMappingURL === 'string') {
      const sourceMappingBaseURL = args.sourceMappingURL;

      args.sourceMappingURL = function (filename) {
        return sourceMappingBaseURL + filename;
      };
    }

    const
      that = this,
      allInputs = inputs.all,
      outputFilename = args.filename || DEFAULT_OUTPUT_FILENAME + path.extname(Object.keys(allInputs)[0]),
      sourceNode = new SourceNode();

    // If there is a single file added, changed, or deleted, we will need to redo the merge
    if (!inputs.deleted.length && !Object.keys(inputs.newOrChanged).length) {
      this.log('No new, changed, or deleted files, reusing cached output');
      return callback(null, outputs);
    }

    let
      numJavaScript = 0,
      numSourceMaps = 0;

    Object.keys(allInputs).forEach(filename => {
      let file = allInputs[filename];

      if (isJavaScript(filename)) {
        numJavaScript++;

        const
          sourceMap = allInputs[filename + SOURCE_MAP_SUFFIX],
          content = file.toString('utf8');

        if (sourceMap) {
          sourceNode.add(
            SourceNode.fromStringWithSourceMap(
              content,
              new SourceMapConsumer(
                JSON.parse(
                  sourceMap.toString()
                )
              )
            )
          );
        } else {
          content.split('\n').forEach((line, lineIndex) => {
            sourceNode.add(new SourceNode(lineIndex + 1, 0, filename, line + '\n'));
          });

          sourceNode.setSourceContent(filename, content);
        }
      }
    });

    sourceNode.add('//# sourceMappingURL=' + args.sourceMappingURL(outputFilename) + '.map');

    const codeMap =
      sourceNode.toStringWithSourceMap({
        filename: outputFilename,
        sourceRoot: args.sourceRoot || ''
      });

    outputs[outputFilename] = new Buffer(codeMap.code);
    outputs[outputFilename + SOURCE_MAP_SUFFIX] = new Buffer(JSON.stringify(codeMap.map.toJSON(), null, 2));

    that.log(`Concatenated ${numJavaScript} file(s) with ${numSourceMaps} source map(s)`);

    callback(null, outputs);
  };

  function isJavaScript(filename) {
    return /\.js$/i.test(filename);
  }
}(
  require('path'),
  require('source-map'),
  require('publishjs').util
);
