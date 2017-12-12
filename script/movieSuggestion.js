module.exports = function (app, db, request) {
    app.post('/post/v1/listMovieSuggestion', (req, res) => {
        if (!req.body.userID) {
            return res.status(400).send({
                err: -1,
                msg: 'Bad Request'
            });
        }
        request('https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=af56062ca42de4534123ddaaf8a73a21', {
            json: true
        }, (error, response, body) => {
            if (error) {
                return res.status(500).send(error);
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
                        if(response.body.results[i].genreName === undefined){
                            response.body.results[i].genreName = [];
                        }
                        if(data[i][j] !== null){
                            response.body.results[i].genreName.push(data[i][j].name);
                        }
                    }
                }
                return res.status(200).send(response.body.results);
            });
        });
    });
}