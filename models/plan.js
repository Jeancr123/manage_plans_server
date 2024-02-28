const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Purchase = require('./purchase')

const Plan = sequelize.define('plan', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    }
  });


module.exports = Plan;