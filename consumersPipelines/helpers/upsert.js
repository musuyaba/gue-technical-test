export const customUpsert = async function customUpsert(model, values, condition) {
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