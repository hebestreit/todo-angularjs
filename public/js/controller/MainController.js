app.controller('MainController', function ($scope, $http) {

    $scope.formData = {};
    $scope.todos = [];

    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos = data;
        })
        .error(function () {
            console.log('Error:' + data);
        });

    $scope.createTodo = function () {
        $http.post('/api/todos', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.todos = data;
            })
            .error(function () {
                console.log('Error:' + data);
            });
    };

    $scope.deleteTodo = function (id) {
        $http.delete('/api/todos/' + id)
            .success(function (data) {
                $scope.todos = data;
            })
            .error(function () {
                console.log('Error:' + data);
            });
    };

    $scope.doneTodo = function (id, value) {
        $http.post('/api/todos/done/' + id, {done: value})
            .success(function (data) {
                $scope.todos = data;
            })
            .error(function () {
                console.log('Error:' + data);
            });
    }
});