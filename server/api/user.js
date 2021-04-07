const router = require('express').Router();

const { User, Plant, Session } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Session],
      attributes: {
        exclude: ['password', 'userEmail'],
      },
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send();
      return;
    }
    const updatedUser = await user.update(req.body);
    res.status(200).send(updatedUser);
    return;
  } catch (err) {
    next(err);
  }
});

module.exports = router;
