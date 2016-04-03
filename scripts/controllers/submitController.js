angular.module('electionsApp')
    .controller('submitController', function submitController($state, $scope, localStorageService, dataFactory) {
        // Function to set preferences
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

            // For each post, we update the results
            dataFactory.posts.forEach(function (item) {
                if ($scope.formData[item +'NoPreference']) {
                    var positionNoPreference = localStorageService.get(item + 'NoPreference') || 0;
                    localStorageService.set(item + 'NoPreference', positionNoPreference + 1);
                } else {
                    setPreference($scope.formData[item + 'First'], 1);
                    setPreference($scope.formData[item + 'Second'], 2);
                    setPreference($scope.formData[item + 'Third'], 3);
                }

            });

            // Process senator votes
            if (dataFactory.batches.length > 0 && $scope.formData.batch) {
                setPreference($scope.formData.senatorFirst, 1);
                setPreference($scope.formData.senatorSecond, 2);
                setPreference($scope.formData.senatorThird, 3);
            }

            // Play audio at the end of vote
            document.getElementById('end-of-vote').play();

            // Move to login
            $state.go('login');
        };
    });
