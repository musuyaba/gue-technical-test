const { Kafka } = require('kafkajs')
const { Category, SubmitLog, Summary } = require('./models')

async function customUpsert(model, values, condition) {
    condition = condition || values;
    const foundItem = await model.findOne({ where: condition });

    if (!foundItem) {
        const newItem = await model.create(values);
        return { item: newItem, created: true };
    } else {
        await model.update(values, { where: condition });
        return { item: await model.findOne({ where: condition }), created: false };
    }
}

async function updateSummaryWithAverages(Summary, value) {
    const { summary, createdSummary } = await customUpsert(Summary, {
        Country: value.country,
        Sex: value.gender
    });

    if (!createdSummary) {
        const fieldsToAverage = [
            'Copied_or_moved_a_file_or_folder',
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
            if (summary && summary[field] != null && value[field] != null) { 
                updatedValues[field] = (summary[field] + value[field]) / 2;
            }
        });
        await Summary.update(updatedValues, { where: { Country: value.country, Sex: value.gender } });
        const updatedSummary = await Summary.findOne({ where: { Country: value.country, Sex: value.gender } });

        return { summary: updatedSummary, createdSummary: false };
    }
    return { summary, createdSummary };
}

async function setRealTimeAggregate(value) {
    const { submitlog, createdSubmitLog } = await customUpsert(SubmitLog, {
        Name: value.name,
        Address: value.address,
    });

    let { category, createdCategory } = await customUpsert(Category, {
        Country: value.country,
        Sex: value.gender
    })

    const { summary, createdSummary } = await updateSummaryWithAverages(Summary, value);

    console.log(summary);
    
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
            setRealTimeAggregate(JSON.parse(message?.value.toString()))
        },
    })
}


consume().catch(console.error)
