const { Kafka } = require('kafkajs')

const initConsumer = async function consumeTopic(clientId, brokers, groupId) {
    const kafka = new Kafka({
        clientId: clientId,
        brokers: [brokers],
    })

    const consumer = kafka.consumer({ groupId: groupId })

    await consumer.connect()
    return consumer;
    
}

module.exports = { initConsumer }