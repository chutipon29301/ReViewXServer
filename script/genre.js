module.exports = function (app, db, request) {

    app.get('/genresdb', function (req, res) {
        db.collection('genre').find({}).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].genreID = result[i]._id;
                delete result[i]._id;
            }
            res.render('genresdb', {
                genres: result
            });
        });
    });

    app.post('/post/v1/addGenre', (req, res) => {
        if (!(req.body.genreID && req.body.image)) {
            return res.status(400).send({
                err: -1,
                msg: 'Bad Request'
            });
        }
        request('https://api.themoviedb.org/3/genre/movie/list?api_key=af56062ca42de4534123ddaaf8a73a21&language=en-US', {
            json: true
        }, (error, response, body) => {
            var result = response.body.genres.find(object => {
                return object.id === parseInt(req.body.genreID);
            });
            if (result) {
                db.collection('genre').insertOne({
                    _id: parseInt(req.body.genreID),
                    name: result.name,
                    image: req.body.image
                }, (err, result) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    return res.status(200).send('OK');
                });
            } else {
                return res.status(400).send({
                    err: -1,
                    msg: 'Bad Request'
                });
            }
        });
    });

    app.post('/post/v1/deleteGenre', (req, res) => {
        if (!req.body.genreID) {
            return res.status(400).send({
                err: -1,
                msg: 'Bad Request'
            });
        }
        db.collection('genre').deleteOne({
            _id: parseInt(req.body.genreID)
        }, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send('OK');
        });
    });

    app.post('/post/v1/editGenre', (req, res) => {
        if (!(req.body.genreID && req.body.image)) {
            return res.status(400).send({
                err: -1,
                msg: 'Bad Request'
            });
        }
        db.collection('genre').updateOne({
            _id: parseInt(req.body.genreID)
        }, {
            $set: {
                image: req.body.image
            }
        }, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).send('OK');
        });
    });

    app.post('/post/v1/listGenre', (req, res) => {
        db.collection('genre').find({}).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].genreID = result[i]._id;
                delete result[i]._id;
            }
            res.status(200).send({
                genres: result
            });
        });
    });
}