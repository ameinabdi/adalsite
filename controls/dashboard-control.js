var connection = require('./../config');

module.exports.dashboard=function(req,res){
    var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){
        connection.query('SELECT  pro_id FROM product WHERE user_id = "'+user.buss_id+'"', function(err,product){
            if(err){
                console.log(err);
            }else{
              
                connection.query('SELECT COUNT (*)  AS rows FROM product WHERE user_id = "'+user.buss_id+'" ', function(err,result){

                    if(err){
                        console.log(err)
                    } else{
                        connection.query('SELECT COUNT (*)  AS count FROM product INNER JOIN order_item ON product.pro_id = order_item.product WHERE product.user_id = "'+user.buss_id+'" ', function(err,rows){
        
                            if(err){
                                console.log(err)
                            } else{
                                 
                                        
                                        connection.query('SELECT SUM(price) AS total FROM product WHERE user_id = "'+user.buss_id+'" ', function(err,total){
        
                                            if(err){
                                                console.log(err)
                                            } else{
                                                connection.query('SELECT * FROM order_item  INNER JOIN product   ON  order_item.product = product.pro_id  LEFT JOIN costumers ON  order_item.costumer = costumers.cos_id  WHERE product.user_id = "'+user.buss_id+'" ORDER BY order_id DESC ', function(err,orders){
        
                                                    if(err){
                                                        console.log(err)
                                                    } else{ 
                                                        Object.keys(rows).forEach(function(key) {
                                                            var order = rows[key]
                                                        
                                                        var count = result[0].rows;
                                                        var row = order.count;
                                                        var tot =total[0].total;
                                                        res.render('dashboard', {user:user, count:count,  row:row,  tot:tot, orders:orders, message: req.flash('success') });
                                        
                                                             }); 
                                                              
                                                            }
                                                
                                                
                                                            
                                                
                                                        })
                                                
                                            }
                                
                                
                                            
                                
                                        })
                                     
                        
                        
                                    
                        
                            }
                
                
                            
                
                        })
        
                    }
        
        
                    
        
                })
             
         







            }




        })

        
        

    } else {
       res.redirect('/login') 
    }
 


}