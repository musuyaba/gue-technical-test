
const dotenv = require('dotenv');
dotenv.config();

const { Summary, Activity, SubmitLog } = require('./models')
const { initConsumer } = require('./helpers/initConsumer')
const { initProducer, sendMessage } = require('./helpers/initProducer')
const { customUpsert } = require('./helpers/upsert');

async function activityLogging(producer, message) {
    try {
        let value = JSON.parse(message?.value.toString());
        const key = message?.key.toString();

        const submitlog = await SubmitLog.findOne({
            where: {
                key: key
            }
        })

        await Activity.create({
            old: value.summary,
            new: value.updatedValues,
            submitlogs_id: submitlog.id
        })

        await sendMessage(producer, process.env.TOPIC_ACTIVITY, [{ key: key, value: JSON.stringify(value) }]);
    } catch (error) {
        console.error("Error checking summary:", error);
    }

}


const consume = async function consumeTopic() {
    const producer = await initProducer(process.env.CLIENT_ID_ACTIVITY + "-producer", process.env.BROKERS)
    const consumer = await initConsumer(process.env.CLIENT_ID_ACTIVITY + "-consumer", process.env.BROKERS, process.env.GROUP_ID_ACTIVITY)
    await consumer.subscribe({ topic: process.env.TOPIC_NORMALIZE, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            activityLogging(producer, message)
        },
    })
}


consume().catch(console.error)
