const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = require("../config/db.js");
const produk = db.produk;
const daerah = db.daerah;
const kategori = db.kategori;

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './images/produks';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'produk-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Helper function to delete old photo
const deleteOldPhotos = async (photoNames) => {
    if (!Array.isArray(photoNames)) {
        photoNames = [photoNames];
    }
    
    for (const photoName of photoNames) {
        if (photoName) {
            const fullPath = path.join('./images/produks', photoName);
            if (fs.existsSync(fullPath)) {
                try {
                    fs.unlinkSync(fullPath);
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }
        }
    }
};

// Get all produks
router.get("/", async (req, res, next) => {
    if (req.query.id_kategori) {
        try {
            const produksByKategori = await produk.findAll({
                where: { id_kategori: req.query.id_kategori },
                include: [
                    {
                        model: daerah,
                        as: 'daerah',
                        attributes: ['nama_daerah']
                    },
                    {
                        model: kategori,
                        as: 'kategori',
                        attributes: ['nama_kategori']
                    }
                ]
            });
    
            if (produksByKategori.length === 0) {
                return res.status(404).json({ message: "No produks found for this kategori" });
            }
    
            res.json({
                data: produksByKategori
            });
        } catch (error) {
            next(error);
        }
    }

    try {
        const allProduk = await produk.findAll({
            include: [
                {
                  model: daerah,
                  as: 'daerah',
                  attributes: ['nama_daerah']
                },
                {
                  model: kategori,
                  as: 'kategori',
                  attributes: ['nama_kategori']
                }
            ]
        });
        res.json({
            data: allProduk
        });
    } catch (error) {
        next(error);
    }
});

// Get produk by id
router.get("/:id_produk", async (req, res, next) => {
    try {
        const produkById = await produk.findByPk(req.params.id_produk, {
            include: [
                {
                    model: daerah,
                    as: 'daerah',
                    attributes: ['nama_daerah']
                },
                {
                    model: kategori,
                    as: 'kategori',
                    attributes: ['nama_kategori']
                }
            ]
        });

        if (!produkById) {
            return res.status(404).json({ message: "produk not found" });
        }

        res.json(produkById);
    } catch (error) {
        next(error);
    }
});

// Create new produk with multiple photo upload
router.post("/", upload.array('foto', 5), async (req, res, next) => {
    try {
        const newProduk = {
            id_daerah: req.body.id_daerah,
            id_kategori: req.body.id_kategori,
            nama_produk: req.body.nama_produk,
            harga: req.body.harga,
            deskripsi: req.body.deskripsi,
            foto: req.files ? JSON.stringify(req.files.map(file => file.filename)) : null,
        };

        const result = await produk.create(newProduk);
        res.json(result);
    } catch (error) {
        if (req.files) {
            // Delete uploaded files if there's an error
            const filenames = req.files.map(file => file.filename);
            await deleteOldPhotos(filenames);
        }
        next(error);
    }
});

// Update produk with photo
router.patch("/:id_produk", upload.array('foto', 5), async (req, res, next) => {
    try {
        // Get existing produk
        const existingProduk = await produk.findByPk(req.params.id_produk);
        if (!existingProduk) {
            return res.status(404).json({ message: "produk not found" });
        }

        const updateData = { ...req.body };
        
        // If new photos are uploaded
        if (req.files && req.files.length > 0) {
            // Delete old photos
            const oldPhotos = JSON.parse(existingProduk.foto || '[]');
            await deleteOldPhotos(oldPhotos);
            
            // Set new photos
            updateData.foto = JSON.stringify(req.files.map(file => file.filename));
        }

        const result = await produk.update(updateData, {
            where: { id_produk: req.params.id_produk }
        });

        res.json(result);
    } catch (error) {
        if (req.files) {
            // Delete uploaded files if there's an error
            const filenames = req.files.map(file => file.filename);
            await deleteOldPhotos(filenames);
        }
        next(error);
    }
});

// Delete produk and its photo
router.delete("/:id_produk", async (req, res, next) => {
    try {
        // Get existing produk
        const existingProduk = await produk.findByPk(req.params.id_produk);
        if (!existingProduk) {
            return res.status(404).json({ message: "produk not found" });
        }

        // Delete photo files
        const photos = JSON.parse(existingProduk.foto || '[]');
        await deleteOldPhotos(photos);

        // Delete produk from database
        const result = await produk.destroy({
            where: { id_produk: req.params.id_produk }
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;