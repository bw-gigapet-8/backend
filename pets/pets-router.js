const router = require('express').Router({
    mergeParams: true
})
const Pets = require('./pets-model')

router.post('/', async (req, res, next) => {
    const pet = await Pets.createPet(req, res, req.body)
    res.json(pet)
})

module.exports = router