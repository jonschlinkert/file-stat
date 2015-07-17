'use strict';

/* deps: mocha */
var through = require('through2');
var assert = require('assert');
var stats = require('./index');

function toStream(fp) {
  var stream = through.obj();
  stream.write({path: fp});
  stream.end();
  return stream;
}

describe('add a `stat` property to the given object', function () {
  it('should work as a plugin in a stream:', function (done) {
    toStream('README.md')
      .on('error', done)
      .pipe(stats())
      .on('data', function (file) {
        assert.equal(typeof file.stat, 'object');
      })
      .on('end', done);
  });

  it('should have `async` method', function (done) {
    stats.async({path: 'README.md'}, function (err, file) {
      if (err) return done(err);

      assert.equal(typeof file.stat, 'object');
      done();
    });
  });

  it('should have `sync` method', function (done) {
    var file = stats.sync({path: 'README.md'});
    assert.equal(typeof file.stat, 'object');
    done();
  });
});
