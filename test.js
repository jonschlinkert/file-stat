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

describe('add a `stat` property to the given object', function() {
  it('should return a stream:', function(cb) {
    var files = [];
    streamify('README.md')
      .pipe(stats())
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        assert(files[0].stat);
        assert(files[0].stat.isFile());

        assert(files[0].lstat);
        assert(files[0].lstat.isFile());
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

  it('should handle stat ENOENT errors', function(cb) {
    stats.stat({path: 'fosudfsoofsofsoiso'}, function(err, file) {
      if (err) return cb(err);
      assert(file);
      assert.equal(file.stat, null);
      cb();
    });
  });

  it('should expose `lstat`:', function(cb) {
    stats.lstat({path: 'README.md'}, function(err, file) {
      if (err) return cb(err);
      assert.equal(typeof file.lstat, 'object');
      assert(file.lstat.isFile());
      cb();
    });
  });

  it('should handle lstat ENOENT errors', function(cb) {
    stats.lstat({path: 'fosudfsoofsofsoiso'}, function(err, file) {
      if (err) return cb(err);
      assert(file);
      assert.equal(file.stat, null);
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
