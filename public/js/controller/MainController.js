app.controller('MainController', function ($scope, $location, $mdDialog, TodoService, CategoryService, $filter) {
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
        $scope.categories.unshift(CategoryService.getDefaultCategory());
    });

    $scope.getCategoryById = function (categoryId) {
        return $filter('filter')($scope.categories, {'_id': categoryId})[0];
    };

    TodoService.getTodos().success(function (collection) {
        $scope.todos = collection;
    });

    $scope.saveTodo = function () {
        if (!$scope.formData.text || !$scope.formData.text.trim()) {
            return;
        }
        // check if text has multiple lines and ask for splitting into several tasks
        if (($scope.formData.text.match(/\n/g) || []).length) {
            var confirm = $mdDialog.confirm()
                .title('Mehrfaches Hinzufügen')
                .textContent('Soll pro Zeile eine Aufgabe angelegt werden?')
                .ariaLabel('Aufgaben teilen')
                .ok('Ja, Aufgabe teilen')
                .cancel('Nein, eine Aufgabe');
            $mdDialog.show(confirm).then(function () {
                var lines = $scope.formData.text.split("\n");
                lines.forEach(function (text) {
                    var todo = {
                        text: text,
                        categoryId: $scope.formData.categoryId
                    };
                    TodoService.create(todo).success(function (data) {
                        $scope.todos = data;
                    });
                });

                $scope.formData.text = '';
            }, function () {
                TodoService.create($scope.formData).success(function (data) {
                    $scope.formData.text = '';
                    $scope.todos = data;
                });
            });
            return;
        }
        TodoService.create($scope.formData).success(function (data) {
            $scope.formData.text = '';
            $scope.todos = data;
        });
    };

    $scope.deleteTodo = function (id) {
        TodoService.delete(id).success(function (data) {
            $scope.todos = data;
        });
    };

    $scope.doneTodo = function (id, value) {
        TodoService.done(id, !value).success(function (data) {
            $scope.todos = data;
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