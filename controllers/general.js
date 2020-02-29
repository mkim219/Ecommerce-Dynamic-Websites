const express = require('express');
const router = express.Router();

const CategoryModel = require("../model/category")
const bestSellarModel = require("../model/bestSellar")

//home route 
router.get("/", (req, res) => {
    res.render("index", {
        category: CategoryModel.getAllCategory(),
        BestSeller: bestSellarModel.getAllBestSeller()
    });

});

module.exports = router;