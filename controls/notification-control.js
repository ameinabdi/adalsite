connection =  require('../config');

module.exports.allnotification=function(req, res){

    connection.query('SELECT * FROM notification', function(error, result){
        if(error){
            res.json('waxbaa qaldan fadlan la xidhiidh qaybta macamiisha')
        } else{
            res.json(result)
        }
    })







}

module.exports.addnatification=function(req,res){
    var today = new Date();
    var Notification={
        "title":req.body.title,
        "detail": req.body.detail,
        "notdate":today,
        "thumbnail":req.body.thumbnail
    }


    connection.query('INSERT INTO notification SET ?', Notification,function(err,result){
      if(err){
          res.json("waxbaa qaldan fadlan dib u eeg")
      } else{
          res.json("waad kaydisey maclumaadkan")
      }

    })



}