const express = require('express')
const path = require('path');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 8080

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// set image to public
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('You Can Only Access this file by Admin')
})

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log('Request received:', {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers
  });
  next();
});

// Importing all the routes
const adminroute = require("./routes/admin.js")
const produkroute = require("./routes/produk.js")
const userroute = require("./routes/user.js")
const daerahroute = require("./routes/daerah.js")
const kategoriroute = require("./routes/kategori.js")
const transaksiroute = require("./routes/transaksi.js")

app.use("/admin",adminroute)
app.use("/produk",produkroute)
app.use("/user",userroute)
app.use("/daerah",daerahroute)
app.use("/kategori",kategoriroute)
app.use("/transaksi",transaksiroute)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})