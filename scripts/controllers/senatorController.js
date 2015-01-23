angular.module('electionsApp')
    .controller('senatorController', function senatorContoller($state, $scope, dataFactory, localStorageService, $modal) {
        // Make a list of senators available to the view
        $scope.candidateList = dataFactory.getSenators($scope.formData.batch);
        $scope.candidateList.shuffle();

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
            // Set the next state
            localStorageService.set('nextState', 'president');

            // Redirect to president
            $state.go('form.president');
        }

        // Process the submit request
        $scope.processSubmit = function () {
            if ($scope.candidateList.length >= 4) {
                if (!$scope.formData.senatorFirst || !$scope.formData.senatorSecond || !$scope.formData.senatorThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.candidateList.length === 3) {
                if (!$scope.formData.senatorFirst || !$scope.formData.senatorSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.candidateList.length >= 1 ) {
                if (!$scope.formData.senatorFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.candidateList.length > 2) &&
                (($scope.formData.senatorFirst === $scope.formData.senatorSecond) ||
                 ($scope.formData.senatorSecond === $scope.formData.senatorThird) ||
                     ($scope.formData.senatorThird === $scope.formData.senatorFirst))) {
                $modal.open({
                    templateUrl: 'partials/errorModal.html',
                    controller: 'choiceErrorController'
                });
                return;
            }

            // Set the next state
            localStorageService.set('nextState', 'president');

            // Redirect to president
            $state.go('form.president');
        };
    });
