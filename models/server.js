const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // http server
    this.server = http.createServer(this.app);

    // config de sockets
    this.io = socketio(this.server, {
      // serveClient: false,
      cors: {
        origin: "*",
      },

      // cors: {
      //   origin: "http://localhost:2000",
      //   methods: ["GET", "POST"],
      // },

      // cors: {
      //   origin: "https://www.bmosoluciones.com/",
      //   methods: ["GET", "POST"],
      //   credentials: true,
      // },
    });

    this.io.path("/chat");
  }

  middlewares() {
    // Desplegar el directorio publico
    this.app.use("/chat", express.static(path.resolve(__dirname, "../public")));

    this.app.use(cors());
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
