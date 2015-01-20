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

            // Process president
            if ($scope.formData.presidentNoPreference) {
                var presidentNoPreference = localStorageService.get('presidentNoPreference') || 0;
                localStorageService.set('presidentNoPreference', presidentNoPreference + 1);
            } else {
                // Process preferences
            }

            // Process cultural
            if ($scope.formData.culturalNoPreference) {
                var culturalNoPreference = localStorageService.get('culturalNoPreference') || 0;
                localStorageService.set('culturalNoPreference', culturalNoPreference + 1);
            } else {
                // Process preferences
            }

            // Process games
            if ($scope.formData.gamesNoPreference) {
                var gamesNoPreference = localStorageService.get('gamesNoPreference') || 0;
                localStorageService.set('gamesNoPreference', gamesNoPreference + 1);
            } else {
                // Process preferences
            }

            // Process films
            if ($scope.formData.filmsNoPreference) {
                var filmsNoPreference = localStorageService.get('filmsNoPreference') || 0;
                localStorageService.set('filmsNoPreference', filmsNoPreference + 1);
            } else {
                // Process preferences
            }

            // Process science
            if ($scope.formData.scienceNoPreference) {
                var scienceNoPreference = localStorageService.get('scienceNoPreference') || 0;
                localStorageService.set('scienceNoPreference', scienceNoPreference + 1);
            } else {
                // Process preferences
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
