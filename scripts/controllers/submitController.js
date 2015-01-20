angular.module('electionsApp')
    .controller('submitController', function submitController($state, $scope, localStorageService, $modal) {
        // Process the submit request
        $scope.processSubmitSubmit = function () {
            // Clean up
            localStorageService.remove('nextState');
            localStorageService.remove('isLoggedIn');

            // Store the scope data
            console.log($scope.formData);

            // Update voteCount
            var votes = localStorageService.get('voteCount') || 0;
            localStorageService.set('voteCount', votes + 1);

            var firstPreferenceID, firstPreferences;
            var secondPreferenceID, secondPreferences;
            var thirdPreferenceID, thirdPreferences;

            // Process president
            if ($scope.formData.presidentNoPreference) {
                var presidentNoPreference = localStorageService.get('presidentNoPreference') || 0;
                localStorageService.set('presidentNoPreference', presidentNoPreference + 1);
            } else {
                // Process preferences
                firstPreferenceID = $scope.formData.presidentFirst;
                firstPreferences = localStorageService.get(firstPreferenceID + '_' + 1) || 0;
                localStorageService.set(firstPreferenceID + '_' + 1, firstPreferences + 1);

                secondPreferenceID = $scope.formData.presidentSecond;
                secondPreferences = localStorageService.get(secondPreferenceID + '_' + 1) || 0;
                localStorageService.set(secondPreferenceID + '_' + 2, secondPreferences + 1);

                thirdPreferenceID = $scope.formData.presidentThird;
                thirdPreferences = localStorageService.get(thirdPreferenceID + '_' + 1) || 0;
                localStorageService.set(thirdPreferenceID + '_' + 3, thirdPreferences + 1);
            }

            // Process games
            if ($scope.formData.gamesNoPreference) {
                var gamesNoPreference = localStorageService.get('gamesNoPreference') || 0;
                localStorageService.set('gamesNoPreference', gamesNoPreference + 1);
            } else {
                // Process preferences
                firstPreferenceID = $scope.formData.gamesFirst;
                firstPreferences = localStorageService.get(firstPreferenceID + '_' + 1) || 0;
                localStorageService.set(firstPreferenceID + '_' + 1, firstPreferences + 1);

                secondPreferenceID = $scope.formData.gamesSecond;
                secondPreferences = localStorageService.get(secondPreferenceID + '_' + 1) || 0;
                localStorageService.set(secondPreferenceID + '_' + 2, secondPreferences + 1);

                thirdPreferenceID = $scope.formData.gamesThird;
                thirdPreferences = localStorageService.get(thirdPreferenceID + '_' + 1) || 0;
                localStorageService.set(thirdPreferenceID + '_' + 3, thirdPreferences + 1);
            }

            // Process cultural
            if ($scope.formData.culturalNoPreference) {
                var culturalNoPreference = localStorageService.get('culturalNoPreference') || 0;
                localStorageService.set('culturalNoPreference', culturalNoPreference + 1);
            } else {
                // Process preferences
                firstPreferenceID = $scope.formData.culturalFirst;
                firstPreferences = localStorageService.get(firstPreferenceID + '_' + 1) || 0;
                localStorageService.set(firstPreferenceID + '_' + 1, firstPreferences + 1);

                secondPreferenceID = $scope.formData.culturalSecond;
                secondPreferences = localStorageService.get(secondPreferenceID + '_' + 1) || 0;
                localStorageService.set(secondPreferenceID + '_' + 2, secondPreferences + 1);

                thirdPreferenceID = $scope.formData.culturalThird;
                thirdPreferences = localStorageService.get(thirdPreferenceID + '_' + 1) || 0;
                localStorageService.set(thirdPreferenceID + '_' + 3, thirdPreferences + 1);
            }

            // Process science
            if ($scope.formData.scienceNoPreference) {
                var scienceNoPreference = localStorageService.get('scienceNoPreference') || 0;
                localStorageService.set('scienceNoPreference', scienceNoPreference + 1);
            } else {
                // Process preferences
                firstPreferenceID = $scope.formData.scienceFirst;
                firstPreferences = localStorageService.get(firstPreferenceID + '_' + 1) || 0;
                localStorageService.set(firstPreferenceID + '_' + 1, firstPreferences + 1);

                secondPreferenceID = $scope.formData.scienceSecond;
                secondPreferences = localStorageService.get(secondPreferenceID + '_' + 1) || 0;
                localStorageService.set(secondPreferenceID + '_' + 2, secondPreferences + 1);

                thirdPreferenceID = $scope.formData.scienceThird;
                thirdPreferences = localStorageService.get(thirdPreferenceID + '_' + 1) || 0;
                localStorageService.set(thirdPreferenceID + '_' + 3, thirdPreferences + 1);
            }

            // Process films
            if ($scope.formData.filmsNoPreference) {
                var filmsNoPreference = localStorageService.get('filmsNoPreference') || 0;
                localStorageService.set('filmsNoPreference', filmsNoPreference + 1);
            } else {
                // Process preferences
                firstPreferenceID = $scope.formData.filmsFirst;
                firstPreferences = localStorageService.get(firstPreferenceID + '_' + 1) || 0;
                localStorageService.set(firstPreferenceID + '_' + 1, firstPreferences + 1);

                secondPreferenceID = $scope.formData.filmsSecond;
                secondPreferences = localStorageService.get(secondPreferenceID + '_' + 1) || 0;
                localStorageService.set(secondPreferenceID + '_' + 2, secondPreferences + 1);

                thirdPreferenceID = $scope.formData.filmsThird;
                thirdPreferences = localStorageService.get(thirdPreferenceID + '_' + 1) || 0;
                localStorageService.set(thirdPreferenceID + '_' + 3, thirdPreferences + 1);
            }

            // Open the submit modal
            $modal.open({
                templateUrl: 'partials/errorModal.html',
                controller: 'successSubmitController'
            });
        };
    })
    .controller('successSubmitController', function successSubmitController($state, $modalInstance, $scope) {
        $scope.error = {};
        $scope.error.name = 'Success';
        $scope.error.msg = 'Your vote has been successfully entered into the system';
        $scope.error.button = 'done';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
            $state.go('login');
        };
    });
