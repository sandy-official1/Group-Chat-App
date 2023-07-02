const Sequelize = require("sequelize");

const sequelize = new Sequelize("groupchatapp", "root", "Sandeep@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
