const amqp = require('amqplib');
const server = require("http").createServer();
const io = require("socket.io")(server);
const exchangeName="pubsub"

async function  sub (){
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'direct', { durable: false });
  
  channel.consume(queue, (message) => {
      const content = message.content.toString();
      console.log(`Received message: ${content}`);
      io.emit('my_event', content);
    }, { noAck: true });
}

sub()
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
