const amqp = require("amqplib");
const config = require("./config");
class Producer {
  channel;
  async createChannel() {
    const connection = await amqp.connect(config.rabbitMq.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(message, routingKey) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = await config.rabbitMq.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");

    const logDetails = JSON.stringify({
      message: message,
      logType: routingKey,
      dateTime: new Date(),
    });

    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(logDetails)
    );

    console.log(
      `message ${message}`
    );
  }
}

module.exports =  Producer;
