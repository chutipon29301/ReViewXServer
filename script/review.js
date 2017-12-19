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
            promise.push(rpn('https://graph.facebook.com/' + result.facebookID + '?fields=name&access_token=134837027180827|mR4il1x654VS7BWsyPDhWFOIINs',{
                json: true
            }));
            Promise.all(promise).then(response => {
                    result.facebookPic = response[0].data.url;
                    result.facebookName = response[1].name;
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
            for (let i = 0; i < result.length; i++) {
                result[i].reviewID = result[i]._id;
                delete result[i]._id
            }
            res.status(200).send({
                reviews: result
            });
        });
    });
}