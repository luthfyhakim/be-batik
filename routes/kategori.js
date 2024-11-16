const express = require("express");
const router = express.Router();

const db = require("../config/db.js");
const kategori = db.kategori;

// mendapatkan semua data
router.get("/", async (req,res,next)=>{
    const allKategori =  await kategori.findAll()
    res.json({
        data: allKategori
    })
})

// membuat data baru
router.post("/", async (req,res,next)=>{
    const newKategori = {
        nama_kategori : req.body.nama_kategori
    }

    const result = await kategori.create(newKategori)
    res.json(result)
})

// Mengupdate data
router.patch("/:id_kategori", async (req, res, next) => {
    const result = await kategori.update(req.body, {where: {id_kategori: req.params.id_kategori}})
    res.json(result)
})

// menghapus data
router.delete("/:id_kategori", async (req, res, next) => {
    const result = await kategori.destroy({where: {id_kategori: req.params.id_kategori}})
    res.json(result)
})

module.exports=router