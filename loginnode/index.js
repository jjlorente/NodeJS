var express = require('express');
var app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');


app.get('/login', function (req, res) {
  res.render('loginForm');
  
});


app.post('/login', function (req, res) {
  var inputUser = req.body.username;
  var inputPassword = req.body.password;
  if (localStorage.getItem(inputUser)) {
    if (inputPassword == localStorage.getItem(inputUser)) {
      user = inputUser;
    }else{
      user= "";
    }
  }else{
    user=""
  }
  res.render('loginFormPost.ejs', {user:user})
});

app.get('/register', function (req, res) {
  res.render('registerForm');
  
});
app.post('/register', function (req, res) {
  var name = req.body.username;
  var pass = req.body.password;
  var pass2 = req.body.passwordConf;
  
  
  if (pass==pass2) {
    passwordStatus="OK";
  }else{
    passwordStatus="KO";
  }
  if (localStorage.getItem(name)) {
    usernameStatus= "KO";
  }else{
    usernameStatus= "OK";
  }
  if (usernameStatus=="OK" && passwordStatus=="OK") {
    localStorage.setItem(name, pass)
  }
  res.render('registerFormPost.ejs', {passStatus:passwordStatus,userStatus:usernameStatus})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});