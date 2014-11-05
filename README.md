browserifiability
=================

Determine the browserifiability of a module on npm - the probability that a module will work with browserify.

## Usage

```js
var score = browserifiability(module)
console.log(results)
```

Output:

```
0.9346094492725097
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

