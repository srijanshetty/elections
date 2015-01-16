// Function to check login
function checkLogin($state, localStorageService) {
    var isLoggedIn = localStorageService.get('isLoggedIn');
    var nextState = localStorageService.get('nextState');

    // Redirect to login if login is not set
    if (!isLoggedIn && nextState !== $state.current.stateName) {
        $state.go('login');
    }
}

var electionsApp = angular.module('electionsApp', ['ui.router', 'LocalStorageModule', 'ui.bootstrap']);

// Setup the router
electionsApp.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    })
    .state('form', {
        url: '',
        abstract: true,
        templateUrl: 'partials/form.html',
        controller: 'formController'
    })
    .state('form.batch', {
        url: '/batch',
        templateUrl: 'partials/form-batch.html',
        stateName: 'Info',
        stateCode: 1,
        controller: 'batchController',
        onEnter: checkLogin
    })
    .state('form.senator', {
        url: '/senator',
        templateUrl: 'partials/form-senator.html',
        stateName: 'senator',
        stateCode: 2,
        controller: 'senatorController',
        onEnter: checkLogin
    })
    .state('form.president', {
        url: '/president',
        templateUrl: 'partials/form-president.html',
        stateName: 'president',
        stateCode: 3,
        controller: 'presidentController',
        onEnter: checkLogin
    })
    .state('form.games', {
        url: '/games',
        templateUrl: 'partials/form-games.html',
        stateName: 'games',
        stateCode: 4,
        controller: 'gamesController',
        onEnter: checkLogin
    })
    .state('form.thanks', {
        url: '/thanks',
        templateUrl: 'partials/form-thanks.html',
        stateName: 'thanks',
        stateCode: 7,
        controller: 'thanksController',
        onEnter: checkLogin
    });
});

electionsApp.factory('dataFactory', function() {
    var exports = {};

    // All possible batches
    exports.batches = [
        { code: 'y10', fullName: 'UG, Y10'},
        { code: 'y11', fullName: 'UG, Y11'},
        { code: 'y12', fullName: 'UG, Y12'},
        { code: 'y13', fullName: 'UG, Y13'}
    ];

    // Get the names of senators
    exports.getSenators = function (batch) {
        var senators = {
            'y11': [ { 'id': 1, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                     { 'id': 2, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                     { 'id': 3, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                     { 'id': 4, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                     { 'id': 5, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                     { 'id': 6, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                     { 'id': 7, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                     { 'id': 8, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                     { 'id': 9, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }]
        };

        return senators[batch];
    };

    // Get the names of presidents form the DB
    exports.getPresidents = function () {
        var candidates = [
            { 'id': 101, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
            { 'id': 103, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
            { 'id': 102, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

        return candidates;
    };

    // Get the names of candidates for games form the DB
    exports.getGames = function () {
        var candidates = [
            { 'id': 201, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

        return candidates;
    };


    // Settings for the application
    exports.settings = {
        mainPassword: 'srijan',
        cancelPassword: 'cancel'
    };

    return exports;
});
