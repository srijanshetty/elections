angular.module('electionsApp')
    .controller('filmsController', function filmsController($state, $scope, localStorageService, dataFactory, $modal) {
        // Make a list of senators available to the view
        $scope.filmsList = dataFactory.getCandidates($state.current.stateName);

        // Setup the way the candidates will be displayed
        if ($scope.filmsList.length >= 3) {
            $scope.candidateClass = 'col-sm-4';
        } else if ($scope.filmsList.length === 2) {
            $scope.candidateClass = 'col-sm-6';
        } else {
            $scope.candidateClass = 'col-sm-12';
        }

        // Skip this step if there are no items in the list
        if ( !$scope.filmsList || $scope.filmsList.length === 0) {
            // Set the next state
            localStorageService.set('nextState', 'submit');

            $state.go('form.submit');
        }

        // Process no preference
        $scope.processNoPreference = function () {
            $scope.formData.filmsNoPreference = true;

            // Set the next state
            localStorageService.set('nextState', 'submit');

            // Redirect to submit
            $state.go('form.submit');
        };

        // Process the submit request
        $scope.processFilmsSubmit = function () {
            // Make sure the correct number of choices have been entered
            if ($scope.filmsList.length >= 3) {
                if (!$scope.formData.filmsFirst || !$scope.formData.filmsSecond || !$scope.formData.filmsThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.filmsList.length === 2) {
                if (!$scope.formData.filmsFist || !$scope.formData.filmsSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.filmsList.length === 1) {
                if (!$scope.formData.filmsFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.filmsList.length > 1) &&
                (($scope.formData.filmsFirst === $scope.formData.filmsSecond) ||
                ($scope.formData.filmsSecond === $scope.formData.filmsThird) ||
                ($scope.formData.filmsThird === $scope.formData.filmsFirst))) {
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
