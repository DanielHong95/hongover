const Sequelize = require("sequelize");
const db = require("../database/db");

const Cart = db.define(
  "carts",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNULL: false,
      primaryKey: true,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Cart.associate = (models) => {
  Cart.belongsTo(models.Products);
  Cart.belongsTo(models.Users);
};

module.exports = Cart;
