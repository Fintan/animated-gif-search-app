define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Marionette = require("marionette");
	var SettingsArea = require('./settings/SettingsArea');
	var ThumbnailsView = require('./thumbnails/ThumbnailsView');
	var LoadingView = require('./loading/LoadingView');
	var FadeInRegion = require("ui/FadeInRegion");

	return Backbone.Marionette.Layout.extend({

		template: 'CatsnDogsScreen',

		className: 'cats-n-dogs',

		ui: {
			logo: '.main-header>img'
		},

		regions: {
			settingsRegion: '#settingsArea',
			contentRegion: FadeInRegion.extend({el: "#contentArea"})		
		},

		initialize: function(options) {

			this.router = options.router;
			this.updateSettings();

			this.listenTo(this.collection, 'sync', this.onCollectionSync);
			this.listenTo(this.collection, 'request', this.onRequest);

		},

		onCollectionSync: function() {
			this.showContent();
		},

		onRequest: function() {
			this.showLoading();
		},

		showSettings: function() {

			this.settingsArea = new SettingsArea({model: this.settings});
			this.settingsRegion.show(this.settingsArea);

		},

		showLoading: function() {

			this.contentView = new LoadingView();	
			this.contentRegion.show(this.contentView);

		},

		showContent: function() {

			this.contentView = new ThumbnailsView({collection: this.collection});	
			this.contentRegion.show(this.contentView);
			this.contentView.on('itemview:click:thumb', this.onThumbnailClick, this);

		},

		onThumbnailClick: function(view, id) {

			this.router.navigate('results/'+id, { trigger: true });

		},

		serializeData: function() {

			return this.settings.toJSON();

		},

		onRender: function() {

			this.showContent();
			this.showSettings();

			this.listenTo(this.collection.params, 'change', this.updateSettings);
			this.listenTo(this.settingsArea, 'SettingsArea:offset SettingsArea:limit SettingsArea:filter', this.updateUrlParams);

		},

		updateSettings: function() {

			this.settings = this.settings || new Backbone.Model();
			window.settings = this.settings;

			this.settings.set({ 
				disableFirst: this.collection.params.get('offset') === 0, 
				disablePrevious: this.collection.params.get('offset') === 0, 
				disableNext: this.collection.onLastPage(), 
				disableLast: this.collection.onLastPage(), 
				currentPage: this.collection.getCurrentPage(), 
				lastPage: this.collection.getLastPage(), 
				currentLimit: this.collection.params.get('limit'),
				filterValue: this.collection.params.get('q')
			});

		},

		updateUrlParams: function(nav, value) {

			if(nav === 'forward') {
				this.collection.nextPage();
			}else if(nav === 'back') {
				this.collection.previousPage();
			}else if(nav === 'first') {
				this.collection.firstPage();
			}else if(nav === 'last') {
				this.collection.lastPage();
			}else if(nav === 'limit') {
				this.collection.params.set('limit', value);
				this.collection.firstPage();
			}else if(nav === 'filter') {
				this.collection.params.set('q', value);
				this.collection.firstPage();
				this.ui.logo.attr('src', this.ui.logo.data(value));
			}

		},

		onBeforeClose:function() {

			if(this.contentView) {
				this.contentView.off(null, null, this);
			}

		}

	});

});