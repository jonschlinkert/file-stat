'use strict';

/* deps: mocha */
var through = require('through2');
var assert = require('assert');
var stats = require('./');

function streamify(fp) {
  var stream = through.obj();
  stream.write({path: fp});
  stream.end();
  return stream;
}

describe('add a `stat` property to the given object', function (done) {
  it('should work as a plugin in a stream:', function () {
    streamify('README.md')
      .on('error', console.error)
      .pipe(stats())
      .on('data', function (file) {
        assert.equal(typeof file.stat, 'object');
      })
      .on('end', function () {
        done();
      });
  });

  it('`getStats` should work as an async function:', function (done) {
    stats.getStats({path: 'README.md'}, function (err, file) {
      if (err) return done(err);

      assert.equal(typeof file.stat, 'object');
      done();
    });
  });
});
