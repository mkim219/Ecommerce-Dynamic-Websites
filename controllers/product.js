const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth')
const path = require("path");
const checkAdmin = require('../middleware/authorization');
const addition = require("../model/product");


//Route for the Products page 
router.get("/products", (req, res) => {

    addition.find()
    .then((products)=>{
        const product_List = products.map(products=>{
            return { 
                id: products._id,
                pname: products.pname,
                pprice: products.pprice,
                type: products.type,
                pquan: products.pquan,
                isBest: products.isBest,
                pdet: products.pdet,
                pic: products.productPic
            }
        }); 
        res.render("products",{
            data: product_List,
        });
    })
    .catch(err=>console.log(`Error happended when pulling  from database ${err}`))
});

router.post("/productAdd",isAuthenticated, checkAdmin,(req, res) => {
    const newProduct = {
        pname: req.body.pname,
        pprice: req.body.pprice,
        type: req.body.type,
        pquan: req.body.pquan,
        isBest: req.body.isBest,
        pdet: req.body.pdet,
    }
    const addProduct = new addition(newProduct);
    addProduct.save()
    .then((pic)=>{

        req.files.productPic.name = `pro_pic_${pic._id}${path.parse(req.files.productPic.name).ext}`;

        req.files.productPic.mv(`public/uploads/${req.files.productPic.name}`)
        .then(()=>{


            addition.updateOne({_id:pic._id},{
                productPic: req.files.productPic.name
            })
            .then(()=>{
                res.redirect(`/productAdd`)
            })

        })
      
      
       
    }).catch(err => console.log(`Error happended when inserting data into database ${err}`))
    
});

router.get("/productAdd",isAuthenticated, checkAdmin,(req, res) => {
 
    res.render("productAdd", {
    });

});

router.get("/belt", (req, res) => {
    addition.find({type: "Belt"})
    .then((products)=>{
        const product_List = products.map(products=>{
            return { 
                id: products._id,
                pname: products.pname,
                pprice: products.pprice,
                type: products.type,
                pquan: products.pquan,
                isBest: products.isBest,
                pdet: products.pdet,
                pic: products.productPic
            }
        }); 
        res.render("belt",{
            belt: product_List
        });
    })
    .catch(err=>console.log(`Error happended when pulling  from database ${err}`))
});

router.get("/shoes", (req, res) => {
    addition.find({type: "Lifting Shoes"})
    .then((products)=>{
       
        const product_List = products.map(products=>{
            return { 
                id: products._id,
                pname: products.pname,
                pprice: products.pprice,
                type: products.type,
                pquan: products.pquan,
                isBest: products.isBest,
                pdet: products.pdet,
                pic: products.productPic
            }
        });
        res.render("shoes",{
            shoes: product_List
        });
    })
    .catch(err=>console.log(`Error happended when pulling  from database ${err}`))

});

router.get("/sleeves", (req, res) => {
    addition.find({type: "Sleeves"})
    .then((products)=>{
    
        const product_List = products.map(products=>{
            return { 
                id: products._id,
                pname: products.pname,
                pprice: products.pprice,
                type: products.type,
                pquan: products.pquan,
                isBest: products.isBest,
                pdet: products.pdet,
                pic: products.productPic
            }
        }); 
        res.render("sleeves",{
            sleeves: product_List
        });
    })
    .catch(err=>console.log(`Error happended when pulling  from database ${err}`))
});

router.get("/wrist", (req, res) => {
    addition.find({type: "Wrist Wrap"})
    .then((products)=>{
    
        const product_List = products.map(products=>{
            return { 
                
                id: products._id,
                pname: products.pname,
                pprice: products.pprice,
                type: products.type,
                pquan: products.pquan,
                isBest: products.isBest,
                pdet: products.pdet,
                pic: products.productPic

            }
        }); 
        res.render("wrist",{
            wrist: product_List
        });
    })
    .catch(err=>console.log(`Error happended when pulling  from database ${err}`))

});


router.get("/productDash",isAuthenticated, checkAdmin,(req, res) => {
 
    addition.find()
    .then((products)=>{
        
        const product_List = products.map(products=>{
            return { 
                id: products._id,
                pname: products.pname,
                pprice: products.pprice,
                type: products.type,
                pquan: products.pquan,
                isBest: products.isBest,
                pdet: products.pdet,
                pic: products.productPic
            }
        }); 
     
        res.render("productDash",{
            data: product_List,
        });
    })
    .catch(err=>console.log(`Error happended when pulling  from database ${err}`))

});

router.get("/productEdit/:id",isAuthenticated, checkAdmin,(req,res)=>{

    addition.findById(req.params.id) // return an array when using find() method . use the find when you want to pull mutiple values from database 
    .then((editProduct)=>{
        const {_id,pname,pprice,type,pquan,isBest,pdet} = editProduct; // destructing object
        res.render("productEdit",{
            _id,
            pname,
            pprice,
            type,
            pquan,
            isBest,
            pdet
        })
    })
    .catch(err=>console.log(`Error happended when pulling  from database ${err}`))
    

});

router.put("/productEdit/:id",isAuthenticated, checkAdmin,(req,res)=>{
  
    const {_id,pname,pprice,type,pquan,isBest,pdet} = req.body;
     const toBeUpdate = 
     {
        id: _id,
        pname: pname,
        pprice: pprice,
        type: type,
        pquan: pquan,
        isBest: isBest,
        pdet: pdet
     };
     addition.updateOne({_id: req.params.id},toBeUpdate)
     .then(()=>{
         res.redirect("/productDash");
     })
     .catch(err=>console.log(`Error happended when updating data from database ${err}`))
    });

router.delete("/productDash/:id",isAuthenticated, checkAdmin,(req,res)=>{
        addition.deleteOne({_id: req.params.id})
        .then(()=>{
            res.redirect("/productDash");
        })
        .catch(err=>console.log(`Error happended when deleting data from database ${err}`))
    
    });

router.get("/product_detail/:id",(req, res) => {

    addition.findById(req.params.id) // return an array when using find() method . use the find when you want to pull mutiple values from database 
    .then((editProduct)=>{
        const {_id,pname,pprice,type,pquan,isBest,pdet,productPic} = editProduct; // destructing object
        res.render("product_detail",{
            _id,
            pname,
            pprice,
            type,
            pquan,
            isBest,
            pdet,
            productPic
        })
    })
    .catch(err=>console.log(`Error happended when pulling  from database ${err}`))
});
    

module.exports = router;