var connection = require('./../config');

module.exports.dashboard=function(req,res){
    var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){

        connection.query('SELECT COUNT (*)  AS rows FROM product WHERE user_id = "'+user.buss_id+'" ', function(err,result){

            if(err){
                console.log(err)
            } else{
                connection.query('SELECT COUNT (*)  AS count FROM order_item WHERE user_id = "'+user.buss_id+'" ', function(err,rows){

                    if(err){
                        console.log(err)
                    } else{
                        
                        connection.query('SELECT COUNT (*)  AS customer FROM order_item WHERE user_id = "'+user.buss_id+'" ', function(err,costumer){

                            if(err){
                                console.log(err)
                            } else{
                                connection.query('SELECT SUM(price) AS total FROM product WHERE user_id = "'+user.buss_id+'" ', function(err,total){

                                    if(err){
                                        console.log(err)
                                    } else{
                 
                                                
                                                var count = result[0].rows;
                                                var row = rows[0].count;
                                                var cos= costumer[0].costumer
                                                var tot =total[0].total
                                                res.render('dashboard', {user:user, count:count, row:row,cos:cos, tot:tot });
                                
                                   
                                                      
                                                    
                                        
                                         
                                        
                                    }
                        
                        
                                    
                        
                                })
                            }
                
                
                            
                
                        })
                    }
        
        
                    
        
                })

            }


            

        })
     
 
        

    } else {
       res.redirect('/') 
    }
 


}