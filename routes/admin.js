const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const db = require("../config/db.js");
const admin = db.admin;

const JWT_SECRET = "batikIndonesia";

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

// mendapatkan semua data admin (Protected route)
router.get("/", authenticateToken, async (req, res, next) => {
  try {
      const alladmin = await admin.findAll();
      res.json({
          result: alladmin
      });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
  }
})

// Get single talent by ID
router.get("/:id_talent", async (req, res, next) => {
  try {
      const singleTalent = await talent.findByPk(req.params.id_talent);
      if (!singleTalent) {
          return res.status(404).json({ message: "Talent not found" });
      }
      res.json({
          result: singleTalent
      });
  } catch (error) {
      next(error);
  }
});

// Menambahkan data admin baru (Public route)
router.post("/", async (req, res, next) => {
  try {
    const newAdmin = {
        username: req.body.username,
        nama: req.body.nama,
        email: req.body.email,
        password: md5(req.body.password) // Storing hashed password
      
    };

    const result = await admin.create(newAdmin);

    // Generate JWT token
    const token = jwt.sign(
      { email: result.email, id_admin: result.id_admin },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      admin: result,
      token: token // Return token to the client
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', details: error.message });
  }
});

// Mengupdate data
router.patch("/:id_admin", async (req, res, next) => {
    try {
      // Check if password is provided in the update request
      if (req.body.password) {
        // Hash the new password before updating
        req.body.password = md5(req.body.password);
      }
  
      // Update the admin data with the new fields
      const result = await admin.update(req.body, {
        where: { id_admin: req.params.id_admin }
      });
  
      if (result[0] === 0) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      res.json({ message: "Admin updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating admin", details: error.message });
    }
  });  

// menghapus data
router.delete("/:id_admin", async (req, res, next) => {
  const result = await admin.destroy({where: {id_admin: req.params.id_admin}})
  res.json(result)
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = md5(password);

    console.log('Login attempt:', {
      email,
      hashedPassword,
      originalPassword: password // Remove this in production
    });

    // Find admin with exact email match
    const foundAdmin = await admin.findOne({ 
      where: { 
        email: email
      },
      raw: true // Get plain object
    });

    console.log('Found admin:', foundAdmin); // For debugging

    if (!foundAdmin) {
      console.log('No admin found with email:', email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    if (foundAdmin.password !== hashedPassword) {
      console.log('Password mismatch:', {
        stored: foundAdmin.password,
        received: hashedPassword
      });
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { 
        id_admin: foundAdmin.id_admin, 
        email: foundAdmin.email,
        username: foundAdmin.username 
      }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful for:', email);

    res.json({
      message: "Login successful",
      admin: {
        id: foundAdmin.id_admin,
        email: foundAdmin.email,
        username: foundAdmin.username
      },
      token: token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Server error during login",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
