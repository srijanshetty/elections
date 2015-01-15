angular.module('electionsApp')
    .controller('presidentController', function presidentContoller($state, $scope, localStorageService, dataFactory) {
        // Make a list of senators available to the view
        $scope.presidentList = dataFactory.getPresidents();

        // Process no preference
        $scope.processNoPreference = function () {
            $scope.formData.presidentNoPreference = true;

            // Set the next state
            localStorageService.set('nextState', 'thanks');

            // Redirect to thanks
            $state.go('form.thanks');
        };

        // Process the submit request
        $scope.processSenatorSubmit = function () {
            // Make sure the correct number of choices have been entered
            if ($scope.presidentList.length >= 3) {
                if (!$scope.formData.presidentFirst || !$scope.formData.presidentSecond || !$scope.formData.presidentThird) {
                    window.alert('Enter three preferences');
                    return;
                }
            } else if ($scope.presidentList.length === 2) {
                if (!$scope.formData.presidentFirst || !$scope.formData.presidentSecond) {
                    window.alert('Enter two preferences');
                    return;
                }
            } else if ($scope.presidentList.length === 1) {
                if (!$scope.formData.presidentFirst) {
                    window.alert('Enter a preference');
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.formData.presidentFirst === $scope.formData.presidentSecond) ||
               ($scope.formData.presidentSecond === $scope.formData.presidentThird) ||
               ($scope.formData.presidentThird === $scope.formData.presidentFirst)) {
                window.alert('Choices must be distinct');
                return;
            }

            // Set the next state
            localStorageService.set('nextState', 'thanks');

            // Redirect to president
            $state.go('form.thanks');
        };
    });
