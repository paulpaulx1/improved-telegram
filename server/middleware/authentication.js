const { Session, User } = require('../db');

const authMiddleware = async (req, res, next) => {
  const { sid } = req.cookies;
  if (!sid) {
    console.log('No session associated with this user.');
    req.session = null;
  } else {
    const session = await Session.findOne({
      where: {
        uuid: sid,
      },
      include: [User],
    });
    if (!session) {
      console.log(
        chalk.red('Invalid session ID - not in database. Removing cookie.')
      );
      res.clearCookie('sid');
      req.session = null;
    } else {
      session.user
        ? console.log(`session user: ${session.user.username}`)
        : console.log('guest user');
    }
    req.session = session;
  }
  next();
};

module.exports = authMiddleware;
