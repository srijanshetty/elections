var electionsApp = angular.module('electionsApp', ['ui.router']);

electionsApp.config(function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/form/batch');

    $stateProvider
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController',
            controllerAs: 'form'
        })
        .state('form.batch', {
            url: '/batch',
            templateUrl: 'form-batch.html',
            controller: function($scope) {
                $scope.name = 'batch';
                $scope.code = 1;
            }
        })
        .state('form.senator', {
            url: '/senator',
            templateUrl: 'form-senator.html',
            controller: function($scope) {
                $scope.name = 'senator';
                $scope.code = 2;
            }
        });
});

electionsApp.controller('formController', function () {
    this.formData = {};

    this.batches = [
        { code: 'y10', fullName: 'UG, Y10'},
        { code: 'y11', fullName: 'UG, Y11'},
        { code: 'y12', fullName: 'UG, Y12'},
        { code: 'y13', fullName: 'UG, Y13'}
    ];

    this.processForm = function() {
        window.alert('awesome');
    };
});
