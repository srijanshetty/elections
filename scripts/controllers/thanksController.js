angular.module('electionsApp')
    .controller('thanksController', function thanksController($state, $scope, localStorageService) {
        // Process the submit request
        $scope.processThanksSubmit = function () {
            // Clean up
            localStorageService.clearAll();

            // Redirect to login page
            $state.go('login');
        };
    });
