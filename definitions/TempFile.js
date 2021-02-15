function TempFile(path) {
    this.path = path;
}

TempFile.prototype.getContent = function() {
    return fs.readFileSync(this.path);
};

TempFile.prototype.delete = function(callback = function() {}) {
    try {
        fs.unlink(this.path);
        callback(true);
    } catch (e) {
        callback(false);
    }
};

TempFile.prototype.setContent = function(content, callback = function() {}) {
    fs.writeFile(this.path, content, function(err) {
        callback(err);
    });
}

module.exports = TempFile;