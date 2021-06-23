const Sequelize = require("sequelize");
const db = require("../db");

const OrderedItem = db.define(
  "orderedItem",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    itemQty: {
      type: Sequelize.INTEGER,
    },
    itemPrice: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false }
);

// Find a product row matching orderId and incoming productId
OrderedItem.findProductRow = function (cartId, productId) {
  return OrderedItem.findOne({
    where: {
      orderId: cartId,
      productId: productId
    }
  })
}

module.exports = OrderedItem;
