const express = require('express');
const router = express.Router();


const bestSellarModel = require("../model/bestSellar")


//Route for the Products page 
router.get("/products", (req, res) => {
    const type = req.query.type;
    res.render("products", {
        BestSeller: type ? bestSellarModel.getFilteredBestSellar(type) : bestSellarModel.getAllBestSeller()
    });

});

module.exports = router;