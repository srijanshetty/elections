angular.module('electionsApp')
    .controller('senatorController', function senatorContoller($state, $scope, dataFactory, localStorageService, $modal) {
        // Make a list of senators available to the view
        $scope.senatorList = dataFactory.getSenators($scope.formData.batch);

        // Setup the way the candidates will be displayed
        if ($scope.senatorList.length >= 3) {
            $scope.candidateClass = 'col-sm-4';
        } else if ($scope.senatorList.length === 2) {
            $scope.candidateClass = 'col-sm-6';
        } else {
            $scope.candidateClass = 'col-sm-12';
        }

        // Skip this step if there are no items in the list
        if ( !$scope.senatorList || $scope.senatorList.length === 0) {
            // Set the next state
            localStorageService.set('nextState', 'president');

            // Redirect to president
            $state.go('form.president');
        }

        // Process the submit request
        $scope.processSenatorSubmit = function () {
            if ($scope.senatorList.length >= 4) {
                if (!$scope.formData.senatorFirst || !$scope.formData.senatorSecond || !$scope.formData.senatorThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.senatorList.length === 3) {
                if (!$scope.formData.senatorFirst || !$scope.formData.senatorSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.senatorList.length >= 1 ) {
                if (!$scope.formData.senatorFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.senatorList.length > 2) &&
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
