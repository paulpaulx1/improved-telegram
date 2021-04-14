const router = require('express').Router();
const bcrypt = require('bcrypt');
const hash = require('../hash');
const { User, Session, Order } = require('../db');

const WEEKINSECONDS = 1000 * 60 * 60 * 24 * 7;

router.post('/mount', async (req, res, next) => {
  try {
      console.log('yalllllll')
    //   console.log(req.session)
    if (req.session) {
      const refreshedSession = await Session.findByPk(req.session.id);
      res
        .cookie('sid', refreshedSession.uuid, {
          maxAge: WEEKINSECONDS,
          path: '/',
        })
        .send(refreshedSession);
        console.log(refreshedSession)
    } else {
      const guestSession = await Session.create();
      res
        .cookie('sid', guestSession.uuid, {
          maxAge: WEEKINSECONDS,
          path: '/',
        })
        .status(201)
        .send(guestSession);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).send({
      message: 'username and password must be strings',
    });
  } else {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
        include: [Session],
      });
      if (user) {
        const comparisonResult = await bcrypt.compare(password, user.password);
        if (!comparisonResult) {
          throw new Error('Wrong password');
        }
        if (user.session) {
          res.cookie('sid', user.session.uuid, {
            maxAge: WEEKINSECONDS,
          });

          const guestSession = req.session;
          const guestCart = await Order.findOne({
            where: {
              sessionId: guestSession.id,
              isPaid: false,
            },
          });
          if (guestCart) {
            const existingUserCart = await Order.findOne({
              where: {
                sessionId: user.session.id,
                isPaid: false,
              },
            });
            if (existingUserCart) {
              const guestCartPlants = await guestCart.getPlants();
              await existingUserCart.addPlants(guestCartPlants);
              await existingUserCart.calcTotal();
              await guestCart.destroy();
            } else await guestCart.setSession(user.session);
          }
          await guestSession.destroy();
          res.status(200).send(user);
        } else {
          const createdSession = await Session.create();
          await createdSession.setUser(user);
          res.cookie('sid', createdSession.uuid, {
            maaxAge: WEEKINSECONDS,
            path: '/',
          });
          res.status(201).send(user);
        }
      } else res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }
});

router.post('/createuser', async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, userEmail } = req.body;
    const hashedPassword = await hash(password);
    const user = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      userEmail,
    });
    if (user) {
      const session = await Session.findOne({
        where: {
          uuid: req.session.uuid,
        },
        
      });
      console.log(session, user)
      await session.setUser(user);
      res.cookie('sid', session.uuid, {
        maxAge: WEEKINSECONDS,
        path: '/',
      });
      res.send(user);
    } else res.sendStatus(500);
  } catch (err) {
    next(err);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    res.clearCookie('sid');
    const guestSession = await Session.create();
    res.cookie('sid', guestSession.uuid, {
      maxAge: WEEKINSECONDS,
      path: '/',
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get('/thisUser', async (req, res, next) => {
  try {
 console.log('thesession', req.session)
    const  uuid  = req.session.dataValues.uuid
    const userSession = await Session.findOne({
      where: {  uuid },
    });
    console.log('yoyoyoyoyoyo',userSession)
    const user = await User.findByPk(userSession.id);
    user ? res.send(user) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.get('/whoami', (req, res, next) => {
  req.user ? res.send({ username: req.user.username }) : res.sendStatus(400);
});

module.exports = router;
