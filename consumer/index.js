const { Kafka } = require('kafkajs')

const consume = async function consumeTopic() {
    const kafka = new Kafka({
        clientId: 'consumer-node-1',
        brokers: ['localhost:9092'],
    })

    const consumer = kafka.consumer({ groupId: 'network-1' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                key: message?.key?.toString(),
                value: message?.value?.toString(),
            })
        },
    })
}

consume().catch(console.error)