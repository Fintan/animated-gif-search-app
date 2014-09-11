define(function (require) {
	'use strict';
	var _ = require('underscore');
	var Backbone = require('backbone');
	require('backbone-deep-model');

	return Backbone.DeepModel.extend({

		//:-(
		//No 'Access-Control-Allow-Origin' header is present on the requested resource
		urlRoot: function() {
			return 'http://api.giphy.com/v1/gifs/'+this.get('id')+'?api_key=dc6zaTOxFJmzC';
		}

	});

});