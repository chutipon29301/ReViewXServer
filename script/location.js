module.exports = function (app, db, ObjectID) {

    app.get('/locationdb', (req, res) => {
        db.collection('location').find({}).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].locationID = result[i]._id;
                delete result[i]._id;
            }
            res.render('locationdb', {
                locations: result
            });
        });
    });

    app.post('/post/v1/addLocation', (req, res) => {
        if (!(req.body.latitude && req.body.longitude && req.body.name)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('location').insertOne({
            name: req.body.name,
            latitude: parseFloat(req.body.latitude),
            longitude: parseFloat(req.body.longitude)
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

    app.post('/post/v1/listLocation', (req, res) => {
        db.collection('location').find({}).toArray().then(result => {
            for (let i = 0; i < result.length; i++) {
                result[i].locationID = result[i]._id;
                delete result[i]._id;
            }
            res.status(200).send(result);
        });
    });

    app.post('/psot/v1/deleteLocation', (req, res) => {
        if(!req.body.locationID){
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('location').deleteOne({
            _id: ObjectID(req.body.locationID)
        },(err, resul) => {
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
}