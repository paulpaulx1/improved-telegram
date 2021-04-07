const router = require('express').Router();
const { Category, Plant } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: Plant,
    });
    res.send(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id, {
      include: Plant,
    });
    res.send(category);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
