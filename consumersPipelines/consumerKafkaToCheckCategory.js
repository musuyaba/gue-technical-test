
const dotenv = require('dotenv');
dotenv.config();

const { Category } = require('./models')
const { initConsumer } = require('./helpers/initConsumer')
const { initProducer, sendMessage } = require('./helpers/initProducer')
const { customUpsert } = require('./helpers/upsert')

async function checkCategory(producer, message) {
    try {
        let value = JSON.parse(message?.value.toString());
        const key = message?.key.toString();

        const condition = {
            Country: value?.country,
            Sex: value?.gender,
        };

        let category = await Category.findOne({ where: condition });

        if (!category && process.env.NEW_CATEGORY !== '0') {
            ({ category, createdCategory } = await customUpsert(Category, condition));
        }

        if (category) {
            value.category = category.dataValues;
            await sendMessage(producer, process.env.TOPIC_CHECK_CATEGORY, [{ key: key, value: JSON.stringify(value) }]);
        } else {
            console.error("Category not found! Please check NEW_CATEGORY env variable!");
        }
    } catch (error) {
        console.error("Error checking category:", error);
    }

}


const consume = async function consumeTopic() {
    const producer = await initProducer(process.env.CLIENT_ID_CHECK_CATEGORY + "-producer", process.env.BROKERS)
    const consumer = await initConsumer(process.env.CLIENT_ID_CHECK_CATEGORY + "-consumer", process.env.BROKERS, process.env.GROUP_ID_CHECK_CATEGORY)
    await consumer.subscribe({ topic: process.env.TOPIC, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            checkCategory(producer, message)
        },
    })
}


consume().catch(console.error)
