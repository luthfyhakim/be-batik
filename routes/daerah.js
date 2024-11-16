const express = require("express");
const router = express.Router();

const db = require("../config/db.js");
const daerah = db.daerah;

// mendapatkan semua data
router.get("/", async (req,res,next)=>{
    const allDaerah =  await daerah.findAll()
    res.json({
    result: allDaerah
    })
})

// membuat data baru
router.post("/", async (req,res,next)=>{
    const newDaerah = {
        nama_daerah : req.body.nama_daerah
    }

    const result = await daerah.create(newDaerah)
    res.json(result)
})

// Mengupdate data
router.patch("/:id_daerah", async (req, res, next) => {
    const result = await daerah.update(req.body, {where: {id_daerah: req.params.id_daerah}})
    res.json(result)
})

// menghapus data
router.delete("/:id_daerah", async (req, res, next) => {
    const result = await daerah.destroy({where: {id_daerah: req.params.id_daerah}})
    res.json(result)
})

module.exports=router