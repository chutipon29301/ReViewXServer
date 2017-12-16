module.exports = function (app, db, request) {
    app.post('/post/v1/listMovieSuggestion', (req, res) => {
        if (!req.body.userID) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        request('https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=af56062ca42de4534123ddaaf8a73a21', {
            json: true
        }, (error, response, body) => {
            if (error) {
                return res.status(500).send({
                    err: error.code,
                    errInfo: error
                });
            }

            Promise.all(response.body.results.map(movie => {
                return Promise.all(movie.genre_ids.map(genre => {
                    return db.collection('genre').findOne({
                        _id: genre
                    });
                }));
            })).then(data => {
                for (let i = 0; i < response.body.results.length; i++) {
                    for (let j = 0; j < response.body.results[i].genre_ids.length; j++) {
                        if (response.body.results[i].genreName === undefined) {
                            response.body.results[i].genreName = [];
                        }
                        if (data[i][j] !== null) {
                            response.body.results[i].genreName.push(data[i][j].name);
                        }
                    }
                    delete response.body.results[i].vote_count;
                    delete response.body.results[i].popularity;
                    delete response.body.results[i].backdrop_path;
                    delete response.body.results[i].original_language;
                    delete response.body.results[i].original_title;
                    delete response.body.results[i].adult;
                    delete response.body.results[i].overview;
                    delete response.body.results[i].genre_ids;
                }
                return res.status(200).send(response.body.results);
            });
        });
    });

    app.post('/post/v1/getMovieInfo', (req, res) => {
        if (!req.body.movieID) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        request('https://api.themoviedb.org/3/movie/' + req.body.movieID + '?api_key=af56062ca42de4534123ddaaf8a73a21&language=en-US', {
            json: true
        }, (error, response, body) => {
            delete response.body.adult;
            delete response.body.backdrop_path;
            delete response.body.belongs_to_collection;
            delete response.body.budget;
            delete response.body.homepage;
            delete response.body.imdb_id;
            delete response.body.original_language;
            delete response.body.popularity;
            delete response.body.production_companies;
            delete response.body.revenue;
            delete response.body.spoken_languages;
            delete response.body.status;
            delete response.body.tagline;
            delete response.body.vote_count;
            return res.status(200).send(response.body);
        });
    });
}