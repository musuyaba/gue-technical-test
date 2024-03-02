const { Kafka } = require('kafkajs')
const fastify = require('fastify')({ logger: true })


const populate = async function populateDatabase() {

}
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

fastify.get('/', function handler(request, reply) {
    reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
