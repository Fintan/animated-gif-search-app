define(function (require) {
	'use strict';
	var $ = require('jquery');
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Marionette = require("marionette");
	var Giphys = require('app/models/Giphys');

	return Backbone.Marionette.ItemView.extend({

		template: 'SettingsArea',

		className: 'settings-area',

		bindings: {
			'.first.btn': 'disableFirst',
			'.previous.btn': 'disablePrevious',
			'.next.btn': 'disableNext',
			'.last.btn': 'disableLast',
			'#pageNumber': 'currentPage',
			'#selectedLimit': 'currentLimit',
			'.filterBtn[data-filter=cats]': {
				observe: 'filterValue',
				update: function($el, filter) { 
					if(filter === 'cats') {
						$el.addClass('active');
					}else {
						$el.removeClass('active');
					}
				}
			},
			'.filterBtn[data-filter=dogs]': {
				observe: 'filterValue',
				update: function($el, filter) { 
					if(filter === 'dogs') {
						$el.addClass('active');
					}else {
						$el.removeClass('active');
					}
				}
			}
		},

		events: {
			'click #offsetControls>button': 'onChangeOffset',
			'click #limitCombo>ul>li>a': 'onChangeLimit',
			'click .filterBtn': 'onSearchFilter'
		},

		onChangeOffset: function(e) {

			e.preventDefault();
			this.trigger('SettingsArea:offset', $(e.target).closest('button').data('nav'));

		},

		onChangeLimit: function(e) {
			
			var limit = $(e.target).closest('li').data('value');
			
			if(_.isNumber(limit)) {
				this.trigger('SettingsArea:limit', 'limit', limit);
			}

		},

		onSearchFilter: function(e) {

			var filter = $(e.target).data('filter');
			this.trigger('SettingsArea:filter', 'filter', $(e.target).data('filter'));
		},

		onRender: function() {

			this.stickit();

		}

	});

});