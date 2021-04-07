const db = require('./db');
const User = require('./models/User')
const Plant = require('./models/Plant')
const Category = require('./models/Category')
const Order = require('./models/Order')
const Session = require('./models/Session')
const Lineitem = require('./models/Lineitem')

Plant.belongsTo(Category)
Category.hasMany(Plant)

Plant.belongsToMany(Order, { through: Lineitem })
Order.belongsToMany(Plant, { through: Lineitem })

User.hasOne(Session)
Session.belongsTo(User)

Session.hasMany(Order)
Order.belongsTo(Session)

module.exports = {
  db, User, Plant, Category, Order, Session, Lineitem
};
