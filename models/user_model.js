// const { DataTypes } = require('sequelize');
const { Sequelize } = require("../config/db");
// const db = require("../config/db.js");

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        no_telp: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        foto: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        }, {
        tableName: 'user',
        timestamps: false
    });
  
    return user;
  };
  