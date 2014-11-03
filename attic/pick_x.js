var assert = require('assert')

module.exports = function pickX(arr, x){
  assert(arr instanceof Array)
  assert(typeof x === 'number')
  
  var ret = []
  for (var i = 0; i < x; i++){
    var idx = Math.floor(Math.random() * arr.length)
    ret.push(arr[idx])
  }
  return ret
}