angular.module('electionsApp')
    .controller('batchController', function batchController($state, $scope, localStorageService, $modal) {
        // Skip this step if there are no items in the list
        if ( !$scope.batches || $scope.batches.length === 0) {
            // Set the next state
            localStorageService.set('nextState', 'president');

            // Redirect to president
            $state.go('form.president');
        }

        // Process the submit request
        $scope.processBatchSubmit = function () {
            // Check the validation of the form
            if ($scope.formData.batch === '') {
                $modal.open({
                    templateUrl: 'partials/errorModal.html',
                    controller: 'batchErrorController'
                });
            } else {
                // Set the next state
                localStorageService.set('nextState', 'senator');

                // Redirect to senator
                $state.go('form.senator');
            }
        };
    })
    .controller('batchErrorController', function batchErrorController($modalInstance, $scope) {
        $scope.error = {};
        $scope.error.name = 'Input Error';
        $scope.error.msg = 'Please provide a valid batch';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
        };
    });
