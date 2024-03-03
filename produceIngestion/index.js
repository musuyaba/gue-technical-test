const dotenv = require('dotenv');
const { Kafka } = require('kafkajs');
const { faker } = require('@faker-js/faker');

dotenv.config();

async function initProducer() {
    const kafka = new Kafka({
        clientId: 'producer-node-1',
        brokers: ['localhost:9092'],
    });

    const producer = kafka.producer();
    await producer.connect();
    return producer;
}

const countries = [
    'Algeria',
    'Argentina',
    'Bangladesh',
    'Central African Republic',
    'Chad',
    'Congo DR',
    'Cuba',
    'Gambia',
    'Ghana',
    'Guinea Bissau',
    'Iraq',
    'Kiribati',
    'Lao PDR',
    'Lesotho',
    'Madagascar',
    'Malawi',
    'Mongolia',
    'Nepal',
    'Pakistan (Azad Jammu and Kashmir)',
    'Pakistan (Khyber Pakhtunkhwa)',
    'Pakistan (Punjab)',
    'Pakistan (Sindh)',
    'Samoa',
    'Sao Tome and Principe',
    'Sierra Leone',
    'State of Palestine',
    'Suriname',
    'Togo',
    'Tonga',
    'Tunisia',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Viet Nam',
    'Zimbabwe',
];

async function produceMessage(producer) {
    const message = JSON.stringify({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        country: faker.helpers.arrayElement(countries),
        gender: faker.helpers.arrayElement(["Male", "Female"]),
        address: faker.location.streetAddress(),
        Copied_or_moved_a_file_or_folder: faker.number.float({ min: 0, max: 1 }),
        Used_a_copy_and_paste_tool_to_duplicate_or_move_information_within_a_document: faker.number.float({ min: 0, max: 1 }),
        Sent_email_with_attached_file: faker.number.float({ min: 0, max: 1 }),
        Used_basic_arithmetic_formula_in_spreadsheet: faker.number.float({ min: 0, max: 1 }),
        Connected_and_installed_new_device: faker.number.float({ min: 0, max: 1 }),
        Found_downloaded_installed_and_configured_software: faker.number.float({ min: 0, max: 1 }),
        Created_electronic_presentation_with_presentation_software: faker.number.float({ min: 0, max: 1 }),
        Transferred_file_between_computer_and_other_device: faker.number.float({ min: 0, max: 1 }),
        Wrote_computer_program_in_any_programming_language: faker.number.float({ min: 0, max: 1 }),
        Performed_at_least_one_out_of_nine_activities: faker.number.float({ min: 0, max: 1 }),
    });

    await producer.send({
        topic: process.env.TOPIC,
        messages: [{ key: faker.string.uuid(), value: message }],
    });

    console.log("Message produced:", message);
}

async function runProducer() {
    const producer = await initProducer();

    const intervalId = setInterval(async () => {
        await produceMessage(producer).catch(console.error);
    }, process.env.DUMMY_INTERVAL);

    const shutdown = async () => {
        clearInterval(intervalId);
        await producer.disconnect();
        console.log("Producer disconnected.");
    };

    process.on('SIGINT', shutdown);
}

runProducer().catch(console.error);
