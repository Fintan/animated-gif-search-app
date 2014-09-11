define(function (require) {
	'use strict';
	var _ = require('underscore');
	var Backbone = require('backbone');

	return Backbone.Model.extend({

		toUrlParams: function() {

			return _(this.toJSON()).pairs().map(function(param) {
			    return param[0]+'='+param[1];
			}).join('&');

		}

	});
});