const Sequelize = require("sequelize");
const db = require("../db");

const OrderedItem = db.define(
  "orderedItem",
  {
    itemQty: {
      type: Sequelize.STRING,
    },
    itemPrice: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false }
);

module.exports = OrderedItem;
