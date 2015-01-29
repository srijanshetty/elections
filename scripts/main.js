// Store the stateIndex
// TODO: remove this global
var stateIndex = 0;

// Setup the app
angular.module('electionsApp', ['ui.router', 'LocalStorageModule', 'ui.bootstrap']);

// Setup the router
angular.module('electionsApp')
.config(function appConfiguration($urlRouterProvider, $stateProvider) {
    // Function to check login
    function checkLogin($state, localStorageService) {
        var isLoggedIn = localStorageService.get('isLoggedIn');
        var nextState = localStorageService.get('nextState');

        // Redirect to login if login is not set
        if (!isLoggedIn && nextState !== $state.current.stateName) {
            $state.go('login');
        }
    }

    $urlRouterProvider.otherwise('/login');

    /** These are the necessary states */
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
            stateCode: ++stateIndex,
            controller: 'batchController',
            onEnter: checkLogin
        })
        .state('form.senator', {
            url: '/senator',
            templateUrl: 'partials/form-senator.html',
            stateName: 'senator',
            stateCode: ++stateIndex,
            controller: 'senatorController',
            onEnter: checkLogin
        });

    /** Configurable states */
    $stateProvider
        .state('form.president', {
            url: '/president',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'president',
            nextState: 'games',
            onEnter: checkLogin
        })
        .state('form.games', {
            url: '/games',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'games',
            nextState: 'mess',
            onEnter: checkLogin
        })
        .state('form.mess', {
            url: '/mess',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'mess',
            nextState: 'reading',
            onEnter: checkLogin
        })
        .state('form.reading', {
            url: '/reading',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'reading',
            nextState: 'maintenance',
            onEnter: checkLogin
        })
        .state('form.maintenance', {
            url: '/maintenance',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'maintenance',
            nextState: 'computer',
            onEnter: checkLogin
        })
        .state('form.computer', {
            url: '/computer',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'computer',
            nextState: 'submit',
            onEnter: checkLogin
        })
        .state('form.submit', {
            url: '/submit',
            templateUrl: 'partials/form-submit.html',
            stateCode: ++stateIndex,
            stateName: 'submit',
            controller: 'submitController',
            onEnter: checkLogin
        });
});

angular.module('electionsApp')
.factory('dataFactory', function() {
    var exports = {};

    // List of senators
    exports.senators = { };

    // The list of gensecs
    exports.gensecs = [
        { 'id': 101, 'name': 'Jitendra Katiyar', 'position': 'president', 'image': 'assets/Jitendra.jpg' },
        { 'id': 102, 'name': 'Sateesh Kumar Yadav', 'position': 'computer', 'image': 'assets/Sateesh.jpg'},
        { 'id': 103, 'name': 'Yaswanth Kumar Penke', 'position': 'games', 'image': 'assets/Yaswanth.jpg'},
        { 'id': 104, 'name': 'Aditya Desai', 'position': 'maintenance', 'image': 'assets/Aditya.jpg'},
        { 'id': 105, 'name': 'Amarjit Prakashrao Kene', 'position': 'mess', 'image': 'assets/Amarjit.jpg'},
        { 'id': 106, 'name': 'Anand Prakash Dwivedi', 'position': 'reading', 'image': 'assets/Anand.jpg'}

    ];

    // Full names of posts
    exports.fullPostNames = {
        'president' : 'President & Convener, HEC',
        'computer': 'Computer Room Secretary',
        'games': 'Games & Sports Secretary',
        'maintenance': 'Maintenance Secretary',
        'mess': 'Mess Secretary',
        'reading': 'Reading Room & Circulation Library Secretary'
    };

    // Settings for the application
    exports.settings = {
        'mainPassword': 'LetsVote',
        'cancelPassword': 'CancelThisVote',
        'adminPassword': 'IAmGod'
    };

    // total Number of states
    exports.totalStates = stateIndex;

    // All possible batches
    exports.batches = Object.keys(exports.senators);

    // All possible posts
    exports.posts = _.uniq(exports.gensecs.map(function (item) {
        return item.position;
    }));

    // Required entries in fullPost Names
    exports.fullPostNames.senator = 'Senator';
    exports.fullPostNames.batch = 'Batch';
    exports.fullPostNames.submit = 'Submit';

    // Get the names of senators
    exports.getSenators = function (batch) {
        return exports.senators[batch] || [];
    };

    // Get the names of presidents form the DB
    exports.getCandidates = function getCandidates(key) {
        return exports.gensecs.filter(function (value) {
            return (value.position === key);
        });
    };

    // Get fullPost Name
    exports.getPostName = function getPostName(post) {
        return exports.fullPostNames[post] || '';

    };
    return exports;
});
