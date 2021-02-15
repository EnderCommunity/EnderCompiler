const Console = console;
module.exports = function(ipc, console, filesManager, filesList, language, translator, args) {
    //Do whatever you wanna do here!
    //If you encounter any error, please use "throw Error(<message>);"

    Console.log(ipc);
    Console.log(console);
    Console.log(filesManager);
    Console.log(filesList);
    Console.log(language);
    Console.log(translator);
    Console.log(args);

    //Please make sure to use this when you're done
    //Only close the console using `console.close()` if the process wasn't successful!
    ipc.done();
};