var app = angular.module('todoApp', ['ngMaterial', 'ngRoute'])
    .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'views/app.html',
                controller: 'MainController'
            })
            .when('/categories', {
                templateUrl: 'views/categories/index.html',
                controller: 'CategoriesController'
            }).otherwise({redirectTo: '/'});

        $mdThemingProvider
            .theme('default')
            .primaryPalette("indigo")
            .accentPalette('blue')
            .warnPalette('red');
    });
