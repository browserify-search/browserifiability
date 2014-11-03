#! /usr/bin/env node

var parseCsv = require('csv-parse')
var fs = require('fs')
var db = require('../lib/db')
var async = require('async')
var natural = require('natural')

var parse = require('csv-parse')
var fs = require('fs')
var csv = fs.readFileSync('data/manual-test-results.csv') + ''


var summary = []

db(function(err, db){
  if (err) return console.error(err.message)
  var Modules = db.collection('modules')
  var PackageJsons = db.collection('npm_package_json')

  getTestResults(function(err, testResults){
    if (err) return console.error(err.message)

    async.eachLimit(testResults, 20, 
      function(result, next){
        Modules.findOne({name: result.module}, function(err, module){
          PackageJsons.findOne({name: result.module}, function(err, metaDoc){
            var meta = JSON.parse(metaDoc.info)
            var currentVersion = meta['dist-tags'].latest
            var packageJson = meta.versions[currentVersion]
            
            result.hasTestling = !!packageJson.testling
            var keywords = packageJson.keywords || []
            result.hasBrowserKeyword = keywords.map(function(w){
              return w.toLowerCase()
            }).indexOf('browser') !== -1
            result.hasBrowserifyField = !!packageJson.browserify
            result.hasBrowserField = !!packageJson.browser
            result.hasBrowserInDescription = hasWord('browser', packageJson.description)
            result.hasBrowserInReadme = hasWord('browser', packageJson.readme)
            result.hasPluginInDescription = hasWord('plugin', packageJson.description)
            result.hasPluginInReadme = hasWord('plugin', packageJson.readme)
            result.hasGruntInName = hasWord('grunt', packageJson.name)
            result.hasGruntInDescription = hasWord('grunt', packageJson.description)
            result.hasGruntInReadme = hasWord('grunt', packageJson.readme)
            result.hasExpressInName = hasWord('express', packageJson.name)
            result.hasExpressInDescription = hasWord('express', packageJson.description)
            result.hasExpressInReadme = hasWord('express', packageJson.readme)
            result.coreDeps = Object.keys(module.testResults.coreDeps)

            summary.push(result)
            
            console.log('Got', result.module)

            next()
          })
        })
      },
      function(err){
        if (err) console.error(err.message)
        else console.log('ok')
        fs.writeFileSync('data/test-summary.json', 
          JSON.stringify(summary, null, '  '))
        db.close()
      }
    )

  })
})

function hasWord(word, string){
  return tokenize(string).indexOf(word) !== -1
}

function tokenize(str){
  if (!str) return []
  str = str.toLowerCase()
  tokenizer = new natural.WordTokenizer();
  var words = tokenizer.tokenize(str)
  return words.concat(
    words.map(function(word){
      return natural.PorterStemmer.stem(word)
    })
  )
}


function getTestResults(callback){
  parse(csv, null, function(err, lines){
    if (err) return callback(err)
    lines = lines.slice(1)
    var results = lines.map(convert)
    callback(null, results)
  })

  function convert(line){
    return {
      module: line[0],
      passed: line[1] === 'pass',
      tester: line[2]
    }
  }
}
