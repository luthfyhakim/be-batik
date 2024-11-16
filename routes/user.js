// user.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// const foto = require("../../../sewa_pacar/backend_sewa_pacar/images/")

const db = require("../config/db.js");
const user = db.user;

// untuk mengatur file foto
// Mengatur penyimpanan file menggunakan multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/users/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
})
// Filter jenis file
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG are allowed!'), false);
    }
}

// Inisialisasi upload middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 104 // Maksimal ukuran file 100MB
    },
    fileFilter: fileFilter
})

const JWT_SECRET = process.env.JWT_SECRET || "batikIndonesia"; // Change this to your own secret key

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // If no token is provided, return Unauthorized

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, return Forbidden
        req.user = user;
        next();
    })
}

// mendapatkan semua data (protected)
router.get("/",authenticateToken, async (req, res, next) => {
    try {
        const alluser = await user.findAll();
        res.json({
            result: alluser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
})


// membuat user baru (Token will be generated on creation)
router.post("/", upload.single('foto'), async (req, res, next) => {
    try {
        const newuser = {
            username: req.body.username,
            nama: req.body.nama,
            email: req.body.email,
            password: md5(req.body.password), // Storing hashed password
            alamat: req.body.alamat,
            no_telp: req.body.no_telp,
            foto: req.file ? req.file.filename : null
        };

        const result = await user.create(newuser);

        // Generate JWT token
        const token = jwt.sign(
            { email: result.email, id_user: result.id_user },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.json({
            user: result,
            token: token // Return token to the client
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
})

// fungsi untuk update data
router.patch("/:id_user", upload.single('foto'), async (req, res, next) => {
    const { id_user } = req.params;

    try {
        // menemukan user by id_user
        const foundUser = await user.findOne({ where: { id_user: id_user } });

        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // jika ada photo lama dan user mengupload photo baru, maka hapus photo yang lama
        if (req.file) {
            const oldPhotoPath = `./images/users/${foundUser.foto}`;
            
            // cek foto lama 
            if (fs.existsSync(oldPhotoPath)) {
                fs.unlinkSync(oldPhotoPath); // menghapus foto lama 
            }

            foundUser.foto = req.file.filename;
        }

        const updatedUser = {
            username: req.body.username || foundUser.username,
            nama: req.body.nama || foundUser.nama,
            email: req.body.email || foundUser.email,
            password: req.body.password ? md5(req.body.password) : foundUser.password,
            alamat: req.body.alamat || foundUser.alamat,
            no_telp: req.body.no_telp || foundUser.no_telp,
            foto: foundUser.foto 
        };

        await user.update(updatedUser, { where: { id_user: id_user } });

        res.json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
})

// fungsi untuk login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by user
        const foundUser = await user.findOne({ where: { email: email } });

        if (!foundUser) {
            return res.status(401).json({ message: "User not found" });
        }

        if (foundUser.password !== md5(password)) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Membuat JWT Token untuk dimasukkan di bearer token
        const token = jwt.sign(
            { email: foundUser.email, id_user: foundUser.id_user },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            user: foundUser,
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
})

module.exports=router