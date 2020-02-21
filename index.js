const express = require("express"); //this imports the express package that was installed within your application
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser")
const nodemailer = require('nodemailer');

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
  
    const errors = {};

    //validation
    if(!req.body.fullName)
    {
        errors.errorName = ["You must enter your name"]
    }

    if(!req.body.email)
    {
        errors.errorEmail = ["You must enter your email"];
    }

    if(!req.body.psw)
    {
        errors.errorPws = ["You must enter password"];
    }

    if(!req.body.pswrepeat)
    {
        errors.errorRe = ["You must enter your password again"];
    }

    const password =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if(!req.body.psw.match(password)){
        errors.errorVal = ["You must enter your password between 7 to 15 and contain at least one numberic digit and special character"]
    }
   
    //If theres any errors in the error object, reject the registration and display validation
    if (Object.keys(errors).length) {
        res.render("customer-registration", errors);
        
    } 
    //email
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rocking1782@gmail.com',
          pass: '@1Kms27272'
        }
      });
      
      const mailOptions = {
        from: 'rocking1782@gmail.com',
        to: req.body.email,
        subject: 'Welcome to MS PowerLifting',
        text: `Dear. ${req.body.fullName}. 
        Welcome to MS PowerLifting Store!`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

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



// email


// // priactice 
// const errorMessagesFullName = [];
// const errorMessagesEmail = [];
// const errorMessagesPassword = [];
// const errorMessagesRe = [];
// const errorMessageLength = [];

// //validation
// if(req.body.fullName=="")
// {
//     errorMessagesFullName.push("You must enter your name");
// }

// if(req.body.email=="")
// {
//     errorMessagesEmail.push("You must enter your email");
// }

// if(req.body.psw=="")
// {
//     errorMessagesPassword.push("You must enter your password");
// }

// if(req.body.pswrepeat=="")
// {
//     errorMessagesRe.push("You must enter your password again");
// }

// if(req.body.psw.length < 9 || req.body.psw.length > 12){
//     errorMessageLength.push("Length of password should be between 9 to 12");
// }

// //If the user does not enter all the information
// if(errorMessagesFullName.length > 0 || 
//    errorMessagesEmail.length > 0 || 
//    errorMessagesPassword.length > 0 || 
//    errorMessagesRe.length > 0||
//    errorMessageLength >0)
// {
//         res.render("customer-registration",{
//                 error0 : errorMessagesFullName,
//                 error1 :errorMessagesEmail,
//                 error2 : errorMessagesPassword,
//                 error3 : errorMessagesRe,
//                 error4 : errorMessageLength
//         });
// }