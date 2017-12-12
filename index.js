var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID
var request = require('request');

var app = express();

app.listen(3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    // Allow access from other domain
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/test', function (req, res) {
    res.render('htmlTemplate', {});
});
app.get('/genre', function (req, res) {
    res.render('genre', {});
});
app.get('/user', function (req, res) {
    res.render('user', {});
});
app.get('/home', function (req, res) {
    res.render('home', {});
});


MongoClient.connect('mongodb://127.0.0.1:27017/ReviewXServer', function (err, db) {
    if (err) {
        console.log('Error');
        console.log(err);
        return;
    }
    console.log('Successful connect to database');

    require('./script/superuser.js')(app, db);
    require('./script/genre.js')(app, db, request);
    require('./script/user.js')(app, db);
    require('./script/movieSuggestion.js')(app, db, request);
    require('./script/review.js')(app, db);
});