angular.module('electionsApp')
    .controller('adminController', function adminController ($state, $scope, localStorageService, dataFactory) {
        $scope.gensecs = dataFactory.gensecs;

        // Set up the values
        $scope.presidentNoPreference = localStorageService.get('presidentNoPreference') || 0;
        $scope.gamesNoPreference = localStorageService.get('gamesNoPreference') || 0;
        $scope.culturalNoPreference = localStorageService.get('culturalNoPreference') || 0;
        $scope.scienceNoPreference = localStorageService.get('scienceNoPreference') || 0;
        $scope.filmsNoPreference = localStorageService.get('filmsNoPreference') || 0;

        // Get votes for a particular ID
        $scope.getVotes = function (id, preference) {
            return localStorageService.get(id + '_' + preference) || 0;
        };

        // Process Submit
        $scope.clearVoteCount = function() {
            // Set vote count to zero
            localStorageService.set('voteCount', 0);
        };

        // Close admin panel
        $scope.close = function () {
            // Redirect to login state
            $state.go('login');
        };

        // Exit the application
        $scope.exit = function () {
            // Exit the application
            var gui = require('nw.gui');
            gui.App.quit();
        };

        // Clear all the data
        $scope.clear = function() {
            // Clear the data of the application
            localStorageService.set('presidentNoPreference', 0);
            localStorageService.set('gamesNoPreference', 0);
            localStorageService.set('culturalNoPreference', 0);
            localStorageService.set('scienceNoPreference', 0);
            localStorageService.set('filmsNoPreference', 0);
        };
    });
