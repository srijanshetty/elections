angular.module('electionsApp')
    .controller('loginController', function($state, $scope, localStorageService, dataFactory) {
        $scope.processLoginSubmit = function() {
            if ($scope.password && $scope.password === dataFactory.settings.mainPassword) {
                // Setup state variables
                localStorageService.set('isLoggedIn', true);
                localStorageService.set('nextState', 'batch');

                // Redirect to next state
                $state.go('form.batch');
            } else {
                window.alert('Wrong Password');
                $scope.password = '';
            }
        };
    });

