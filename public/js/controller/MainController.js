app.controller('MainController', function ($scope, $http, $location, $mdDialog, TodoService, CategoryService, $filter) {
    $scope.formData = {
        categoryId: ''
    };
    $scope.todos = [];
    $scope.categories = [];

    $scope.openCategories = function () {
        $location.path('/categories');
    };

    CategoryService.getCategories().success(function (collection) {
        $scope.categories = collection;
        $scope.categories.unshift({'_id': '', title: 'Allgemein'});
    });

    $scope.getCategoryById = function (categoryId) {
        return $filter('filter')($scope.categories, {'_id': categoryId})[0];
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