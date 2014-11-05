var testSummary = require('../test-summary.json')

var modules = []

testSummary.forEach(function(entry){
  var coreDeps = entry.coreDeps

  coreDeps.forEach(function(dep){
    if (modules.indexOf(dep) === -1){
      modules.push(dep)
    }
  })
})

console.log(JSON.stringify(modules, null, '  '))