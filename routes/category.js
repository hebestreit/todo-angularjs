var mongoose = require('mongoose');
var Category = mongoose.model('Category');

module.exports = function (app) {
    app.get('/api/categories', function (req, res) {
        Category.find(function (err, categories) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(categories);
        });
    });

    app.get('/api/categories/:id', function (req, res) {
        Category.findOne({_id: req.params.id}, function (err, category) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(category);
        });
    });

    app.post('/api/categories', function (req, res) {
        if (!req.body.title) {
            return;
        }
        Category.create({
            title: req.body.title,
            icon: req.body.icon
        }, function (err, category) {
            if (err) {
                res.send(err);
                return;
            }

            Category.find(function (err, categories) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json(categories);
            });
        })
    });

    app.post('/api/categories/:id/update', function (req, res) {
        Category.update(
            {_id: req.params.id},
            {
                title: req.body.title,
                icon: req.body.icon
            }
            , function (err, category) {
                if (err) {
                    res.send(err);
                    return;
                }

                Category.find(function (err, categories) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.json(categories);
                });
            })
    });

    app.delete('/api/categories/:id', function (req, res) {
        Category.remove({
            _id: req.params.id
        }, function (err, category) {
            if (err) {
                res.send(err);
                return;
            }

            Category.find({}, function (err, categories) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json(categories);
            });
        })
    });
};