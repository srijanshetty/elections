angular.module('electionsApp')
    .factory('dataFactory', function() {
        // The list of gensecs
        var gensecs = [
            { 'id': 101, 'name': 'Gautam Pratap Singh', 'position': 'president', 'image': 'assets/candidate.jpg' },
            { 'id': 102, 'name': 'Pushpjeet Singh', 'position': 'president', 'image': 'assets/candidate.jpg' },
            { 'id': 103, 'name': 'Aashish Aggarwal', 'position': 'cultural', 'image': 'assets/candidate.jpg' },
            { 'id': 104, 'name': 'Chirag Jha', 'position': 'science', 'image': 'assets/candidate.jpg' },
            { 'id': 105, 'name': 'Rishi Gupta', 'position': 'science', 'image': 'assets/candidate.jpg' },
            { 'id': 106, 'name': 'Prateek Mishra', 'position': 'films', 'image': 'assets/candidate.jpg' },
            { 'id': 107, 'name': 'Balendu Shekhar', 'position': 'games', 'image': 'assets/candidate.jpg' },
            { 'id': 108, 'name': 'M Surya Prakash', 'position': 'games', 'image': 'assets/candidate.jpg' }
        ];

        // List of senators
        var senators = {
            'y13': [
                { 'id': 1, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 2, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 3, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 4, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 5, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 6, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 7, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 8, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' }
            ],
            'y14': [
                { 'id': 11, 'name': 'Abhimanyu Yadav', 'image': 'assets/candidate.jpg' },
                { 'id': 12, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 13, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 14, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 15, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 16, 'name': 'Abhimanyu Arora', 'image': 'assets/candidate.jpg' },
                { 'id': 17, 'name': 'Sagar Rastogi', 'image': 'assets/candidate.jpg' },
                { 'id': 18, 'name': 'Vedant Goenka', 'image': 'assets/candidate.jpg' }
            ]
        };

        // Exports object
        var exports = {};

        // total Number of states
        exports.totalStates = 8;

        // All possible batches
        exports.batches = [
            { code: 'y13', fullName: 'UG, Y13'},
            { code: 'y14', fullName: 'UG, Y14'}
        ];

        // Get the names of senators
        exports.getSenators = function (batch) {
            return senators[batch] || [];
        };

        // Get the names of presidents form the DB
        exports.getCandidates = function getCandidates(key) {
            return gensecs.filter(function (value) {
                return (value.position === key);
            });
        };

        // Settings for the application
        exports.settings = {
            'mainPassword': 'srijan',
            'cancelPassword': 'cancel',
            'adminPassword': 'admin'
        };

        return exports;
    });
