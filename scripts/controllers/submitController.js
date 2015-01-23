angular.module('electionsApp')
    .controller('submitController', function submitController($state, $scope, localStorageService) {
        function setPreference(preferenceID, preference) {
            if (preferenceID) {
                var preferences = localStorageService.get(preferenceID + '_' + preference) || 0;
                localStorageService.set(preferenceID + '_' + preference, preferences + 1);
            }
        }
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
                setPreference($scope.formData.presidentFirst, 1);
                setPreference($scope.formData.presidentSecond, 2);
                setPreference($scope.formData.presidentThird, 3);
            }

            // Process games
            if ($scope.formData.gamesNoPreference) {
                var gamesNoPreference = localStorageService.get('gamesNoPreference') || 0;
                localStorageService.set('gamesNoPreference', gamesNoPreference + 1);
            } else {
                setPreference($scope.formData.gamesFirst, 1);
                setPreference($scope.formData.gamesSecond, 2);
                setPreference($scope.formData.gamesThird, 3);
            }

            // Process cultural
            if ($scope.formData.culturalNoPreference) {
                var culturalNoPreference = localStorageService.get('culturalNoPreference') || 0;
                localStorageService.set('culturalNoPreference', culturalNoPreference + 1);
            } else {
                setPreference($scope.formData.culturalFirst, 1);
                setPreference($scope.formData.culturalSecond, 2);
                setPreference($scope.formData.culturalThird, 3);
            }

            // Process science
            if ($scope.formData.scienceNoPreference) {
                var scienceNoPreference = localStorageService.get('scienceNoPreference') || 0;
                localStorageService.set('scienceNoPreference', scienceNoPreference + 1);
            } else {
                setPreference($scope.formData.scienceFirst, 1);
                setPreference($scope.formData.scienceSecond, 2);
                setPreference($scope.formData.scienceThird, 3);
            }

            // Process films
            if ($scope.formData.filmsNoPreference) {
                var filmsNoPreference = localStorageService.get('filmsNoPreference') || 0;
                localStorageService.set('filmsNoPreference', filmsNoPreference + 1);
            } else {
                setPreference($scope.formData.filmsFirst, 1);
                setPreference($scope.formData.filmsSecond, 2);
                setPreference($scope.formData.filmsThird, 3);
            }

            // Process senator votes
            setPreference($scope.formData.senatorFirst, 1);
            setPreference($scope.formData.senatorSecond, 2);
            setPreference($scope.formData.senatorThird, 3);

            // Play audio at the end of vote
            document.getElementById('end-of-vote').play();

            // Move to login
            $state.go('login');
        };
    });
