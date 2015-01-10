angular.module('electionsApp')
    .controller('presidentController', function presidentContoller($state, $scope, localStorageService) {
        // Process the submit request
        $scope.processPresidentSubmit = function () {
            // Set the next state
            localStorageService.set('nextState', 'thanks');

            // Redirect to thanks
            $state.go('form.thanks');
        };
    });
