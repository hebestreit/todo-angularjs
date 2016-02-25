app.controller('MainController', function ($scope, $http, $location, $mdDialog) {
    $scope.formData = {};
    $scope.todos = [];

    $scope.openCategories = function () {
        $location.path('/categories');
    };

    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos = data;
        })
        .error(function () {
            console.log('Error:' + data);
        });

    $scope.createTodo = function () {
        if (!$scope.formData.text) {
            return;
        }
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
        $http.post('/api/todos/done/' + id, {done: !value})
            .success(function (data) {
                $scope.todos = data;
            })
            .error(function () {
                console.log('Error:' + data);
            });
    };

    $scope.deleteAction = function (id) {
        var confirm = $mdDialog.confirm()
            .title('Aufgabe löschen')
            .textContent('Soll diese Aufgabe gelöscht werden?')
            .ariaLabel('Aufgabe löschen')
            .ok('Löschen')
            .cancel('Abbrechen');
        $mdDialog.show(confirm).then(function () {
            $scope.deleteTodo(id);
        });
    };
});