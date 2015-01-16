// Function to check login
function checkLogin($state, localStorageService) {
    var isLoggedIn = localStorageService.get('isLoggedIn');
    var nextState = localStorageService.get('nextState');

    // Are we still loggedIN
    console.log(isLoggedIn);
    console.log(nextState);

    // Redirect to login if login is not set
    if (!isLoggedIn && nextState !== $state.current.stateName) {
        $state.go('login');
    }
}

var electionsApp = angular.module('electionsApp', ['ui.router', 'LocalStorageModule', 'ui.bootstrap']);

// Setup the router
electionsApp.config(function appConfiguration($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginController'
    })
    .state('admin', {
        url: '/admin',
        templateUrl: 'partials/admin.html',
        controller: 'adminController'
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
    .state('form.cultural', {
        url: '/cultural',
        templateUrl: 'partials/form-cultural.html',
        stateName: 'cultural',
        stateCode: 5,
        controller: 'culturalController',
        onEnter: checkLogin
    })
    .state('form.science', {
        url: '/science',
        templateUrl: 'partials/form-science.html',
        stateName: 'science',
        stateCode: 6,
        controller: 'scienceController',
        onEnter: checkLogin
    })
    .state('form.films', {
        url: '/films',
        templateUrl: 'partials/form-films.html',
        stateName: 'films',
        stateCode: 7,
        controller: 'filmsController',
        onEnter: checkLogin
    })
    .state('form.submit', {
        url: '/submit',
        templateUrl: 'partials/form-submit.html',
        stateName: 'submit',
        stateCode: 8,
        controller: 'submitController',
        onEnter: checkLogin
    });
});

electionsApp.factory('dataFactory', function($http, localStorageService) {
    var exports = {};

    // Set up the database
    var voteCount = localStorageService.get('voteCount');
    if (!voteCount) {
        localStorageService.set('voteCount', 0);
    }

    // total Number of states
    exports.totalStates = 8;

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

        return senators[batch] || [];
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

    // Get the names of candidates for cultural form the DB
    exports.getCultural = function () {
        var candidates = [
            { 'id': 201, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

        return candidates;
    };

    // Get the names of candidates for science form the DB
    exports.getScience = function () {
        var candidates = [
            { 'id': 201, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

        return candidates;
    };

    // Get the names of candidates for films form the DB
    exports.getFilms = function () {
        var candidates = [
            { 'id': 201, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

        return candidates;
    };

    // Settings for the application
    exports.settings = {};
    $http.get('settings.json')
        .success(function getSettings(data) {
            exports.settings = data;
        })
        .error(function () {
            window.alert('Error');
        });

    return exports;
});
