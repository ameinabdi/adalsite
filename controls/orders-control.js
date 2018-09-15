var connection = require('../config');

module.exports.orderitem = function(req, res){
   

   var costumer = req.body.costumer;
   var product = req.body.product;
  
   var  address1 = req.body.address1;
   var  address2 = req.body.address2;
   var  town = req.body.town;
   var  ordertime = Date();;
   var  phone  = req.body.phone;
   var  status = req.body.status;
   var  payment = req.body.payment;


 var sql = "INSERT INTO `order_item`(`costumer`,`product`,`address1`,`address2`, `town` ,`ordertime`,`phone`,`status`,`payment`) VALUES ('" + costumer + "','" + product + "','" + address1 + "','" + address2 + "','" + town + "','" + new Date() + "','" + phone + "','" + status + "' ,'" + payment + "')";
 var query = connection.query(sql, function(err, result){
      if(err){
        res.json("kumaad guuleysan dirida dalabkan")
        console.log(err)
      } else{
        res.json("waad dirtey dalabkaaga")

      }   
              
         
        })

 


 







}


module.exports.orderlist = function(req, res) {
  var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){
        connection.query('SELECT * FROM  product INNER JOIN order_item ON product.pro_id = order_item.product WHERE product.user_id =  "' + user.buss_id + '"', function(err, rows, fields) {
          if(err) throw err;
          
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