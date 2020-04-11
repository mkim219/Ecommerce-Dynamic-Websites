const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth')

const bestSellarModel = require("../model/bestSellar")
const addition = require("../model/product");


//Route for the Products page 
router.get("/products", (req, res) => {
    const type = req.query.type;
    res.render("products", {
        BestSeller: type ? bestSellarModel.getFilteredBestSellar(type) : bestSellarModel.getAllBestSeller()
    });

});

router.post("/productAdd",isAuthenticated, (req, res) => {
    const newProduct = {
        pname: req.body.pname,
        pprice: req.body.pprice,
        pcat: req.body.pcat,
        pquan: req.body.pquan,
        isBest: req.body.isBest,
        pdet: req.body.pdet,

    }
  
    const task = new addition(newProduct);
    task.save()
        .then(() => {
        })
        .catch(err => console.log(`Error happended when inserting data into database ${err}`))
    
        res.render("productAdd", {
    });

});

router.get("/productAdd",isAuthenticated, (req, res) => {
 
    res.render("productAdd", {
    });

});

module.exports = router;