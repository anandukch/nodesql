// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("database", "username", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });

// module.exports = sequelize;
const { Sequelize } = require('sequelize');

var sequelize = new Sequelize(
  "database",
  '',
  '',
  {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    // Data is stored in the file `database.sqlite` in the folder `db`.
    // Note that if you leave your app public, this database file will be copied if
    // someone forks your app. So don't use it to store sensitive information.
    storage: "./database.sqlite"
  }
);

module.exports = sequelize;
