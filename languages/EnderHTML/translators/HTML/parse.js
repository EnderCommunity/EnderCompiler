//The `Translator` Object is already defined! The only value it has is the current work-dir!
//You can add some functions here that have something to do with the object.

const parse = require('html-dom-parser');

module.exports = function(code, components) {
    var compiledCode = "";
    code = code.toString().split(/(<component:.*\/>)/);
    code.forEach(function(c) {
        if (c.replace(/\s/g, "").replace(/\n/g, "").indexOf("<component:") >= 0) {
            c = parse(c)[0];
            c.name = c.name.replace(/component:/g, "");
            if (components[c.name] !== undefined) {
                compiledCode += components[c.name](c.attribs);
            } else {
                throw new Error("An unknown component was found!");
            }
        } else
            compiledCode += c;
    });
    return compiledCode;
};
//Don't add any other functions that are not necessary!