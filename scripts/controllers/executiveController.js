angular.module('electionsApp')
    .controller('executiveController', function presidentContoller($state, $scope, localStorageService, dataFactory, $modal) {

        // Get state information
        var nextState = $state.current.nextState;
        var currentState = $state.current.stateName;

        // Make a list of senators available to the view
        $scope.candidateList = _.shuffle(dataFactory.getCandidates(currentState));

        // Create the selectionData object
        $scope.selectionData = {
            'postFirst': '',
            'postSecond': '',
            'postThird': ''
        };

        // Setup the way the candidates will be displayed
        if ($scope.candidateList.length >= 3) {
            $scope.candidateClass = 'col-sm-3';
        } else if ($scope.candidateList.length === 2) {
            $scope.candidateClass = 'col-sm-6';
        } else {
            $scope.candidateClass = 'col-sm-12';
        }

        // Skip this step if there are no items in the list
        if ( !$scope.candidateList || $scope.candidateList.length === 0) {
            localStorageService.set('nextState', nextState);
            $state.go('form.' + nextState);
        }

        // Process no preference
        $scope.processNoPreference = function () {
            $scope.formData[currentState + 'NoPreference'] = true;

            // Clear others
            $scope.formData[currentState + 'First'] = '';
            $scope.formData[currentState + 'Second'] = '';
            $scope.formData[currentState + 'Third'] = '';

            // Set the next state
            localStorageService.set('nextState', nextState);
            $state.go('form.' + nextState);
        };

        // Process the submit request
        $scope.processSubmit = function () {
            // Make sure the correct number of choices have been entered
            if ($scope.candidateList.length >= 4) {
                if (!$scope.selectionData.postFirst || !$scope.selectionData.postSecond || !$scope.selectionData.postThird) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'threePreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.candidateList.length === 3) {
                if (!$scope.selectionData.postFirst || !$scope.selectionData.postSecond) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'twoPreferencesErrorController'
                    });
                    return;
                }
            } else if ($scope.candidateList.length >= 1) {
                if (!$scope.selectionData.postFirst) {
                    $modal.open({
                        templateUrl: 'partials/errorModal.html',
                        controller: 'onePreferenceErrorController'
                    });
                    return;
                }
            }

            // The choice of candidates must be distinct
            if (($scope.candidateList.length > 2) &&
                (($scope.selectionData.postFirst === $scope.selectionData.postSecond) ||
                ($scope.selectionData.postSecond === $scope.selectionData.postThird) ||
                ($scope.selectionData.postThird === $scope.selectionData.postFirst))) {
                $modal.open({
                    templateUrl: 'partials/errorModal.html',
                    controller: 'choiceErrorController'
                });
                return;
            }

            // Clear no preference
            $scope.formData[currentState + 'NoPreference'] = false;

            // Pass on the preferences
            $scope.formData[currentState + 'First'] = $scope.selectionData.postFirst;
            $scope.formData[currentState + 'Second'] = $scope.selectionData.postSecond;
            $scope.formData[currentState + 'Third'] = $scope.selectionData.postThird;

            // Set the next state
            localStorageService.set('nextState', nextState);
            $state.go('form.' + nextState);
        };
    });
