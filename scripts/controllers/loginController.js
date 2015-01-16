angular.module('electionsApp')
    .controller('loginController', function loginController($state, $scope, localStorageService, dataFactory, $modal) {
        // Get the number of votes cast
        $scope.voteCount = localStorageService.get('voteCount');

        // Process Submit
        $scope.processLoginSubmit = function() {
            if ($scope.password && $scope.password === dataFactory.settings.mainPassword) {
                // Setup state variables
                localStorageService.set('isLoggedIn', true);
                localStorageService.set('nextState', 'batch');

                // Redirect to next state
                $state.go('form.batch');
            } else if($scope.password && $scope.password === dataFactory.settings.adminPassword){
                // Go to the admin console
                $state.go('admin');
            } else {
                $modal.open({
                    templateUrl: 'partials/errorModal.html',
                    controller: 'loginErrorController'
                });

                $scope.password = '';
            }
        };
    })
    .controller('loginErrorController', function loginErrorController($modalInstance, $scope) {
        $scope.error = {};
        $scope.error.name = 'Login Error';
        $scope.error.msg = 'Please enter a valid password';

        // Dismiss the modal
        $scope.dismiss = function () {
            $modalInstance.dismiss('cancel');
        };
    });
