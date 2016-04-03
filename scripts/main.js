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
            nextState: 'cult',
            onEnter: checkLogin
        })
        .state('form.cult', {
            url: '/cult',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'cult',
            nextState: 'snt',
            onEnter: checkLogin
        })
        .state('form.snt', {
            url: '/snt',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'snt',
            nextState: 'maintenance',
            onEnter: checkLogin
        })
        .state('form.maintenance', {
            url: '/maintenance',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'maintenance',
            nextState: 'acc',
            onEnter: checkLogin
        })
        .state('form.acc', {
            url: '/acc',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'acc',
            nextState: 'convener',
            onEnter: checkLogin
        })
        .state('form.convener', {
            url: '/convener',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'convener',
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
        { 'id': 101, 'name': 'Tarun Sharma', 'position': 'president', 'image': 'assets/TS.jpg' },
        { 'id': 102, 'name': 'Siddhant Naik', 'position': 'president', 'image': 'assets/SN.jpg' },
        { 'id': 103, 'name': 'Aryan Goyal', 'position': 'president', 'image': 'assets/AG.jpg' },
        { 'id': 104, 'name': 'Tarundeep Singh Gill', 'position': 'games', 'image': 'assets/TSG.jpg' },
        { 'id': 105, 'name': 'Rajat Pandey', 'position': 'games', 'image': 'assets/RP.jpg' },
        { 'id': 106, 'name': 'Anil Kumar', 'position': 'games', 'image': 'assets/AK.jpg' },
        { 'id': 107, 'name': 'Shrey Agrawal', 'position': 'cult', 'image': 'assets/SA.jpg' },
        { 'id': 108, 'name': 'Saurabh Dubey', 'position': 'cult', 'image': 'assets/SD.jpg' },
        { 'id': 109, 'name': 'Prannay Khosla', 'position': 'snt', 'image': 'assets/PK_s.jpg' },
        { 'id': 110, 'name': 'Prashant Kumar', 'position': 'maintenance', 'image': 'assets/PK_m.jpg' },
        { 'id': 111, 'name': 'Gaurav Padnekar', 'position': 'maintenance', 'image': 'assets/GP.jpg' },
        { 'id': 112, 'name': 'Swastid Sharma', 'position': 'acc', 'image': 'assets/SS.jpg' },
        { 'id': 113, 'name': 'Deepak Darji', 'position': 'convener', 'image': 'assets/DD.jpg' },
    ];

    // Full names of posts
    exports.fullPostNames = {
        'president' : 'President',
        'games': 'Games & Sports Secretary',
        'cult': 'Cultural Secretary',
        'snt': 'Science and Technology Secretary',
        'maintenance': 'Maintenance Secretary',
        'acc': 'Accounts Secretary',
        'convener': 'Convener'
    };

    // Settings for the application
    exports.settings = {
        'mainPassword': 'hall2bakait',
        'cancelPassword': 'cancel',
        'adminPassword': 'ceo_swag'
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
