const amqp = require("amqplib");
const exchange_name = "pubsub";

function pub() {
  amqp
    .connect("amqp://localhost")
    .then((connection) => {
      return connection.createChannel().then((channel) => {
        channel.publish(
          exchange_name,
          "",
          new Buffer(
            JSON.stringify({
              message: "New Item Added",
            })
          )
        );
      });
    })
    .then(null, console.warn);
}
module.exports = pub;
