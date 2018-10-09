var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'adalsite17..',
  database : 'adalsite'
 
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else { 
    console.log("Error while connecting with database",err);
}
});
module.exports = connection;
