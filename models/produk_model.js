const { Sequelize } = require("../config/db");

module.exports = (sequelize, Sequelize) => {
    const produk = sequelize.define("produk", {
        id_produk: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_daerah: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        id_kategori: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        nama_produk: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        harga: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        deskripsi: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        foto: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'produk',
        timestamps: false
    });

    // Define associations after the model is defined
    produk.associate = (models) => {
        // Association with Daerah
        produk.belongsTo(models.daerah, {
            foreignKey: 'id_daerah',
            as: 'daerah'
        });

        // Association with Kategori
        produk.belongsTo(models.kategori, {
            foreignKey: 'id_kategori',
            as: 'kategori'
        });
    };

    return produk;
};