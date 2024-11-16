// const { DataTypes } = require('sequelize');
const { Sequelize } = require("../config/db");
// const db = require("../config/db.js");

module.exports = (sequelize, Sequelize) => {
    const kategori = sequelize.define("kategori", {
        id_kategori: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        nama_kategori: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        }, {
        tableName: 'kategori',
        timestamps: false
    });
  
    return kategori;
  };
  