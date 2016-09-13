const es2015 = require('babel-preset-es2015');
const stage0 = require('babel-preset-stage-0');
import debounce from 'debounce';
import queryString from 'query-string';
import reporter from './logger';
import resetBtn from './reset';
import prettyBtn from './pretty';
import googl from './googl';
const babel = require('babel-core');

const evalError = document.querySelector('pre.error');

const printError = function printError(message) {
    evalError.textContent = message;
};

const clearOuput = function clearOutput() {
    printError('');
};


const getSource = function getSource() {
    return input.getValue();
};

const setUrlPath = function(code) {
    window.location.hash = '?' + queryString.stringify({
        code: code
    });
};


const evalSource = R.compose(R.toString, eval);

const ramdaStr = `const {${R.keys(R).join(',')}} = R;`;

const compile = function compile() {

    let transformed;
    const code = `${ramdaStr} \n${getSource()}`;

    setUrlPath(getSource()); 
    clearOuput();

    try {
        transformed = babel.transform(code, {
            filename: 'ramda',
            "presets": [
                es2015,
                stage0
            ]
        });

        output.setValue(evalSource(transformed.code).replace('"use strict"', ''));

    } catch (err) {
        printError(err.message.replace(ramdaStr, '').replace(/(?=\d).*(?=\|)/g, function(a) {
            return Number(a.trim()) - 1;
        }));
    }
};

reporter.main();

googl();

const debounceCompile = debounce(compile, 1000);

const codeMirrorConfig = {
    theme: "dracula",
    mode: {
        name: "javascript",
        json: true,
        globalVars: true
    }
}

const inputConfig = R.merge(codeMirrorConfig, {
    lineNumbers : true,
    extraKeys: {
        "Tab": "autocomplete"
    },
    autofocus: true,
    autoCloseBrackets: true,
    historyEventDelay: 2000,
});

const outputConfig = R.merge(codeMirrorConfig, {
    readOnly : true
});

const input = CodeMirror.fromTextArea(document.querySelector('.input'), inputConfig);

CodeMirror.registerHelper("instance", "input", input);

input.on('change', debounceCompile);

const output = CodeMirror.fromTextArea(document.querySelector('.output'), outputConfig);

resetBtn(output);

prettyBtn(output);

// Get source code from 'code' params and paste it into editor
// The 'code' param is actually located in a hash URL fragment,
// so we have to parse the hash instead of query to prevent conflicts
const code = queryString.parse(queryString.extract(location.hash)).code;
if (code !== undefined) {
    input.setValue(code);
}
