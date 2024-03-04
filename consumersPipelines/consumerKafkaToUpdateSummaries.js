
const dotenv = require('dotenv');
dotenv.config();

const { Summary, Activity, SubmitLog } = require('./models')
const { initConsumer } = require('./helpers/initConsumer')
const { initProducer, sendMessage } = require('./helpers/initProducer')
const { customUpsert } = require('./helpers/upsert');

async function updateSummaries(producer, message) {
    try {
        let value = JSON.parse(message?.value.toString());
        const key = message?.key.toString();

        const condition = {
            id: value.summary.id
        }
        console.log(condition);

        let updatedValues = value.updatedValues;
        updatedValues.count = value.newCount;
        await customUpsert(Summary, updatedValues, condition)

        // if (Object.keys(updatedValues).length > 0) {
        //     await Summary.update(updatedValues, { where: condition });
        // }

        console.log("Summary are updated based SubmitLogs key: ", key);
    } catch (error) {
        console.error("Error checking summary:", error);
    }

}


const consume = async function consumeTopic() {
    const producer = await initProducer(process.env.CLIENT_ID_UPDATE_SUMMARIES + "-producer", process.env.BROKERS)
    const consumer = await initConsumer(process.env.CLIENT_ID_UPDATE_SUMMARIES + "-consumer", process.env.BROKERS, process.env.GROUP_ID_UPDATE_SUMMARIES)
    await consumer.subscribe({ topic: process.env.TOPIC_ACTIVITY, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            updateSummaries(producer, message)
        },
    })
}


consume().catch(console.error)
