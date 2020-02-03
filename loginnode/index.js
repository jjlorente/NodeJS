
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended:true}));

var users = {
	"paco":"noni",
	"oscar":"noni",
};

app.get('/login', function (req, res) {
  res.render('loginform');
});

app.post('/login', function (req, res) {
	var user = "";
	var inputUser = req.body.username;
	if (inputUser in users) {
		if (req.body.password ==users[inputUser]) {
			user = inputUser;
		}
	}
	res.render('loginformPost', {user:user});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
