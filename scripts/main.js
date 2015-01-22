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

angular.module('electionsApp')
    .filter('shuffle', function() {
        var shuffledArr = [],
            shuffledLength = 0;
        return function(arr) {
            var o = arr.slice(0, arr.length);
            if (shuffledLength === arr.length) {
                return shuffledArr;
            }
            for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            shuffledArr = o;
            shuffledLength = o.length;
            return o;
        };
    });
