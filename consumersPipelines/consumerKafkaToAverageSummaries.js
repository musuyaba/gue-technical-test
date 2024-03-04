
const dotenv = require('dotenv');
dotenv.config();

const { Summary } = require('./models')
const { initConsumer } = require('./helpers/initConsumer')
const { initProducer, sendMessage } = require('./helpers/initProducer')
const { customUpsert } = require('./helpers/upsert')

async function averageSummaries(producer, message) {
    try {
        let value = JSON.parse(message?.value.toString());
        const key = message?.key.toString();

        const condition = {
            Category_id: value?.category.id,
        };

        // Correct destructuring to match the returned object keys from customUpsert
        const { item: summary, created: createdSummary } = await customUpsert(Summary, condition);

        const fieldsToAverage = [
            'Copied_or_moved_a_file_or_folder',
            'Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document',
            'Sent_email_with_attached_file',
            'Used_basic_arithmetic_formula_in_spreadsheet',
            'Connected_and_installed_new_device',
            'Found_downloaded_installed_and_configured_software',
            'Created_electronic_presentation_with_presentation_software',
            'Transferred_file_between_computer_and_other_device',
            'Wrote_computer_program_in_any_programming_language',
            'Performed_at_least_one_out_of_nine_activities'
        ];

        let updatedValues = {};
        fieldsToAverage.forEach(field => {
            const summaryValue = summary?.[field] ?? 0.0;
            const newValue = value[field];

            if (newValue !== undefined) {
                averagedValue = createdSummary ? newValue : (summaryValue + newValue) / 2;
                updatedValues[field] = averagedValue;
            }
        });
        
        if (summary) {
            value.summary = summary.dataValues;
            value.updatedValues = updatedValues;
            fieldsToAverage.forEach(element => {
                delete value[element]
            });
            await sendMessage(producer, process.env.TOPIC_AVERAGE, [{ key: key, value: JSON.stringify(value) }]);
        } else {
            console.error("Summary not found!");
        }
    } catch (error) {
        console.error("Error checking summary:", error);
    }

}


const consume = async function consumeTopic() {
    const producer = await initProducer(process.env.CLIENT_ID_AVERAGE + "-producer", process.env.BROKERS)
    const consumer = await initConsumer(process.env.CLIENT_ID_AVERAGE + "-consumer", process.env.BROKERS, process.env.GROUP_ID_AVERAGE)
    await consumer.subscribe({ topic: process.env.TOPIC_CHECK_CATEGORY, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            averageSummaries(producer, message)
        },
    })
}


consume().catch(console.error)
