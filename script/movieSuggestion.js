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
                return console.log(error);
            }
        });
        res.status(200).send('OK');
    });
}