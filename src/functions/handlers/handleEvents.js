const fs = require('fs');
const mongoose = require('mongoose');

// go through events folder
// based on file we're in, execute that file

module.exports = (client) => {
    client.handleEvents = async () => {
        // grabbing events folder
        const eventFolders = fs.readdirSync(`./src/events`);
        // for each folder in the events folder, do this...
        for (const folder of eventFolders) {
            // grabbing the files
            const eventFiles = fs
                .readdirSync(`./src/events/${folder}`)
                .filter(file => file.endsWith('.js'));

            switch (folder) {
                // if the folder is client
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => 
                            event.execute(...args, client)
                        );
                        else client.on(event.name, (...args) =>
                            event.execute(...args, client)
                        );
                    }
                    break;

                // if the folder is mongo
                case "mongo":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) mongoose.connection.once(event.name, (...args) => 
                            event.execute(...args, client)
                        );
                        else mongoose.connection.on(event.name, (...args) => 
                            event.execute(...args, client)
                        );
                    }
                    break;

                default:
                    break;
            }
        }
    }
}