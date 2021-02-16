//[START] Get the modules
var rl, chalk;
try {
    rl = require('readline');
    chalk = require('chalk');
} catch (e) {
    console.error("EnderLibrary failed to start!\n" + e);
}
//[END] Get the modules

//[START] Prepare the process to receive console input
const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
//[END] Prepare the process to receive console input

//[START] Set up the objects
const Console = {
    name: "",
    write(message, isColoured = false) {
        if (isColoured) {
            var msg = message.split(/~*~*~/); //1st: colour, 2nd: message
            message = [];
            msg.forEach(function(v) {
                if (v.replace(/\s/g, "") != "")
                    message.push(v);
            });
            msg = message;
            message = "";
            if (msg.length % 2 == 0)
                for (var i = 0; i < msg.length; i += 2) {
                    if (i + 1 <= msg.length && msg[i] != "s") {
                        try {
                            message += chalk[msg[i]](msg[i + 1]);
                        } catch {
                            message += msg[i + 1];
                        }
                    } else if (msg[i] == "s")
                        message += msg[i + 1];
                }
        }
        console.log(`${chalk.blue.bold(this.name)}${this.name.replace(/\s/, "") !== "" ? " " : ""}${message}`);
    },
    read: function(message, callback) {
        readline.question(message, callback);
    },
    clear: function() {
        console.clear();
    },
    close: function() {
        readline.close();
        process.kill();
    },
    commands: {

    }
};
//[END] Set up the objects

//[START] Make the objects accessible
module.exports = {
    Console
};
//[END] Make the objects accessible