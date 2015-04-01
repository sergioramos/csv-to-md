var toMD = require('../');

var rows = Object.keys(process.env).map(function(key) {
  return {
    key: key,
    value: process.env[key]
  };
});

console.log(toMD.thunk(rows));;