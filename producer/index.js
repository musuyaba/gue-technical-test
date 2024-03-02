const { Kafka } = require('kafkajs')
const { faker } = require('@faker-js/faker');

const init = async function initProducer() {
    const kafka = new Kafka({
        clientId: 'producer-node-1',
        brokers: ['localhost:9092'],
    })

    return kafka.producer()
}

const produce = async function produceMessage(producer) {
    await producer.connect()
    await producer.send({
        topic: 'test-topic',
        messages: [
            {
                value: {
                    id: faker.random.uuid(),
                    name: faker.name.findName(),
                    country: faker.address.country(),
                    gender: faker.random.arrayElement(["Male", "Female", "Other"]),
                }
            },
        ],
    })
}

const disconnect = async function disconnectProducer(producer) {
    await producer.disconnect()
}

const producerClient = init().catch(console.error)
setInterval(() => {
    produce(producerClient).catch(console.error)
}, 5000);

disconnect(producerClient).catch(console.error)