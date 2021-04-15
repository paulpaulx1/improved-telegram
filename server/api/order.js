const router = require('express').Router();
const { Order, Plant, Lineitem, Session, User } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/userCart', async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const cart = await Order.findOne({
      where: {
        sessionId,
        isPaid: false,
      },
      include: [Plant],
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.get('/orderHistory', async (req, res, next) => {
  try {
    const sessionid = req.session.id;
    const orders = await Order.findAll({
      where: {
        sessionid,
        isPaid: true,
      },
      include: [Plant],
    });
    res.send(orders)
  } catch (err) {
    next(err);
  }
});

router.put('/userCart/:plantId', async (req, res, next) => {
  try {
    const sessionid = req.session.id;
    const { plantId } = req.params;
    const { sign } = req.body;
    const cart = await Order.findOne({
      where: {
        sessionid,
        isPaid: false,
      },
      include: [Plant],
    });
    const orderId = cart.id;

    const lineItem = await Lineitem.findOne({
      where: { plantId, orderId },
    });
    if (sign === '+') {
      await lineItem.increment('quantity');
    }
    if (sign === '-') {
      await lineItem.decrement('quantity');
      if (!lineItem.quantity) lineItem.destroy();
    }
    await cart.calcTotal();
    if (lineItem) res.send(lineItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
