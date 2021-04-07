const router = require('express').Router();
const { Plant } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.send(plants);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id);
    res.send(plant);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
    try {
        const plant = await Plant.create(req.body)
        res.status(201).send(plant)
    } catch(err) {next(err)}
})

router.put('/:id', async (req, res, next) => {
    try{
const updatedPlant = await Plant.update({
    plantName: req.body.plantName,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId
},
{returning: true, where: { id : req.params.id } }
)
res.send(updatedPlant)
    } catch(err) {next(err)}
})

module.exports = router