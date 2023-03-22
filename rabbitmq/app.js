const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Declare a queue for CRUD operations
    const crudQueue = 'crud';
    await channel.assertQueue(crudQueue);

    // Declare an exchange for socket.io events
    const socketExchange = 'socket';
    await channel.assertExchange(socketExchange, 'fanout');

    // ...
  } catch (error) {
    console.error(error);
  }
}

connect();
