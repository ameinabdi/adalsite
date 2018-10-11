var connection = require('./../config');

module.exports.aboutus=function(req,res){
    var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){
        res.render('about.ejs', {user:user})
 
    } else {
       res.redirect('/login') 
    }
 


}