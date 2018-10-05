var connection = require('../config');

module.exports.addpayment=function(req, res){
    var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){

    var payment={
        "name":req.body.name,
        "phone":req.body.phone,
        "company":req.body.company,
        "type":req.body.type,
        "user_id":req.body.user_id,
         
       
         

    }
   
        connection.query('INSERT INTO payment SET ?',payment, function (error, results, fields) {
            if (error) {
               req.flash('success', {msg: 'KUMAAD GUULEYSAN KAYDINTA XOGTAN'});
               res.redirect('/payment')

            }else{
                req.flash('success', {msg: 'WAAD KU GUULEYSATEY KAYDINGTA XOGTAN'});
                res.redirect('/payment')
            }
          })
        } else {
            res.redirect('/') 
         }
      
     
     
     
         
 
}

module.exports.payment=function(req, res){
    var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){
        connection.query('SELECT * FROM payment WHERE user_id = "'+user.buss_id+'" ', function(err,rows){
            if(err){
                console.log(err);
                res.render('payment',{user:user})

            } else{
                res.render('payment',{user:user, payment:rows})
            }
        })

    } else {
        res.redirect('/login') 
     }

    
}
module.exports.productpayment=function(req, res){
   
        connection.query('SELECT * FROM payment WHERE user_id = "'+req.params.id+'" ', function(err,rows){
            if(err){
                console.log(err);
                res.json('waxbaa ka qaldan fadlan la xidhidh qaybta macamiisha')

            } else{
                res.json(rows)
            }
        })

    

    
}


module.exports.deletepayment=function(req, res){
    var user =  req.session.user,
    sess = req.session; 
         
    if(sess.email){
        connection.query(`DELETE FROM payment WHERE pay_id = ${req.params.id}`, function(err,rows){
            if(err){
                console.log(err);
                res.redirect('/login')

            } else{
                res.redirect('/payment')
            }
        })

    } else {
        res.redirect('/login') 
     }

    
}



