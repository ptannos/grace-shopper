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
    // orderId: {
    //   type: Sequelize.INTEGER,
    // },
    // productId: {
    //   type: Sequelize.INTEGER,
    // },
    itemQty: {
      type: Sequelize.INTEGER,
    },
    itemPrice: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false }
);

module.exports = OrderedItem;
