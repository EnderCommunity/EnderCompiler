const fs = require('fs'),
    path = require('path');

function TempFile(_path) {
    this.path = path.resolve(_path).replace(/\\/g, "/");
    this.name = path.basename(this.path);
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

TempFile.prototype.rename = function(name, callback) {
    var _this = this,
        newPath = path.join(this.path.substring(0, this.path.length - this.name.length), name);
    fs.rename(this.path, newPath, function(error) {
        if (error) {
            callback(error);
        } else {
            _this.name = name;
            _this.path = newPath.replace(/\\/g, "/");
            callback(error);
        }
    });
};

module.exports = TempFile;