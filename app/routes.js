'use strict';

var Event = require('./models/event');

module.exports = function(app) {
  app.get('/api/events', function(req, res) {
    Event.find({}, "-photos", function(err, events) {
      if (err) {
        res.send(err);
	  } else {
        res.jsonp(events);
	  }
    });
  });

  app.get('/api/events/:event_id', function(req, res) {
    Event.findOne({object_id: req.params.event_id}, function(err, event) {
      if (err) {
        res.send(err);
      } else {
        res.jsonp(event);
      }
    });
  });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
