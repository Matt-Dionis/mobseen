// modules =================================================
var express        = require('express.io');
var app            = express();
var port           = process.env.PORT || 6060;
var io             = require('socket.io').listen(app.listen(port));
var request        = require('request');
var async          = require('async');
var mongoose       = require('mongoose');
var Twit           = require('twit')
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var db             = require('./config/db');
var Event          = require('./app/models/event');

// configuration ===========================================
mongoose.connect(db.url); // connect to our mongoDB database

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse        application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form- urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method- Override  header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location  /public/img  will be /img for users

/* var T = new Twit({
    consumer_key:         'iUu4b7dHMBb8VUyhrHO9G8L27'
  , consumer_secret:      'NlE5RyRB9TXlUrjK6VCAhOLg0A4qYqaFQ7yczK5gYUCf5yRbKe'
  , access_token:         '327390939-7HOoDu6IkcYDdbLI1PLNfEhJYFJurIkrjj7HfMIZ'
  , access_token_secret:  'Ecb8xubLkzCkOSD6OWm4G8R19J4Vlh6mO7tXXzh68GehA'
})

var stream = T.stream('statuses/filter', { track: ['#thon', '#ftk'], language: 'en', exclude: 'replies' })

io.on('connection', function (socket) {
	stream.on('tweet', function (data) {
	  socket.emit('newTweets', { 
	  	time: data.created_at,
	  	text: data.text,
	  	username: data.user.screen_name,
	  	profile_image: data.user.profile_image_url,
	  	image: data.media
	  });
	})
}); */

var baseUrl = 'https://api.instagram.com/v1/media/search?lat=';
var clientId = '0a27cf17ae7047b8b12008dd5d2f38d5';
var latitude = '40.8086579';
var longitude = '-77.8556801';
var distance = '150';
var minTimestamp = Math.floor(new Date('February 20, 2015 22:50:00').getTime()/1000);

setInterval(function () {
	request(baseUrl + latitude + '&lng=' + longitude + '&distance=' + distance + '&min_timestamp=' +  minTimestamp + '&client_id=' + clientId,
	  function (error, response, body) {
	    if (error) { 
	      console.log('error');
	      return;
	    }

	    //JSON object with all the info about the image
	    var imageJson = JSON.parse(body);
	    if (imageJson.meta.code != 200 || imageJson.data == 0) {
	    	console.log('no new images' + minTimestamp);
	    	return
	    } else {
		    var images = imageJson.data;
		    console.log(images);
		    var numImages = images.length;
		    var imagesOrdered = images.reverse();

		    async.eachSeries(imagesOrdered, function(image, imageFinishedCallback) {

		      //Save the new object to DB
		      Event.findOneAndUpdate( { $and: [{latitude: latitude}, {radius: distance}] }, { $push: {'photos':
		        { img: image.images.standard_resolution.url,
		          link: image.link,
		          username: image.user.username,
		          profile: image.user.profile_picture,
		          text: image.caption ? image.caption.text : '',
		          longitude: image.location.longitude,
		          latitude: image.location.latitude,
		          created_time: image.created_time + 0
		        }}},
		        { safe: true, upsert: false },
		        function(err, model) {
		          console.log(err);  
		        }
		      );
		      imageFinishedCallback();
		    }, function(err){
		      // if any of the image processing produced an error, err would equal that error
		      if( err ) {
		        // One of the iterations produced an error.
		        // All processing will now stop.
		        console.log('Images failed to process');
		      } else {
		        console.log('Images processed');
		      }
		    });
		    minTimestamp = parseInt(images[0].created_time) + 10;
		    console.log('Image(s) added and minTimestamp incremented to: ' + minTimestamp);
		}
	  }
	);
}, 1800000);

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
console.log('Magic happens on port ' + port);           // shoutout to the user
exports = module.exports = app; 