
const dotenv = require('dotenv');
dotenv.config();

const { SubmitLog } = require('./models')
const { initConsumer } = require('./helpers/initConsumer')
// const { initProducer } = require('./helpers/initProducer')

async function insertSubmitLog(message) {
    SubmitLog.create({
        Name: message?.name,
        Address: message?.address,
        Country: message?.country,
        Sex: message?.gender,
        Copied_or_moved_a_file_or_folder: message?.Copied_or_moved_a_file_or_folder,
        Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document: message?.Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document,
        Sent_email_with_attached_file: message?.Sent_email_with_attached_file,
        Used_basic_arithmetic_formula_in_spreadsheet: message?.Used_basic_arithmetic_formula_in_spreadsheet,
        Connected_and_installed_new_device: message?.Connected_and_installed_new_device,
        Found_downloaded_installed_and_configured_software: message?.Found_downloaded_installed_and_configured_software,
        Created_electronic_presentation_with_presentation_software: message?.Created_electronic_presentation_with_presentation_software,
        Transferred_file_between_computer_and_other_device: message?.Transferred_file_between_computer_and_other_device,
        Wrote_computer_program_in_any_programming_language: message?.Wrote_computer_program_in_any_programming_language,
        Performed_at_least_one_out_of_nine_activities: message?.Performed_at_least_one_out_of_nine_activities
    })
}


const consume = async function consumeTopic() {
    // const producer = await initProducer(process.env.CLIENT_ID + "-producer", process.env.BROKERS)
    const consumer = await initConsumer(process.env.CLIENT_ID + "-consumer", process.env.BROKERS, process.env.GROUP_ID)
    await consumer.subscribe({ topic: process.env.TOPIC, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            message = JSON.parse(message?.value.toString())
            insertSubmitLog(message)
        },
    })
}


consume().catch(console.error)
