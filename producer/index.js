const { Kafka } = require('kafkajs');
const { faker } = require('@faker-js/faker');

async function initProducer() {
    const kafka = new Kafka({
        clientId: 'producer-node-1',
        brokers: ['localhost:9092'],
    });

    const producer = kafka.producer();
    await producer.connect();
    return producer;
}

async function produceMessage(producer) {
    const message = JSON.stringify({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        country: faker.location.country(),
        gender: faker.helpers.arrayElement(["Male", "Female"]),
    });

    await producer.send({
        topic: 'test-topic',
        messages: [{ key: faker.string.uuid(), value: message }],
    });

    console.log("Message produced:", message);
}

async function runProducer() {
    const producer = await initProducer();

    const intervalId = setInterval(async () => {
        await produceMessage(producer).catch(console.error);
    }, 5000);

    const shutdown = async () => {
        clearInterval(intervalId);
        await producer.disconnect();
        console.log("Producer disconnected.");
    };

    process.on('SIGINT', shutdown);
}

runProducer().catch(console.error);
