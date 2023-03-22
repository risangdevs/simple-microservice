const amqp = require('amqplib');
const io = require('socket.io')();
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
module.exports=sub