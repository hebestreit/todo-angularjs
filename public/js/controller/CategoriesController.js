app.controller('CategoriesController', function ($scope, $location, CategoryService) {
    $scope.categories = [];
    CategoryService.getCategories().success(function (collection) {
        $scope.categories = collection;
    });

    $scope.openCategory = function (categoryId) {
        $location.path('/categories/' + categoryId + '/edit');
    };

    $scope.createCategory = function () {
        $location.path('/categories/new');
    };

    $scope.goBack = function () {
        $location.path('/');
    }
});