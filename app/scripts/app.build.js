require.config({

	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		marionette: '../bower_components/marionette/lib/core/backbone.marionette',
		'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
		'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
		'backbone.stickit': '../bower_components/backbone.stickit/backbone.stickit',
		'backbone-deep-model': '../bower_components/backbone-deep-model/distribution/deep-model',
		bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
		handlebars: '../bower_components/handlebars/handlebars-1.0.12',
		domReady: '../bower_components/requirejs-domready/domReady'
	},

	shim: {
		jquery : {
			exports : 'jQuery'
		},
		underscore : {
			exports : "_"
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		marionette: {
			deps: [ "backbone", "backbone.babysitter", "backbone.wreqr"],
			exports: "Marionette"
		},
		"backbone.wreqr": ["backbone"],
		"backbone.babysitter": ["backbone"],
		'backbone.stickit': ["underscore", "jquery", "backbone"],
		'backbone-deep-model': ["underscore", "jquery", "backbone"],
		handlebars: {
			exports: 'Handlebars'
		},
		jst: {
			deps:[ "handlebars", "utils/handlebarhelpers"],
			exports: "JST"
		},
		bootstrap:["jquery"]
	},

	packages: [
		{
			name:'app',
			main:'Application'
		}
	]

});