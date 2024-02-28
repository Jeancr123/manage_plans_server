const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcrypt');


const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  
User.beforeCreate(async (user) => {
  if (user.password) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

module.exports = User;