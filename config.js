var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'bbj31ma8tye2kagi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'tig0i4urhk6fe4ea',
  password : 'xpq2lzkxt18iuwel',
  database : 'vdaoi61zrynf5f8n'
 
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else { 
    console.log("Error while connecting with database",err);
}
});
module.exports = connection;
