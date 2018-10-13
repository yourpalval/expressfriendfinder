// Pull required dependencies
var path = require('path');

// Import the list of "friend" data
var friends = require('../data/friends.js');

// Export the API routes
module.exports = function(app) {
	// console.log('___ENTER apiRoutes.js___');

	// use GET to gather friends-- a little confused about this 
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// use POST to add friends-- I am confused here
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;
		// console.log('userInput = ' + JSON.stringify(userInput));

		var userResponses = userInput.scores;
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var friendName = '';
		var friendImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Use a for loop to assess the most compatible friend data
		for (var i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				friendName = friends[i].name;
				friendImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', friendName: friendName, friendImage: friendImage});
	});
};