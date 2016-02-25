app.controller('CategoriesEditController', function ($scope, $routeParams, $location, CategoryService) {
    $scope.category = {};
    $scope.icons = CategoryService.getIcons();

    CategoryService.getCategory($routeParams.id).success(function (data) {
        $scope.category = data;
    });

    $scope.selectIcon = function (src) {
        $scope.category.icon = src;
    };

    $scope.saveCategory = function () {
        CategoryService.save($scope.category).success(function () {
            $location.path('/categories');
        });
    };

    $scope.deleteCategory = function () {
        CategoryService.delete($scope.category._id).success(function () {
            $location.path('/categories');
        });
    };
});