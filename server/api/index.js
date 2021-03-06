const router = require('express').Router();

router.use('/users', require('./user'));
router.use('/plants', require('./plant'));
router.use('/categories', require('./category'));
router.use('/orders', require('./order'));
router.use('/auth', require('./authentication'));
// router.use('/stripe', require('./stripe'));

module.exports = router;
