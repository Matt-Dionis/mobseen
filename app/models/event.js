var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
	event: String,
    headline: String,
	city: String,
	state: String,
	date: String,
	start: String,
    end: String,
    dateState: String,
    radius: String,
    team_1: String,
    team_2: String,
    object_id: String,
    longitude: String,
    latitude: String,
    cover: {
        img: String,
        username: String
    },
    photos: []
})

module.exports = mongoose.model('Event', eventSchema);