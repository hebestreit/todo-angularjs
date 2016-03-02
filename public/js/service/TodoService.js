app.factory('TodoService', function ($http) {
    return {
        create: function (todos) {
            if (!todos.title) {
                return false;
            }
            $http.post('/api/todos', todos);
        },
        getTodos: function () {
            return $http.get('/api/todos');
        },
        getTodo: function (id) {
            return $http.get('/api/todos/' + id);
        },
        save: function (todos) {
            if (!todos.title) {
                return false;
            }
            return $http.post('/api/todos/' + todos._id + '/update', todos);
        },
        delete: function (id) {
            return $http.delete('/api/todos/' + id);
        },
        getTodosByCategoryId: function (categoryId) {
            return $http.get('/api/todos/byCategory/' + categoryId);
        }
    }
});