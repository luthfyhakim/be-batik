// const { DataTypes } = require('sequelize');
const { Sequelize } = require("../config/db");
// const db = require("../config/db.js");

module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define("admin", {
        id_admin: {
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
        }, {
        tableName: 'admin',
        timestamps: false
    });
  
    return admin;
  };
  