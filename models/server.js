const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // http server
    this.server = http.createServer(this.app);

    // config de sockets
    this.io = socketio(this.server);
  }

  middlewares() {
    // Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();

    this.configSockets();

    this.server.listen(this.port, () =>
      console.log("Server listen in " + this.port)
    );
  }
}

module.exports = Server;
