var express = require('express');
var router = express.Router();
var authen = require('../models/authenticate')
var display_table = require('../models/product_display');

//const TEST_USER = {username: "guess", password: "guesspass"};
/* GET login page */
router.get('/', function(req, res, next) {
  res.render('login',  {message: "Please input your credential!"});
});
/* Route for POST request from login form */
router.post('/', async function(req, res){
  //if (req.body.username == TEST_USER.username && req.body.password == TEST_USER.password)
  var auth = await authen(req.body.username, req.body.password);
  console.log("Check " + auth);
  if (auth==true)
  {

    var pg_conn = require('../models/pg_config');
    var product_query = 'SELECT * FROM product';
    var data = await pg_conn.query(product_query);
    console.log(data);
    res.render('users_fe',  {title: "Userpage",
                             h1_title: "Welcome to ATN shop page",
                             h2_title: "Fetch data table by EJS",
                             userData: data});

  }
  else
  {
    res.render('login',  {message: "Wrong username or password. Please input your credential again!"});
    //res.send(`<script>alert('Test')</script>`);
  };  
});
module.exports = router;
