const amqp = require("amqplib");
const queueName = "pubsub";

function pub() {
  amqp
    .connect("amqp://localhost")
    .then(async (connection) =>
      connection.createChannel().then((channel) => {
        channel.sendToQueue(queueName, Buffer.from("New Item Added"));
      })
    )
    .then(null, console.warn);
}
module.exports = pub;
