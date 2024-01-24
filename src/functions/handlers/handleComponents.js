const fs = require('fs');

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentFolders = fs.readdirSync(`./src/components`);
        for (const folder of componentFolders) {
            const componentFiles = fs.readdirSync(`./src/components/${folder}`).filter(file => file.endsWith('.js'));
        }
    }
}