angular.module('electionsApp')
    .controller('submitController', function submitController($state, $scope, localStorageService, $modal) {
        // Process the submit request
        $scope.processSubmitSubmit = function () {
            // Clean up
            localStorageService.clearAll();

            console.log($scope.formData);

            var controller = '';
            if (true) {
                controller = 'successSubmitController';
            } else {
                controller = 'failedSubmitController';
            }

            // Open the correct controller
            $modal.open({
                templateUrl: 'partials/errorModal.html',
                controller: controller
            });
        };
    })
    .controller('successSubmitController', function successSubmitController($state, $modalInstance, $scope) {
        $scope.error = {};
        $scope.error.name = 'Success';
        $scope.error.msg = 'Your vote has been successfully entered into the system';
        $scope.error.button = 'done';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
            $state.go('login');
        };
    })
    .controller('failedSumitController', function failedSubmitController($modalInstance, $scope, $state) {
        $scope.error = {};
        $scope.error.name = 'Failed';
        $scope.error.msg = 'There has been an error, please contact the election officer';
        $scope.error.button = 'recast';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
            $state.go('login');
        };
    });
