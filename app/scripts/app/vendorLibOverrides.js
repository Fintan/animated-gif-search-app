define(function (require) {
	'use strict';
	var _ = require('underscore');
	var Backbone = require("backbone");
	require('backbone.stickit');
	require('backbone-deep-model');
	require('bootstrap');
	require("marionette");
	var Handlebars = require('handlebars');
	var JST = require("jst");

	/**
		Place any function overrides, global settings, etc.. here
	**/

	//using precompiled handlebar templates, default was Underscore templates
	Backbone.Marionette.Renderer.render = function(template, data){

		if(!template) { return ""; }//makes template for a view optional

		if(!JST[template] && !_.isFunction(JST[template])) { return; }

		return JST[template](data);
	};

	//avoid caching on IE
	Backbone.$.ajaxSetup({ cache: false });

	Backbone.Stickit.addHandler({
		selector: '.btn.stickit-enabler',
		events: ['keyup', 'change', 'paste', 'cut'],
		update: function($el, val) { 
			if(val === true) {
				$el.addClass('disabled');
			}else {
				$el.removeClass('disabled');
			}
		},
		getVal: function($el) { return $el.hasClass('disabled'); }
	});

	Backbone.Stickit.addHandler({
		selector: 'iframe.stickit.giphy.gif',
		update: function($el, imageConfig) { 
			$el.attr('src', imageConfig.url);
			$el.attr('width', imageConfig.width);
			$el.attr('height', imageConfig.height);
		},
		getVal: function($el) { 
			return {
				src: $el.attr('src'),
				width: $el.attr('width'),
				height: $el.attr('height')
			};
		}
	});

	Backbone.Stickit.addHandler({
		selector: 'iframe.stickit.giphy.mp4',
		update: function($el, imageConfig) { 
			$el.attr('src', imageConfig.mp4);
			$el.attr('width', imageConfig.width);
			$el.attr('height', imageConfig.height);
		},
		getVal: function($el) { 
			return {
				src: $el.attr('src'),
				width: $el.attr('width'),
				height: $el.attr('height')
			};
		}
	});	

});