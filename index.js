'use strict';

var utils = require('./utils');

module.exports = function fileStats() {
  return utils.through.obj(function(file, enc, cb) {
    lstat(file, function(err, res) {
      if (err) {
        cb(err);
        return;
      }
      cb(null, res);
    });
  });
};

/**
 * Asynchronously add a `stat` property from `fs.stat` to the given file object.
 *
 * ```js
 * var File = require('vinyl');
 * var stats = require('{%= name %}');
 * stats.stat(new File({path: 'README.md'}), function(err, file) {
 *   console.log(file.stat.isFile());
 *   //=> true
 * });
 * ```
 * @name .stat
 * @param {Object} `file` File object
 * @param {Function} `cb`
 * @api public
 */

function stat(file, cb) {
  utils.fs.stat(file.path, function(err, stat) {
    if (err) {
      cb(err);
      return;
    }
    file.stat = stat;
    cb(null, file);
  });
}

/**
 * Asynchronously add a `lstat` property from `fs.lstat` to the given file object.
 *
 * ```js
 * var File = require('vinyl');
 * var stats = require('{%= name %}');
 * stats.lstat(new File({path: 'README.md'}), function(err, file) {
 *   console.log(file.lstat.isFile());
 *   //=> true
 * });
 * ```
 * @name .lstat
 * @param {Object} `file` File object
 * @param {Function} `cb`
 * @api public
 */

function lstat(file, cb) {
  utils.fs.lstat(file.path, function(err, stat) {
    if (err) {
      cb(err);
      return;
    }
    file.stat = stat;
    cb(null, file);
  });
}

/**
 * Synchronously add a `stat` property from `fs.stat` to the given file object.
 *
 * ```js
 * var File = require('vinyl');
 * var stats = require('{%= name %}');
 * var file = new File({path: 'README.md'});
 * stats.statSync(file);
 * console.log(file.stat.isFile());
 * //=> true
 * ```
 * @name .statSync
 * @param {Object} `file` File object
 * @param {Function} `cb`
 * @api public
 */

function statSync(file) {
  var stat;
  Object.defineProperty(file, 'stat', {
    configurable: true,
    set: function(val) {
      stat = val;
    },
    get: function() {
      return stat || (stat = utils.fs.statSync(this.path));
    }
  });
}

/**
 * Synchronously add a `lstat` property from `fs.lstat` to the given file object.
 *
 * ```js
 * var File = require('vinyl');
 * var stats = require('{%= name %}');
 * var file = new File({path: 'README.md'});
 * stats.statSync(file);
 * console.log(file.lstat.isFile());
 * //=> true
 * ```
 * @name .lstatSync
 * @param {Object} `file` File object
 * @param {Function} `cb`
 * @api public
 */

function lstatSync(file) {
  var lstat;
  Object.defineProperty(file, 'lstat', {
    configurable: true,
    set: function(val) {
      lstat = val;
    },
    get: function() {
      return lstat || (lstat = utils.fs.lstatSync(this.path));
    }
  });
}

/**
 * Expose `stat`
 */

module.exports.stat = stat;
module.exports.lstatSync = lstatSync;
module.exports.statSync = statSync;
