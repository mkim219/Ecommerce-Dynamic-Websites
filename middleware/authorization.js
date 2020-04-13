const isAdmin = (req,res,next)=>{

    if(req.session.user.type == "admin")
    {
        res.render("admin")
    }
    else
    {
        res.render("forbidden_page");
    }
}

module.exports = isAdmin;