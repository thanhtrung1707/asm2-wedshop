var express = require('express');
var router = express.Router();
var pg_conn = require('../models/pg_config');

/* GET users page . */
router.get('/', function(req, res, next) {
  res.render('users', {title: "User page", message: "Authorized users"});
});
/* edit */
router.get('/edit/:name', function(req, res) {
  var prod_name = req.params.name;
  const edit_query = {
      text: 'SELECT * FROM product WHERE Id=$1',
      values: [prod_name]
  };
  pg_conn.query(edit_query, function(err, data) {
      if (err) throw err;
      res.render('edit_form', { title: "Edit page", edit_data: data.rows[0] });
  });
});
/* POST from the edit_form submision */
router.post('/edit/:name', function(req, res) {
  var prod_name = req.params.name;
  const update_query = {
      text: 'UPDATE product SET Id=$1, Cake_name=$2, Price=$3, Date_of_manufacture=$4 ,Expiry=$5 WHERE Id=$6',
      values: [req.body.Id, req.body.Cake_name, req.body.Price, req.body.Date_of_manufacture, req.body.Expiry, prod_name]
  };
  pg_conn.query(update_query, function(err, data) {
      if (err) 
         {throw err;
          res.render('error', { message: "Insert got error", error: err })
      } else {
          var product_query = 'SELECT * FROM product';
          pg_conn.query(product_query, function(err, data) {
              res.render('users_fe', {
                    title: "Welcome to ATN shop Page",
                    h1_title: "Welcome to DPCB shop Page",
                    h2_title: "Update query database successfully",
                    userData: data 
                });
                //res.redirect('/users')
    
          });
      };
  });
});


/*delete*/
router.get('/delete/:name', function(req, res) {
  var prod_name = req.params.name;
  const del_query = {
      text: "DELETE FROM product WHERE Id=$1",
      values: [prod_name]
  };
  pg_conn.query(del_query, function(err, data) {
      if (err) {
          throw err;
          res.render('error', { message: "DELETE got error", error: err })
      } else {
          var product_query = 'SELECT * FROM product';
          pg_conn.query(product_query, function(err, data) {
              res.render('users_fe', {
                    title: "Welcome to ATN shop Page",
                    h1_title: "Welcome to DPCB shop Page",
                    h2_title: "DELETE query database successfully",
                    userData: data
                });
            
          });
      };
  });
});
/*insert*/
router.get('/insert', function(req, res) {
  res.render('insert_form', { title: "please Insert Data base " });
});
router.post('/insert', function(req, res) {
  const insert_query = {
      text: "INSERT INTO product VALUES ($1,$2,$3,$4,$5)",
      values: [req.body.Id, req.body.Cake_name, req.body.Price, req.body.Date_of_manufacture, req.body.Expiry]
  };
  pg_conn.query(insert_query, function(err, data) {
      if (err) {
          throw err;
          res.render('error', { message: "Insert got error", error: err })
      } else {
          var product_query = 'SELECT * FROM product';
          pg_conn.query(product_query, function(err, data) {
              res.render('users_fe', {
                      title: "Welcome to ATN shop Page",
                      h1_title: "Welcome to DPCB shop Page",
                      h2_title: "Insert query database successfully",
                      userData: data
                  }); 
             
          });
      };
  });
});
/*register*/
router.get('/register', function(req, res) {
    res.render('register_form', { title: "/Sign up for an account" });
  });
  router.post('/register', function(req, res) {
    const register_query = {
        text: "INSERT INTO account VALUES ($1,$2)",
        values: [req.body.account_name, req.body.account_passwork]
    };
    pg_conn.query(register_query, function(err, data) {
        if (err) {
            throw err;
            res.render('error', { message: "Insert got error", error: err })
        } else {
            var account_query = 'SELECT * FROM account';
            pg_conn.query(account_query, function(err, data) {
                res.render('/users_fe', {
                        title: "Sign Up Success",
                        
                        userData: data
                    }); 
               
            });
        };
    });
  });
  


module.exports = router;
