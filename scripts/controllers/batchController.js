angular.module('electionsApp')
    .controller('batchController', function batchController($state, $scope, localStorageService, $modal) {
        // Process the submit request
        $scope.processBatchSubmit = function () {
            // Check the validation of the form
            if ($scope.formData.batch === '') {
                // TODO: Add a modal over here
                $modal.open({ templateUrl: '../../partials/errorModal.html'});
            } else {
                // Set the next state
                localStorageService.set('nextState', 'senator');

                // Redirect to senator
                $state.go('form.senator');
            }
        };
    });
