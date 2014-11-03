var browserifiability = require('./index')

var module = {
  "_id" : "some-module",
  "features" : {
    "hasTestling" : false,
    "hasBrowserKeyword" : false,
    "hasBrowserifyField" : false,
    "hasBrowserField" : false,
    "hasBrowserInDescription" : false,
    "hasBrowserInReadme" : false,
    "hasPluginInDescription" : false,
    "hasPluginInReadme" : false,
    "hasGruntInName" : false,
    "hasGruntInDescription" : false,
    "hasGruntInReadme" : false,
    "hasExpressInName" : false,
    "hasExpressInDescription" : false,
    "hasExpressInReadme" : false
  },
  "testResults" : {
    "install" : {
      "passed" : true
    },
    "browserify" : {
      "bundle" : {
        "passed" : true
      }
    },
    "coreDeps" : {
      "fs": false
    }
  }
}

browserifiability(module, function(err, results){
  if (err) return console.error(err.message)
  console.log(results)
})
