module.exports = function (app, db, request) {

    app.post('/post/v1/searchMovie', (req, res) => {
        if (!req.body.key) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        search(req.body.key,1,2017,results => {
            res.status(200).send(results);
        });
    });

    const search = (key, page, year, callback) => {
        request('https://api.themoviedb.org/3/search/movie?api_key=af56062ca42de4534123ddaaf8a73a21&language=en-US&query=' + key + '&page=' + page + '&include_adult=false&primary_release_year=' + year, {
            json: true
        }, (error, response, body) => {
            if (error) {
                return res.status(500).send({
                    err: error.code,
                    errInfo: error
                });
            }
            for(let i = 0; i < response.body.results.length; i++){
                response.body.results[i].poster_path = 'https://image.tmdb.org/t/p/w500' + response.body.results[i].poster_path;
                delete response.body.results[i].vote_count;
                delete response.body.results[i].video;
                delete response.body.results[i].vote_average;
                delete response.body.results[i].popularity;
                delete response.body.results[i].original_language;
                delete response.body.results[i].original_title;
                delete response.body.results[i].genre_ids;
                delete response.body.results[i].backdrop_path;
                delete response.body.results[i].adult;
                delete response.body.results[i].overview;
                delete response.body.results[i].release_date;
            }
            callback(response.body.results);
        });
    }
}