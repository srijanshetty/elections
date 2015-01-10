angular.module('electionsApp')
    .controller('senatorController', function senatorContoller($state, $scope, dataFactory, localStorageService) {
        // Make a list of senators available to the view
        $scope.senatorList = dataFactory.getSenators($scope.formData.batch);

        // Process the submit request
        $scope.processSenatorSubmit = function () {
            // Set the next state
            localStorageService.set('nextState', 'president');

            // Redirect to president
            $state.go('form.president');
        };
    });
