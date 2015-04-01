var through = require('through2');
var format = require('util').format;
var buildArray = require('build-array');
var isArray = require('is-array');
var defaults = require('defaults');


var header = function(row, options) {
  var opts = defaults(options, {
    center: true
  });

  var names = Object.keys(row).map(function(key) {
    return format('| %s ', key);
  });

  var line = names.map(function(name) {
    var line = buildArray(name.length).map(function() {
      return '-';
    });

    line[0] = '|';
    if (opts.center) {
      line[1] = ':';
      line[line.length - 1] = ':'
    }

    return line.join('');
  });

  names.push('|');
  line.push('|');

  return [names.join(''), line.join('')].join('\n').concat('\n');
};

var line = function(row) {
  var line = Object.keys(row).map(function(key) {
    return format('| %s ', row[key]);
  });

  line.push('|');

  return line.join('').concat('\n');
};

module.exports = function() {
  var first = true;

  return through.obj(function(row, enc, fn) {
    if (first) {
      first = false;
      this.push(header(row));
    }

    fn(null, line(row));
  });
};

module.exports.thunk = function(rows, opts) {
  return (!isArray(rows) ? [rows] : rows).map(function(row, i) {
    if (i === 0) return header(row, opts).concat(line(row));
    return line(row);
  }).join('');
};