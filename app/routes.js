// load the event model
var Event = require('./models/event');

// expose the routes to our app with module.exports
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all events
	app.get('/api/events', function(req, res) {

		// use mongoose to get all events in the database
		Event.find({}, "-photos", function(err, events) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.jsonp(events); // return all events in JSON format
		});
	});

	// get event by _id
	app.get('/api/events/:event_id', function(req, res) {

		var limitInt = parseInt(req.query.limit);
		var imageLimit = -limitInt;

		if (imageLimit <= 0) {

			console.log(imageLimit);

			// use mongoose to get event
			Event.findOne({object_id: req.params.event_id}, { photos: {$slice: imageLimit } }, function(err, event) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err)

				res.jsonp(event); // return event in JSON format
			});
		} else {

			console.log(imageLimit);
			// use mongoose to get event
			Event.findOne({object_id: req.params.event_id}, function(err, event) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err)

				res.jsonp(event); // return event in JSON format
			});
		}
	});

	// add photos to event photos array
	app.put('/api/events/:event_id', function(req, res) {

		// use mongoose to get and update event
		Event.findOneAndUpdate({object_id: req.params.event_id},
			{$push: {"photos": {img: title, link: msg, username: name, profile_picture: pic}}},
	    	{safe: true, upsert: true},
	    	function(err, event) {
        		
        	// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.jsonp(event); // return event in JSON format
		});
	});

	// create event and send back all events after creation
	app.post('/api/events', function(req, res) {

		// create an event, information comes from AJAX request from Angular
		Event.create({
			event: String,
			city: String,
			state: String,
			date: String,
			start: String,
		    end: String,
		    radius: String,
		    team_1: String,
		    team_2: String,
		    object_id: String,
		    loc: {
		        type: [Number],  // [<longitude>, <latitude>]
		        index: '2d'      // create the geospatial index
		    },
		    photos: []
		}, function(err, event) {
			if (err)
				res.send(err);

			// get and return all the events after you create another
			Event.find(function(err, events) {
				if (err)
					res.send(err)
				res.jsonp(events);
			});
		});

	});

	// delete an event
	app.delete('/api/events/:event_id', function(req, res) {
		Event.remove({
			object_id : req.params.event_id
		}, function(err, event) {
			if (err)
				res.send(err);

			// get and return all the events after you delete one
			Event.find(function(err, events) {
				if (err)
					res.send(err)
				res.jsonp(events);
			});
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load our public/index.html file
	});

};