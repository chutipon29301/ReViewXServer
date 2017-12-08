var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID

var app = express();

app.listen(8000);
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
app.use(express.static('public'))

MongoClient.connect('mongodb://127.0.0.1:27017/ReviewXServer', function (err, db) {
    if (err) {
        console.log('Error');
        console.log(err);
        return;
    }
    console.log('Successful connect to database');

    app.post('post/v1/addGenre', (req, res) => {
        if (!(req.body.name, req.body.link)) {
            return res.status(404).send({
                err: -1,
                msg: 'Bad Request'
            });
        }
        db.collection('genre').insertOne({
            name: req.body.name,
            link: req.body.link
        }, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.status(200).send('OK');
        });
    });

    app.post('post/v1/deleteGenre', (req, res) => {
        if (!req.body.genreID) {
            return res.status(404).send({
                err: -1,
                msg: 'Bad Request'
            });
        }
        db.collection('genre').deleteOne({
            _id: ObjectID(req.body.genreID)
        }, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send('OK');
        });
    });

    app.post('post/v1/listGenre', (req, res) => {
        db.collection('genre').find({}).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].genreID = result[i]._id;
                delete result[i]._id;
            }
            res.status(200).send(result);
        });
    });

    app.post('post/v1/addUser', (req, res) => {
        if (!(req.body.facebookID && req.body.preference)) {
            return res.status(404).send({
                err: -1,
                msg: 'Bad Request'
            });
        }
        db.collection('user').insertOne({
            _id: req.body.facebookID,
            preference: req.body.preference
        }, (err, result) => {
            if (err) {
                switch (err.code) {
                    case 11000:
                        return res.status(200).send({
                            err: 0,
                            msg: 'User Exist'
                        });
                    default:
                        return res.status(500).send(err);
                }
            }
            res.status(200).send('OK');
        });
    });
});