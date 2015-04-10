angular.module('electionsApp')
    .controller('adminController', function adminController ($state, $scope, localStorageService, dataFactory) {
        $scope.gensecs = dataFactory.gensecs;
        $scope.batches = dataFactory.batches;
        $scope.posts = dataFactory.posts;

        // Function to get postName
        $scope.getPostName = dataFactory.getPostName;

        // Get senators
        $scope.getSenators = function(batch) {
            return dataFactory.senators[batch];
        };

        // Get no preference
        $scope.getNoPreference = function(position) {
            return localStorageService.get(position + 'NoPreference') || 0;
        };

        // Get votes for a particular ID
        $scope.getVotes = function (id, preference) {
            return localStorageService.get(id + '_' + preference) || 0;
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
