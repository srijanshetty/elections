angular.module('electionsApp')
    .controller('batchController', function batchController($state, $scope, localStorageService) {
        // Process the submit request
        $scope.processBatchSubmit = function () {
            // Set the next state
            localStorageService.set('nextState', 'senator');

            // Redirect to senator
            $state.go('form.senator');
        };
    });

