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
            nextState: 'mess',
            onEnter: checkLogin
        })
        .state('form.mess', {
            url: '/mess',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'mess',
            nextState: 'snt',
            onEnter: checkLogin
        })
        .state('form.snt', {
            url: '/snt',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'snt',
            nextState: 'sports',
            onEnter: checkLogin
        })
        .state('form.sports', {
            url: '/sports',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'sports',
            nextState: 'accounts',
            onEnter: checkLogin
        })
        .state('form.accounts', {
            url: '/accounts',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'accounts',
            nextState: 'cultural',
            onEnter: checkLogin
        })
        .state('form.cultural', {
            url: '/cultural',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'cultural',
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
        { 'id': 101, 'name': 'Kshitij Yadav', 'position': 'president', 'image': 'assets/Kshitij.jpg' },
        { 'id': 102, 'name': 'Saiyam Surana', 'position': 'president', 'image': 'assets/Saiyam.jpg' },
        { 'id': 103, 'name': 'Subham Todi', 'position': 'mess', 'image': 'assets/Subham.jpg' },
        { 'id': 104, 'name': 'Yash Sharma', 'position': 'mess', 'image': 'assets/Yash.jpg' },
        { 'id': 105, 'name': 'Anvesh Jadon', 'position': 'snt', 'image': 'assets/Anvesh.jpg'},
        { 'id': 106, 'name': 'Shah Harsh Atul', 'position': 'snt', 'image': 'assets/Shah.jpg'},
        { 'id': 107, 'name': 'Chinmai Garg', 'position': 'sports', 'image': 'assets/Chinmai.jpg'},
        { 'id': 108, 'name': 'Abhinav Agrawal', 'position': 'accounts', 'image': 'assets/AbhinavA.jpg'},
        { 'id': 109, 'name': 'Abhinav Garg', 'position': 'accounts', 'image': 'assets/AbhinavG.jpg'},
        { 'id': 110, 'name': 'Pankaj Kumar', 'position': 'cultural', 'image': 'assets/Pankaj.jpg'},
        { 'id': 111, 'name': 'Shubham Tyagi', 'position': 'cultural', 'image': 'assets/Shubham.jpg'},
        { 'id': 112, 'name': 'Kartikey Bhargav', 'position': 'computer', 'image': 'assets/Kartikey.jpg'}

    ];

    // Full names of posts
    exports.fullPostNames = {
        'president' : 'President',
        'mess': 'Mess Secretary',
        'snt': 'Science and Technology Secretary',
        'sports': 'Sports Secretary',
        'accounts': 'Accounts Secretary',
        'cultural': 'Cultural Secretary',
        'computer': 'Computer and Reading Room Secretary'
    };

    // Settings for the application
    exports.settings = {
        'mainPassword': 'LetsVote',
        'cancelPassword': 'LetsVote',
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
