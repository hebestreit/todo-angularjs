// setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// configuration
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/todo');

//  Model
var TodoSchema = {text: String, done: Boolean};
var Todo = mongoose.model('Todo', TodoSchema);


// routes
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

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8070);
console.log('Live at port 8070');