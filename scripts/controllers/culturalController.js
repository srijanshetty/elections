angular.module('electionsApp')
    .controller('culturalController', function culturalController($state, $scope, localStorageService, dataFactory, $modal) {
        // Make a list of senators available to the view
        $scope.culturalList = dataFactory.getCandidates($state.current.stateName);

        // Setup the way the candidates will be displayed
        if ($scope.culturalList.length >= 3) {
            $scope.candidateClass = 'col-sm-4';
        } else if ($scope.culturalList.length === 2) {
            $scope.candidateClass = 'col-sm-6';
        } else {
            $scope.candidateClass = 'col-sm-12';
        }

        // Skip this step if there are no items in the list
        if ( !$scope.culturalList || $scope.culturalList.length === 0) {
            // Set the next state
            localStorageService.set('nextState', 'science');

            // Go to the science state
            $state.go('form.science');
        }

        // Process no preference
        $scope.processNoPreference = function () {
            $scope.formData.culturalNoPreference = true;

            // Set the next state
            localStorageService.set('nextState', 'science');

            // Redirect to science
            $state.go('form.science');
        };

        // Process the submit request
        $scope.processCulturalSubmit = function () {
            // Make sure the correct number of choices have been entered
            if ($scope.culturalList.length >= 3) {
                if (!$scope.formData.culturalFirst || !$scope.formData.culturalSecond || !$scope.formData.culturalThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.culturalList.length === 2) {
                if (!$scope.formData.culturalFist || !$scope.formData.culturalSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.culturalList.length === 1) {
                if (!$scope.formData.culturalFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.culturalList.length > 1) &&
                (($scope.formData.culturalFirst === $scope.formData.culturalSecond) ||
                ($scope.formData.culturalSecond === $scope.formData.culturalThird) ||
                ($scope.formData.culturalThird === $scope.formData.culturalFirst))) {
                $modal.open({
                    templateUrl: 'partials/errorModal.html',
                    controller: 'choiceErrorController'
                });
                return;
            }

            // Set the next state
            localStorageService.set('nextState', 'science');

            // Redirect to president
            $state.go('form.science');
        };
    });
