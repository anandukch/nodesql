const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const User = sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // user_image: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  total_orders: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  last_logged_in: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
module.exports = User;
