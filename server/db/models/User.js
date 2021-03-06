const Sequelize = require('sequelize');
const db = require('../db');

const { STRING, ENUM } = Sequelize;

const User = db.define('user', {
  username: {
    type: STRING,
    unique: true,
  },
  userType: {
    type: ENUM('admin', 'shopper'),
    defaultValue: 'shopper',
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validation: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
  },
  userEmail: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
