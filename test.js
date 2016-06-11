'use strict';

require('mocha');
var through = require('through2');
var assert = require('assert');
var stats = require('./');

function streamify(fp) {
  var stream = through.obj();
  stream.write({path: fp});
  stream.end();
  return stream;
}

describe('add a `stat` property to the given object', function(cb) {
  it('should return a stream:', function() {
    var files = [];
    streamify('README.md')
      .pipe(stats())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert.equal(typeof files[0].stat, 'object');
        assert(files[0].stat.isFile());
        cb();
      });
  });

  it('should expose `stat`:', function(cb) {
    stats.stat({path: 'README.md'}, function(err, file) {
      if (err) return cb(err);
      assert.equal(typeof file.stat, 'object');
      assert(file.stat.isFile());
      cb();
    });
  });

  it('should expose `statSync`:', function() {
    var file = {path: 'README.md'};
    stats.statSync(file);
    assert.equal(typeof file.stat, 'object');
    assert(file.stat.isFile());
  });

  it('should expose `lstatSync`:', function() {
    var file = {path: 'README.md'};
    stats.lstatSync(file);
    assert.equal(typeof file.lstat, 'object');
    assert(file.lstat.isFile());
  });
});
