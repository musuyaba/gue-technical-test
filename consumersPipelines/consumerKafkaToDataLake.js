
const dotenv = require('dotenv');
dotenv.config();

const { SubmitLog } = require('./models')
const { initConsumer } = require('./helpers/initConsumer')
// const { initProducer } = require('./helpers/initProducer')

async function insertSubmitLog(message) {
    let value = JSON.parse(message?.value.toString())
    const key = message?.key.toString()
    const submitLog = await SubmitLog.create({
        key: key,
        Name: value?.name,
        Address: value?.address,
        Country: value?.country,
        Sex: value?.gender,
        Copied_or_moved_a_file_or_folder: value?.Copied_or_moved_a_file_or_folder,
        Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document: value?.Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document,
        Sent_email_with_attached_file: value?.Sent_email_with_attached_file,
        Used_basic_arithmetic_formula_in_spreadsheet: value?.Used_basic_arithmetic_formula_in_spreadsheet,
        Connected_and_installed_new_device: value?.Connected_and_installed_new_device,
        Found_downloaded_installed_and_configured_software: value?.Found_downloaded_installed_and_configured_software,
        Created_electronic_presentation_with_presentation_software: value?.Created_electronic_presentation_with_presentation_software,
        Transferred_file_between_computer_and_other_device: value?.Transferred_file_between_computer_and_other_device,
        Wrote_computer_program_in_any_programming_language: value?.Wrote_computer_program_in_any_programming_language,
        Performed_at_least_one_out_of_nine_activities: value?.Performed_at_least_one_out_of_nine_activities
    })

    console.log('Inserted message to database', message, 'saved to database with key:', key);
}


const consume = async function consumeTopic() {
    // const producer = await initProducer(process.env.CLIENT_ID + "-producer", process.env.BROKERS)
    const consumer = await initConsumer(process.env.CLIENT_ID + "-consumer", process.env.BROKERS, process.env.GROUP_ID)
    await consumer.subscribe({ topic: process.env.TOPIC, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            insertSubmitLog(message)
        },
    })
}


consume().catch(console.error)
