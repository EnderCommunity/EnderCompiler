const Console = console;
module.exports = function(ipc, console, filesManager, filesList, language, translator, args) {
    var componentsPath = null,
        components;
    args.forEach(v => {
        if (v[0] == "components")
            componentsPath = filesManager.paths.resolve(v[1]);
    });
    if (componentsPath == null)
        throw new Error("The components argument is not present!");

    console.write(`~green~Recived the components path:~~s~ ${componentsPath}~`, true);

    const checkLoop = function() {
        if (filesList.length > 0) {
            var file = filesList.shift();
            console.write(`~green~Compiling the file:~~grey~ ${file.path}~`, true);
            file.setContent(translator.parse(file.getContent()), function(error) {
                if (error)
                    throw error;
                else {
                    console.write(`~green~Compilied the file:~~grey~ ${file.path}~`, true);
                    file.rename(file.name.substring(0, file.name.length - "ender.html".length) + "html", function(error) {
                        if (error)
                            throw error;
                        else {
                            console.write(`~yellow~Renamed the file to:~~s~ ${file.path}~`, true);
                            checkLoop();
                        }
                    });
                }
            });
        } else {
            console.write("~magenta~Done!~", true);
            console.write(`You can find your compiled files in: ${filesManager.dir}`);
            ipc.done();
        }
    };

    if (filesManager.exists(componentsPath)) {
        translator.setComponents(componentsPath);
        checkLoop();
    } else {
        throw new Error("The components path isn't valid!");
    }
};