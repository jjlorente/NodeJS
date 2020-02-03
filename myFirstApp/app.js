
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/saludo', function (req, res) {
	var nombre = req.body.nombre;
	var saludo = comprobarGenero(req.body.genero);
	res.render('saludo',{nombre:nombre,saludo:saludo});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function comprobarGenero(genero) {
	if (genero=='hombre'){
		saludo='Bienvenido';
	}
	else{
		saludo='Bienvenida';
	}
	return saludo;
}