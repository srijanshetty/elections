// Function to check login
function checkLogin($state, localStorageService) {
    var isLoggedIn = localStorageService.get('isLoggedIn');

    if (!isLoggedIn) {
        // $state.go('login');
        console.log('Not logged in');
    }
}

var electionsApp = angular.module('electionsApp', ['ui.router', 'LocalStorageModule']);

// Setup the router
electionsApp.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginController'
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
        stateName: '',
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
    .state('form.thanks', {
        url: '/thanks',
        templateUrl: 'partials/form-thanks.html',
        stateName: 'thanks',
        stateCode: 7,
        controller: 'thanksController',
        onEnter: checkLogin,
        onExit: function (localStorageService) {
            localStorageService.remove('isLoggedIn');
        }
    });
});

electionsApp.factory('dataFactory', function() {
    var exports = {};

    exports.batches = [
        { code: 'y10', fullName: 'UG, Y10'},
        { code: 'y11', fullName: 'UG, Y11'},
        { code: 'y12', fullName: 'UG, Y12'},
        { code: 'y13', fullName: 'UG, Y13'}
    ];

    exports.getSenators = function (batch) {
        var senators = {
            'y11': [ { 'name': 'Srijan R. Shetty', 'rollNo': '11727' } ]
        };

        return senators[batch];
    };

    return exports;
});

electionsApp.controller('loginController', function($state, $scope, localStorageService) {
    $scope.processLoginSubmit = function() {
        if ($scope.password && $scope.password === 'srijan') {
            localStorageService.set('isLoggedIn', 1);
            $state.go('form.batch');
        } else {
            window.alert('Wrong Password');
            $scope.password = '';
        }
    };
});

electionsApp.controller('formController', function ($rootScope, $state, dataFactory, $scope) {
    var vm = $scope;

    // To store formData
    vm.formData = {};

    // For the breadcrumb navigation
    vm.totalStates = 7;
    vm.range = function(n) {
        return new Array(n);
    };

    // Obtain the list of batches from the dataFactory
    vm.batches = dataFactory.batches;

    // Make sure the correct stateName and stateCode are displayed everytime
    vm.stateName = $state.current.stateName;
    vm.stateCode = $state.current.stateCode;
    $rootScope.$on('$stateChangeSuccess', function(events, toState) {
        vm.stateName = toState.stateName;
        vm.stateCode = toState.stateCode;
    });
});

electionsApp.controller('batchController', function batchController($state, $scope) {
    // Process the submit request
    $scope.processBatchSubmit = function () {
        $state.go('form.senator');
    };
});

electionsApp.controller('senatorController', function senatorContoller($state, $scope, dataFactory) {
    // Make a list of senators available to the view
    $scope.senatorList = dataFactory.getSenators($scope.formData.batch);

    // Process the submit request
    $scope.processSenatorSubmit = function () {
        $state.go('form.president');
    };
});

electionsApp.controller('presidentController', function presidentContoller($state, $scope) {
    // Process the submit request
    $scope.processPresidentSubmit = function () {
        $state.go('form.thanks');
    };
});

electionsApp.controller('thanksController', function thanksController($state, $scope) {
    // Process the submit request
    $scope.processThanksSubmit = function () {
        $state.go('login');
    };
});
