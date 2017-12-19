module.exports = function (app, db, ObjectID) {

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
        }).toArray().then(result => {
            Promise.all(result.map(readLater => {
                console.log(readLater.reviewID);
                return db.collection('review').findOne({
                    _id: ObjectID(readLater.reviewID)
                });
            })).then(data => {
                data.map(review => {
                    review.reviewID = review._id;
                    delete review._id;
                });
                res.status(200).send({
                    reviews: data
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