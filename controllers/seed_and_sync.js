const sequelize = require("../database");
const planSeeds = require("../dev-data/plans");
const userSeeds = require("../dev-data/users");
const { User, Plan } = require("../models");

module.exports = (req, res, next) => {
    try {
        sequelize.sync({force: true}).then(() => {
            userSeeds.map((e) => {
              User.create(e)
            })
            planSeeds.map((e) => {
              Plan.create(e)
            })
          })
          res.json({'message': 'Completed'})
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };