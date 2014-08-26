var sweet = require('sweet.js');
var gutil = require('gulp-util');
var applySourceMap = require('vinyl-sourcemaps-apply');
var es = require('event-stream');
var merge = require('merge');

module.exports = function(opts) {

  if(opts.modules){
    opts.modules = opts.modules.map(function(mod) {
      return sweet.loadNodeModule(process.cwd(), mod);
    });
  }

  if(opts.readtables){
    opts.readtables.forEach(function(mod) {
      sweet.setReadtable(mod);
    });
  }

  return es.through(function(file) {
    if(file.isNull()) {
      return this.emit('data', file);
    }
    if(file.isStream()) {
      return this.emit(
        'error',
        new Error('gulp-sweetjs: Streaming not supported')
      );
    }

    var dest = gutil.replaceExtension(file.path, '.js');
    opts = merge({
      sourceMap: !!file.sourceMap,
      filename: file.path,
    }, opts);

    try {
      var res = sweet.compile(file.contents.toString('utf8'), opts);
    }
    catch(err) {
      console.log('error');
      return this.emit('error', err);
    }

    if(res.sourceMap) {
      applySourceMap(file, res.sourceMap);
    }

    file.contents = new Buffer(res.code);
    file.path = dest;
    this.emit('data', file);
  });
};
