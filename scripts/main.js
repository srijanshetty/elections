var electionsApp = angular.module('electionsApp', ['ui.router']);

// Setup the router
electionsApp.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/form/batch');

    $stateProvider
        .state('form', {
            url: '/form',
            abstract: true,
            templateUrl: 'form.html',
            controller: 'formController'
        })
        .state('form.batch', {
            url: '/batch',
            templateUrl: 'form-batch.html',
            stateName: 'batch',
            stateCode: 2
        })
        .state('form.senator', {
            url: '/senator',
            templateUrl: 'form-senator.html',
            stateName: 'senator',
            stateCode: 3,
            controller: function senatorContoller($state, $scope, dataFactory) {
                if ($scope.formData.batch) {
                    // Indicate that the president state has been set
                    $scope.states.senator = true;

                    var senatorList = dataFactory.senators[$scope.formData.batch];
                    console.log(senatorList[0].name);
                } else {
                    $state.go('form.batch');
                }
            }
        })
        .state('form.president', {
            url: '/president',
            templateUrl: 'form-president.html',
            stateName: 'president',
            stateCode: 4,
            controller: function presidentContoller($state, $scope, dataFactory) {
                if ($scope.states.senator) {
                    // Indicate that the president state has been set
                    $scope.states.president = true;
                } else {
                    $state.go('form.senator');
                }
            }

        })
        .state('form.thanks', {
            url: '/thanks',
            templateUrl: 'form-thanks.html',
            stateName: 'thanks',
            stateCode: 10
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

    exports.senators = {
        'y11': [
            {
                'name': 'Srijan R. Shetty',
                'rollNo': '11727'
            }
        ]
    };

    return exports;
});

electionsApp.controller('formController', function ($rootScope, $state, dataFactory, $scope) {
    var vm = $scope;

    // To store formData
    vm.formData = {};

    // This would keep a track of visited states
    vm.states = {};

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
