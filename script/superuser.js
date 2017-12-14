module.exports = function (app, db) {
    app.post('/post/v1/addSuperuser', (req, res) => {
        if (!(req.body.firstName && req.body.lastName && req.body.email && req.body.password)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('superuser').insertOne({
            _id: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }, (err, result) => {
            if (err) {
                switch (err.code) {
                    case 11000:
                        return res.status(202).send({
                            err: 1,
                            msg: 'User Exist'
                        });
                    default:
                        return res.status(500).send({
                            err: err.code,
                            errInfo: err
                        });
                }
            }
            console.log('User ' + req.body.firstName + ' has been registered');
            res.status(200).send({
                err: -1,
                msg: 'OK'
            });
        });
    });

    app.post('/post/v1/superuserLogin', (req, res) => {
        if (!(req.body.email && req.body.password)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('superuser').findOne({
            _id: req.body.email,
            password: req.body.password
        }).then((result, err) => {
            if (err) {
                return res.status(500).send({
                    err: err.code,
                    errInfo: err
                })
            }
            if (result) {
                res.status(200).send({
                    isVertified: true
                });
            } else {
                res.status(200).send({
                    isVertified: false
                });
            }
        })
    });

    app.post('/post/v1/superuserChangePassword', (req, res) => {
        if (!(req.body.email && req.body.password)) {
            return res.status(400).send({
                err: 0,
                msg: 'Bad Request'
            });
        }
        db.collection('superuser').updateOne({
            _id: req.body.email
        }, {
            $set: {
                password: req.body.password
            }
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
        })
    });
}