define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Marionette = require("marionette");
	
	return Backbone.Marionette.ItemView.extend({

		template: 'ThumbnailView',

		tagName: 'li',

		//hide the thumbnail contents until image has loaded
		//className: 'hide',

		events: {
			'click a': 'onClick'
		},

		bindings: {
			'.image-container': 'images.fixed_width_still'
		},

		onClick: function(e) {
			this.trigger('click:thumb',  this.model.get('id'));
		},

		onRender: function() {

			this.stickit();
			
		}
	
	});

});		