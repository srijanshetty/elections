// Sort array
Array.prototype.shuffle = function (){
    var i = this.length, j, temp;
    if ( i === 0 ) {
        return;
    }

    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
};

// Function to check login
function checkLogin($state, localStorageService) {
    var isLoggedIn = localStorageService.get('isLoggedIn');
    var nextState = localStorageService.get('nextState');

    // Redirect to login if login is not set
    if (!isLoggedIn && nextState !== $state.current.stateName) {
        $state.go('login');
    }
}

// Store the stateIndex
// TODO: remove this global
var stateIndex = 0;

// Setup the app
angular.module('electionsApp', ['ui.router', 'LocalStorageModule', 'ui.bootstrap']);

// Setup the router
angular.module('electionsApp')
.config(function appConfiguration($urlRouterProvider, $stateProvider) {
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
    })
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
        nextState: 'cultural',
        onEnter: checkLogin
    })
    .state('form.cultural', {
        url: '/cultural',
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: ++stateIndex,
        stateName: 'cultural',
        nextState: 'science',
        onEnter: checkLogin
    })
    .state('form.science', {
        url: '/science',
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: ++stateIndex,
        stateName: 'science',
        nextState: 'films',
        onEnter: checkLogin
    })
    .state('form.films', {
        url: '/films',
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: ++stateIndex,
        stateName: 'films',
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

        // The list of gensecs
        exports.gensecs = [
            { 'id': 101, 'name': 'Gautam Pratap Singh', 'position': 'president', 'image': 'assets/Gautam.jpg' },
            { 'id': 102, 'name': 'Pushapjeet Singh Sodhi', 'position': 'president', 'image': 'assets/Pushap.jpg' },
            { 'id': 103, 'name': 'Ashish Aggarwal', 'position': 'cultural', 'image': 'assets/Ashish.jpg' },
            { 'id': 104, 'name': 'Chirag Jha', 'position': 'science', 'image': 'assets/Chirag.jpg' },
            { 'id': 105, 'name': 'Rishi Gupta', 'position': 'science', 'image': 'assets/Rishi.jpg' },
            { 'id': 106, 'name': 'Prateek Mishra', 'position': 'films', 'image': 'assets/Prateek.jpg' },
            { 'id': 107, 'name': 'Balendu Shekhar', 'position': 'games', 'image': 'assets/Balendu.jpg' },
            { 'id': 108, 'name': 'M Surya Prakash', 'position': 'games', 'image': 'assets/Surya.jpg' }
        ];

        // List of senators
        exports.senators = {
            'UG, Y14': [
                { 'id': 1, 'name': 'Ayushya Aggarwal', 'image': 'assets/Ayushya.jpg' },
                { 'id': 2, 'name': 'Gaurav Seth', 'image': 'assets/Gaurav.jpg' },
                { 'id': 3, 'name': 'Harshit Bisht', 'image': 'assets/Harshit.jpg' },
                { 'id': 4, 'name': 'Kunal Kapila', 'image': 'assets/Kunal.jpg' },
                { 'id': 5, 'name': 'Nikhil Bansal', 'image': 'assets/Nikhil.jpg' },
                { 'id': 6, 'name': 'Shikhar Verma', 'image': 'assets/Shikhar.jpg' },
                { 'id': 7, 'name': 'Simrat Singh', 'image': 'assets/Simrat.jpg' },
                { 'id': 8, 'name': 'Shubham Kumar Pandey', 'image': 'assets/Shubham.jpg' }
            ],
            'UG, Y13': [
                { 'id': 11, 'name': 'Abhimanyu Yadav', 'image': 'assets/Abhimanyu.jpg' },
                { 'id': 12, 'name': 'Ashutosh Ranka', 'image': 'assets/Ashutosh.jpg' },
                { 'id': 13, 'name': 'Manikanta Reddy', 'image': 'assets/Manikanta.jpg' },
                { 'id': 14, 'name': 'Sagar Rastogi', 'image': 'assets/Sagar.jpg' },
                { 'id': 15, 'name': 'Samyak Jain', 'image': 'assets/Samyak.jpg' },
                { 'id': 16, 'name': 'Sparsh', 'image': 'assets/Sparsh.jpg' },
                { 'id': 17, 'name': 'Vedant Goenka', 'image': 'assets/Vedant.jpg' }
            ],
            'OTHERS': [],
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

        return exports;
    });
