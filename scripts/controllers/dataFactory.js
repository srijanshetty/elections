angular.module('electionsApp')
.factory('dataFactory', function($http, localStorageService) {
    var exports = {};

    // Set up the database
    var voteCount = localStorageService.get('voteCount');
    if (!voteCount) {
        localStorageService.set('voteCount', 0);
    }

    // total Number of states
    exports.totalStates = 8;

    // All possible batches
    exports.batches = [
        { code: 'y10', fullName: 'UG, Y10'},
        { code: 'y11', fullName: 'UG, Y11'},
        { code: 'y12', fullName: 'UG, Y12'},
        { code: 'y13', fullName: 'UG, Y13'}
    ];

    // Get the names of senators
    exports.getSenators = function (batch) {
        var senators = {
            'y11': [ { 'id': 1, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                { 'id': 2, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                { 'id': 3, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                { 'id': 4, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                { 'id': 5, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                { 'id': 6, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                { 'id': 7, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                { 'id': 8, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
                { 'id': 9, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }]
        };

        return senators[batch] || [];
    };

    // Get the names of presidents form the DB
    exports.getPresidents = function () {
        var candidates = [
            { 'id': 101, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
            { 'id': 103, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' },
            { 'id': 102, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

            return candidates;
    };

    // Get the names of candidates for games form the DB
    exports.getGames = function () {
        var candidates = [
            { 'id': 201, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

            return candidates;
    };

    // Get the names of candidates for cultural form the DB
    exports.getCultural = function () {
        var candidates = [
            { 'id': 201, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

            return candidates;
    };

    // Get the names of candidates for science form the DB
    exports.getScience = function () {
        var candidates = [
            { 'id': 201, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

            return candidates;
    };

    // Get the names of candidates for films form the DB
    exports.getFilms = function () {
        var candidates = [
            { 'id': 201, 'name': 'Abhimanyu Arora', 'rollNo': '11727', 'image': 'assets/candidate.jpg' }];

            return candidates;
    };

    // Settings for the application
    exports.settings = {
        'mainPassword': 'srijan',
        'cancelPassword': 'cancel',
        'adminPassword': 'admin'
    };

    return exports;
});
