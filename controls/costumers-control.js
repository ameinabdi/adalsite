var connection = require('../config');
var bcrypt = require('bcryptjs');

module.exports.register = function(req, res){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8,)
  
   
   var fullname = req.body.fullname;
   var email = req.body.email;
   var  password = hashedPassword;
   var  gender = req.body.gender;
   var phone  = req.body.phone;
   var  address = req.body.address;
   var  birthday = req.body.birthday;

if( !fullname  || !email  || !password  || !gender  || !phone  || !phone  || !address  || !birthday) {
    res.status(500).json('fadlan waxbaad ka tagtey formka! buuxi')
}

 var sql = "INSERT INTO `costumers`(`fullname`,`email`,`password`,`gender`, `phone` ,`address`,`birthday`) VALUES ('" + fullname + "','" + email + "','" + password + "','" + gender + "','" + phone + "','" + address + "','" + birthday + "')";
 var query = connection.query(sql, function(err, result){
                
    es.status(200).json('waad ku guuleysatey is diwan gelinta')
        })

 


 







}

module.exports.signin= function(req, res){
     
    var users={
         
        email:req.body.email,
        password:req.body.password,
    }
    if(!req.body.email || !req.body.password){
        return res.status(500).json(" waa medanyahay sanduuqa maclumaadku")
    } else {
   connection.query('SELECT * FROM costumers WHERE email = ? ',[users.email], function (error, results, fields) {
     
    if (results[0].password) {
        bcrypt.compare(users.password, results[0].password, function(err, result) {
    
         if(result) {
               console.log(results[0])
               return res.status(200).json(results[0].cos_id); }
         else {
           return res.status(500).json("incorrect detail");
         }
       })
      }
        
   });
}


}


module.exports.viewcostumer = function(req, res){
        
    connection.query ( `SELECT * FROM costumers WHERE cos_id = ${req.params.id}`,(err, result) => {
        if(err) throw err;
        else{
            
                res.json(result)
            
        }
        
    });

}

module.exports.profile = function(req,res){

    connection.query('SELECT * FROM costumers WHERE costumers.cos_id = "'+req.params.id+'" ', function(err,results){
 
        if(err){
            res.json('profilekaaga waxbaa ka qaldan fadlan la hadal qaybta macaamisha')
        }else{
            res.json(results)
        }

    })


}
module.exports.purchase = function(req,res){

    connection.query('SELECT * FROM costumers INNER JOIN order_item ON  costumers.cos_id = order_item.costumer WHERE costumers.cos_id = "'+req.params.id+'" ', function(err,results){
 
        if(err){
            res.json('profilekaaga waxbaa ka qaldan fadlan la hadal qaybta macaamisha')
            console.log(err);
        }else{
            res.json(results)
        }

    })


}