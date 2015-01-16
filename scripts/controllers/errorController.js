angular.module('electionsApp')
    .controller('threePreferencesErrorController', function threePreferencesErrorController($modalInstance, $scope) {
        $scope.error = {};
        $scope.error.name = 'Validation Error';
        $scope.error.msg = 'Please enter three preferences';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('twoPreferencesErrorController', function twoPreferencesErrorController($modalInstance, $scope) {
        $scope.error = {};
        $scope.error.name = 'Validation Error';
        $scope.error.msg = 'Please enter two preferences';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('onePreferenceErrorController', function onePreferenceErrorController($modalInstance, $scope) {
        $scope.error = {};
        $scope.error.name = 'Validation Error';
        $scope.error.msg = 'Please enter one preference';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('choiceErrorController', function choiceErrorController($modalInstance, $scope) {
        $scope.error = {};
        $scope.error.name = 'Validation Error';
        $scope.error.msg = 'Please enter distinct preferences';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
        };
    });
