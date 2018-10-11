var connection = require('../config');
var bcrypt = require('bcryptjs');

module.exports.register = function(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)
     
      
      var  name = req.body.name;
      var  username = req.body.username;
      var  email = req.body.email;
      var  password = hashedPassword;
      var  address = req.body.address;
      var  contact  = req.body.contact;
      var  manager  = req.body.manager;
      var  infomanager  = req.body.infomanager;
      var  information  = req.body.information;
      var  category  = req.body.category;
       

     if(!req.files)
     return req.flash('danger', 'Waxa jira cilad fadlan la xidhiidh qaybta macaamiisha .');              
     
     var file = req.files.picture;
     var img_name = file.name;
   
     if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png" ||file.mimetype == "image/gif"){
           
       file.mv('publics/assets/images/users/'+file.name, function(err){
           if(err){
            req.flash('danger', 'Waxa jira cilad fadlan la xidhiidh qaybta macaamiisha .');    
             res.redirect('/signup');   
           }
           

           connection.query('SELECT email FROM users WHERE email =  ?',email, function(error, rows){ 
             
             
            if(rows.length){
         

              console.log(rows.length)
              req.flash('danger', 'email horaa la iskaga diwaan galiyey .');              
              res.redirect('/signup');
             } else{
              var sql = "INSERT INTO `users`(`name`,`username`,`email`,`password`,`address`,`contact`,`manager`,`infomanager`,`information`,`category`, `picture`) VALUES ('" + name + "','" + username + "','" + email + "','" + password + "','" + address + "','" + contact + "','" + manager + "','" + infomanager + "','" + information + "','" + category + "','" + img_name + "')";
              var query = connection.query(sql, function(err, result){
                if(err){
                 console.log(err)
                 req.flash('danger', 'Waxa jira cilad fadlan la xidhiidh qaybta macaamiisha .');     
                 res.redirect('/signup');    
                }else{
   
                  req.flash('success', 'Waad is diwaan gelisay Fadlan Ka Gal Halkan .');              
                  res.redirect('/');    
       
   
                }
                 })

          
              







             }


           })


         
   
       })
   
     } else {
      req.flash('danger', 'Sawirka Noocan ah Ma ogala Fadlan Ka Dhig jpg ama png');              
       res.redirect('/signup');
     }
    
   
   
    
   
   
   
   
   }
module.exports.login=function(req,res){
    sess = req.session;
    sess.email = req.body.email;
    sess.password = req.body.password;
  
    

    if(!sess.email || !sess.password){
        req.flash('error', 'fadlan geli email kaaga iyo furaha sirta ah si aad u gasho');              
        res.redirect('/login') 
      } else {
   connection.query('SELECT * FROM users WHERE email = ? ',sess.email, function(error, rows){
    if(rows.length){
      connection.query('SELECT * FROM users WHERE email = ? ',[sess.email], function (error, results, fields) {
   
        if (results[0].password) {
          bcrypt.compare(sess.password, results[0].password, function(err, result) {
            if(result) {
                  req.session.userId = results[0].id;
                  req.session.user = results[0];
                  req.flash('success', 'Ku Soo Dhawow. Macmiil Gacmo Furan!');              

                  res.redirect('/dashboard');
        }  else {
          req.flash('error', 'Waxbaa Ka Qaldan Fadlan La xidhiidh Qaybta Macamiisha');              
          res.redirect('/login') 
 
                    
             }
           })
          }
        
        
        
        
        
        
        
       });



    } else{

      
      req.flash('error', 'Majiro account kan aad gelisey fadlan iska hubi emailka iyo furaha sirta');              
      res.redirect('/login') 
     


      
    }
   })
   
}
}


module.exports.userprofile=function(req,res){
  var user =  req.session.user,
  sess = req.session; 

   
       
  if(sess.email){
      
      res.render('profile', {user:user});

  } else {
     res.redirect('/login') 
  }



}

module.exports.allshops = function(req,res){
  connection.query('SELECT * FROM users', function(err,rows){
    if(err){
      res.json('waxbaa ka qaldan tukaamadan fadlan laxidhidh shirkada')
    } else{
      res.json(rows)

    }
   


  })







}

module.exports.profileshop = function(req, res){

  connection.query('SELECT * FROM users  WHERE buss_id = "'+req.params.id+'" ', function(err,results){
  
   if(err){
     res.json('waxba ka qaldan soo saarida tukaankan fadlan la xidhidh shirkada')
   } else{
     res.json(results)
   }



  })

}


module.exports.shopproduct = function(req, res){

  connection.query('SELECT * FROM users INNER JOIN product ON  users.buss_id = product.user_id WHERE buss_id = "'+req.params.id+'" ', function(err,results){
  
   if(err){
     res.json('waxba ka qaldan soo saarida tukaankan fadlan la xidhidh shirkada')
   } else{
     res.json(results)
   }



  })





}