var express=require("express");
var bodyParser=require('body-parser');
var ejs = require('ejs');
var path = require('path');
var session = require('express-session');
const fileUpload = require('express-fileupload');
var flash = require('connect-flash');
var app = express();
var ip = require('ip');
var cors = require('cors');
var multer  = require('multer')
var upload = multer({ dest: 'publics/assets/images/product/' })
var connection = require('./config');

//routers

var users = require('./controls/user-control');
var dashboard = require('./controls/dashboard-control');
var products = require('./controls/product-control')
var costumers = require('./controls/costumers-control');
var orders = require('./controls/orders-control');



app.use(express.static(__dirname + '/publics'));
 

app.use(session({
    secret: 'amouduniversity',
    resave: false,
    saveUninitialized: true,
    cookie: { }
        
  }));

app.use(flash())
app.use(cors())
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}));
 
app.use(bodyParser.json());
app.use(fileUpload());




/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
var methodOverride = require('method-override')
 
/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

 
/* route to handle login and registration */
app.get('/', function(req, res){ 
    res.render('index', { expressFlash: req.flash('success')});
});
app.get('/signup', function(req, res){ 
    res.render('register');
});
app.get('/dashboard', dashboard.dashboard);
app.post('/signup', users.register);
app.post('/login', users.login);
 
app.get('/logout',function(req,res){
  req.session.destroy()
      res.redirect('/');
  
});
app.get('/profile', users.userprofile)
// product routes
app.get('/product', products.viewproduct)
app.post('/product',products.addproduct)
app.get('/singleproduct=:id',products.infoproduct)
app.put('/updateproduct=:id', products.updateproduct)
app.get('/detailproduct=:id', products.detailproduct)
app.get('/viewproduct=:id', products.singleproduct);
app.delete('/deleteproduct=:id', products.deleteproduct);
app.get('/allproduct', function(req,res){
    
  connection.query('SELECT * FROM product  ORDER BY pro_id DESC; ', function(err, rows){
      res.json(rows)

  });
})

// costumers routes
app.post('/costumers/register', costumers.register)
app.post('/costumers/login', costumers.signin)
app.get('/viewcostumers=:id', costumers.viewcostumer);
app.get('/profilecostumer=:id', costumers.profile)
app.get('/purchaseproduct=:id', costumers.purchase)
 
// orders routes
app.post('/orderitem', orders.orderitem)
app.get('/orderlist', orders.orderlist)
app.get('/orderinfo=:id',orders.orderview)

// shops routes
app.get('/shoplists', users.allshops);
app.get('/shopprofile=:id', users.profileshop);
app.get('/shopproduct=:id', users.shopproduct);


 


 
var port = process.env.PORT || 3000;

app.listen(port);
console.log(ip.address())