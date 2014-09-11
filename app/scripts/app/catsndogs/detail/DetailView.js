define(function (require) {
	'use strict';
	var Backbone = require("backbone");
	var Marionette = require("marionette");
	require("marionette");
	
	return Backbone.Marionette.ItemView.extend({

		className: 'detail-view',
		
		template: 'DetailView',

		bindings: {
			'.media-container': 'images.original',
			'.centre-media': {
				observe: 'images.original',
				update: function($el, imageConfig) { 
					$el.css({'width': imageConfig.width});
					$el.css({'height': imageConfig.height});
				}
		    }
		},

		events: {
			'click .goToList.btn': 'onGoToList'
		},

		onGoToList: function(e) {

			this.options.router.navigate('results', { trigger: true });

		},

		onRender: function() {

			this.stickit();
			
		}
	
	});

});	