var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

module.exports = function (app) {
    app.get('/api/todos', function (req, res) {
        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(todos);
        });
    });

    app.post('/api/todos', function (req, res) {
        if (!req.body.text) {
            return;
        }
        Todo.create({
            text: req.body.text,
            done: false,
            categoryId: req.body.categoryId
        }, function (err, todo) {
            if (err) {
                res.send(err);
                return;
            }

            Todo.find(function (err, todos) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json(todos);
            });
        })
    });

    app.post('/api/todos/done/:id', function (req, res) {
        Todo.update(
            {_id: req.params.id},
            {done: req.body.done}
            , function (err, todo) {
                if (err) {
                    res.send(err);
                    return;
                }

                Todo.find(function (err, todos) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.json(todos);
                });
            })
    });

    app.delete('/api/todos/:id', function (req, res) {
        Todo.remove({
            _id: req.params.id
        }, function (err, todo) {
            if (err) {
                res.send(err);
                return;
            }

            Todo.find({}, function (err, todos) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json(todos);
            });
        })
    });
};