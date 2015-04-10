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
            nextState: 'maintenance',
            onEnter: checkLogin
        })
        .state('form.maintenance', {
            url: '/maintenance',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'maintenance',
            nextState: 'mess1',
            onEnter: checkLogin
        })
        .state('form.mess1', {
            url: '/mess1',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'mess1',
            nextState: 'mess2',
            onEnter: checkLogin
        })
        .state('form.mess2', {
            url: '/mess2',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'mess2',
            nextState: 'reading',
            onEnter: checkLogin
        })
        .state('form.reading', {
            url: '/reading',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'reading',
            nextState: 'cultural',
            onEnter: checkLogin
        })
        .state('form.cultural', {
            url: '/cultural',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'cultural',
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
            nextState: 'snt',
            onEnter: checkLogin
        })
        .state('form.snt', {
            url: '/snt',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'snt',
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
        { 'id': 101, 'name': 'Sushant Sirohi', 'position': 'president', 'image': 'assets/Sushant.jpg' },
        { 'id': 102, 'name': 'Mayank Varshney', 'position': 'president', 'image': 'assets/Mayank.jpg' },
        { 'id': 103, 'name': 'Saurabh', 'position': 'maintenance', 'image': 'assets/Saurabh.jpg' },
        { 'id': 104, 'name': 'Tarun Yadav', 'position': 'maintenance', 'image': 'assets/Tarun.png' },
        { 'id': 105, 'name': 'Jayant Jain', 'position': 'mess1', 'image': 'assets/Jayant.jpg'},
        { 'id': 106, 'name': 'Prateek Jain', 'position': 'mess2', 'image': 'assets/Prateek.jpg'},
        { 'id': 107, 'name': 'Shivam Singhal', 'position': 'reading', 'image': 'assets/Shivam.jpg'},
        { 'id': 108, 'name': 'Nikhil Singh', 'position': 'cultural', 'image': 'assets/Nikhil.jpg'},
        { 'id': 109, 'name': 'Arshil Abbas', 'position': 'sports', 'image': 'assets/Arshil.jpg'},
        { 'id': 110, 'name': 'Brahmesh Joshi', 'position': 'garden', 'image': 'assets/Brahmesh.jpg'},
        { 'id': 111, 'name': 'Suyash Karkare', 'position': 'snt', 'image': 'assets/Suyash.jpg'}

    ];

    // Full names of posts
    exports.fullPostNames = {
        'president' : 'President',
        'maintenance': 'Maintenance Secretary',
        'mess1': 'Mess and Canteen Secretary - 1',
        'mess2': 'Mess and Canteen Secretary - 2',
        'reading': 'Reading Room Secretary',
        'cultural': 'Cultural Secretary',
        'sports': 'Sports Secretary',
        'garden': 'Accounts and Gardening Secretary',
        'snt': 'Science and Technology Secretary',
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
