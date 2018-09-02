var connection = require('../config');
var bcrypt = require('bcryptjs');
var fs = require('fs');

module.exports.infoproduct = function(req, res){
    var user = req.session.user,
    sess = req.session;
    if(sess.email){
        
        
            connection.query ( `SELECT * FROM product WHERE pro_id = ${req.params.id}`,(err, result) => {
                if(err) throw err;
                else{
                    
                        res.render('editproduct', {user:user, singleproduct:result, })
                   
                }
                
            });
       
    }else{
        res.redirect('/')
    }
}
module.exports.singleproduct = function(req, res){
    var user = req.session.user,
    sess = req.session;
    if(sess.email){
        
        
            connection.query ( `SELECT * FROM product WHERE pro_id = ${req.params.id}`,(err, result) => {
                if(err) throw err;
                else{
                    
                        res.render('infoproduct', {user:user, singleproduct:result, })
                   
                }
                
            });
       
    }else{
        res.redirect('/')
    }
}
module.exports.deleteproduct = function(req, res){
    sess = req.session;
    if(sess.email){
        connection.query ( `SELECT * FROM product WHERE pro_id = ${req.params.id}`,(err, result) => {
            if(err) throw err;
            else{
                fs.unlink('../public/assets/images/product/'+result[0].thumbnail,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
               });  
                connection.query ( `DELETE FROM product WHERE pro_id = ${req.params.id}`,(err, result) => {
                    if(err) throw err;
                    else{
                        
                            res.redirect('/product')
                       
                    }
                    
                });
                     
               
            }
            
        });
        
        
           
       
    }else{
        res.redirect('/')
    }
}

module.exports.viewproduct = function(req, res){
    var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){
        connection.query('SELECT * FROM product WHERE user_id= "' + user.buss_id + '"', function(err, rows, fields) {
            //console.log(result)
           
        res.render('product', {user:user, product:rows});
    });
    } else {
       res.redirect('/') 
    }

}
module.exports.addproduct = function(req, res){
   
      var  name = req.body.name;
      var  category = req.body.category;
      var  quantity = req.body.quantity;
      var  price = req.body.price;
      var  lastprice = req.body.lastprice;
      var  description  = req.body.description;
      var  brand  = req.body.brand;
      var  delivery  = req.body.delivery;
      var  user  = req.body.user_id;
       

     if(!req.files)
     return res.status(400).send('No files were uploader.');
   
     var file = req.files.thumbnail;
     var file1 = req.files.photo1;
     var file2 = req.files.photo2;
     var file3 = req.files.photo3;
     var file4 = req.files.photo4;

     var thumbnail = file.name;
     var photo1 = file1.name;
     var photo2 = file2.name;
     var photo3 = file3.name;
     var photo4 = file4.name;
     

     if(file.mimetype == "image/jpeg",file1.mimetype == "image/jpeg",file2.mimetype == "image/jpeg", file3.mimetype == "image/jpeg",  file4.mimetype == "image/jpeg" || file.mimetype == "image/png",file1.mimetype == "image/png", file2.mimetype == "image/png", file3.mimetype == "image/png",file4.mimetype == "image/png"){
           
       file.mv('publics/assets/images/product/'+file.name, function(err){
           if(err)
           return res.status(500).json(err);
         file1.mv('publics/assets/images/product/'+file1.name, function(err){
            if(err)
            return res.status(500).json(err);
              file2.mv('publics/assets/images/product/'+file2.name, function(err){
                  if(err)
                  return res.status(500).json(err);
                  file3.mv('publics/assets/images/product/'+file3.name, function(err){
                    if(err)
                    return res.status(500).json(err);
                    file4.mv('publics/assets/images/product/'+file4.name, function(err){
                        if(err)
                        return res.status(500).json(err);
                        var sql = "INSERT INTO `product`(`name`,`category`,`quantity`,`price`,`lastprice`,`description`,`thumbnail`,`photo1`,`photo2`,`photo3`,`photo4`,`brand`,`delivery`,`user_id`) VALUES ('" + name + "','" + category + "','" + quantity + "','" + price + "','" + lastprice + "','" + description + "','" + thumbnail + "','" + photo1 + "','" + photo2 + "','" + photo3 + "','" + photo4 + "','" + brand + "','" + delivery + "','" + user + "')";
                        var query = connection.query(sql, function(err, result){
                          console.log(result)
                                 res.redirect('/product')
                          })
                 
                        })
             
                    })
         
                  })
     
        })
         
        
   
       })
   
     } else {
       message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
       console.log(message);
       res.render('product',{message: message});
     }
    
   
   
    
   
   
   
   
   }

   module.exports.updateproduct = function(req, res){
  
     

    if(!req.files)
    return res.status(400).send('No files were uploader.');
    var id = req.params.id;
    var file = req.files.thumbnail;
    var file1 = req.files.photo1;
    var file2 = req.files.photo2;
    var file3 = req.files.photo3;
    var file4 = req.files.photo4;
    var natification={
        name: req.body.name,
        category:req.body.category,
        quantity: req.body.quantity,
        price: req.body.price,
        lastprice: req.body.lastprice,
        description: req.body.description,
        brand: req.body.brand,
        delivery: req.body.delivery, 
        thumbnail:file.name,
        photo1 : file1.name,
        photo2 : file2.name,
        photo3 : file3.name,
        photo4 : file4.name,

    }


    if(file.mimetype == "image/jpeg",file1.mimetype == "image/jpeg",file2.mimetype == "image/jpeg", file3.mimetype == "image/jpeg",  file4.mimetype == "image/jpeg" || file.mimetype == "image/png",file1.mimetype == "image/png", file2.mimetype == "image/png", file3.mimetype == "image/png",file4.mimetype == "image/png"){
           
        file.mv('publics/assets/images/product/'+file.name, function(err){
            if(err)
            return res.status(500).json(err);
          file1.mv('publics/assets/images/product/'+file1.name, function(err){
             if(err)
             return res.status(500).json(err);
               file2.mv('publics/assets/images/product/'+file2.name, function(err){
                   if(err)
                   return res.status(500).json(err);
                   file3.mv('publics/assets/images/product/'+file3.name, function(err){
                     if(err)
                     return res.status(500).json(err);
                     file4.mv('publics/assets/images/product/'+file4.name, function(err){
                         if(err)
                         return res.status(500).json(err);
                           
                        console.log(natification);
                        connection.query ( 'UPDATE product SET ? WHERE pro_id = ?', [natification,id ], (err, result) => {
                            if(err) throw err;
                            console.log(result);
                            res.redirect('/product');
                        });
  
                         })
              
                     })
          
                   })
      
         })
          
         
    
        })

     } else {
        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        console.log(message);
        res.render('product',{message: message});
      }
     
   
 
 
 
 
 }

 module.exports.detailproduct = function(req, res){
        
    connection.query ( `SELECT * FROM product WHERE pro_id = ${req.params.id}`,(err, result) => {
        if(err) throw err;
        else{
            
                res.json(result)
            
        }
        
    });

}
 
 