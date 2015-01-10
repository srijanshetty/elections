angular.module('electionsApp')
    .controller('formController', function ($rootScope, $state, dataFactory, $scope) {
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
