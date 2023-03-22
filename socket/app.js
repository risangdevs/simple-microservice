const server = require("http").createServer();
const io = require("socket.io")(server);

// Event listeners for socket.io
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    io.emit("message", data);
  });
});

// Start the server
server.listen(4000, () => {
  console.log("Socket.IO microservice listening on port 4000!");
});
