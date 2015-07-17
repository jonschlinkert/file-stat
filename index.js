'use strict';

var fs = require('graceful-fs');
var through = require('through2');

/**
 * Add the `stat` property to a `file` object.
 *
 * @return {Object} File object.
 */

module.exports = function fileStats() {
  return through.obj(function (file, enc, cb) {
    var stream = this;

    async(file, function (err, res) {
      if (err) {
        stream.emit('error', err);
        return cb(err);
      }
      stream.push(res);
      return cb();
    });
  });
};

/**
 * Async method for getting `file.stat`.
 *
 * @param  {Object} `file`
 * @param  {Function} `cb`
 * @return {Object}
 */

function async(file, cb) {
  if (typeof file !== 'object') {
    throw new TypeError('file-stat async expects `file` to be an object.');
  }

  fs.lstat(file.path, function (err, stat) {
    if (err) return cb(err);

    file.stat = stat;
    return cb(null, file);
  });
}

/**
 * Sync method for getting `file.contents`.
 *
 * @param  {Object} `file`
 * @return {Object}
 */

function sync(file) {
  if (typeof file !== 'object') {
    throw new TypeError('file-contents sync expects `file` to be an object.');
  }

  if (typeof file.stat === 'undefined') {
    file.stat = fs.statSync(file.path);
  }

  return file
}

/**
 * Expose `async` method
 */

module.exports.async = async;

/**
 * Expose `sync` method
 */

module.exports.sync = sync;
