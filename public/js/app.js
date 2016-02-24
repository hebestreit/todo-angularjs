var app = angular.module('todoApp', ['ngMaterial'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette("indigo")
            .accentPalette('blue')
            .warnPalette('red');
    });
