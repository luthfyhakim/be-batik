// const { DataTypes } = require('sequelize');
const { Sequelize } = require("../config/db");
// const db = require("../config/db.js");

module.exports = (sequelize, Sequelize) => {
    const daerah = sequelize.define("daerah", {
        id_daerah: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        nama_daerah: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        }, {
        tableName: 'daerah',
        timestamps: false
    });
  
    return daerah;
  };
  