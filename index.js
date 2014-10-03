'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var esperanto = require('esperanto');

module.exports = function (options) {
  options = options || {};

  return through.obj(function (file, enc, cb) {

    if (file.isNull()) {

      cb(null, file);
      return;
    }

    if (file.isStream()) {

      cb(new gutil.PluginError('gulp-esperanto', 'Streaming not supported'));
      return;
    }

    try {

      var res = esperanto.toCjs(file.contents.toString())

      file.contents = new Buffer(res);

      this.push(file);
    }
    catch (err) {

      this.emit('error', new gutil.PluginError('gulp-esnext', err, {fileName: file.path}));
    }

    cb();
  });
};