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
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: 3,
        stateName: 'president',
        nextState: 'games',
        onEnter: checkLogin
    })
    .state('form.games', {
        url: '/games',
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: 4,
        stateName: 'games',
        nextState: 'cultural',
        onEnter: checkLogin
    })
    .state('form.cultural', {
        url: '/cultural',
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: 5,
        stateName: 'cultural',
        nextState: 'science',
        onEnter: checkLogin
    })
    .state('form.science', {
        url: '/science',
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: 6,
        stateName: 'science',
        nextState: 'films',
        onEnter: checkLogin
    })
    .state('form.films', {
        url: '/films',
        templateUrl: 'partials/form-executive.html',
        controller: 'executiveController',
        stateCode: 7,
        stateName: 'films',
        nextState: 'submit',
        onEnter: checkLogin
    })
    .state('form.submit', {
        url: '/submit',
        templateUrl: 'partials/form-submit.html',
        stateCode: 8,
        stateName: 'submit',
        controller: 'submitController',
        onEnter: checkLogin
    });
});
