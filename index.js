'use strict';

var through = require('through2');
var fs = require('graceful-fs');

module.exports = function fileStats() {
  return through.obj(function (file, enc, cb) {
    var stream = this;

    getStats(file, function (err, res) {
      if (err) {
        stream.emit('error', err);
        return cb();
      }
      stream.push(res);
      return cb();
    });
  });
};

function getStats(file, cb) {
  fs.lstat(file.path, function (err, stat) {
    if (err) return cb(err);

    file.stat = stat;
    return cb(null, file);
  });
}

/**
 * Expose `getStats`
 */

module.exports.getStats = getStats;
