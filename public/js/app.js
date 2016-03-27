var app = angular.module('todoApp', ['ngMaterial', 'ngRoute', 'angular.filter', 'LocalStorageModule'])
    .config(function ($routeProvider, $locationProvider, $mdThemingProvider, localStorageServiceProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'views/app.html',
                controller: 'MainController'
            })
            .when('/categories', {
                templateUrl: 'views/categories/index.html',
                controller: 'CategoriesController'
            })
            .when('/categories/new', {
                templateUrl: 'views/categories/new.html',
                controller: 'CategoriesNewController'
            })
            .when('/categories/:id/edit', {
                templateUrl: 'views/categories/edit.html',
                controller: 'CategoriesEditController'
            })
            .otherwise({redirectTo: '/'});

        $mdThemingProvider
            .theme('default')
            .primaryPalette("indigo")
            .accentPalette('blue')
            .warnPalette('red');

        localStorageServiceProvider.setPrefix('Todo');
    });
