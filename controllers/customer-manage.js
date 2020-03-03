const express = require('express');
const router = express.Router();

router.get("/customer-registration", (req, res) => {
    res.render("customer-registration", {
    });

});

router.post("/customer-registration", (req, res) => {

    const errors = {};

    //validation
    if (!req.body.fullName) {
        errors.errorName = ["You must enter your name"]
    }

    if (!req.body.email) {
        errors.errorEmail = ["You must enter your email"];
    }

    if (!req.body.psw) {
        errors.errorPws = ["You must enter password"];
    }

    if (!req.body.pswrepeat) {
        errors.errorRe = ["You must enter your password again"];
    }

    const password = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!req.body.psw.match(password)) {
        errors.errorVal = ["You must enter password between 7 to 15 & contain at least one numberic digit & special character"]
    }



    //email
    if (req.body.psw.match(req.body.pswrepeat)) {
        const { fullName, email } = req.body
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: `${email}`,
            from: 'rocking1782@gmail.com',
            subject: `${fullName}, Welcome To MS Powerlifting Store`,
            html:
                `
        Welcome To MS Powerlifting Store!!
        `
        };
        sgMail.send(msg)
            .then(() => {
                res.redirect("/welcome");
            })
            .catch(err => {
                console.log(`Error ${err}`);
            });
    } else {
        errors.errormatch = ["Password is not matching"];
        
    }

    // if (req.body.psw.match(req.body.pswrepeat) && req.body.psw.match(req.body.pswrepeat) && req.body.email && !req.body.pswrepeat) {
    //     res.redirect('/welcome');
    // }else{
    //     return false;
    // }

    // if (!req.body.psw.match(req.body.pswrepeat)) {

    //     errors.errormatch = ["Password is not matching"];
    // }
    if (Object.keys(errors).length) {
        res.render("customer-registration", errors);
    }
});

router.get("/welcome", (req, res) => {

    res.render("welcome", {

    });

});

router.get("/login", (req, res) => {

    res.render("login", {
        title: "login",
        headingInfo: "login"

    });

});

router.post("/login", (req, res) => {

    res.render("login", {
        title: "login",
        headingInfo: "login"

    });

});

module.exports = router;