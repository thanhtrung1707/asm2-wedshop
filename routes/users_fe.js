var express = require('express');
var router = express.Router();

/* GET edit page. */
router.get('/edit/', function(req, res, next) {
  res.render('index', { title: 'ATN SHOP', message: "Wecome ATN SHOP" });
});



module.exports = router;