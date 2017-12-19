module.exports = function (app, db, ObjectID, request, rpn) {

    app.get('/readLaterdb', (req, res) => {
        db.collection('readLater').find({}).toArray().then(result => {
            res.render('readLaterdb', {
                readLaters: result
            });
        });
    });

    app.post('/post/v1/addReadLater', (req, res) => {
        if (!(req.body.userID && req.body.reviewID)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('readLater').insertOne({
            userID: req.body.userID,
            reviewID: req.body.reviewID
        }, (err, result) => {
            if (err) {
                return res.status(500).send({
                    err: err.code,
                    errInfo: err
                });
            }
            res.status(200).send({
                err: -1,
                msg: 'OK'
            });
        });
    });

    app.post('/post/v1/deleteReadLater', (req, res) => {
        if (!((req.body.userID && req.body.reviewID) || req.body.readLaterID)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        if (req.body.userID && req.body.reviewID) {
            db.collection('readLater').deleteMany({
                userID: req.body.userID,
                reviewID: req.body.reviewID
            }, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        err: err.code,
                        errInfo: err
                    });
                }
                return res.status(200).send({
                    err: -1,
                    msg: 'OK'
                });
            });
        }
        if (req.body.readLaterID) {
            db.collection('readLater').deleteOne({
                _id: ObjectID(req.body.readLaterID)
            }, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        err: err.code,
                        errInfo: err
                    });
                }
                return res.status(200).send({
                    err: -1,
                    msg: 'OK'
                });
            });
        }
    });

    app.post('/post/v1/listReadLater', (req, res) => {
        if (!req.body.userID) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('readLater').find({
            userID: req.body.userID
        }).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].readLaterID = result[i]._id;
                delete result[i]._id;
            }
            res.status(200).send({
                readLaters: result
            });
        });
    });

    app.post('/post/v1/listReadLaterReview', (req, res) => {
        if (!req.body.userID) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('readLater').find({
            userID: req.body.userID
        }).toArray().then(readLaters => {
            Promise.all(readLaters.map(readLater => {
                readLater.readLaterID = readLater._id;
                delete readLater._id;
                return db.collection('review').findOne({
                    _id: ObjectID(readLater.reviewID)
                }).then(review => {
                    return Promise.all([
                        rpn('https://graph.facebook.com/' + review.facebookID + '?fields=name&access_token=134837027180827|mR4il1x654VS7BWsyPDhWFOIINs', {
                            json: true
                        }), rpn('https://api.themoviedb.org/3/movie/' + review.movieID + '?api_key=af56062ca42de4534123ddaaf8a73a21&language=en-US', {
                            json: true
                        }), db.collection('review').findOne({
                            _id: ObjectID(readLater.reviewID)
                        })
                    ]);
                });
            })).then(result => {
                response = [];
                for (let i = 0; i < result.length; i++) {
                    response.push(result[i][2]);
                    response[i].reviewID = response[i]._id;
                    delete response[i]._id;
                    response[i].moviePic = 'https://image.tmdb.org/t/p/w500' + result[i][1].poster_path;
                    response[i].facebookName = result[i][0].name;
                }
                res.status(200).send({
                    reviews: response
                });
            });
        });
    });

    app.post('/post/v1/isInReadLater', (req, res) => {
        if (!(req.body.userID && req.body.reviewID)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('readLater').findOne({
            userID: req.body.userID,
            reviewID: req.body.reviewID
        }).then(result => {
            if (result === null) {
                return res.status(200).send({
                    isReadLater: false
                });
            } else {
                return res.status(200).send({
                    isReadLater: true
                });
            }
        });
    });
}