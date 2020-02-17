// framework express
var express = require('express');
// bodyparser ens permet processar variables GET i POST
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// per renderitzar les plantilles (render)
app.set('view engine','ejs');
require('dotenv').config();
  
var mongoClient;
// connexió a <span class="search_hit">mongo</span> i start app
var mongo = require('mongodb').MongoClient;

// consts
const PORT = process.env.PORT || 5000
const user = encodeURIComponent( process.env.DBUSER );
const pass = encodeURIComponent( process.env.DBPASS );
var dbConStr = "mongodb+srv://"+user+":"+pass+"@cluster0-wugkh.mongodb.net";
mongo.connect( dbConStr, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
    // si no hi ha cap error de connexió, engeguem el servidor
    app.listen(PORT, function () {
        console.log('Example app listening on http://localhost:'+PORT+' !');
    });
});




app.get('/restaurant', function (req, res) {
    res.render('restaurant');
});




app.post('/restaurant', function (req, res) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("restaurant");
      var myobj = { name: req.body.username, categoria: req.body.categoria, address: req.body.address};
      dbo.collection("restaurants").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    }); 
    res.render('restaurantPost')
});


