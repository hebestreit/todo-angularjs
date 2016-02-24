// setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');


// configuration
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/todo');

//  Model
var TodoSchema = {text: String};
var Todo = mongoose.model('Todo', TodoSchema);


// routes
app.get('/api/todos', function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
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
        }

        Todo.find(function (err, todos) {
            if (err) {
                res.send(err);
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
        }

        Todo.find(function () {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    })
});


app.listen(8070);
console.log('Live at port 8070');