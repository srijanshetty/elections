angular.module('electionsApp')
    .controller('gamesController', function gamesController($state, $scope, localStorageService, dataFactory, $modal) {
        // Make a list of senators available to the view
        $scope.candidateList = dataFactory.getCandidates($state.current.stateName);

        // Setup the way the candidates will be displayed
        if ($scope.candidateList.length >= 3) {
            $scope.candidateClass = 'col-sm-4';
        } else if ($scope.candidateList.length === 2) {
            $scope.candidateClass = 'col-sm-6';
        } else {
            $scope.candidateClass = 'col-sm-12';
        }

        // Skip this step if there are no items in the list
        if ( !$scope.candidateList || $scope.candidateList.length === 0) {
            localStorageService.set('nextState', 'cultural');
            $state.go('form.cultural');
        }

        // Process no preference
        $scope.processNoPreference = function () {
            $scope.formData.gamesNoPreference = true;

            // Jump to next state
            localStorageService.set('nextState', 'cultural');
            $state.go('form.cultural');
        };

        // Process the submit request
        $scope.processSubmit = function () {
            // Make sure the correct number of choices have been entered
            if ($scope.candidateList.length >= 4) {
                if (!$scope.formData.gamesFirst || !$scope.formData.gamesSecond || !$scope.formData.gamesThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.candidateList.length === 3) {
                if (!$scope.formData.gamesFirst || !$scope.formData.gamesSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.candidateList.length >= 1) {
                if (!$scope.formData.gamesFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.candidateList.length > 2) &&
                (($scope.formData.gamesFirst === $scope.formData.gamesSecond) ||
                ($scope.formData.gamesSecond === $scope.formData.gamesThird) ||
                ($scope.formData.gamesThird === $scope.formData.gamesFirst))) {
                $modal.open({
                    templateUrl: 'partials/errorModal.html',
                    controller: 'choiceErrorController'
                });
                return;
            }

            // Set the next state
            localStorageService.set('nextState', 'cultural');

            // Redirect to cultural
            $state.go('form.cultural');
        };
    });
