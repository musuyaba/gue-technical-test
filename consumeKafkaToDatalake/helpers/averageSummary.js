
async function updateSummaryWithAverages(Summary, value) {
    const { summary, createdSummary } = await customUpsert(Summary, {
        Country: value.country,
        Sex: value.gender
    });

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
            updatedValues[field] = parseFloat(averagedValue.toFixed(3));
        }
    });

    if (!createdSummary && Object.keys(updatedValues).length > 0) {
        await Summary.update(updatedValues, { where: { Country: value.country, Sex: value.gender } });
    }

    const updatedOrCreatedSummary = await Summary.findOne({ where: { Country: value.country, Sex: value.gender } });
    return updatedOrCreatedSummary;
}
