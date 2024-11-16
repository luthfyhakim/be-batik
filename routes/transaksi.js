const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const db = require("../config/db.js");
const transaksi = db.transaksi;
const produk = db.produk;
const user = db.user;

const JWT_SECRET = "batikIndonesia";

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Get all transactions with related data
router.get("/", async (req, res) => {
  try {
    const allTransactions = await transaksi.findAll({
      include: [
        {
          model: produk,
          as: 'produk',
          attributes: ['nama_produk', 'harga']
        },
        {
          model: user,
          as: 'user',
          attributes: ['nama']
        }
      ]
    });

    // Format the response to match frontend requirements
    const formattedTransactions = allTransactions.map(transaction => ({
      id_transaksi: transaction.id_transaksi,
      nama_produk: transaction.produk?.nama_produk || '',
      harga_satuan: transaction.produk?.harga || 0,
      nama_user: transaction.user?.nama || '',
      size: transaction.size,
      quantity: transaction.quantity,
      status_pesanan: transaction.status_pesanan,
      opsi_bayar: transaction.opsi_bayar,
      harga_total: transaction.harga_total,
      created_at: transaction.created_at
    }));

    res.json({
      result: formattedTransactions
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ 
      message: 'Error fetching transactions',
      error: error.message 
    });
  }
});

// Create new transaction
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { id_produk, size, quantity, opsi_bayar } = req.body;

    if (!id_produk || !size || !quantity || !opsi_bayar) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    // Fetch the product to get its price
    const selectedProduct = await produk.findByPk(id_produk);
    
    if (!selectedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    // Calculate total price based on quantity
    const harga_total = selectedProduct.harga * quantity;

    const newTransaction = {
      id_produk,
      size,
      quantity,
      id_user: req.user.id_user,
      harga_total, // Updated total price calculation
      status_pesanan: "menunggu_pembayaran",
      opsi_bayar
    };
    console.log(newTransaction);

    const result = await transaksi.create(newTransaction);
    res.status(201).json({
      message: 'Transaction created successfully',
      result
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ 
      message: 'Error creating transaction', 
      error: error.message 
    });
  }
});

// Update transaction status
router.patch("/:id_transaksi",  async (req, res) => {
  try {
    const { id_transaksi } = req.params;
    const { status_pesanan } = req.body;

    // Validate status_pesanan
    const validStatuses = ['menunggu_pembayaran', 'diproses', 'selesai', 'dibatalkan'];
    if (!validStatuses.includes(status_pesanan)) {
      return res.status(400).json({
        message: 'Invalid status_pesanan value'
      });
    }

    // Check if transaction exists
    const existingTransaction = await transaksi.findByPk(id_transaksi);
    if (!existingTransaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    // Update the transaction
    await transaksi.update(
      { status_pesanan },
      { where: { id_transaksi } }
    );

    // Fetch updated transaction with related data
    const updatedTransaction = await transaksi.findByPk(id_transaksi, {
      include: [
        {
          model: produk,
          as: 'produk',
          attributes: ['nama_produk', 'harga']
        },
        {
          model: user,
          as: 'user',
          attributes: ['nama']
        }
      ]
    });

    res.json({
      message: 'Transaction updated successfully',
      result: {
        id_transaksi: updatedTransaction.id_transaksi,
        nama_produk: updatedTransaction.produk?.nama_produk,
        harga: updatedTransaction.produk?.harga,
        nama_user: updatedTransaction.user?.nama,
        size: updatedTransaction.size,
        quantity: updatedTransaction.quantity,
        status_pesanan: updatedTransaction.status_pesanan,
        opsi_bayar: updatedTransaction.opsi_bayar,
        harga_total: updatedTransaction.harga_total
      }
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({
      message: 'Error updating transaction',
      error: error.message
    });
  }
});

// Delete transaction
router.delete("/:id_transaksi",  async (req, res) => {
  try {
    const { id_transaksi } = req.params;

    // Check if transaction exists
    const existingTransaction = await transaksi.findByPk(id_transaksi);
    if (!existingTransaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    await transaksi.destroy({
      where: { id_transaksi }
    });

    res.json({
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({
      message: 'Error deleting transaction',
      error: error.message
    });
  }
});

module.exports = router;