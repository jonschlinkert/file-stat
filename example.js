var through = require('through2');
var stats = require('./');

function toStream(fp) {
  var stream = through.obj();
  stream.write({path: fp});
  stream.end();
  return stream;
}

toStream('README.md')
  .pipe(stats())
  .on('data', function (file) {
    // adds `stat` object to file
    console.log(file.stat);
  })
  .on('end', function () {
    console.log('Done.');
  });
