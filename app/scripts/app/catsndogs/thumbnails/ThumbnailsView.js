define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Marionette = require("marionette");
	var ThumbnailView = require('./ThumbnailView');
	var EmptyView = require('./EmptyView');
	
	return Backbone.Marionette.CollectionView.extend({

		className: 'thumbnails-view',

		tagName: 'ul',

		itemView: ThumbnailView,

		emptyView: EmptyView

	});
});
		