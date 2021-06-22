const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./product");

const Order = db.define("order", {
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recipient: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shippingAddress: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM(
      "cart",
      "cancelled",
      "purchased",
      "shipped",
      "delivered"
    ),
    allowNull: false,
    defaultValue: "cart",
  },
});

// Find order of a user w/ "cart" status
Order.findCartOrder = async function (reqId) {
  return await Order.findOne({
    where: {
      userId: reqId,
      status: "cart",
    },
    include: [{ model: Product }],
  });
};

Order.prototype.addProductsToOrder = function (products) {
  products.forEach(async (item) => {
    await this.addProduct(item.id, {
      through: {
        itemQty: item.count,
        itemPrice: item.subtotal,
      },
    });
  });
};

module.exports = Order;
