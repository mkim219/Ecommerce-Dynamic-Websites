const express = require("express"); //this imports the express package that was installed within your application
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser")

const CategoryModel = require("./model/category")
const bestSellarModel = require("./model/bestSellar")

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.static("public/img")); 
//makse express to make form data avaiable via req.body in ever
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {

    res.render("index", {
        category: CategoryModel.getAllCategory(),
        BestSeller: bestSellarModel.getAllBestSeller()
    });

});
//Route for the Products page 
app.get("/products", (req, res) => {
    const type = req.query.type;
    res.render("products", {
        BestSeller: type ? bestSellarModel.getFilteredBestSellar(type): bestSellarModel.getAllBestSeller()
    });

});

app.get("/customer-registration", (req, res) => {
    res.render("customer-registration", {
        title: "customer-registration",
    
    });

});

app.post("/customer-registration", (req, res) => {
    const errorMessagesFullName = [];
    const errorMessagesEmail = [];
    const errorMessagesPassword = [];
    const errorMessagesRe = [];
    const errorValLen = [];
    const errors = {};

    //validation
    if(!req.body.fullName)
    {
        errors.errorName = ["You must enter your name"]
       // errorMessagesFullName.push("You must enter your name");
    }

    if(req.body.email=="")
    {
        errors.errorEmail = ["You must enter your email"];
    }

    if(req.body.psw=="")
    {
        errors.errorPws = ["You must enter your password"];
    }

    if(req.body.pswrepeat=="")
    {
        errors.errorRe = ["You must enter your password again"];
    }
    if(req.body.psw.length < 9 || req.body.psw.length > 12){
        errors.errorLen = ["You must enter password length bewteen 9 to 12"];
    }
   
    //If theres any errors in the error object, reject the registration and display validation
    if (Object.keys(errors).length) {
        res.render("customer-registration", errors);
        
    } 


    //record the customer information


    //send email


    // //If the user enters all the data and submit the form
    // const { fullName } = req.body;
    // res.render("customer-registration",{
    //     successMessage :`Thank you ${fullName}
    //     we received your information and will contact you shortly`
    // });

});



app.get("/login", (req, res) => {

    res.render("login", {
        title: "login",
        headingInfo: "login"

    });

});

app.post("/login", (req, res) => {

    res.render("login", {
        title: "login",
        headingInfo: "login"

    });

});

const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web Server Started`);
});