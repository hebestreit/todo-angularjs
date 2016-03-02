var mongoose = require('mongoose');

//  Model
var TodoSchema = {text: String, done: Boolean, categoryId: String};
var Todo = mongoose.model('Todo', TodoSchema);

var CategorySchema = {title: String, icon: String, color: String};
var Category = mongoose.model('Category', CategorySchema);

mongoose.connect('mongodb://localhost/todo');