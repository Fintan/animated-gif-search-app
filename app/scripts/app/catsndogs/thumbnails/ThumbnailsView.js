define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Marionette = require("marionette");
	var ThumbnailView = require('./ThumbnailView');
	var EmptyView = require('./EmptyView');
	
	var ThumbnailsView = Backbone.Marionette.CollectionView.extend({

		className: 'thumbnails-view',

		tagName: 'ul',

		itemView: ThumbnailView,

		emptyView: EmptyView,

		initialize: function() {
			
		},


		onBeforeRender: function() {

		// 	thumbnail.$el.removeClass('hide');
		},

		onClose: function() {
			
		}

	});
	
	return ThumbnailsView;
});
		