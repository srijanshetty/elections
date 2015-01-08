var electionsApp = angular.module('electionsApp', ['ui.router']);

// Setup the router
electionsApp.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/batch');

    $stateProvider
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
            stateCode: 1
        })
        .state('form.senator', {
            url: '/senator',
            templateUrl: 'partials/form-senator.html',
            stateName: 'senator',
            stateCode: 2,
            controller: 'senatorController'
        })
        .state('form.president', {
            url: '/president',
            templateUrl: 'partials/form-president.html',
            stateName: 'president',
            stateCode: 3,
            controller: 'presidentController'
        })
        .state('form.thanks', {
            url: '/thanks',
            templateUrl: 'partials/form-thanks.html',
            stateName: 'thanks',
            stateCode: 7
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
            'y11': [
                {
                    'name': 'Srijan R. Shetty',
                    'rollNo': '11727'
                }
            ]
        };

        return senators[batch];
    };

    return exports;
});

electionsApp.controller('formController', function ($rootScope, $state, dataFactory, $scope) {
    var vm = $scope;

    // To store formData
    vm.formData = {};

    // This would keep a track of visited states
    vm.states = {};

    // For the breadcrumb navigation
    vm.totalStates = 7;
    vm.range = function(n) {
        return new Array(n);
    };

    // Obtain the list of batches from the dataFactory
    vm.batches = dataFactory.batches;

    // Complete the processing of the form
    vm.processForm = function() {
        window.alert('awesome');
    };

    // Make sure the correct stateName and stateCode are displayed everytime
    vm.stateName = $state.current.stateName;
    vm.stateCode = $state.current.stateCode;
    $rootScope.$on('$stateChangeSuccess', function(events, toState) {
        vm.stateName = toState.stateName;
        vm.stateCode = toState.stateCode;
    });
});

electionsApp.controller('senatorController', function senatorContoller($state, $scope, dataFactory) {
    // Check if batch has been selected otherwise backtrack
    if ($scope.formData.batch) {
        // Indicate that the senator state has been set
        $scope.states.senator = true;

        // Make a list of senators available to the view
        $scope.senatorList = dataFactory.getSenators($scope.formData.batch);
        console.log($scope.senatorList);
    } else {
        $state.go('form.batch');
    }
});

electionsApp.controller('presidentController', function presidentContoller($state, $scope, dataFactory) {
    // Check if vote has been cast for senator and then backtrack
    if ($scope.states.senator) {
        // Indicate that the president state has been set
        $scope.states.president = true;
    } else {
        $state.go('form.senator');
    }
});
