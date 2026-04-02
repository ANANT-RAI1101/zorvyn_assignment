'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
const { SALT } = require("../config/server-config.js");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Record, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100]
      }
    },
    role: {
      type: DataTypes.ENUM("viewer", "analyst", "admin"),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false
    }
    
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
  });
  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const encryptedPassword = bcrypt.hashSync(user.password, SALT);
      user.password = encryptedPassword;
    }
  });
  return User;
};