const Sequelize = require('sequelize')
const db = require('../db')

const { STRING, BOOLEAN, DECIMAL } = Sequelize

const Order = db.define('order', {
    isPaid: {
        type: BOOLEAN,
        defaultValue: false,
    },
    total: {
        type: DECIMAL(10, 2),
        defaultValue: 0,
    },
    shippingAddress: {
        type: STRING
    },
    isShipped: {
        type: BOOLEAN,
        defaultValue: false
    },
    name: {
        type: STRING,
    },
    email: {
        type: STRING,
        validate: {
            isEmail: true,
            notEmpty: true,
        }
    }
})

Order.prototype.calcTotal = async function () {
    const thisOrderPlants = await this.getPlants()
    this.total = thisOrderPlants.reduce((acc, widget) => {
        acc += widget.price * widget.lineitem.quantity
        return acc
    }, 0)
    await this.save()
}

module.exports = Order
