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
            nextState: 'canteen',
            onEnter: checkLogin
        })
        .state('form.canteen', {
            url: '/canteen',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'canteen',
            nextState: 'sports',
            onEnter: checkLogin
        })
        .state('form.sports', {
            url: '/sports',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'sports',
            nextState: 'garden',
            onEnter: checkLogin
        })
        .state('form.garden', {
            url: '/garden',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'garden',
            nextState: 'cultural',
            onEnter: checkLogin
        })
        .state('form.cultural', {
            url: '/cultural',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'cultural',
            nextState: 'reading',
            onEnter: checkLogin
        })
        .state('form.reading', {
            url: '/reading',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'reading',
            nextState: 'computer',
            onEnter: checkLogin
        })
        .state('form.computer', {
            url: '/computer',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'computer',
            nextState: 'maintenance',
            onEnter: checkLogin
        })
        .state('form.maintenance', {
            url: '/maintenance',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'maintenance',
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
        { 'id': 101, 'name': 'Anmol Thakur', 'position': 'president', 'image': 'assets/Anmol.jpg' },
        { 'id': 102, 'name': 'Sahil Kalra', 'position': 'mess', 'image': 'assets/Sahil.jpg'},
        { 'id': 103, 'name': 'Khun Sang Phukon', 'position': 'canteen', 'image': 'assets/Phukon.jpg'},
        { 'id': 104, 'name': 'Ishan Choudhary', 'position': 'sports', 'image': 'assets/Ishan.jpg'},
        { 'id': 105, 'name': 'Samir P Parmar', 'position': 'garden', 'image': 'assets/Samir.jpg'},
        { 'id': 106, 'name': 'Alestin Mawre', 'position': 'cultural', 'image': 'assets/Alestin.jpg'},
        { 'id': 107, 'name': 'Subhash Singh', 'position': 'reading', 'image': 'assets/Subhash.jpg'},
        { 'id': 108, 'name': 'Mritunjay Kumar', 'position': 'computer', 'image': 'assets/Mritunjay.jpg'},
        { 'id': 109, 'name': 'Rabeet Singh', 'position': 'maintenance', 'image': 'assets/Rabeet.jpg'}

    ];

    // Full names of posts
    exports.fullPostNames = {
        'president' : 'President',
        'mess': 'Mess Store and Supply',
        'canteen': 'Chairman, Canteen Committee',
        'sports': 'Chairman, Sports Committee',
        'garden': 'Chairman, Garden Committee',
        'cultural': 'Chairman, Cultural Committee',
        'reading': 'Chairman, Reading Room',
        'computer': 'Chairman, Computer Room',
        'maintenance': 'Chairman, Maintenance',
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
