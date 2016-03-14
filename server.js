var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var app = express();

// connecting to database
mongoose.connect('mongodb://localhost/QuotingDojoRedux');

mongoose.connection.on('error', function(err){});

// declare QoutesSchema
var QoutesSchema = new mongoose.Schema({
 name: String,
 qoutes: String
})

// Validations
QoutesSchema.path('name').required(true, 'Name cannot be blank');
QoutesSchema.path('qoutes').required(true, 'Qoutes cannot be blank');

var Qoutes = mongoose.model('Qoutes', QoutesSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//we're going to have /routes/index.js handle all of our routing

// setting server to run on port 3000
 app.listen(3000, function() {
 console.log("listening on port 3000!");
})


var route = require('./routes/index.js')(app, Qoutes);