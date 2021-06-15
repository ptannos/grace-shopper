const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  totalQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  shippingAddress: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('cart', 'cancelled', 'purchased', 'shipped', 'delivered'),
    allowNull: false,
    defaultValue: 'cart'
  },
})

module.exports = Order
