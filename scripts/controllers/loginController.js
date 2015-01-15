angular.module('electionsApp')
    .controller('loginController', function($state, $scope, localStorageService, dataFactory, $modal) {
        $scope.processLoginSubmit = function() {
            if ($scope.password && $scope.password === dataFactory.settings.mainPassword) {
                // Setup state variables
                localStorageService.set('isLoggedIn', true);
                localStorageService.set('nextState', 'batch');

                // Redirect to next state
                $state.go('form.batch');
            } else {
                $modal.open({
                    templateUrl: '../../partials/errorModal.html',
                    controller: 'loginErrorController'
                });

                $scope.password = '';
            }
        };
    })
    .controller('loginErrorController', function loginErrorController($scope) {
        $scope.error = {};
        $scope.error.name = 'Login Error';
        $scope.error.msg = 'Invalid Password';
    });


