/// <reference path="typings/node/node.d.ts"/>

'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 6060;
var io = require('socket.io').listen(app.listen(port));
var request = require('request');
var async = require('async');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./config/db');
var Event = require('./app/models/event');

mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// Set Instagram API call parameters
/* var baseUrl = 'https://api.instagram.com/v1/media/search?lat=';
var clientId = '0a27cf17ae7047b8b12008dd5d2f38d5';
var latitude = '36.1024175';
var longitude = '-115.1688513';
var distance = '700';
var minTimestamp = Math.floor(new Date()/1000);

// Post Instagram servers for new images
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
	    	console.log('no new images: ' + minTimestamp);
	    	minTimestamp = Math.floor(new Date()/1000);
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
		    minTimestamp = Math.floor(new Date()/1000);
		    console.log('Image(s) added and minTimestamp incremented to: ' + minTimestamp);
		}
	  }
	);
}, 600000); */

require('./app/routes')(app);

console.log('Magic happens on port ' + port);
exports = module.exports = app;
