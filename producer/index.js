const { Kafka } = require('kafkajs');
const { faker } = require('@faker-js/faker');

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
        Copied_or_moved_a_file_or_folder: faker.number.float({min: 0, max: 1}),
    });

    await producer.send({
        topic: 'test-topic',
        messages: [{ key: faker.string.uuid(), value: message }],
    });

    console.log("Message produced:", message);
}

async function runProducer() {
    const producer = await initProducer();

    const intervalId = setInterval(async () => {
        await produceMessage(producer).catch(console.error);
    }, 5000);

    const shutdown = async () => {
        clearInterval(intervalId);
        await producer.disconnect();
        console.log("Producer disconnected.");
    };

    process.on('SIGINT', shutdown);
}

runProducer().catch(console.error);
