browserifiability
=================

Determine the browserifiability of a module on npm - the probability that a module will work with browserify.

## Usage

```js
browserifiability(module, function(err, results){
  if (err) return console.error(err.message)
  console.log(results)
})
```

Where `module` is a object like

```js
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
```

Output:

```
0.9346094492725097
```