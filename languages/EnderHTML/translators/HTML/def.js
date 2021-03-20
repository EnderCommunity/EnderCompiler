//The `Translator` Object is already defined! The only value it has is the current work-dir!
//You can add some functions here that have something to do with the object.

module.exports = function(Translator) {
    Translator.prototype.setComponents = function(componentsPath) {
        try {
            this.components = require(componentsPath);
        } catch (e) {
            throw new Error("The components file is corrupted!\n\n" + e);
        }
    };
    Translator.prototype.parse = function(code) {
        /*var compiledCode = "",
            _this = this;
        code = code.toString().split(/(<component:.*\/>)/);
        code.forEach(function(c) {
            if (c.replace(/\s/g, "").replace(/\n/g, "").indexOf("<component:") >= 0) {
                c = parse(c)[0];
                c.name = c.name.replace(/component:/g, "");
                if (_this.components[c.name] !== undefined) {
                    compiledCode += _this.components[c.name](c.attribs);
                } else {
                    throw new Error("An unknown component was found!");
                }
            } else
                compiledCode += c;
        });*/
        return (require("./parse"))(code, this.components);
    };
};
//Don't add any other functions that are not necessary!