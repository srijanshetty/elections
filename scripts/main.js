var electionsApp = angular.module('electionsApp', ['ui.router']);

electionsApp.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: '/about.html'
        });
});
