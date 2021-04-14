const { Session, User } = require('../db');

const authMiddleware = async (req, res, next) => {

  const { sid } = req.cookies;
console.log('reqqqq',req.cookies)
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
      console.log(chalk.red('Invalid session ID - not in database. Removing cookie.'));
      res.clearCookie('sid');
      req.session = null;
    } else {
      if (session.user) {
        console.log(`Session User Identified: ${session.user.username}`);
      } else {
        console.log('Session User Identified: Guest');
      }
      req.session = session;
    }
  }
  next();
};

module.exports = authMiddleware;
