var connection = require('./../config');

module.exports.dashboard=function(req,res){
    var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){
        
        res.render('dashboard', {user:user});

    } else {
       res.redirect('/') 
    }
 


}