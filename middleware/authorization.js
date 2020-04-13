const isAdmin = (req,res,next)=>{

    if(req.session.user.type == "admin")
    {
        res.redirect("/admin")
    }
    else
    {
        res.redirect("/forbidden_page");
    }
}

module.exports = isAdmin;