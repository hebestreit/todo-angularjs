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
            done: false
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

    app.post('/api/todos/done/:todo_id', function (req, res) {
        Todo.update(
            {_id: req.params.todo_id},
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

    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
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