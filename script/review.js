module.exports = function (app, db) {
    app.post('/post/v1/addReview', (req, res) => {
        if (!(req.body.facebookID && req.body.movieID && req.body.threeWords && req.body.review && req.body.score)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('review').insertOne({
            facebookID: req.body.facebookID,
            movieID: req.body.movieID,
            threeWords: req.body.threeWords,
            review: req.body.review,
            score: parseInt(req.body.score)
        },(err, result) => {
            res.status(200).send({
                err: -1,
                msg: 'OK'
            });
        });
    });
}