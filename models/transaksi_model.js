const { Sequelize } = require("../config/db");

module.exports = (sequelize, Sequelize) => {
    const transaksi = sequelize.define("transaksi", {
        id_transaksi: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_produk: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        size: {
            type: Sequelize.ENUM('S', 'M', 'L', 'XL'),
            allowNull: false,
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        harga_total: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status_pesanan: {
            type: Sequelize.ENUM('menunggu_pembayaran', 'diproses', 'pengiriman', 'selesai'),
            allowNull: false,
        },
        opsi_bayar: {
            type: Sequelize.ENUM('bca', 'mandiri', 'bri', 'bni', 'dana', 'shopeepay'),
            allowNull: false,
        },
        tanggal_pembelian: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        tableName: 'transaksi',
        timestamps: false
    });

    transaksi.associate = (models) => {
        transaksi.belongsTo(models.produk, {
            foreignKey: 'id_produk',
            as: 'produk'
        });

        transaksi.belongsTo(models.user, {
            foreignKey: 'id_user',
            as: 'user'
        });
    };

    return transaksi;
};