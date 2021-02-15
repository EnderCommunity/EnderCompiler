function Translator(path) {
    this.path = path;
}

Translator.prototype.parse = function() {
    return fs.readFileSync(this.path);
};

module.exports = Translator;