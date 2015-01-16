angular.module('electionsApp')
    .controller('gamesController', function gamesController($state, $scope, localStorageService, dataFactory, $modal) {
        // Make a list of senators available to the view
        $scope.gamesList = dataFactory.getGames();

        // Skip this step if there are no items in the list
        if ( !$scope.gamesList || $scope.gamesList.length === 0) {
            // Set the next state
            localStorageService.set('nextState', 'submit');

            $state.go('form.submit');
        }

        // Process no preference
        $scope.processNoPreference = function () {
            $scope.formData.gamesNoPreference = true;

            // Set the next state
            localStorageService.set('nextState', 'submit');

            // Redirect to submit
            $state.go('form.submit');
        };

        // Process the submit request
        $scope.processGamesSubmit = function () {
            // Make sure the correct number of choices have been entered
            if ($scope.gamesList.length >= 3) {
                if (!$scope.formData.gamesFirst || !$scope.formData.gamesSecond || !$scope.formData.gamesThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.gamesList.length === 2) {
                if (!$scope.formData.gamesFist || !$scope.formData.gamesSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.gamesList.length === 1) {
                if (!$scope.formData.gamesFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.gamesList.length > 1) &&
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
            localStorageService.set('nextState', 'submit');

            // Redirect to president
            $state.go('form.submit');
        };
    });
