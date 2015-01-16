angular.module('electionsApp')
    .controller('submitController', function submitController($state, $scope, localStorageService) {
        // Process the submit request
        $scope.processSubmitSubmit = function () {
            // Clean up
            localStorageService.clearAll();

            // Redirect to login page
            // $state.go('login');
            console.log($scope.formData);
        };
    });
