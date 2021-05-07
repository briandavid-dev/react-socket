class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On coneccion
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");
      console.log(socket.id);

      socket.on("mensaje-cliente", (response) => {
        // socket.emit("mensaje-from-server", response);
        this.io.emit("mensaje-from-server", response);
      });

      this.io.emit("mensaje-from-server", { mensaje: "1", otro: "2" });
    });

    this.io.of("/").on("connection", (socket) => {
      console.log("Cliente conectado en chat");
      console.log(socket.id);

      socket.on("mensaje-cliente", (response) => {
        socket.emit("mensaje-from-server", response);
        // this.io.emit("mensaje-from-server", response);
      });

      socket.emit("mensaje-from-server", { mensaje: "3", otro: "4" });
      this.io.emit("mensaje-from-server", { mensaje: "1", otro: "2" });
    });

    console.log(`ENVIANDO mensaje-from-server`);

    this.io.emit("mensaje-from-server", { mensaje: "1", otro: "2" });
  }
}

module.exports = Sockets;
