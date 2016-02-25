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

    app.post('/api/categories', function (req, res) {
        if (!req.body.title) {
            return;
        }
        Category.create({
            title: req.body.title
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

    app.post('/api/categories/update/:category_id', function (req, res) {
        Category.update(
            {_id: req.params.category_id},
            {title: req.body.title}
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

    app.delete('/api/categories/:category_id', function (req, res) {
        Category.remove({
            _id: req.params.category_id
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