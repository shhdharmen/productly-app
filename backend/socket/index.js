module.exports = function (http) {
    io = require('socket.io')(http);
    return io;
};