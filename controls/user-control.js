var connection = require('../config');
var bcrypt = require('bcryptjs');

module.exports.register = function(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8,)
     
      
      var  name = req.body.name;
      var  username = req.body.username;
      var  email = req.body.email;
      var  password = hashedPassword;
      var  address = req.body.address;
      var  contact  = req.body.contact;
      var  manager  = req.body.manager;
      var  infomanager  = req.body.infomanager;
      var  information  = req.body.information;
       

     if(!req.files)
     return req.status(400).send('No files were uploader.');
   
     var file = req.files.picture;
     var img_name = file.name;
   
     if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ||file.mimetype == "image/gif"){
           
       file.mv('publics/assets/images/users/'+file.name, function(err){
           if(err)
           return res.status(500).json(err);
           var sql = "INSERT INTO `users`(`name`,`username`,`email`,`password`,`address`,`contact`,`manager`,`infomanager`,`information`,`picture`) VALUES ('" + name + "','" + username + "','" + email + "','" + password + "','" + address + "','" + contact + "','" + manager + "','" + infomanager + "','" + information + "','" + img_name + "')";
           var query = connection.query(sql, function(err, result){
                   console.log(result)
                  res.redirect('/')
           })
   
       })
   
     } else {
       message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
       console.log(message);
       res.render('register.ejs',{message: message});
     }
    
   
   
    
   
   
   
   
   }
   module.exports.login=function(req,res){
    sess = req.session;
    sess.email = req.body.email;
    sess.password = req.body.password;

    if(!sess.email || !sess.password){
        res.redirect('/') 
        alert("inputs are empty")
    } else {
   connection.query('SELECT * FROM users WHERE email = ? ',[sess.email], function (error, results, fields) {
     
    if (results[0].password) {
        bcrypt.compare(sess.password, results[0].password, function(err, result) {
         if(result) {
               req.session.userId = results[0].id;
               req.session.user = results[0];
               res.redirect('/dashboard');
              
             }
         else {
            res.redirect('/') 
         }
       })
      }
    
    
    
    
    
    
   });
}
}