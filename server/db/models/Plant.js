const Sequelize = require('sequelize');
const db = require('../db');

const { STRING, FLOAT, INTEGER } = Sequelize;

const Plant = db.define('plant', {
  plantName: {
    type: STRING,
    allowNull: false,
    unique: true,
    validation: {
      notEmpty: true,
    },
  },
  price: {
    type: FLOAT,
    allowNull: false,
    validation: {
      notEmpty: true,
    },
  },
  quantity: {
      type: INTEGER,
      defaultValue: 200,
  },
  imageUrl: {
      type: STRING,
      defaultValue: 'https://i.etsystatic.com/14353841/r/il/6f11cf/1857557921/il_570xN.1857557921_3ad2.jpg'
  },
  description: {
    type: Sequelize.TEXT,
  },
  discount: {
      type: FLOAT,
  },
  countryOfOrigin: {
      type: STRING,
  }
});

module.exports = Plant