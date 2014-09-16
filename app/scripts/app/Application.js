define(function (require, exports, module) {
	'use strict';
	var $ = require('jquery');
	var _ = require('underscore');
	var Marionette = require('marionette');
	var Backbone = require('backbone');
	var Router = require('./Router');
	var CatsnDogsScreen = require('app/catsndogs/CatsnDogsScreen');
	var DetailView = require('app/catsndogs/detail/DetailView');
	var Giphys = require('app/models/Giphys');
	require('./vendorLibOverrides');
	
	var app = {

		init: function() {
			console.log("%c Build created by %s on %s", "color: blue;", module.config().developer, module.config().date);
			console.log("%c Application::init", 'background: #222; color: #bada55');
		},

		setupRouters: function() {

			var viewTypes = {
				'CatsnDogsScreen': CatsnDogsScreen,
				'DetailView': DetailView
			};

			this.router = new Router({ collection: new Giphys(), viewTypes: viewTypes  });

			Backbone.history.start();

		},

		hidePreloader: function() {

			$("#overlay").delay(500).fadeOut(500);

		}

	};
	
	return {
		start: function() {

			app.hidePreloader();
			app.init();
			app.setupRouters();

		}
	};


});