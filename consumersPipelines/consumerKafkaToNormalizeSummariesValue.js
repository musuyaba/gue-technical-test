
const dotenv = require('dotenv');
dotenv.config();

const { Summary } = require('./models')
const { initConsumer } = require('./helpers/initConsumer')
const { initProducer, sendMessage } = require('./helpers/initProducer')
const { customUpsert } = require('./helpers/upsert')

async function normalizeSummaries(producer, message) {
    try {
        let value = JSON.parse(message?.value.toString());
        const key = message?.key.toString();

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

        
        fieldsToAverage.forEach(element => {
            if (value && value.updatedValues && value.updatedValues.hasOwnProperty(element)) {
                value.updatedValues[element] = parseFloat(value.updatedValues[element]).toFixed(3);
            }
        });

        
        await sendMessage(producer, process.env.TOPIC_NORMALIZE, [{ key: key, value: JSON.stringify(value) }]);
    } catch (error) {
        console.error("Error checking summary:", error);
    }

}


const consume = async function consumeTopic() {
    const producer = await initProducer(process.env.CLIENT_ID_NORMALIZE + "-producer", process.env.BROKERS)
    const consumer = await initConsumer(process.env.CLIENT_ID_NORMALIZE + "-consumer", process.env.BROKERS, process.env.GROUP_ID_NORMALIZE)
    await consumer.subscribe({ topic: process.env.TOPIC_AVERAGE, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            normalizeSummaries(producer, message)
        },
    })
}


consume().catch(console.error)
