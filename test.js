var browserifiability = require('./index')

var module = {
  "_id": "newforms",
  "version": "0.8.0",
  "search": {
    "name": "newforms",
    "description": "An isomorphic form-handling library for React",
    "readme": "========================\nnewforms |travis_status|\n========================\n\n.. |travis_status| image:: https://secure.travis-ci.org/insin/newforms.png\n   :target: http://travis-ci.org/insin/newforms\n\nAn isomorphic JavaScript form-handling library for `React`_.\n\n(Old `Django`_ hands may recognise \"newforms\" as the former name of its\n`form-handling library`_ - newforms started out as a direct port of\n``django.forms`` to JavaScript)\n\n.. _`React`: http://facebook.github.io/react/\n.. _`Django`: http://www.djangoproject.com\n.. _`form-handling library`: http://docs.djangoproject.com/en/dev/topics/forms/\n\nGetting newforms\n================\n\nNode.js\n   ::\n\n      npm install newforms\n\n   .. code-block:: javascript\n\n      var forms = require('newforms')\n\nBrowser bundles\n   Browser bundles include all dependencies except React.\n\n   They expose newforms as a global ``forms`` variable and expect to find a\n   global ``React`` variable to work with.\n\n   Release bundles are available from:\n\n      * https://github.com/insin/newforms/tree/react/dist\n\n`Documentation @ ReadTheDocs`_\n==============================\n\n`Newforms Examples @ GitHub`_\n=============================\n\n.. _`Documentation @ ReadTheDocs`: http://newforms.readthedocs.org\n.. _`Newforms Examples @ GitHub`: https://github.com/insin/newforms-examples\n\nQuick Guide\n===========\n\n* Form constructors are created using ``forms.Form.extend()``.\n\n  This takes an ``Object`` argument defining form fields and any other\n  properties for the form's prototype (custom validation functions etc.),\n  returning a Form constructor which inherits from ``BaseForm``::\n\n     var ContactForm = forms.Form.extend({\n       subject  : forms.CharField({maxLength: 100})\n     , message  : forms.CharField()\n     , sender   : forms.EmailField()\n     , ccMyself : forms.BooleanField({required: false})\n\n     // Implement custom validation for a field by adding a clean<FieldName>()\n     // function to the form's prototype.\n     , cleanSender: function() {\n         if (this.cleanedData.sender == 'mymatesteve@gmail.com') {\n            throw forms.ValidationError(\"I know it's you, Steve. \" +\n                                        \"Stop messing with my example form.\")\n         }\n       }\n\n     // Implement custom whole-form validation by adding a clean() function to\n     // the form's prototype\n     , clean: function() {\n         if (this.cleanedData.subject &&\n             this.cleanedData.subject.indexOf('that tenner you owe me') != -1 &&\n             PEOPLE_I_OWE_A_TENNER_TO.indexOf(this.cleanedData.sender) != 1) {\n           // This error will be associated with the named field\n           this.addError('sender', \"Your email address doesn't seem to be working.\")\n           // This error will be associated with the form itself, to be\n           // displayed independently.\n           throw forms.ValidationError('*BZZZT!* SYSTEM ERROR. Beeepity-boop etc. etc.')\n         }\n       }\n     })\n\n* For convenience and compactness, the ``new`` operator is **optional** when\n  using newforms' Fields, Widgets and other constructors which are commonly\n  used while defining a Form, such as ValidationError -- however ``new`` is\n  **not**  automatically optional for the Form and FormSet constructors you\n  create::\n\n     // ...in a React component...\n     getInitialState: function() {\n       return {\n         form: new ContactForm({\n           validation: 'auto'\n         , onStateChange: this.forceUpdate.bind(this)\n         })\n       }\n     }\n\n* Forms have default convenience rendering methods to get you started quickly,\n  which display a label, input widgets and any validation errors for each field\n  (however, JSX and ``React.DOM`` make it convenient to write your own custom\n  rendering later)::\n\n     // ...in a React component's render() method...\n     <form ref=\"contactForm\" onSubmit={this.onSubmit}>\n       <table>\n         <tbody>\n           {this.state.form.asTable()}\n         </tbody>\n       </table>\n       <div className=\"controls\">\n         <input type=\"submit\" value=\"Submit\"/>\n       </div>\n     </form>\n\n* To bind a form to user data to be validated and cleaned, pass a ``data``\n  object when creating it, or call the ``setData()`` method of an existing\n  form to bind new data to it.\n\n  For example, if the form was held as state in a React component which\n  had the above JSX in its ``render()`` method::\n\n     // ...in a React component...\n     onSubmit: function(e) {\n       e.preventDefault()\n\n       // A Form's validate() method gets input data from a given <form> and\n       // validates it.\n       var isValid = this.state.form.validate(this.refs.contactForm)\n\n       // If the data was invalid, the forms's error object will be populated\n       // with field validation errors and the form will have called its\n       // onStateChange callback to update its display.\n\n       if (isValid) {\n         // form.cleanedData contains validated input data, coerced to the\n         // appropriate JavaScript data types by its Fields.\n       }\n     }\n\nMIT License\n===========\n\nCopyright (c) 2014, Jonathan Buchanan\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n"
  },
  "features": {
    "hasTestling": false,
    "hasBrowserKeyword": false,
    "hasBrowserifyField": false,
    "hasBrowserField": false,
    "hasBrowserInDescription": false,
    "hasBrowserInReadme": false,
    "hasPluginInDescription": false,
    "hasPluginInReadme": false,
    "hasGruntInName": false,
    "hasGruntInDescription": false,
    "hasGruntInReadme": false,
    "hasExpressInName": false,
    "hasExpressInDescription": false,
    "hasExpressInReadme": false
  },
  "testResults": {
    "install": {
      "passed": true
    },
    "browserify": {
      "bundle": {
        "passed": true
      },
      "test": {}
    },
    "coreDeps": {
      "punycode": true
    }
  },
  "timeMeasurements": {
    "moduleInfo": 305,
    "testModule": 24756,
    "coreDeps": 2008,
    "bundle": 8249,
    "install": 14499,
    "browserifiability": 15,
    "rimraf": 204,
    "all": 25695
  },
  "browserifiability": 0,
  "downloadsLastMonth": {
    "start": "2014-10-05",
    "count": 526
  }
}

console.log(browserifiability(module))
