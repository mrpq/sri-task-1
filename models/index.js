const Sequelize = require("sequelize");

const scheme = require("./scheme");

const Op = Sequelize.Op;

// const sequelize = new Sequelize(null, null, {
const sequelize = new Sequelize("sqlite:../../db.sqlite3", {
  dialect: "sqlite",
  storage: "db.sqlite3",

  operatorsAliases: { $and: Op.and },

  logging: false
});

scheme(sequelize);
sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.models = sequelize.models;
