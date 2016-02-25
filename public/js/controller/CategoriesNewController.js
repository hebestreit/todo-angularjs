app.controller('CategoriesNewController', function ($scope, CategoryService, $location) {
    $scope.category = {};
    $scope.icons = CategoryService.getIcons();

    $scope.selectIcon = function (src) {
        $scope.category.icon = src;
    };

    $scope.save = function () {
        CategoryService.create($scope.category);
        $location.path('/categories');
    };
});