
var express = require('express');
var routes = require('./controllers/controller.js');
var app = express();
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var PORT = 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongodstorage";

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.use('/', routes);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });