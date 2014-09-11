define(function (require) {
	'use strict';
	var Backbone = require("backbone");
	var Marionette = require("marionette");

	var FadeInRegion = Backbone.Marionette.Region.extend({

		open: function(view){

			this.$el.hide();
			this.$el.html(view.el);
			this.$el.fadeIn();
			
		}

	});

	return FadeInRegion;

});