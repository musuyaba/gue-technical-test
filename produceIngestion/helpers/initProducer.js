const { Kafka } = require('kafkajs');

const initProducer = async function initProducer(clientId, brokers) {
    const kafka = new Kafka({
        clientId: clientId,
        brokers: [brokers],
    });

    const producer = kafka.producer();
    await producer.connect();
    return producer;
}

const sendMessage = async function sendMessage(producer, topic, message) {
    await producer.send({
        topic: topic,
        messages: message,
    });
    console.log("Message produced:", message, "to topic:", topic);
}

module.exports = { initProducer, sendMessage }