angular.module('electionsApp')
    .controller('presidentController', function presidentContoller($state, $scope, localStorageService, dataFactory, $modal) {
        // Make a list of senators available to the view
        $scope.candidateList = dataFactory.getCandidates($state.current.stateName);

        // Setup the way the candidates will be displayed
        if ($scope.candidateList.length >= 3) {
            $scope.candidateClass = 'col-sm-3';
        } else if ($scope.candidateList.length === 2) {
            $scope.candidateClass = 'col-sm-6';
        } else {
            $scope.candidateClass = 'col-sm-12';
        }

        // Skip this step if there are no items in the list
        if ( !$scope.candidateList || $scope.candidateList.length === 0) {
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
        $scope.processSubmit = function () {
            // Make sure the correct number of choices have been entered
            if ($scope.candidateList.length >= 4) {
                if (!$scope.formData.presidentFirst || !$scope.formData.presidentSecond || !$scope.formData.presidentThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.candidateList.length === 3) {
                if (!$scope.formData.presidentFirst || !$scope.formData.presidentSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.candidateList.length >= 1) {
                if (!$scope.formData.presidentFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.candidateList.length > 2) &&
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
