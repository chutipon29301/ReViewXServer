module.exports = function (app, db, ObjectID, request, rpn) {

    app.get('/reviewdb', (req, res) => {
        db.collection('review').find({}).toArray().then(result => {
            res.render('reviewdb', {
                reviews: result
            });
        });
    });

    app.post('/post/v1/addReview', (req, res) => {
        if (!(req.body.facebookID && req.body.movieID && req.body.threeWords && req.body.review && req.body.score)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('review').insertOne({
            facebookID: req.body.facebookID,
            movieID: parseInt(req.body.movieID),
            threeWords: req.body.threeWords,
            review: req.body.review,
            score: parseInt(req.body.score)
        }, (err, result) => {
            res.status(200).send({
                err: -1,
                msg: 'OK'
            });
        });
    });

    app.post('/post/v1/deleteReview', (req, res) => {
        if (!req.body.reviewID) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('review').deleteOne({
            _id: ObjectID(res.body.reviewID)
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

    app.post('/post/v1/getReview', (req, res) => {
        if (!req.body.reviewID) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('review').findOne({
            _id: ObjectID(req.body.reviewID)
        }).then(result => {
            delete result._id;
            var promise = [];
            promise.push(rpn('http://graph.facebook.com/' + result.facebookID + '/picture?height=150&width=150&redirect=false', {
                json: true
            }));
            promise.push(rpn('https://graph.facebook.com/' + result.facebookID + '?fields=name&access_token=134837027180827|mR4il1x654VS7BWsyPDhWFOIINs', {
                json: true
            }));
            promise.push(rpn('https://api.themoviedb.org/3/movie/' + result.movieID + '?api_key=af56062ca42de4534123ddaaf8a73a21&language=en-US', {
                json: true
            }));
            Promise.all(promise).then(response => {
                result.facebookPic = response[0].data.url;
                result.facebookName = response[1].name;
                result.movieName = response[2].original_title;
                res.status(200).send(result);
            });
        });
    });

    app.post('/post/v1/listReviewForMovie', (req, res) => {
        if (!req.body.movieID) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('review').find({
            movieID: parseInt(req.body.movieID)
        }).toArray().then(result => {
            Promise.all(result.map(review => {
                review.reviewID = review._id;
                delete review._id;
                return Promise.all([rpn('http://graph.facebook.com/' + review.facebookID + '/picture?height=150&width=150&redirect=false', {
                    json: true
                }), rpn('https://graph.facebook.com/' + review.facebookID + '?fields=name&access_token=134837027180827|mR4il1x654VS7BWsyPDhWFOIINs', {
                    json: true
                }), rpn('https://api.themoviedb.org/3/movie/' + review.movieID + '?api_key=af56062ca42de4534123ddaaf8a73a21&language=en-US', {
                    json: true
                })]);
            })).then(data => {
                for (let i = 0; i < data.length; i++) {
                    result[i].facebookPic = data[i][0].data.url;
                    result[i].facebookName = data[i][1].name;
                    result[i].movieName = data[i][2].title;
                    result[i].moviePic = 'https://image.tmdb.org/t/p/w500' + data[i][2].poster_path;
                }
                res.status(200).send({
                    reviews: result
                });
            });
        });
    });

    app.post('/post/v1/listMyReview', (req, res) => {
        if (!req.body.userID) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('review').find({
            facebookID: req.body.userID
        }).toArray().then(result => {
            Promise.all(result.map(review => {
                review.reviewID = review._id;
                delete review._id;
                return Promise.all([rpn('http://graph.facebook.com/' + review.facebookID + '/picture?height=150&width=150&redirect=false', {
                    json: true
                }), rpn('https://graph.facebook.com/' + review.facebookID + '?fields=name&access_token=134837027180827|mR4il1x654VS7BWsyPDhWFOIINs', {
                    json: true
                }), rpn('https://api.themoviedb.org/3/movie/' + review.movieID + '?api_key=af56062ca42de4534123ddaaf8a73a21&language=en-US', {
                    json: true
                })]);
            })).then(data => {
                for (let i = 0; i < data.length; i++) {
                    result[i].facebookPic = data[i][0].data.url;
                    result[i].facebookName = data[i][1].name;
                    result[i].movieName = data[i][2].title;
                    result[i].moviePic = 'https://image.tmdb.org/t/p/w500' + data[i][2].poster_path;
                }
                res.status(200).send({
                    reviews: result
                });
            });
        });
    });
}