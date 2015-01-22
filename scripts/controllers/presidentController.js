angular.module('electionsApp')
    .controller('presidentController', function presidentContoller($state, $scope, localStorageService, dataFactory, $modal) {
        // Make a list of senators available to the view
        $scope.presidentList = dataFactory.getCandidates($state.current.stateName);

        // Setup the way the candidates will be displayed
        if ($scope.presidentList.length >= 3) {
            $scope.candidateClass = 'col-sm-4';
        } else if ($scope.presidentList.length === 2) {
            $scope.candidateClass = 'col-sm-6';
        } else {
            $scope.candidateClass = 'col-sm-12';
        }

        // Skip this step if there are no items in the list
        if ( !$scope.presidentList || $scope.presidentList.length === 0) {
            localStorageService.set('nextState', 'games');
            $state.go('form.games');
        }

        // Process no preference
        $scope.processNoPreference = function () {
            $scope.formData.presidentNoPreference = true;

            // Set the next state
            localStorageService.set('nextState', 'games');
            $state.go('form.games');
        };

        // Process the submit request
        $scope.processPresidentSubmit = function () {
            // Make sure the correct number of choices have been entered
            if ($scope.presidentList.length >= 4) {
                if (!$scope.formData.presidentFirst || !$scope.formData.presidentSecond || !$scope.formData.presidentThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.presidentList.length === 3) {
                if (!$scope.formData.presidentFirst || !$scope.formData.presidentSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.presidentList.length >= 1) {
                if (!$scope.formData.presidentFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.presidentList.length > 2) &&
                (($scope.formData.presidentFirst === $scope.formData.presidentSecond) ||
                ($scope.formData.presidentSecond === $scope.formData.presidentThird) ||
                ($scope.formData.presidentThird === $scope.formData.presidentFirst))) {
                $modal.open({
                    templateUrl: 'partials/errorModal.html',
                    controller: 'choiceErrorController'
                });
                return;
            }

            // Set the next state
            localStorageService.set('nextState', 'games');

            // Redirect to president
            $state.go('form.games');
        };
    });
