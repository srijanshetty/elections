angular.module('electionsApp')
    .controller('adminController', function adminController ($state, $scope, localStorageService) {
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
    });
