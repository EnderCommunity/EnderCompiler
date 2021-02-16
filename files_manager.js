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
                    lastLength = 0,
                    isStillSearching = true,
                    waitForLoop = function() {
                        setTimeout(function() {
                            if (filesList.length == lastLength) {
                                if (!isStillSearching)
                                    callback(filesList);
                                else
                                    waitForLoop();
                            } else {
                                waitForLoop();
                            }
                            lastLength = filesList.length;
                        }, 10)
                    };
                var checkLoop = function(dir) {
                    isStillSearching = true;
                    fs.readdir(dir, function(err, files) {
                        let _ = 0,
                            __ = 0;
                        files.filter(file => isIncluded(ext, path.join(dir, file))).forEach(function(file) {
                            filesList.push(new TempFile(path.join(dir, file).replace(/\\/g, "/")));
                            _++;
                        });
                        files.filter(file => fs.statSync(path.join(dir, file)).isDirectory()).forEach(function(file) {
                            checkLoop(path.join(dir, file));
                            __++;
                        });
                        if (_ == 0 || __ == 0)
                            isStillSearching = false;
                        delete _, __;
                    });
                };
                checkLoop(output);
                waitForLoop();
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