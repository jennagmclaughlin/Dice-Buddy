const chalk = require('chalk');

module.exports = {
    name: "error",
    execute(err) {
        console.log(chalk.red(`[Database]: ${err}`));
    }
}