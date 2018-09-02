var connection = require('../config');

module.exports.orderitem = function(req, res){
    var today = new Date();
  
   
   var cos_id = req.body.cos_id;
   var cos_name = req.body.cos_name;
   var cos_phone = req.body.cos_phone;
   var cos_email = req.body.cos_email;
   var product = req.body.product;
   var quantity = req.body.quantity;
   var price = req.body.price;
   var  address1 = req.body.address1;
   var  address2 = req.body.address2;
   var  town = req.body.town;
   var  ordertime = today;
   var  phone  = req.body.phone;
   var  status = req.body.status;
   var  payment = req.body.payment;
   var  user_id = req.body.user_id;


 var sql = "INSERT INTO `order_item`(`cos_id`,`cos_name`,`cos_phone`,`cos_email`,`product`,`quantity`,`price`,`address1`,`address2`, `town` ,`ordertime`,`phone`,`status`,`payment`,`user_id`) VALUES ('" + cos_id + "','" + cos_name + "','" + cos_phone + "','" + cos_email + "','" + product + "','" + quantity + "','" + price + "','" + address1 + "','" + address2 + "','" + town + "','" + ordertime + "','" + phone + "','" + status + "' ,'" + payment + "','" + user_id + "')";
 var query = connection.query(sql, function(err, result){
          
                console.log(result)
               res.json("dakdjas")
        })

 


 







}


module.exports.orderlist = function(req, res) {
  var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){
        connection.query('SELECT * FROM order_item WHERE user_id= "' + user.buss_id + '"', function(err, rows, fields) {
          if(err) throw err;
          console.log("first",rows)
               res.render('orders',{user:user, order:rows})
           
        
       
    });
    } else {
       res.redirect('/') 
    }





}
module.exports.orderview = function(req, res){
  var user = req.session.user,
  sess = req.session;
  if(sess.email){
      
      
          connection.query ( `SELECT * FROM order_item WHERE order_id = ${req.params.id}`,(err, result) => {
              if(err) throw err;
              else{
                  
                      res.render('orderview', {user:user, singleorder:result, })
                 
              }
              
          });
     
  }else{
      res.redirect('/')
  }
}