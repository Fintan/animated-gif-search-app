define(function (require) {
	'use strict';
	var Backbone = require('backbone');

	return Backbone.Router.extend({

		routes: {
			'results(/:id)': 'results',
			'*path':  'defaultRoute'
		},

		initialize: function(options) {

			this.collection = options.collection;
			this.viewTypes = options.viewTypes;
			this.$el = $('#container');

		},

		defaultRoute: function() {
			this.navigate('results', {trigger: true});
		},

		results: function(id) {

			if(!id) {
				this.showView('CatsnDogsScreen', { collection: this.collection, router: this });
				this.collection.fetch();
			}else {
				var model = this.collection.get(id); 
				if(model) {
					this.showView('DetailView', { model: model, router: this });
				}else {
					//could fetch by id except 'Access-Control-Allow-Origin' header isn't present!
					// model = new this.collection.model({id: id});
					// this.showView('DetailView', { model: model, router: this });
					// model.fetch();
					//redirect instead
					this.navigate('results', {trigger: true});
				}
			}

		},

		showView: function(key, options) {

			if(this.view) {
				this.view.close();
			}

			this.view = new this.viewTypes[key](options);
			this.$el.html(this.view.render().el);

		}

	});

});