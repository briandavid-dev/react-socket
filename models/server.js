const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
const Sockets = require("./sockets");
const { constants } = require("crypto");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // http server
    this.server = http.createServer(this.app);

    // config de sockets

    this.io = socketio(this.server, {
      path: "/projects/chat/socket.io",
      cors: {
        origin: "*",
      },
    });
  }

  middlewares() {
    // Desplegar el directorio publico
    this.app.use(
      "/projects/chat",
      express.static(path.resolve(__dirname, "../public"))
    );
    // o
    // this.app.get("/projects/chat", (req, res) => {
    //   console.log(`__dirname`, __dirname);
    //   res.sendFile(__dirname + "/index.html");
    // });

    this.app.use(cors());
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();

    this.configSockets();

    this.server.listen(this.port, () => {
      console.log("Server listen in " + this.port);
    });
  }
}

module.exports = Server;
