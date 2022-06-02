require('dotenv').config()
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    // ...
});

io.on("connection", (socket) => {
    // ...
});



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