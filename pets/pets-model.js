const db = require('../data/db-config')

module.exports = {
    createPet,
    findPet,
    getPetsDiet
}

async function createPet(req, res, pet_data) {
    try {
        const pet = await db('Pets').insert(pet_data)
        const newPet = await findPet(pet[0])
        const pet_id = newPet.id
        console.log(pet_id)
        await db('Users').where({id: req.params.id}).update({pet_id: pet_id})
        return newPet
    }
    catch(err) {
        res.status(500).json({
            error: 'Not sure what went wrong, please try again!'
        })
    }
}

async function findPet(id) {
    const pet = await db('Pets').where({ id }).first().select('id', 'name', 'health')
    return pet
}

async function getPetsDiet(pet_id) {
    const diet = await db('Foods_Eaten').where({ pet_id })
    console.log(diet)
}