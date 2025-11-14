const figlet = require("figlet");
const chalk = require("chalk");

figlet.text(
    "Welcome to Node.js",
    {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
    },
    function (err, data) {
        if (err) {
            console.log("Figlet error:", err);
            return;
        }
        console.log(chalk.cyan(data));
    }
);
