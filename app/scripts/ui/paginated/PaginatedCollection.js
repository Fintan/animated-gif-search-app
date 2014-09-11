define(function (require) {
	'use strict';
	var _ = require('underscore');
	var Backbone = require('backbone');
	var UrlParams = require('utils/UrlParams');

	return Backbone.Collection.extend({

		constructor: function(){
		    
			//offset - (optional) results offset, defaults to 0.
		    //limit - (optional) number of results to return. Default 25.
		    this.params = new UrlParams({
				offset: 0,
				limit: 25
			});
			this.MAX_LIMIT = 100;

		    Backbone.Collection.prototype.constructor.apply(this, Array.prototype.slice.apply(arguments));

		},

		fetch: function(options) {

			return Backbone.Collection.prototype.fetch.call(this, _.extend({data:this.params.toUrlParams()}, options ||{}));

		},

		firstPage: function() {

			this.params.set('offset', 0);

			return this.fetch();

		},

		nextPage: function() {

			if(this.length === 0) {
				return;
			}

			this.params.set('offset', this.params.get('offset') + this.params.get('limit'));

			return this.fetch();

		},

		previousPage: function() {

			this.params.set('offset', this.params.get('offset') - this.params.get('limit'));

			if(this.params.get('offset') < 0) {
				this.params.set('offset', 0);
			}

			return this.fetch();

		},

		lastPage: function() {

			this.params.set('offset', (this.getLastPage()-1) * this.params.get('limit'));

			return this.fetch();

		},

		setLimit: function(size) {

			if(!_.isNumber(size)) {
				throw new Error("PaginatedCollection:setLimit size is NaN");
			}

			if(size > this.MAX_LIMIT) {
				size = this.MAX_LIMIT;
			}

			this.params.set('limit', size);

			//go back to the first page when the limit changes
			this.params.set('offset', 0);

			return this.fetch();

		},

		getCurrentPage: function() {
			return Math.ceil(this.params.get('offset')/this.params.get('limit')) + 1;
		},

		getLastPage: function() {
			return  Math.ceil(this.TOTAL_RESULTS/this.params.get('limit'));
		},

		onLastPage: function() {

			return this.getCurrentPage() >= this.getLastPage();

		}

	});

});