var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID

var app = express();

app.listen(8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req,res,next){
    // Allow access from other domain
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

MongoClient.connect('mongodb://127.0.0.1:27017/ReviewXServer', function (err, db) {
    if (err) {
        console.log('Error');
        console.log(err);
        return;
    }
    console.log('Successful connect to database');
    
});