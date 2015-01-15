angular.module('electionsApp')
    .controller('senatorController', function senatorContoller($state, $scope, dataFactory, localStorageService) {
        // Make a list of senators available to the view
        $scope.senatorList = dataFactory.getSenators($scope.formData.batch);

        // Skip this step if there are no items in t
        if ( !$scope.senatorList || $scope.senatorList.length === 0) {
            $state.go('form.president');
        }

        // Process the submit request
        $scope.processSenatorSubmit = function () {
            if ($scope.senatorList.length >= 3) {
                if (!$scope.formData.senatorFirst || !$scope.formData.senatorSecond || !$scope.formData.senatorThird) {
                    window.alert('Enter three preferences');
                    return;
                }
            } else if ($scope.senatorList.length === 2) {
                if (!$scope.formData.senatorFirst || !$scope.formData.senatorSecond) {
                    window.alert('Enter two preferences');
                    return;
                }
            } else if ($scope.senatorList.length === 1) {
                if (!$scope.formData.senatorFirst) {
                    window.alert('Enter a preference');
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.formData.senatorFirst === $scope.formData.senatorSecond) ||
                       ($scope.formData.senatorSecond === $scope.formData.senatorThird) ||
                       ($scope.formData.senatorThird === $scope.formData.senatorFirst)) {
                window.alert('Choices must be distinct');
                return;
            }

            // Set the next state
            localStorageService.set('nextState', 'president');

            // Redirect to president
            $state.go('form.president');
        };
    });
