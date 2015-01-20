angular.module('electionsApp')
    .controller('adminController', function adminController ($state, $scope, localStorageService, dataFactory) {
        $scope.gensecs = dataFactory.gensecs;

        // Get no preference
        $scope.getNoPreference = function(position) {
            return localStorageService.get(position + 'NoPreference') || 0;
        };

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
            localStorageService.clearAll();
        };
    });
