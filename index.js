var coreModules = require('./core_modules')
var testSummary = require('./test-summary')

module.exports = function(module, callback){

  var criteria = [
    new Feature('hasTestling'),
    new Feature('hasBrowserKeyword'),
    new Feature('hasBrowserifyField'),
    new Feature('hasBrowserInDescription'),
    new Feature('hasBrowserInReadme'),
    new Feature('hasGruntInName'),
    new Feature('hasGruntInDescription'),
    new Feature('hasGruntInReadme'),
    new Feature('hasExpressInName'),
    new Feature('hasExpressInDescription'),
    new Feature('hasExpressInReadme')
  ].concat(
    coreModules.map(function(module){
      return new CoreDep(module)
    })
  )

  callback(null, browserifiability(module, testSummary, criteria))

}

function browserifiability(module, testSummary, criteria){
  if (!module.testResults.install.passed) return 0
  if (!module.testResults.browserify.bundle.passed) return 0
  var Pbr = baseP(testSummary)
  var passed = testSummary.filter(prop('passed'))
  var failed = testSummary.filter(not(prop('passed')))
  var Pgood = Pbr
  var Pbad = 1 - Pbr
  var ret
  for (var i = 0; i < criteria.length; i++){
    var criterion = criteria[i]
    var pf
    if (criterion.valueForModule(module)){
      //console.log('applying does', criterion.display)
      Pgood *= passed.filter(criterion.valueForSummary, criterion).length / passed.length
      Pbad *= failed.filter(criterion.valueForSummary, criterion).length / failed.length
    }else{
      //console.log('applying not', criterion.display)
      Pgood *= passed.filter(not(criterion.valueForSummary), criterion).length / passed.length
      Pbad *= failed.filter(not(criterion.valueForSummary), criterion).length / failed.length
    }
    if (Pgood === 0) return 0
  }
  return Pgood / (Pgood + Pbad)
}

function baseP(summary){
  return summary.filter(prop('passed')).length / 
    summary.length
}

function prop(name){
  var ret = function(obj){
    return obj[name]
  }
  ret.display = name
  return ret
}

function hasCoreDep(moduleName){
  var ret = function(module){
    if (module.coreDeps){
      return module.coreDeps.indexOf(moduleName) !== -1
    }else{
      return module.testResults.coreDeps[moduleName]
    }
  }
  ret.display = 'has core dep ' + moduleName
  return ret
}

function and(fn1, fn2){
  return function(obj){
    return fn1(obj) && fn2(obj)
  }
}

function not(fn){
  var ret = function(){
    return !fn.apply(this, arguments)
  }
  ret.display = 'not ' + fn.display
  return ret
}

function Feature(name){
  this.name = this.display = name
}

Feature.prototype.valueForSummary = function(summary){
  return summary[this.name]
}

Feature.prototype.valueForModule = function(module){
  return module.features[this.name]
}

function CoreDep(dep){
  this.dep = this.display = dep
}

CoreDep.prototype.valueForSummary = function(summary){
  return summary.coreDeps.indexOf(this.dep) !== -1
}

CoreDep.prototype.valueForModule = function(module){
  return module.testResults.coreDeps[this.dep]
}