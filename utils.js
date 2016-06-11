'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('graceful-fs', 'fs');
require('through2', 'through');

/**
 * Reset require
 */

require = fn;

/**
 * Expose utils
 */

module.exports = utils;
