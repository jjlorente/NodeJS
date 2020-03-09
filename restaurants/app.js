// framework express
var express = require('express');
// bodyparser ens permet processar variables GET i POST
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// per renderitzar les plantilles (render)

require('dotenv').config();
app.set('view engine','ejs');  
var mongoClient;
// connexió a <span class="search_hit">mongo</span> i start app
var MongoClient = require('mongodb').MongoClient;


// consts
const PORT = process.env.PORT || 5000
const user = encodeURIComponent( process.env.DBUSER );
const pass = encodeURIComponent( process.env.DBPASS );
var dbConStr = "mongodb+srv://"+user+":"+pass+"@cluster0-wugkh.mongodb.net";
MongoClient.connect( dbConStr, function( err, _client ) {
    // si no ens podem connectar, sortim
    if( err ) throw err;
    mongoClient = _client;
    // si no hi ha cap error de connexió, engeguem el servidor
    app.listen(PORT, function () {
        console.log('Example app listening on http://localhost:'+PORT+' !');
    });
});


app.get('', function (req, res) {
    res.render('index')
});

app.get('/restaurant', function (req, res) {
    res.render('restaurant');
});

app.get('/categorias', function (req, res) {
    MongoClient.connect(dbConStr, function(err, db) {
      if (err) throw err;
      var dbo = db.db("restaurant");
      dbo.collection("restaurants").find().toArray(function(err, results){
        res.render("restaurantPost", { result: results });
        db.close();
        
    });

});
    });
app.post('/restaurant', function (req, res) {
    MongoClient.connect(dbConStr, function(err, db) {
      if (err) throw err;
      var dbo = db.db("restaurant");
      var myobj = { nom: req.body.username, poblacio: req.body.poblacio , direccio: req.body.direccio , cp: req.body.cp , telefon: req.body.telefon };
      dbo.collection("restaurants").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    }); 
    res.render('restaurant',{ result: "Restaurante añadido" });
});


