require('dotenv').config()
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    // ...
});
const logger = require("@bunnynode/bunnylogger")

logger.start(`Server running on ${process.env.SERVER_IP}:${process.env.SERVER_PORT}`)


httpServer.listen(process.env.SERVER_PORT);

function emmit(message) {
    try {
        io.emit('feedAdd', {
            message
        });
    }
    catch (e) {

    }
}

module.exports = emmit