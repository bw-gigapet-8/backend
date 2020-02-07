const db = require('../data/db-config')

module.exports = {
    createPet,
    findPet,
    getPetsDiet
}

async function createPet(req, res, pet_data) { // Requires a pet_name
    try {
        const pet = await db('Pets').insert(pet_data, 'id')
        const newPet = await findPet(pet[0])
        const pet_id = newPet.id
        await db('Users').where({id: req.params.id}).update({pet_id: pet_id})
        return newPet
    }
    catch(err) {
        res.status(500).json(err.stack)
    }
}

async function findPet(id) {
    const pet = await db('Pets').where({ id }).first().select('id', 'pet_name', 'health')
    return pet
}

async function getPetsDiet(pet_id) {
    try {
        const diet = await db('Foods_Eaten').where({ pet_id })
        .join('Pets', { 'Pets.id': pet_id })
        .join('Foods', {'Foods.id': 'Foods_Eaten.food_id' })
            .select('Pets.id as pet_id', 'Pets.pet_name', 'Foods.name', 'Foods.category_id', 'Foods_Eaten.id as food_eaten_id')
        return diet
    }
    catch(err) {
        return err.stack
    }
}