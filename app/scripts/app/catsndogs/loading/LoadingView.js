define(function (require) {
	'use strict';
	var Backbone = require("backbone");
	require("marionette");
	
	return Backbone.Marionette.ItemView.extend({

		className: 'loading-view',
		
		template: 'LoadingView'
	
	});

});	