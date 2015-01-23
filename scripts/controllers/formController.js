angular.module('electionsApp')
    .controller('formController', function formController($rootScope, $state, dataFactory, $scope, $modal, localStorageService) {
        var vm = $scope;

        // To store formData
        vm.formData = {
            'batch': '',
            'senatorFirst': '',
            'senatorSecond': '',
            'senatorThird': '',
            'presidentFirst': '',
            'presidentSecond': '',
            'presidentThird': '',
            'presidentNoPreference': false,
            'culturalFirst': '',
            'culturalSecond': '',
            'culturalThird': '',
            'culturalNoPreference': false,
            'sportsFirst': '',
            'sportsSecond': '',
            'sportsThird': '',
            'sportsNoPreference': false,
            'gamesFirst': '',
            'gamesSecond': '',
            'gamesThird': '',
            'gamesNoPreference': false,
            'scienceFirst': '',
            'scienceSecond': '',
            'scienceThird': '',
            'scienceNoPreference': false,
            'filmsFirst': '',
            'filmsSecond': '',
            'filmsThird': '',
            'filmsNoPreference':false
        };

        // For the breadcrumb navigation
        vm.totalStates = dataFactory.totalStates;
        vm.range = function(n) {
            return new Array(n);
        };

        // Obtain the list of batches from the dataFactory
        vm.batches = dataFactory.batches;

        // Make sure the correct stateName and stateCode are displayed everytime
        vm.stateName = $state.current.stateName;
        vm.stateCode = $state.current.stateCode;
        $rootScope.$on('$stateChangeSuccess', function(events, toState) {
            vm.stateName = toState.stateName;
            vm.stateCode = toState.stateCode;
        });

        // For the cancelVote Modal
        vm.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'partials/closeModal.html',
                controller: 'closeModalController'
            });

            modalInstance.result.then(function (status) {
                if (status === true) {
                    // Clean Up state before loggin out
                    localStorageService.remove('nextState');
                    localStorageService.remove('isLoggedIn');

                    // Redirect
                    $state.go('login');
                }
            });
        };
    });

    angular.module('electionsApp')
    .controller('closeModalController', function ($scope, $modalInstance, dataFactory) {
        var vm = $scope;

        // To store the contents
        vm.selected = {};

        vm.ok = function () {
            if (vm.selected.cancelPassword === dataFactory.settings.cancelPassword) {
                $modalInstance.close(true);
                document.getElementById('during-vote').pause();
            } else {
                $modalInstance.close(false);
            }
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
