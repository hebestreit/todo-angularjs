app.factory('TodoService', function ($http) {
    return {
        create: function (todo) {
            if (!todo.text) {
                return false;
            }
            return $http.post('/api/todos', todo);
        },
        getTodos: function () {
            return $http.get('/api/todos');
        },
        getTodo: function (id) {
            return $http.get('/api/todos/' + id);
        },
        done: function (id, value) {
            if (!id) {
                return false;
            }
            return $http.post('/api/todos/' + id + '/done', {done: value});
        },
        save: function (todo) {
            if (!todo.text) {
                return false;
            }
            return $http.post('/api/todos/' + todo._id + '/update', todo);
        },
        delete: function (id) {
            return $http.delete('/api/todos/' + id);
        }
    }
});