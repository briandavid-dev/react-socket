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
  }
}

module.exports = Sockets;
