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
            nextState: 'readingcc',
            onEnter: checkLogin
        })
        .state('form.readingcc', {
            url: '/readingcc',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'readingcc',
            nextState: 'messcanteen',
            onEnter: checkLogin
        })
        .state('form.messcanteen', {
            url: '/messcanteen',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'messcanteen',
            nextState: 'messonly',
            onEnter: checkLogin
        })
        .state('form.messonly', {
            url: '/messonly',
            templateUrl: 'partials/form-executive.html',
            controller: 'executiveController',
            stateCode: ++stateIndex,
            stateName: 'messonly',
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
        { 'id': 101, 'name': 'Sachin Kumar', 'position': 'president', 'image': 'assets/sachin_kumar.jpg' },
        { 'id': 102, 'name': 'Sayan Bhattacharyya', 'position': 'president', 'image': 'assets/sayan_bhattacharyya.jpg' },
        { 'id': 104, 'name': 'Arun Kumar Agarwal', 'position': 'messcanteen', 'image': 'assets/arun_kumar.jpg' },
        { 'id': 105, 'name': 'Anurag', 'position': 'messcanteen', 'image': 'assets/anurag.jpg' },
        { 'id': 106, 'name': 'Ashish Pal', 'position': 'messonly', 'image': 'assets/ashish_pal.jpg' },
        { 'id': 107, 'name': 'Danish Abbas', 'position': 'messonly', 'image': 'assets/danish_abbas.jpg' },
        { 'id': 108, 'name': 'Ras Dwivedi', 'position': 'maintenance', 'image': 'assets/ras_dwivedi.jpg' },
        { 'id': 109, 'name': 'Ritesh Verma', 'position': 'maintenance', 'image': 'assets/ritesh_verma.jpg' },
        { 'id': 110, 'name': 'Daevesh Kumar Singh', 'position': 'cult', 'image': 'assets/devesh_kumar.jpg' },
        { 'id': 111, 'name': 'Taha Sheikh', 'position': 'cult', 'image': 'assets/taha_sheikh.jpg' },
        { 'id': 112, 'name': 'Parveen', 'position': 'readingcc', 'image': 'assets/parveen.jpg' },
        { 'id': 113, 'name': 'Suvasis Den', 'position': 'readingcc', 'image': 'assets/suvasis_den.jpg' },
        { 'id': 114, 'name': 'Abhishek Joshi', 'position': 'games', 'image': 'assets/abhishek_joshi.jpg' },
        { 'id': 115, 'name': 'Rahul', 'position': 'games', 'image': 'assets/rahul.jpg' },
        { 'id': 116, 'name': 'Zoting Chetan Prakash', 'position': 'acc', 'image': 'assets/zoting_chetan.jpg' },
    ];

    // Full names of posts
    exports.fullPostNames = {
      'president' : 'President',
      'games': 'Sports Secretary',
      'cult': 'Cultural Secretary',
      'snt': 'Science and Technology Secretary',
      'maintenance': 'Maintenance Secretary',
      'acc': 'Accounts Secretary',
      'convener': 'Convener',
      'messcanteen': 'Mess and Canteen Secretary',
      'messonly': 'Mess secretary',
      'readingcc': 'Reading room and CC secretary'
    };

    // Settings for the application
    exports.settings = {
        'mainPassword': 'halldas',
        'cancelPassword': 'cancelkaro',
        'adminPassword': 'ceo_sweg'
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
