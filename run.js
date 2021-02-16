const fs = require('fs'),
    path = require('path');

//[START] Set up the console
const { Console } = require('./EnderConsole/import');
Console.name = "[EnderCompiler]";
//[END] Set up the console

const args = {
        eV: process.argv.filter(v => v.indexOf("--") == 0),
        from: null,
        to: null,
        input: null,
        output: null,
        shouldEmptyOutputDir: false,
        shouldEmptyInputDir: false,
        else: []
    },
    praser = function(arg) {
        arg = arg.substring(2);
        if (arg.includes("=")) {
            return [arg.substring(0, arg.indexOf("=")), arg.substring(arg.indexOf("=") + 1)]
        } else {
            return arg;
        }
    };
//Node run.js --input="<path>" --output="<path>" --components="<path>"
args.eV.forEach(function(v) {
    if (v.indexOf("--from") == 0)
        args.from = v.substring("--from=".length);
    else if (v.indexOf("--to") == 0)
        args.to = v.substring("--to=".length);
    else if (v.indexOf("--input") == 0)
        args.input = path.resolve(v.substring("--input=".length)).replace(/\\/g, "/");
    else if (v.indexOf("--output") == 0)
        args.output = path.resolve(v.substring("--output=".length)).replace(/\\/g, "/");
    else if (v == "--emptyOutputDir")
        args.shouldEmptyOutputDir = true;
    else if (v == "--emptyInputDir")
        args.shouldEmptyInputDir = true;
    else
        args.else.push(praser(v));
});

if (args.from == null || args.to == null || args.input == null || args.output == null) {
    Console.write("~red~Error:~~s~ The environment arguments aren't complete\nPlease follow the command as explained here: ~~yellow~Node run.js --from=<lang_type> --to=<lang_type> --input=<path> --output=<path> [...]~", true);
    Console.close();
} else {
    const FilesManager = require("./files_manager");
    if (fs.existsSync(`./languages/${args.from}`) && fs.existsSync(`./languages/${args.from}/translators/${args.to}`)) {
        fs.readFile(`./languages/${args.from}/manifest.json`, function(error, data) {
            if (error) {
                Console.write("~red~Error:~~s~ This language isn't working properly!\nIt's most likely not a problem with EnderCompiler, here are the error details:~", true);
                console.error(error);
                Console.close();
            } else {
                const info = JSON.parse(data),
                    IPC = {
                        done: function() {
                            if (args.shouldEmptyInputDir) {
                                require('fs-extra').emptyDir(args.input, function(err) {
                                    if (err) {
                                        Console.write("~red~Error:~~s~ Something went wrong while trying to empty the input directory, here are the error details:~", true);
                                        console.error(err);
                                    } else
                                        Console.close();
                                });
                            } else
                                Console.close();
                        }
                    };
                FilesManager(Console, args.input, args.output, info.SupportedExtensions, args.shouldEmptyOutputDir, function(filesList) {
                    const TempFile = require('./definitions/TempFile'),
                        filesManager = {
                            dir: args.output,
                            originDir: args.input,
                            exists: function(path) {
                                return fs.existsSync(path);
                            },
                            loadFile: function(path) {
                                return new TempFile(path);
                            },
                            paths: {
                                resolve: function(_path) {
                                    return path.resolve(_path).replace(/\\/g, "/");
                                }
                            }
                        };
                    try {
                        (require(`./languages/${args.from}/start.js`))(IPC, Console, filesManager, filesList, args.to, (require(`./definitions/Translator`))(args.from, args.to, args.output), args.else);
                    } catch (e) {
                        Console.write("~red~Error:~~s~ This language isn't working properly!\nIt's most likely not a problem with EnderCompiler, here are the error details:~", true);
                        console.error(e);
                        Console.close();
                    }
                });
            }
        });
    } else {
        Console.write(`~red~Error:~~s~ ${(!fs.existsSync(`./languages/${args.from}`)) ? "The desired language isn 't supported!" : `This language doesn't support ${args.to}`}~`, true);
        Console.close();
    }
}