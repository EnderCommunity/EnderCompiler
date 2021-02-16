const fs = require('fs'),
    fse = require('fs-extra'),
    path = require('path');

function isIncluded(exts, ext) {
    if (!fs.statSync(ext).isFile())
        return false;
    var isValid = false;
    exts.forEach((ex) => {
        if (ext.substr(-(ex.length + 1)) == `.${ex}`)
            isValid = true;
    });
    return isValid;
}

const TempFile = require('./definitions/TempFile');

module.exports = function(Console, dir, output, ext, shouldEmptyOutputDir, callback) {
    var copy = function() {
        fse.copy(dir, output, { overwrite: true }, function(err) {
            if (err) {
                Console.write("~red~Error:~~s~ Something went wrong while trying to copy the files, here are the error details:~", true);
                console.error(err);
            } else {
                var filesList = [],
                    isStillSearching = true;
                var checkLoop = function(dir) {
                    isStillSearching = true;
                    fs.readdir(dir, function(err, files) {
                        files.filter(file => isIncluded(ext, path.join(dir, file))).forEach(function(file) {
                            filesList.push(new TempFile(path.join(dir, file).replace(/\\/g, "/")));
                        });
                        isStillSearching = false;
                        var n = 0;
                        files.filter(file => fs.statSync(path.join(dir, file)).isDirectory()).forEach(function(file) {
                            n++;
                            checkLoop(path.join(dir, file));
                        });
                        if (!isStillSearching && n == 0 && false)
                            setTimeout(function() {
                                if (!isStillSearching)
                                    callback(filesList);
                            }, 100);
                    });
                };
                checkLoop(output);
                setTimeout(function() {
                    callback(filesList);
                }, 8000)
            }
        });
    };
    if (shouldEmptyOutputDir) {
        fse.emptyDir(output, function(err) {
            if (err) {
                Console.write("~red~Error:~~s~ Something went wrong while trying to empty the output directory, here are the error details:~", true);
                console.error(err);
            } else
                copy();
        });
    } else
        copy();
};