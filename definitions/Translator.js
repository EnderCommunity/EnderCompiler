function Translator(path) {
    this.path = path;
}

module.exports = function(from, to, path) {
    (require(`./../languages/${from}/translators/${to}/def.js`))(Translator);
    return new Translator(path);
};