define(function (require) {
	'use strict';
	var _ = require('underscore');
	var Backbone = require('backbone');
	var PaginatedCollection = require('ui/paginated/PaginatedCollection');
	var Giphy = require('./Giphy');

	return PaginatedCollection.extend({

		url: 'http://api.giphy.com/v1/gifs/search',

		model: Giphy,

		initialize: function(models, options) {

			//q - search query term or phrase
			this.params.set('q', 'cats');
			//api_key - The public beta key is <b>"dc6zaTOxFJmzC"</b>
			this.params.set('api_key', 'dc6zaTOxFJmzC');

			window.collection = this;//for debug

		},

		parse: function(response) {

			this.TOTAL_RESULTS = response.pagination ? response.pagination.total_count : void 0;
			
			return response.data;

		}

	});

});