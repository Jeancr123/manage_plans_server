const sequelize = require("../database");
const planSeeds = require("../dev-data/plans");
const userSeeds = require("../dev-data/users");
const Plan = require("./plan");
const Purchase = require("./purchase");
const User = require("./user");

Purchase.belongsTo(User);
Purchase.hasMany(Plan, {as: 'plans'});
Plan.hasMany(Purchase, {as: 'purchases'});
User.hasMany(Purchase, {as: 'purchases'});

  module.exports = {
    Plan,
    User,
    Purchase
  }